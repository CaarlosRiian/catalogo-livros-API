from django.contrib import admin
from django.urls import path

from rest_framework import routers
from api_livros.views import *

router = routers.DefaultRouter()
router.register('autores', AutorViewSet)
router.register('livros', LivroViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
]

urlpatterns += router.urls