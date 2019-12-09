from flask import Flask, render_template, send_file
import os
import sys
import subprocess
from CityNet.demo import runFunction
from get_spectrogram import runScript
app = Flask("__main__")
app.config["DEBUG"] = True




@app.route('/')
def home():

    spectroImg = runScript()

    return render_template("index.html", spectroImg = spectroImg)

#this is an example of how the uploading process may happen. More research required.
@app.route("/uploadFile", methods=['POST'])
def upload():
    return

@app.route("/citynet")
def runCityNet():
    analysisImg = runFunction()
    return render_template("index.html", analysisImg = analysisImg)

@app.route("/results")
def analyze():
    #analysisOutput = subprocess.check_output([sys.executable, "CityNet/demo.py", "CityNet/demo/forest_path126.wav"])
    #Run CityNet demo.py script
    runFunction()
    #show the pdf provided by the script
    try:
        return send_file('CityNet/demo/predictions.pdf',
                         attachment_filename='predictions.pdf')
    except Exception as e:
        return str(e)

@app.route("/results/spectro")
def get_spectro():
    try:
        return runScript()
    except Exception as e:
        return str(e)

print('Starting Flask!')
app.run()