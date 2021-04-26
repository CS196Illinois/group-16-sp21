from flask import Flask, render_template, request, redirect, jsonify, send_file
from flask_mysqldb import MySQL
from flask_cors import CORS
import yaml

app = Flask(__name__)
CORS(app)

dbInfo = yaml.load(open('db.yaml'), Loader=yaml.SafeLoader)
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
            cursor.execute("INSERT INTO users(username, email) VALUES ('{}', '{}')".format(username, email))
        except mysql.connection.IntegrityError:
            return render_template("index.html", errorText="Email already exists in our database.")
        except mysql.connection.DataError:
            return render_template("index.html", errorText="woi fak kau")

        mysql.connection.commit()
        cursor.close()

        return redirect('/users')

    return render_template("index.html")


# @app.route('/users')
# def users():
#     cursor = mysql.connection.cursor()
#     cursor.execute("SELECT * FROM users")
#     db = cursor.fetchall()

@app.route('/image/<item_id>')
def retrieve_image(item_id):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT image FROM catalogue WHERE (item_id = {})".format(item_id))
    db = cursor.fetchall()
    # cursor.close()
    return (
        send_file("items/{}".format(db[0][0]))
    )


@app.route('/item/<item_id>')
def retrieve_item(item_id):
    cursor = mysql.connection.cursor()
    cursor.execute("""
        SELECT catalogue.item_name, categories.category_name, users.first_name
        FROM catalogue
            INNER JOIN categories ON catalogue.category_id = categories.category_id
            INNER JOIN users ON catalogue.user_id = users.user_id
        WHERE catalogue.item_id = {}
    """.format(item_id))
    db = cursor.fetchall()

    return (
        jsonify(db[0])
    )


if __name__ == '__main__':
    app.run()
