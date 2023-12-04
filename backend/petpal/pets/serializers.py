from rest_framework.serializers import ModelSerializer, FloatField, DecimalField, DateTimeField, ChoiceField, IntegerField

from .models import Pet, Breed, PetType
import copy


class PetSerializer(ModelSerializer):

    class Meta:
        model = Pet
        fields = '__all__'
        read_only_fields = ['id', 'last_modified', 'owner']
        extra_kwargs = {'id': {'help_text': 'Id of the pet.'}}


class PetSearchSerializer(ModelSerializer):
    ORDER_BY_CHOICES = [
        'name', '-name',
        'age', '-age',
        'weight', '-weight',
        'adoption_fee', '-adoption_fee'
    ]
    order_by = ChoiceField(choices=ORDER_BY_CHOICES, required=False,
                           help_text='Options for sorting. Negative sign (-) indicates descending order.')
    status = ChoiceField(choices=Pet.STATUS_CHOICES, default="available")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for key in self.get_fields():
            field = self.fields[key]
            field.required = False

            if isinstance(field, (FloatField, DecimalField, DateTimeField)):
                self.fields[f'{key}__gt'] = copy.deepcopy(field)
                self.fields[f'{key}__gte'] = copy.deepcopy(field)

                self.fields[f'{key}__lt'] = copy.deepcopy(field)
                self.fields[f'{key}__lte'] = copy.deepcopy(field)

                self.fields[f'{key}__gt'].help_text = f"Upper bound (exclusive) of {key} for filtering."
                self.fields[f'{key}__gte'].help_text = f"Upper bound (inclusive) of {key} for filtering."
                self.fields[f'{key}__lt'].help_text = f"Lower bound (exclusive) of {key} for filtering."
                self.fields[f'{key}__lte'].help_text = f"Lower bound (inclusive) of {key} for filtering."

                self.fields[f'{key}__gt'].required = False
                self.fields[f'{key}__gte'].required = False
                self.fields[f'{key}__lt'].required = False
                self.fields[f'{key}__lte'].required = False

    class Meta:
        model = Pet
        exclude = ['id', 'adoption_location', 'medical_history', 'notes', 'picture_1', 'picture_2', 'picture_3']


class PetTypeSerializer(ModelSerializer):

    class Meta:
        model = PetType
        fields = '__all__'

class BreedSerializer(ModelSerializer):

    class Meta:
        model = Breed
        fields = '__all__'
