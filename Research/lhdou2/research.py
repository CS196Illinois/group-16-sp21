print("Hello World")
#Print statement

val = input("Enter a number");
print(val)
#Variable


# storing values
username = input("Set a username: ")
password = input("Set a password: ")

checker = False
while checker is False:
#Comparing values


  checkUsername = input("Please enter the username you put: ")
  checkPassword = input("Please enter the password you put: ")

  if username == checkUsername and password == checkPassword:
    print("Both username and password match hurray!")
    checker = True
  elif username == checkUsername:
    print("Password incorrect")
  elif password == checkPassword:
    print("Username incorrect")
  else:
    print("Both are incorrect what are you doing?")



#Making a class

class Pet:
  def __init__(self, setname, setage, settypeOfAnimal):
      self.name = setname
      self.age = setage
      self.typeOfAnimal = settypeOfAnimal
  #function that barks
  def bark(self):
    print(self.name + " the " + self.typeOfAnimal + " says bark")

#Create an instance of class
x = Pet("Beep", "13" , "dog")
#Prints name of class
print(x.name + " is the name of the " + x.age + " year old " + x.typeOfAnimal);
#Calling bark function
x.bark()


#Magic Methods

w = 10
#Add adds whatever is in parenthesis
print(w.__add__(3))