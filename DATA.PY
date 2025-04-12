import pymysql

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='hjb38u30',
    database='inventory_db'
)

print("Conexión exitosa!")
connection.close()