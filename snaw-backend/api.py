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
    stringMessage =  "Hello from Flask :)"
    arrayOfNums = [1, 2, 3, 4, 5]

    spectroImg = runScript()
    analysisImg = runFunction()

    return render_template("index.html", message = stringMessage, array = arrayOfNums, spectroImg = spectroImg, analysisImg =  analysisImg)

#this is an example of how the uploading process may happen. More research required.
@app.route("/uploadFile", methods=['POST'])
def upload():
    return

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

print('Starting Flask!')
app.run()