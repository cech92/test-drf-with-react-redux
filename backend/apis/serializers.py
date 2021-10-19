from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Usage, User, UsageType
from .utils import DynamicFieldsModelSerializer


class SignInSerializer(TokenObtainPairSerializer):
	def create(self, validated_data):
		super(SignInSerializer, self).create(validated_data)

	def update(self, instance, validated_data):
		super(SignInSerializer, self).update(instance, validated_data)

	def validate(self, attrs):
		data = super(SignInSerializer, self).validate(attrs)
		data.update({'id': self.user.id})
		data.update({'email': self.user.email})
		data.update({'first_name': self.user.first_name})
		data.update({'last_name': self.user.last_name})
		return data


class UserSerializer(DynamicFieldsModelSerializer):
	class Meta:
		model = User
		fields = ['id', 'email', 'first_name', 'last_name', 'show_updated_at']


class UsageTypeSerializer(DynamicFieldsModelSerializer):
	class Meta:
		model = UsageType
		fields = ['id', 'name', 'unit', 'factor']


class UsageSerializer(DynamicFieldsModelSerializer):
	user = UserSerializer(read_only=True)
	usage_type = UsageTypeSerializer(read_only=True)

	class Meta:
		model = Usage
		fields = ['id', 'usage_at', 'amount', 'usage_type', 'user', 'total']
		read_only_fields = ['total']


class UsageCreateUpdateSerializer(UsageSerializer):
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
	usage_type = serializers.PrimaryKeyRelatedField(queryset=UsageType.objects.all())

	def create(self, validated_data):
		return Usage.objects.create(**validated_data)

	def update(self, instance, validated_data):
		for key, value in validated_data.items():
			setattr(instance, key, value)
		instance.save()
		return instance
