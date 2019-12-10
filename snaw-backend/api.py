from flask import Flask, render_template, send_file, jsonify
# from flask import Flask, render_template
from flask import Flask, flash, request, redirect, url_for, session, render_template, jsonify, make_response
from werkzeug.utils import secure_filename
import os
import sys
import subprocess
from get_spectrogram import runScript as get_spectrogram
from classification import runScript as get_classification

UPLOAD_FOLDER = 'upload'
ALLOWED_EXTENSIONS = {'wav'}

app = Flask("__main__")
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'secret key'
app.config['SESSION_TYPE'] = 'filesystem'

@app.route('/')
def home():

    spectroImg = get_spectrogram()

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

#this is an example of how the uploading process may happen. More research required.
@app.route("/upload", methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            print('[!!!!!!] No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            print('[!!!!!!] No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            print( '[!!!!!!!!!!!]' + app.config['UPLOAD_FOLDER'] )
            print( '[!!!!!!!!!!!!!]' + app.instance_path )
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            file.save(os.path.join(app.instance_path, UPLOAD_FOLDER, filename))
            return redirect('http://127.0.0.1:5000')
    return redirect('http://127.0.0.1:5000')

@app.route("/results")
def analyze():
    return
    #analysisOutput = subprocess.check_output([sys.executable, "CityNet/demo.py", "CityNet/demo/forest_path126.wav"])
    #Run CityNet demo.py script
    #runFunction()
    #show the pdf provided by the script
    #try:
    #    return send_file('CityNet/demo/predictions.pdf',
    #                     attachment_filename='predictions.pdf')
    #except Exception as e:
    #    return str(e)

@app.route("/results/classification")
def classify():
    try:
        result = get_classification()
        # print(result)
        return jsonify(result).data
    except Exception as e:
        return str(e)

@app.route("/results/spectro")
def get_spectro():
    try:
        return get_spectrogram()
    except Exception as e:
        return str(e)

print('Starting Flask!')
app.run(debug=True)