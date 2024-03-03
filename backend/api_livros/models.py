from django.db import models

class Autor(models.Model):
    nome = models.CharField('nome', max_length = 100)

    def __str__(self):
        return self.nome
    
class Livro(models.Model):
    titulo = models.CharField('titulo', max_length = 100)
    autor = models.ForeignKey(Autor, on_delete=models.CASCADE, blank=True, null=True)
    ano_publicado = models.DateField()

    def __str__(self):
        return f'{self.titulo} - {self.autor} - {self.ano_publicado}'
    
# vai mexendo no q vc quer ai q eu volto qnd terminar