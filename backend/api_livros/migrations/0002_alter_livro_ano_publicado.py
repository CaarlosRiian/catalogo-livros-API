# Generated by Django 5.0.2 on 2024-03-03 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_livros', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='livro',
            name='ano_publicado',
            field=models.DateField(),
        ),
    ]
