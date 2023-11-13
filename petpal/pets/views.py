from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import SAFE_METHODS, IsAuthenticatedOrReadOnly
from .models import Pet
from .serializers import PetSerializer, PetSearchSerializer

from accounts.permissions import IsPetShelterOrReadOnly

# Create your views here.


class ListCreatePetView(ListCreateAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsPetShelterOrReadOnly]

    def perform_create(self, serializer):
        Pet.objects.create(**serializer.validated_data, owner=self.request.user.petshelter)

    def get_queryset(self):
        serializer = PetSearchSerializer(data=self.request.query_params)
        serializer.is_valid(raise_exception=True)
        order_by = serializer.validated_data.pop('order_by', None)

        search_result = Pet.objects.all().filter(**serializer.validated_data)
        if order_by:
            search_result = search_result.order_by(order_by)
        return search_result


class RetrieveUpdateDestroyPetView(RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.method in SAFE_METHODS:
            return Pet.objects.all()
        return Pet.objects.filter(owner=self.request.user)
