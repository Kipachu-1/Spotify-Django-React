# Generated by Django 4.1.3 on 2022-11-25 14:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Artist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('uni_id', models.CharField(max_length=20)),
                ('monthly_listeners', models.IntegerField()),
                ('avatar', models.ImageField(upload_to='images/')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('User', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Playlist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='My playlist', max_length=100)),
                ('description', models.TextField(max_length=200, null=True)),
                ('public', models.BooleanField(default=True)),
                ('uni_id', models.CharField(max_length=30, null=True)),
                ('thumnail', models.ImageField(default='images\\R_Fjojo2y.jpg', null=True, upload_to='images/')),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
                ('musics', models.ManyToManyField(to='API.artist')),
            ],
        ),
        migrations.CreateModel(
            name='User_Playlists',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uni_id', models.CharField(max_length=30, null=True)),
                ('playlists', models.ManyToManyField(to='API.playlist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Track',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('music', models.FileField(blank=True, null=True, upload_to='musics/')),
                ('uni_id', models.CharField(default='taMrjAAEzMDY1xuizdcj', max_length=20, null=True)),
                ('thumnail', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('genre', models.CharField(default='song', max_length=30)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='API.artist')),
            ],
        ),
        migrations.CreateModel(
            name='LikedSongs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uni_id', models.CharField(max_length=30)),
                ('musics', models.ManyToManyField(to='API.track')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='history',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_playlist', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='API.playlist')),
                ('last_track', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='API.track')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='FollowedArtist',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uni_id', models.CharField(max_length=30)),
                ('artists', models.ManyToManyField(to='API.artist')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=200)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('musics', models.ManyToManyField(to='API.track')),
            ],
        ),
    ]