from flask import Flask, render_template, send_file, jsonify
import os
import sys
import subprocess
from get_spectrogram import runScript as get_spectrogram
from classification import runScript as get_classification
app = Flask("__main__")
app.config["DEBUG"] = True

@app.route('/')
def home():

    spectroImg = get_spectrogram()

    return render_template("index.html")

#this is an example of how the uploading process may happen. More research required.
@app.route("/uploadFile", methods=['POST'])
def upload():
    return

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
app.run()