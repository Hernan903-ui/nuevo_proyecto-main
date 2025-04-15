from flask_mail import Mail

mail = Mail()

def init_mail(app):
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USERNAME'] = 'tu_correo@example.com'  # Change this to your email
    app.config['MAIL_PASSWORD'] = 'tu_contraseña'  # Change this to your email password
    mail.init_app(app)