# Generated by Django 3.2.7 on 2021-12-15 10:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ann_id', models.IntegerField()),
                ('title', models.CharField(max_length=200)),
                ('avatar', models.ImageField(default='anime_images/no_image.jpg', upload_to='anime_images/')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ann_id', models.IntegerField()),
                ('name', models.CharField(max_length=200)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Studio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ann_id', models.IntegerField()),
                ('name', models.CharField(max_length=200)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='RelStudioAnime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=200, null=True)),
                ('anime_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='animelist.anime')),
                ('studio_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='animelist.studio')),
            ],
        ),
        migrations.CreateModel(
            name='RelStaffAnime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(max_length=200)),
                ('anime_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='animelist.anime')),
                ('staff_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='animelist.staff')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ann_id', models.IntegerField()),
                ('name', models.CharField(max_length=200)),
                ('image', models.ImageField(upload_to='anime_images/')),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('anime_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='animelist.anime')),
            ],
        ),
    ]
