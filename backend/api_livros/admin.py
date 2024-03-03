from django.contrib import admin
from .models import *

@admin.register(Autor)
class AutorAdmin(admin.ModelAdmin):
    pass

@admin.register(Livro)
class LivroAdmin(admin.ModelAdmin):
    pass


