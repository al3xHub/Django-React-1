from rest_framework import serializers
from .models import Task

# El serializador convierte tipos de datos de python a json
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ('id', 'title', 'description', 'done')
        fields = '__all__'