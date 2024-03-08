from rest_framework import serializers
from .models import *

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Autor
        fields = ['id', 'nome']

class LivroSerializer(serializers.ModelSerializer):

    autor = serializers.PrimaryKeyRelatedField(queryset=Autor.objects.all())
    class Meta:
        model = Livro
        fields = ['id', 'titulo', 'autor', 'ano_publicado']

    # Representar nome do autor na API
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['autor'] = instance.autor.nome

        return representation