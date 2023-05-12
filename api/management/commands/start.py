from django.core.management.commands.runserver import Command as RunServerCommand
from api.data_seeder import start


class Command(RunServerCommand):
    help = "Starts the development server with database update running in the background."

    def handle(self, *args, **options):
        start()

        # call the original runserver command
        super().handle(*args, **options)