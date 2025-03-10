from typing import Any, Dict
from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField, CharField

from .models import PetSeeker, PetShelter, User
from django.shortcuts import get_object_or_404
from django.core.exceptions import ValidationError

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed, PermissionDenied

from drf_yasg.utils import swagger_serializer_method
from django.db.models import Avg, Count

from comments.models import Comment


class CustomizedTokenObtainSerializer(TokenObtainPairSerializer):
    def validate(self, attrs: Dict[str, Any]) -> Dict[Any, Any]:
        # validated_data = super().validate(attrs)
        username = attrs.get("username")
        password = attrs.get("password")
        try:
            user = User.objects.get(username=username)
        except:

            raise serializers.ValidationError({"username":"User Not Found."})

        if not user.check_password(password):
            raise serializers.ValidationError({"password":"Password is incorrect."})
        return super().validate(attrs)


class PetSeekerSerializer(ModelSerializer):
    password = CharField(write_only=True)
    class Meta:
        model = PetSeeker
        fields = ["id","username", "password", "phone_number", "email", "first_name", "last_name", "address", \
                  "description","banner", "profile_picture", "created_at", 'website', 'receive_pet_notification']

    def create(self, data):
        password = data.pop("password")
        user = PetSeeker.objects.create_user(**data)
        user.set_password(password)
        user.save()
        
        return user
    
    

class PetShelterSerializer(ModelSerializer):
    password = CharField(write_only=True)
    avg_rating = serializers.SerializerMethodField()
    review_count = serializers.SerializerMethodField()


    class Meta:
        model = PetShelter
        fields = ["id", "username", "password", "phone_number", "email", "first_name", "last_name", "address",
                  "description","banner", "profile_picture", "mission_title", "mission_statement", "created_at"
                  , "avg_rating", 'review_count', 'website']

    def create(self, data):
        password = data.pop("password")
        user = PetShelter.objects.create_user(**data
            # username=data.get('username', ''),
            # phone_number=data.get('phone_number', ''),
            # email=data.get('email', ''),
            # first_name=data.get('first_name', ''),
            # last_name=data.get('last_name', ''),
            # address=data.get('address', ''),
            # mission_title=data.get('mission_title', ''),
            # mission_statement=data.get('mission_statement', '')  
        )
        user.set_password(password)
        user.save()
        
        return user

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField(help_text="Average rating of the shelter"))
    def get_avg_rating(self, obj):
        if isinstance(obj, PetShelter):
            return obj.ratings.aggregate(total=Avg('rating')).get('total', 0)
        return 0

    @swagger_serializer_method(serializer_or_field=serializers.IntegerField(help_text="Average rating of the shelter"))
    def get_review_count(self, obj):
        if isinstance(obj, PetShelter):
            return Comment.objects.filter(object_id=obj.id).count()
        return 0

