@echo off
cd ../frontend
call npm run build
cd ../

call venv\Scripts\activate.bat
call pip install -r requirements.txt
call python manage.py collectstatic
call python manage.py runserver
