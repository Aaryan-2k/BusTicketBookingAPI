from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class AccountManager(BaseUserManager):
    def create_user(self,first_name,last_name,email,phone=None,password=None):
        if not first_name:
            raise ValueError("first name is required")
        if not last_name:
            raise ValueError("last name is required")
        if not email:
            raise ValueError("email is required")

        user=self.model(
            first_name=first_name,
            last_name=last_name,
            email=self.normalize_email(email),
            phone=phone,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,first_name,last_name,email,phone=None,password=None):
        user=self.create_user(first_name,last_name,email,phone,password)
        user.is_admin=True
        user.is_active=True
        user.is_staff=True
        user.is_superadmin=True
        user.save(using=self._db)


class Account(AbstractBaseUser):
    first_name=models.CharField(max_length=250)
    last_name=models.CharField(max_length=250)
    email=models.EmailField(unique=True)
    phone=models.CharField(max_length=20, blank=True, null=True)

    # mandatory for custom user model
    date_joined=models.DateTimeField(auto_now_add=True)
    last_login=models.DateTimeField(auto_now=True)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_active=models.BooleanField(default=False)
    is_superadmin=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['first_name', 'last_name']

    objects=AccountManager()

    def __str__(self):
        return self.email
    
    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, add_label):
        return True
    



