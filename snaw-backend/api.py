# from flask import Flask, render_template
from flask import Flask, flash, request, redirect, url_for, session, render_template, jsonify, make_response
from werkzeug.utils import secure_filename
import os
import sys
import subprocess

UPLOAD_FOLDER = 'C:/Users/Steven/Documents/dev/IntelliChirp/intellichirp-snaw/snaw-backend/upload'
ALLOWED_EXTENSIONS = {'wav'}

app = Flask("__main__")
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'secret key'
app.config['SESSION_TYPE'] = 'filesystem'

@app.route('/')
def home():
    arrayOfNums = [1, 2, 3, 4, 5]

    """ 
    Upon rendering the index.html, we also send in a string message
    and the above arrayOfNums
    """
    return render_template('index.html', message = "Hello from Flask :)", array = arrayOfNums)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

#this is an example of how the uploading process may happen. More research required.
@app.route("/upload", methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect('http://127.0.0.1:5000')
    return redirect('http://127.0.0.1:5000')

@app.route("/results")
def analyze():
    analysisOutput = subprocess.check_output([sys.executable, "CityNet/demo.py", "forest_path126.wav"])
    print(analysisOutput)
    return

print('Starting Flask!')
app.run(debug=True)