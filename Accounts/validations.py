from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model

UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()

    if not email or UserModel.objects.filter(email=email).exists():
        print(UserModel.objects.filter(email=email).exists())
        raise ValidationError('Choose another email.')

    if not password or len(password) < 8:
        raise ValidationError('Choose another password, minimum 8 characters required.')

    if not username:
        raise ValidationError('Choose another username.')

    return data

def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('An email is needed.')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('Choose another username.')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('A password is needed.')
    return True
