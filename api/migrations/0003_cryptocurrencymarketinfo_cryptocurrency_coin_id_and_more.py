# Generated by Django 4.1.7 on 2023-05-12 17:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_cryptocurrency_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='CryptoCurrencyMarketInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('current_price', models.DecimalField(decimal_places=8, max_digits=20, null=True)),
                ('market_cap', models.DecimalField(decimal_places=8, max_digits=20, null=True)),
                ('total_volume', models.DecimalField(decimal_places=8, max_digits=20, null=True)),
                ('price_change_24h', models.DecimalField(decimal_places=8, max_digits=20, null=True)),
                ('market_cap_change_24h', models.DecimalField(decimal_places=8, max_digits=20, null=True)),
                ('circulating_supply', models.DecimalField(decimal_places=8, max_digits=20, null=True)),
                ('last_updated', models.TimeField()),
            ],
        ),
        migrations.AddField(
            model_name='cryptocurrency',
            name='coin_id',
            field=models.CharField(max_length=32, null=True),
        ),
        migrations.AddField(
            model_name='cryptocurrency',
            name='image',
            field=models.CharField(max_length=120, null=True),
        ),
        migrations.AddField(
            model_name='cryptocurrency',
            name='symbol',
            field=models.CharField(max_length=18, null=True),
        ),
        migrations.AlterField(
            model_name='cryptocurrency',
            name='close',
            field=models.DecimalField(decimal_places=8, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='cryptocurrency',
            name='high',
            field=models.DecimalField(decimal_places=8, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='cryptocurrency',
            name='low',
            field=models.DecimalField(decimal_places=8, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='cryptocurrency',
            name='name',
            field=models.CharField(default='UFO', max_length=40, null=True),
        ),
        migrations.AlterField(
            model_name='cryptocurrency',
            name='open',
            field=models.DecimalField(decimal_places=8, max_digits=20, null=True),
        ),
        migrations.AddField(
            model_name='cryptocurrency',
            name='marketInfo',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.cryptocurrencymarketinfo'),
        ),
    ]