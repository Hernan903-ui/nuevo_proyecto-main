# backend/extensions.py
import os
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_socketio import SocketIO
from flask import Flask

db = SQLAlchemy()
mail = Mail()
socketio = SocketIO()

def init_extensions(app: Flask):
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{os.environ.get('DATABASE_USER', 'root')}:{os.environ.get('DATABASE_PASSWORD', 'hjb38u30')}@localhost/inventory_db"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME', 'your-email@gmail.com')
    app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'your-email-password')
    db.init_app(app)
    mail.init_app(app)
    socketio.init_app(app, cors_allowed_origins=None)