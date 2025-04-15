import os
from flask import Flask, jsonify, g
from flask_cors import CORS
from extensions import db, mail, socketio, init_extensions
from routes.auth_routes import auth_bp
from routes.product_routes import product_bp
from routes.stock_routes import stock_bp
from routes.pos_routes import pos_bp
from routes.report_routes import report_bp
from routes.dashboard_routes import dashboard_bp
from utils.mail import init_mail
from database import create_engine_from_env, get_session

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')  # Replace with a strong secret key

# Initialize extensions
init_extensions(app)

engine = create_engine_from_env()

@app.before_request
def before_request():
    g.db_engine = engine
    g.db_session = get_session(engine)

@app.teardown_request
def teardown_request(exception=None):
    if hasattr(g, 'db_session'):
        g.db_session.close()

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(product_bp)
app.register_blueprint(stock_bp)
app.register_blueprint(pos_bp)
app.register_blueprint(report_bp)
app.register_blueprint(dashboard_bp)

@app.route('/api/health/')
def health_check():
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    app.run(debug=True)
