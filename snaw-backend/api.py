from flask import Flask, render_template

app = Flask("__main__")
app.config["DEBUG"] = True



@app.route('/')
def home():
    #Render Index.html and pass a message on to display
    arraryOfNums = [1, 2, 3, 4, 5]
    return render_template('index.html', message = "Hello from Flask :)", array = arraryOfNums)


#this is an example of how the uploading process may happen. More research required.
@app.route("/uploadFile", methods=['POST'])
def upload():
    return

print('Starting Flask!')
app.run()