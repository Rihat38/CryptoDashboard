# Generated by Django 4.1.7 on 2023-05-12 21:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_rename_marketinfo_coin_market_info'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coin',
            name='market_info',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.coinmarketinfo'),
        ),
    ]
