from flask import Flask, render_template, request, redirect
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

# INSECURE configure database code
# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = 'AzureFluke--44'
# app.config['MYSQL_DB'] = 'flasktest'

# SECURE code:
dbInfo = yaml.load(open('db.yaml'), Loader=yaml.SafeLoader)
app.config['MYSQL_HOST'] = dbInfo['mysql_host']
app.config['MYSQL_USER'] = dbInfo['mysql_user']
app.config['MYSQL_PASSWORD'] = dbInfo['mysql_password']
app.config['MYSQL_DB'] = dbInfo['mysql_db']

mysql = MySQL(app)


class Person:
    def __init__(self, name: str, age: int):
        self.name = name
        self.age = age

    def to_dict(self):
        return {
            'name': self.name,
            'age': self.age
        }


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


@app.route('/users')
def users():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users")
    db = cursor.fetchall()

    return render_template('users.html', userDetails=db)


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']

        cursor = mysql.connection.cursor()

        # try:
        cursor.execute(("SELECT * FROM users WHERE email = '{}'").format(email))
        # except mysql.connection.IntegrityError:
        #     return render_template("index.html", errorText="Email already exists in our database.")
        # except mysql.connection.DataError:
        #     return render_template("index.html", errorText="Email was too long")
        user = cursor.fetchall()
        return render_template('login.html', name=user[0][0])

    return render_template('login.html')


if __name__ == '__main__':
    app.run()
