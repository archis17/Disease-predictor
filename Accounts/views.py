from django.db import connection
from django.shortcuts import render
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status, generics
from django.http import JsonResponse

from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, PatientSerializer, DoctorProfileSerializer
from .validations import custom_validation, validate_email, validate_password
from .models import DoctorProfile, AppUser

User = get_user_model()


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


def check_email(request):
    email = request.GET.get('email')
    if email:
        email_exists = AppUser.objects.filter(email=email).exists()
        response_data = {'email_exists': email_exists}
        return JsonResponse(response_data)
    else:
        return JsonResponse({'error': 'Email parameter is missing'}, status=400)


class PatientProfile(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        profile = request.user.profile
        if not profile:
            return Response({'error': 'User does not have a profile'}, status=status.HTTP_404_NOT_FOUND)
        serializer = PatientSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        serializer = PatientSerializer(request.user.profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DoctorProfileListAPIView(generics.ListAPIView):
    serializer_class = DoctorProfileSerializer

    def get_queryset(self):
        speciality = self.kwargs.get('sp', '')
        if speciality == 'All':
            queryset = DoctorProfile.objects.all()
        else:
            queryset = DoctorProfile.objects.filter(speciality__iexact=speciality)
        return queryset.order_by('?')[:12]


def insert_data(request):
    query = """
    INSERT INTO "Accounts_doctorprofile" (name, speciality, gender, experience, address)
    VALUES (%s, %s, %s, %s, %s);
    """
    values = [
        ('Dr. John Smith', 'Family Medicine', 'male', 15, '123 Main Street, New York, NY', '555-123-4567', 'https://randomuser.me/api/portraits/men/1.jpg', 'https://example.com/doctor/1'),
        ('Dr. Emma Thompson', 'Family Medicine', 'female', 12, '456 Elm Street, Chicago, IL', '555-234-5678', 'https://randomuser.me/api/portraits/women/2.jpg', 'https://example.com/doctor/2'),
        ('Dr. David Wilson', 'Family Medicine', 'male', 10, '789 Oak Street, Los Angeles, CA', '555-345-6789', 'https://randomuser.me/api/portraits/men/3.jpg', 'https://example.com/doctor/3'),
        ('Dr. Lily Rodriguez', 'Family Medicine', 'female', 8, '321 Maple Street, Houston, TX', '555-456-7890', 'https://randomuser.me/api/portraits/women/4.jpg', 'https://example.com/doctor/4'),
        
        # Internal Medicine
        ('Dr. Emily Johnson', 'Internal Medicine', 'female', 20, '123 Pine Street, Boston, MA', '555-567-8901', 'https://randomuser.me/api/portraits/women/5.jpg', 'https://example.com/doctor/5'),
        ('Dr. Benjamin Davis', 'Internal Medicine', 'male', 18, '456 Cedar Street, Seattle, WA', '555-678-9012', 'https://randomuser.me/api/portraits/men/6.jpg', 'https://example.com/doctor/6'),
        ('Dr. Sophia Thompson', 'Internal Medicine', 'female', 22, '789 Birch Street, Denver, CO', '555-789-0123', 'https://randomuser.me/api/portraits/women/7.jpg', 'https://example.com/doctor/7'),
        ('Dr. Daniel Wilson', 'Internal Medicine', 'male', 16, '321 Walnut Street, Atlanta, GA', '555-890-1234', 'https://randomuser.me/api/portraits/men/8.jpg', 'https://example.com/doctor/8'),
        
        # Pediatrician
        ('Dr. Michael Johnson', 'Pediatrician', 'male', 18, '123 Main Street, New York, NY', '555-901-2345', 'https://randomuser.me/api/portraits/men/9.jpg', 'https://example.com/doctor/9'),
        ('Dr. Abigail Smith', 'Pediatrician', 'female', 15, '456 Elm Street, Chicago, IL', '555-012-3456', 'https://randomuser.me/api/portraits/women/10.jpg', 'https://example.com/doctor/10'),
        ('Dr. Ethan Davis', 'Pediatrician', 'male', 10, '789 Oak Street, Los Angeles, CA', '555-123-4567', 'https://randomuser.me/api/portraits/men/11.jpg', 'https://example.com/doctor/11'),
        ('Dr. Isabella Wilson', 'Pediatrician', 'female', 12, '321 Maple Street, Houston, TX', '555-234-5678', 'https://randomuser.me/api/portraits/women/12.jpg', 'https://example.com/doctor/12'),
        
        # Obstetricians/gynecologist (OBGYNs)
        ('Dr. Olivia Davis', 'Gynecologist', 'female', 25, '123 Main Street, New York, NY', '555-345-6789', 'https://randomuser.me/api/portraits/women/13.jpg', 'https://example.com/doctor/13'),
        ('Dr. Liam Johnson', 'Gynecologist', 'male', 22, '456 Elm Street, Chicago, IL', '555-456-7890', 'https://randomuser.me/api/portraits/men/14.jpg', 'https://example.com/doctor/14'),
        ('Dr. Ava Brown', 'Gynecologist', 'female', 20, '789 Oak Street, Los Angeles, CA', '555-567-8901', 'https://randomuser.me/api/portraits/women/15.jpg', 'https://example.com/doctor/15'),
        ('Dr. Noah Thompson', 'Gynecologist', 'male', 18, '321 Maple Street, Houston, TX', '555-678-9012', 'https://randomuser.me/api/portraits/men/16.jpg', 'https://example.com/doctor/16'),
        
        # Cardiologist
        ('Dr. Benjamin Smith', 'Cardiologist', 'male', 22, '123 Main Street, New York, NY', '555-789-0123', 'https://randomuser.me/api/portraits/men/17.jpg', 'https://example.com/doctor/17'),
        ('Dr. Charlotte Johnson', 'Cardiologist', 'female', 20, '456 Elm Street, Chicago, IL', '555-890-1234', 'https://randomuser.me/api/portraits/women/18.jpg', 'https://example.com/doctor/18'),
        ('Dr. Samuel Brown', 'Cardiologist', 'male', 18, '789 Oak Street, Los Angeles, CA', '555-901-2345', 'https://randomuser.me/api/portraits/men/19.jpg', 'https://example.com/doctor/19'),
        ('Dr. Grace Thompson', 'Cardiologist', 'female', 16, '321 Maple Street, Houston, TX', '555-012-3456', 'https://randomuser.me/api/portraits/women/20.jpg', 'https://example.com/doctor/20'),
        
        # Oncologist
        ('Dr. William Wilson', 'Oncologist', 'male', 30, '123 Main Street, New York, NY', '555-123-4567', 'https://randomuser.me/api/portraits/men/21.jpg', 'https://example.com/doctor/21'),
        ('Dr. Sophia Johnson', 'Oncologist', 'female', 28, '456 Elm Street, Chicago, IL', '555-234-5678', 'https://randomuser.me/api/portraits/women/22.jpg', 'https://example.com/doctor/22'),
        ('Dr. Alexander Brown', 'Oncologist', 'male', 25, '789 Oak Street, Los Angeles, CA', '555-345-6789', 'https://randomuser.me/api/portraits/men/23.jpg', 'https://example.com/doctor/23'),
        ('Dr. Mia Thompson', 'Oncologist', 'female', 22, '321 Maple Street, Houston, TX', '555-456-7890', 'https://randomuser.me/api/portraits/women/24.jpg', 'https://example.com/doctor/24'),
        
        # Gastroenterologist
        ('Dr. Olivia Smith', 'Gastroenterologist', 'female', 25, '123 Main Street, New York, NY', '555-567-8901', 'https://randomuser.me/api/portraits/women/25.jpg', 'https://example.com/doctor/25'),
        ('Dr. Liam Johnson', 'Gastroenterologist', 'male', 22, '456 Elm Street, Chicago, IL', '555-678-9012', 'https://randomuser.me/api/portraits/men/26.jpg', 'https://example.com/doctor/26'),
        ('Dr. Ava Brown', 'Gastroenterologist', 'female', 20, '789 Oak Street, Los Angeles, CA', '555-789-0123', 'https://randomuser.me/api/portraits/women/27.jpg', 'https://example.com/doctor/27'),
        ('Dr. Noah Thompson', 'Gastroenterologist', 'male', 18, '321 Maple Street, Houston, TX', '555-890-1234', 'https://randomuser.me/api/portraits/men/28.jpg', 'https://example.com/doctor/28'),
        
        # Pulmonologist
        ('Dr. Benjamin Wilson', 'Pulmonologist', 'male', 20, '123 Main Street, New York, NY', '555-901-2345', 'https://randomuser.me/api/portraits/men/29.jpg', 'https://example.com/doctor/29'),
        ('Dr. Charlotte Johnson', 'Pulmonologist', 'female', 18, '456 Elm Street, Chicago, IL', '555-012-3456', 'https://randomuser.me/api/portraits/women/30.jpg', 'https://example.com/doctor/30'),
        ('Dr. Samuel Brown', 'Pulmonologist', 'male', 16, '789 Oak Street, Los Angeles, CA', '555-123-4567', 'https://randomuser.me/api/portraits/men/31.jpg', 'https://example.com/doctor/31'),
        ('Dr. Grace Thompson', 'Pulmonologist', 'female', 14, '321 Maple Street, Houston, TX', '555-234-5678', 'https://randomuser.me/api/portraits/women/32.jpg', 'https://example.com/doctor/32'),
        
        # Infectious Disease
        ('Dr. William Smith', 'Infectious Disease', 'male', 18, '123 Main Street, New York, NY', '555-345-6789', 'https://randomuser.me/api/portraits/men/33.jpg', 'https://example.com/doctor/33'),
        ('Dr. Sophia Johnson', 'Infectious Disease', 'female', 16, '456 Elm Street, Chicago, IL', '555-456-7890', 'https://randomuser.me/api/portraits/women/34.jpg', 'https://example.com/doctor/34'),
        ('Dr. Alexander Brown', 'Infectious Disease', 'male', 14, '789 Oak Street, Los Angeles, CA', '555-567-8901', 'https://randomuser.me/api/portraits/men/35.jpg', 'https://example.com/doctor/35'),
        ('Dr. Mia Thompson', 'Infectious Disease', 'female', 12, '321 Maple Street, Houston, TX', '555-678-9012', 'https://randomuser.me/api/portraits/women/36.jpg', 'https://example.com/doctor/36'),
        
        # Nephrologist
        ('Dr. Olivia Smith', 'Nephrologist', 'female', 25, '123 Main Street, New York, NY', '555-789-0123', 'https://randomuser.me/api/portraits/women/37.jpg', 'https://example.com/doctor/37'),
        ('Dr. Liam Johnson', 'Nephrologist', 'male', 22, '456 Elm Street, Chicago, IL', '555-890-1234', 'https://randomuser.me/api/portraits/men/38.jpg', 'https://example.com/doctor/38'),
        ('Dr. Ava Brown', 'Nephrologist', 'female', 20, '789 Oak Street, Los Angeles, CA', '555-901-2345', 'https://randomuser.me/api/portraits/women/39.jpg', 'https://example.com/doctor/39'),
        ('Dr. Noah Thompson', 'Nephrologist', 'male', 18, '321 Maple Street, Houston, TX', '555-012-3456', 'https://randomuser.me/api/portraits/men/40.jpg', 'https://example.com/doctor/40'),
        
        # Endocrinologist
        ('Dr. Benjamin Wilson', 'Endocrinologist', 'male', 20, '123 Main Street, New York, NY', '555-123-4567', 'https://randomuser.me/api/portraits/men/41.jpg', 'https://example.com/doctor/41'),
        ('Dr. Charlotte Johnson', 'Endocrinologist', 'female', 18, '456 Elm Street, Chicago, IL', '555-234-5678', 'https://randomuser.me/api/portraits/women/42.jpg', 'https://example.com/doctor/42')
    ]
    with connection.cursor() as cursor:
        cursor.executemany(query, values)
    return render(request, 'index.html')


def check_admin(request):
    email = request.GET.get('email')
    if email:
        try:
            user = AppUser.objects.get(email=email)
            response_data = {
                'email_exists': True,
                'is_superuser': user.is_superuser
            }
            return JsonResponse(response_data)
        except AppUser.DoesNotExist:
            return JsonResponse({'email_exists': False, 'is_superuser': False})
    return JsonResponse({'error': 'Email parameter is missing'}, status=400)
