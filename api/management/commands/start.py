from django.core.management.commands.runserver import Command as RunServerCommand

from data_seeder.data_seeder import update_database


class Command(RunServerCommand):
    help = "Starts the development server with database update running in the background."

    def handle(self, *args, **options):
        update_database()

        # call the original runserver command
        super().handle(*args, **options)