# Generated by Django 4.1.7 on 2023-05-08 11:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CryptoCurrency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.TimeField()),
                ('open', models.DecimalField(decimal_places=8, max_digits=20)),
                ('high', models.DecimalField(decimal_places=8, max_digits=20)),
                ('low', models.DecimalField(decimal_places=8, max_digits=20)),
                ('close', models.DecimalField(decimal_places=8, max_digits=20)),
            ],
        ),
    ]
