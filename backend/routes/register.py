from flask import Blueprint, render_template

# Crear un Blueprint para la ruta de registro
register_bp = Blueprint('register', __name__, template_folder='templates')

# Definir la ruta para servir el archivo register.html
@register_bp.route('/register')
def register():
    return render_template('register.html')