from flask import Blueprint, request, jsonify
from database_models import Product, StockHistory
from extensions import db

stock_bp = Blueprint('stock', __name__)

@stock_bp.route('/low-stock', methods=['GET'])
def low_stock_alert():
    low_stock_products = Product.query.filter(Product.stock < 10).all()
    return jsonify([{"id": p.id, "name": p.name, "stock": p.stock} for p in low_stock_products])

@stock_bp.route('/add-stock', methods=['POST'])
def add_stock():
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity')

    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404

    product.stock += quantity
    stock_history = StockHistory(product_id=product_id, action='entry', quantity=quantity)
    db.session.add(stock_history)
    db.session.commit()

    return jsonify({'message': 'Stock updated successfully'}), 200