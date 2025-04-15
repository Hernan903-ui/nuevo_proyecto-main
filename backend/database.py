import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from extensions import db


def create_engine_from_env():
    """
    Crea una engine de SQLAlchemy usando variables de entorno.
    """
    user = os.environ.get("DATABASE_USER")
    password = os.environ.get("DATABASE_PASSWORD")
    host = os.environ.get("DATABASE_HOST", "localhost")
    db_name = os.environ.get("DATABASE_NAME", "inventory_db")
    database_uri = f"mysql+pymysql://{user}:{password}@{host}/{db_name}"
    engine = create_engine(database_uri)
    return engine
    
def get_session(engine):
    """
    Genera y retorna una sesión de base de datos.
    """
    session = sessionmaker(bind=engine)()
    return session
