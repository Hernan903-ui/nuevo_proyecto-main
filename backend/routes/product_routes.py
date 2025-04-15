import os
from flask import Blueprint, request, jsonify, g
from extensions import db

product_bp = Blueprint('products', __name__)

@product_bp.route('/', methods=['GET'])
def get_products():
    products = g.db_session.query(db.Product).all()
    return jsonify([{
        "id": p.id,
        "code": p.code,
        "name": p.name,
        "cost_price": p.cost_price,
        "sale_price": p.sale_price,
        "stock": p.stock,
        "last_updated": p.last_updated,
        "supplier": p.supplier_id
    } for p in products])

@product_bp.route('/', methods=['POST'])
def add_product():
    data = request.json
    try:
        new_product = db.Product(
            code=data['code'],
            name=data['name'],
            cost_price=data['cost_price'],
            sale_price=data['sale_price'],
            stock=data['stock'],
            supplier_id=data['supplier_id']
        )
        g.db_session.add(new_product)
        g.db_session.commit()
        return jsonify({"message": "Producto agregado con éxito"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@product_bp.route('/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.json
    product = g.db_session.query(db.Product).get(id)
    try:
        product.name = data.get('name', product.name)
        product.cost_price = data.get('cost_price', product.cost_price)
        product.sale_price = data.get('sale_price', product.sale_price)
        product.stock = data.get('stock', product.stock)
        product.supplier_id = data.get('supplier_id', product.supplier_id)
        db.session.commit()
        return jsonify({"message": "Producto actualizado con éxito" if product else "Producto no encontrado"}), 200 if product else 404
    except Exception as e:
        g.db_session.rollback()
        return jsonify({"error": str(e)}), 400

@product_bp.route('/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    try:
        db.session.delete(product)
        db.session.commit()
        return jsonify({"message": "Producto eliminado con éxito"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400