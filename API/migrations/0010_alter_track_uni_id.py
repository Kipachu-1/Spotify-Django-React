# Generated by Django 4.1.3 on 2022-12-30 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0009_rename_musics_likedsongs_tracks_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='track',
            name='uni_id',
            field=models.CharField(default='cNOPodohcj1xqQGJyJL4', max_length=20, null=True),
        ),
    ]