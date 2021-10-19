import json
from datetime import datetime

from django.test import TestCase
from django.urls import reverse
from django.utils import timezone
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from apis.models import User, UsageType, Usage


class CreateTestUser:
    def __init__(self):
        self.email = "test@test.com"
        self.first_name = "Mark"
        self.last_name = "Rossi"
        self.password = "12345678"
        self.user = User.objects.create_user(self.email, self.first_name, self.last_name, self.password)
        self.client = APIClient()
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')


class UserLoginAPITestCase(APITestCase):
    url = reverse("login")

    def setUp(self):
        self.email = "test@test.com"
        self.first_name = "Mark"
        self.last_name = "Rossi"
        self.password = "12345678"
        self.user = User.objects.create_user(self.email, self.first_name, self.last_name, self.password)

    def test_without_email(self):
        response = self.client.post(self.url, {"password": self.password})
        self.assertEqual(400, response.status_code)

    def test_without_password(self):
        response = self.client.post(self.url, {"email": self.email})
        self.assertEqual(400, response.status_code)

    def test_wrong_email(self):
        response = self.client.post(self.url, {"email": "lisbon@test.com", "password": self.password})
        self.assertEqual(401, response.status_code)

    def test_wrong_password(self):
        response = self.client.post(self.url, {"email": self.email, "password": "test"})
        self.assertEqual(401, response.status_code)

    def test_success(self):
        response = self.client.post(self.url, {"email": self.email, "password": self.password})
        self.assertEqual(200, response.status_code)
        self.assertEqual(self.email, json.loads(response.content)["email"])
        self.assertTrue("access" in json.loads(response.content))
        self.assertTrue("refresh" in json.loads(response.content))


class UsagesTypeModelTestCase(APITestCase):
    def setUp(self):
        self.usage_type = UsageType.objects.get_or_create(id=0, defaults={
            "name": "electricity",
            "unit": "kwh",
            "factor": 10.8
        })

    def test_exists_usage_type(self):
        usage_types_count = UsageType.objects.count()
        self.assertGreater(usage_types_count, 0)


class UsagesAPIViewTestCase(APITestCase):
    url = reverse("usages")

    def setUp(self):
        self.test_user = CreateTestUser()
        UsageType.objects.get_or_create(id=0, defaults={
            "name": "electricity",
            "unit": "kwh",
            "factor": 10.8
        })
        self.usage_type = UsageType.objects.first()

    def test_create_usage_error(self):
        response = self.test_user.client.post(self.url, {
            "usage_type": self.usage_type.id, "amount": 23.45
        })
        self.assertEqual(400, response.status_code)

        response = self.test_user.client.post(self.url, {
            "user": self.test_user.user.id, "amount": 23.45
        })
        self.assertEqual(400, response.status_code)

        response = self.test_user.client.post(self.url, {
            "usage_type": self.usage_type.id, "user": self.test_user.user.id
        })
        self.assertEqual(400, response.status_code)

    def test_create_usage_success(self):
        response = self.test_user.client.post(self.url, {
            "user": self.test_user.user.id, "usage_type": self.usage_type.id, "amount": 23.45,
            "usage_at": timezone.now()
        })
        self.assertEqual(201, response.status_code)

    def test_list_usage(self):
        Usage.objects.create(user=self.test_user.user, usage_type=self.usage_type, amount=23.45,
                             usage_at=timezone.now())
        response = self.test_user.client.get(self.url)
        self.assertTrue(len(response.data["results"]) == Usage.objects.count())


class UsageApiViewTestCase(APITestCase):
    url = reverse("usages")

    def setUp(self):
        self.test_user = CreateTestUser()
        UsageType.objects.get_or_create(id=0, defaults={
            "name": "electricity",
            "unit": "kwh",
            "factor": 10.8
        })
        self.usage_type = UsageType.objects.first()
        self.usage = Usage.objects.create(user=self.test_user.user, usage_type=self.usage_type,
                                          amount=23.45, usage_at=timezone.now())

    def test_update_usage_success(self):
        response = self.test_user.client.put(self.url + "/" + str(self.usage.id), {
            "user": self.test_user.user.id, "usage_type": self.usage_type.id, "amount": 23.45,
        })
        self.assertEqual(200, response.status_code)

    def test_retrieve_usage_success(self):
        response = self.test_user.client.get(self.url + "/" + str(self.usage.id))
        self.assertEqual(200, response.status_code)

    def test_delete_usage_success(self):
        response = self.test_user.client.delete(self.url + "/" + str(self.usage.id))
        self.assertEqual(204, response.status_code)
