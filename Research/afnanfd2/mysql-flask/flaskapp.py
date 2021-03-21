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



@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        user = request.form
        username = user['name']
        email = user['email']

        cursor = mysql.connection.cursor()

        try:
            cursor.execute("INSERT INTO users(username, email) VALUES (%s, %s)", (username, email))
        except mysql.connection.IntegrityError:
            return render_template("index.html", errorText="Email already exists in our database.")

        mysql.connection.commit()
        cursor.close()

        return redirect('/users')

    return render_template("index.html", errorText="")


@app.route('/users')
def userslist():
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM users")
    db = cursor.fetchall()

    return render_template('users.html', userDetails=db)


if __name__ == '__main__':
    app.run()
