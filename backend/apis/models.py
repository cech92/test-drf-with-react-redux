from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserProfileManager(BaseUserManager):
	def create_user(self, email, first_name, last_name, password=None):
		# if not email:
		# 	raise ValueError('Email address not valid')
		email = self.normalize_email(email)
		user = self.model(email=email, username=email, first_name=first_name, last_name=last_name)
		user.set_password(password)
		user.save(using=self._db)

		return user

	def create_superuser(self, email, first_name, last_name, password):
		user = self.create_user(email, first_name, last_name, password)
		user.is_superuser = True
		user.is_staff = True

		user.save(using=self._db)

		return user


class User(AbstractUser):
	email = models.EmailField(max_length=255, unique=True)
	updated_at = models.DateTimeField(auto_now=True)

	objects = UserProfileManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']

	@property
	def show_updated_at(self):
		if not self.updated_at:
			return ""
		_date = self.updated_at.strftime('%Y/%m/%d %H:%M')

		return u"%s" % _date

	class Meta:
		db_table = 'user'


class Usage(models.Model):
	id = models.BigAutoField(primary_key=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	usage_type = models.ForeignKey('UsageType', on_delete=models.CASCADE)
	usage_at = models.DateTimeField()
	amount = models.FloatField()

	@property
	def show_usage_at(self):
		if not self.usage_at:
			return ""
		return '%s' % self.usage_at.strftime('%Y/%m/%d %H:%M')

	@property
	def total(self):
		if not self.usage_type:
			return self.amount
		return round(self.amount * self.usage_type.factor, 3)

	class Meta:
		db_table = 'usage'


class UsageType(models.Model):
	id = models.BigAutoField(primary_key=True)
	name = models.CharField(max_length=50)
	unit = models.CharField(max_length=10)
	factor = models.FloatField()

	class Meta:
		db_table = 'usage_type'
