# Generated by Django 4.1.3 on 2023-01-03 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0012_alter_track_uni_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='uni_id',
            field=models.CharField(default='mng2ZNWe7aG3TvA7rTDw', max_length=20, null=True),
        ),
    ]
