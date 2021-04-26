from flask import Flask, render_template, request, redirect, jsonify, send_file
from email_validator import validate_email, EmailNotValidError
from flask_mysqldb import MySQL
from flask_cors import CORS
import uuid as uuid_lib
import src.utils as utils
import yaml
import datetime

app = Flask(__name__)
CORS(app)

dbInfo = yaml.load(open('db.yaml'), Loader=yaml.SafeLoader)
app.config['MYSQL_HOST'] = dbInfo['mysql_host']
app.config['MYSQL_USER'] = dbInfo['mysql_user']
app.config['MYSQL_PASSWORD'] = dbInfo['mysql_password']
app.config['MYSQL_DB'] = dbInfo['mysql_db']

mysql = MySQL(app)


@app.route('/login', methods=['POST'])
def index():
    if request.method == 'POST':
        reg = request.json

        email = reg['email']
        password = reg['password']

        try:
            # Validate.
            valid = validate_email(email)

            # Update with the normalized form.
            email = valid.email
        except EmailNotValidError:
            return "Bad email", 400

        cursor = mysql.connection.cursor()
        cursor.execute(
            "SELECT pwd_hash, pwd_salt FROM users WHERE email = %s", (email,)
        )

        db = cursor.fetchall()

        if (not db):
            return "No such email", 400

        db = db[0]

        if utils.check_str(password, db[0], db[1]):
            cursor.execute("SELECT uuid FROM users WHERE email = %s", (email,))
            uuid = cursor.fetchall()[0][0]
        else:
            return "Wrong password", 400

        cursor.close()
        return uuid, 200


@app.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        reg = request.json

        email = reg['email']
        first_name = reg['firstName']
        last_name = reg['secondName']
        password = reg['password']

        try:
            # Validate.
            valid = validate_email(email)

            # Update with the normalized form.
            email = valid.email
        except EmailNotValidError:
            print("WHAT")
            raise ValueError('Bad email')

        pwd, pwd_salt = utils.hash_str(password)
        print(pwd, pwd_salt)
        cursor = mysql.connection.cursor()

        cursor.execute(
            "INSERT INTO users(uuid, first_name, last_name, email, pwd_hash, pwd_salt) VALUES (%s, %s, %s, %s, %s, %s)",
            (str(uuid_lib.uuid4()), first_name,
                last_name, email, pwd, pwd_salt))

        mysql.connection.commit()
        cursor.close()
        return "ok", 200


@ app.route('/forms/add_item', methods=['POST'])
def add_item():
    if request.method == 'POST':
        data = request.json

        uuid = data['uuid']
        print("UUID is " + uuid)

        cursor = mysql.connection.cursor()
        cursor.execute(
            "SELECT user_id FROM users WHERE uuid = %s", (uuid.replace('"', ''), ))

        user_id = cursor.fetchall()
        cursor.close()

        print(data['name'])
        print(data['date'])
        print(data['type'])
        print(data['category'])
        print(user_id)
        print(data['image'])

        cursor = mysql.connection.cursor()
        cursor.execute("""
            INSERT INTO
                catalogue(item_name, end_date, trade_type,
                          category_id, user_id, image)
            VALUES (
                %s, %s, %s, %s, %s, %s
            );
        """, (data['name'], data['date'], data['type'], data['category'], user_id, data['image']))

        mysql.connection.commit()
        cursor.close()

        return "ok", 200


@ app.route('/item/count/<path>', methods=['GET'])
def retrieve_count(path):
    cursor = mysql.connection.cursor()
    if path == 'lend' or path == 'borrow':
        cursor.execute(
            "SELECT item_id FROM catalogue WHERE trade_type = %s", (path, ))
        db = cursor.fetchall()
        cursor.close()
        return jsonify(db)
    if path == 'categories':
        cursor.execute("SELECT * FROM categories")
        db = cursor.fetchall()
        cursor.close()
        return jsonify(db)


@ app.route('/item/image/<trade_type>/<item_id>', methods=['GET'])
def retrieve_image(item_id, trade_type):
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(
            "SELECT image FROM catalogue WHERE (item_id = %s) AND (trade_type = %s)", (item_id, trade_type))
        db = cursor.fetchall()
        cursor.close()
        return (
            send_file("assets/{}".format(db[0][0]))
        )


@ app.route('/item/<trade_type>/<item_id>', methods=['GET'])
def retrieve_item(item_id, trade_type):
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT catalogue.item_name, DATE_FORMAT(catalogue.end_date, '%%m/%%d/%%Y') AS formatted_date, categories.category_name, users.first_name
            FROM catalogue
                INNER JOIN categories ON catalogue.category_id = categories.category_id
                INNER JOIN users ON catalogue.user_id = users.user_id
            WHERE catalogue.item_id = %s
            AND catalogue.trade_type = %s
        """, (item_id, trade_type))
        db = cursor.fetchall()

    return (
        jsonify(db[0])
    )


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000)
    app.run()
