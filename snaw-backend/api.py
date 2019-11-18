from flask import Flask, render_template

app = Flask(__name__, static_folder="../snaw-frontend/build", template_folder="../snaw-frontend/public")
app.config["DEBUG"] = True


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route("/hello")
def hello():
    return "hello"

print('Starting Flask!')
app.run()