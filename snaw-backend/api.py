from flask import Flask, render_template, send_file, jsonify
# from flask import Flask, render_template
from flask import Flask, flash, request, redirect, url_for, session, render_template, jsonify, make_response
from werkzeug.utils import secure_filename
import os
import sys
import subprocess
from get_spectrogram import runScript as get_spectrogram
from classification import runScript as get_classification

UPLOAD_FOLDER = 'instance/upload/'
ALLOWED_EXTENSIONS = {'wav'}

app = Flask("__main__")
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'secret key'
app.config['SESSION_TYPE'] = 'filesystem'

@app.route('/')
def home():
    return render_template("index.html")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      filename = secure_filename(f.filename)
      f.save(os.path.join(UPLOAD_FOLDER, filename))
      return redirect('http://127.0.0.1:5000')

@app.route("/results/classification")
def classify():
    try:
        if(len(os.listdir("instance/upload")) > 1):
            result = get_classification(True)
        else:
            result = get_classification()

        print(result[0][2])
        return result
    except Exception as e:
        return str(e)

@app.route("/results/spectro")
def get_spectro():
    try:
        if(len(os.listdir("instance/upload")) > 1):
            result = get_spectrogram(True)
        else:
            result = get_spectrogram()

        #for file in os.listdir("instance/upload/"):
         #   os.remove("instance/upload/"+file)

        return result
    except Exception as e:
        return str(e)

print('Starting Flask!')
app.run(debug=True)