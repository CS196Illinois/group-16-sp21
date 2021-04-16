from flask import Flask, render_template, request, redirect, jsonify, send_file
from flask_mysqldb import MySQL
from flask_cors import CORS
import yaml
import datetime

app = Flask(__name__)
CORS(app)

dbInfo = yaml.load(open('.\db.yaml'), Loader=yaml.SafeLoader)
app.config['MYSQL_HOST'] = dbInfo['mysql_host']
app.config['MYSQL_USER'] = dbInfo['mysql_user']
app.config['MYSQL_PASSWORD'] = dbInfo['mysql_password']
app.config['MYSQL_DB'] = dbInfo['mysql_db']

mysql = MySQL(app)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user = request.form
        username = user['name']
        email = user['email']

        cursor = mysql.connection.cursor()

        try:
            cursor.execute(
                "INSERT INTO users(username, email) VALUES ('%s', '%s')", (username, email))
        except mysql.connection.IntegrityError:
            return render_template("index.html", errorText="Email already exists in our database.")
        except mysql.connection.DataError:
            return render_template("index.html", errorText="TODO")

        mysql.connection.commit()
        cursor.close()

        return redirect('/users')

    return render_template("index.html")


@app.route('/forms/add_item', methods=['POST'])
def add_item():
    if request.method == 'POST':
        data = request.json
        email = data['email']
        print(data['email'])
        print(type(data['email']))

        cursor = mysql.connection.cursor()
        cursor.execute(
            "SELECT user_id FROM users WHERE (email = %s)", (email,))
        # cursor.execute("SELECT image FROM catalogue WHERE (item_id = %s)", item_id)

        user_id = cursor.fetchall()[0][0]
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
    if path == 'lends':
        cursor.execute("SELECT item_id FROM catalogue")
        db = cursor.fetchall()
        cursor.close()
        return jsonify(db)
    if path == 'categories':
        cursor.execute("SELECT * FROM categories")
        db = cursor.fetchall()
        cursor.close()
        return jsonify(db)


@ app.route('/item/image/<item_id>', methods=['GET'])
def retrieve_image(item_id):
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute(
            "SELECT image FROM catalogue WHERE (item_id = %s)", item_id)
        db = cursor.fetchall()
        cursor.close()
        return (
            send_file("items/{}".format(db[0][0]))
        )


@ app.route('/item/<item_id>', methods=['GET'])
def retrieve_item(item_id):
    if request.method == 'GET':
        cursor = mysql.connection.cursor()
        cursor.execute("""
            SELECT catalogue.item_name, DATE_FORMAT(catalogue.end_date, '%%m/%%d/%%Y') AS formatted_date, categories.category_name, users.first_name
            FROM catalogue
                INNER JOIN categories ON catalogue.category_id = categories.category_id
                INNER JOIN users ON catalogue.user_id = users.user_id
            WHERE catalogue.item_id = %s
        """, item_id)
        db = cursor.fetchall()

    return (
        jsonify(db[0])
    )


if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000)
    app.run()
