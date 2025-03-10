from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

# Create your models here.

class Notification(models.Model):
    """
    Model to represent user notifications.
    """
    user = models.ForeignKey('accounts.User', on_delete=models.CASCADE, help_text='The user associated with this notification.')
    created_at = models.DateTimeField(auto_now_add=True, help_text='The timestamp when the notification was created.')
    read = models.BooleanField(default=False, help_text='Indicates whether the notification has been read (True) or not (False).')

    # can reference comment, pet, application
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, help_text='The content type of the referenced object (used to find the notification type).')
    object_id = models.PositiveIntegerField(help_text='The ID of the referenced object.')
    content_object = GenericForeignKey('content_type', 'object_id')

    # The notification_type field categorizes the type of notification.
    # Possible values include: 'status_update', 'application_creation', 'new_review', 'new_message', 'new_pet_listing'.
    notification_type = models.CharField(max_length=50, blank=True, help_text='The type of notification.')
