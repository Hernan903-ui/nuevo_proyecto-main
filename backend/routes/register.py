from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from database_models import User
from extensions import db

register_bp = Blueprint('register', __name__)

@register_bp.route('/', methods=['POST'])
def register_user():
    data = request.json
    hashed_password = generate_password_hash(data['password'], method='sha256')
    try:
        new_user = User(
            name=data['name'],
            email=data['email'],
            business_name=data['business_name'],
            password=hashed_password
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "Usuario registrado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400