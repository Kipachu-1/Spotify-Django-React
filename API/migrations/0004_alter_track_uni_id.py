# Generated by Django 4.1.3 on 2022-11-25 14:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0003_alter_track_uni_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='uni_id',
            field=models.CharField(default='4bbhZAVjK234zOfGHxlj', max_length=20, null=True),
        ),
    ]
