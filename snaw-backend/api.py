from flask import Flask, render_template

app = Flask("__main__")
app.config["DEBUG"] = True



@app.route('/')
def home():
    arrayOfNums = [1, 2, 3, 4, 5]

    """ 
    Upon rendering the index.html, we also send in a string message
    and the above arrayOfNums
    """
    return render_template('index.html', message = "Hello from Flask :)", array = arrayOfNums)


#this is an example of how the uploading process may happen. More research required.
@app.route("/uploadFile", methods=['POST'])
def upload():
    return

print('Starting Flask!')
app.run()