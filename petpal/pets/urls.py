from django.urls import path
from . import views

app_name = "pets"
urlpatterns = [
    path('', views.ListCreatePetView.as_view()),
    path('<int:pk>/', views.RetrieveUpdateDestroyPetView.as_view(), name="with_id"),
]
