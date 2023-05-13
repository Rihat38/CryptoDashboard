from apscheduler.schedulers.background import BackgroundScheduler

from data_seeder import data_seeder


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(data_seeder.update_database, 'interval', minutes=5)
    scheduler.start()
