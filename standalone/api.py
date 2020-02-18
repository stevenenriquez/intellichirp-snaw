from werkzeug.utils import secure_filename
import os
import sys, getopt
import subprocess
from get_spectrogram import runScript as get_spectrogram
from acousticIndices import getAcousticIndices as get_acoustic_indices
from output import result as output

ALLOWED_EXTENSIONS = {'wav'}

app = Flask("__main__")
app.config["DEBUG"] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'secret key'
app.config['SESSION_TYPE'] = 'filesystem'

filePath = ''

def main(argv):
    global filePath
    try:
        opts, args = getopt.getopt(argv,"hi:o:",["filepath="])
    except getopt.GetoptError:
        print ('api.py -i <filePath>')
        sys.exit(2)
    for opt, arg in opts:
        if opt == '-help':
            print ('Usage: api.py -i <filePath>')
            sys.exit()
        elif opt in ("-i", "--filepath"):
            filePath = arg
    print ('Your audio file path:', filePath)

    UPLOAD_FOLDER = filePath
    
    classify()
    
    output()
    
def path():
    return filePath
    

if __name__ == "__main__":
    main(sys.argv[1:])


def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def upload_file():
    mutableList = request.files.copy()

    # iterate over a list received from getlist() method provided in mutableList's methodss
    for f in mutableList.getlist('file'):
        # Follow the same procedure as uploading singular files.
        filename = secure_filename(f.filename)
        f.save(os.path.join(UPLOAD_FOLDER, filename))

'''
###------------------------------------------------------###
Checks to see if the folder filePath has any contents
within in. returns a string 'True' or 'False' depending on the
condition.
###------------------------------------------------------###
'''
def didFileRead():

    # Check if upload folder contains any files
    if(len(os.listdir(filePath)) != 0):
        return "True"
    else:
        return "False"

'''
###------------------------------------------------------###
calls the function runScript() within classification.py.
The function runScript() is pulled into api.py as "get_classification()."
After the function finishes operations, the uploaded files will
be deleted.
###------------------------------------------------------###
'''

def classify():
    print("[WORKING] Flask is making call to classification.py - api.py")
    try:
        result = get_classification()

        print("[Success] Classification has been completed - api.py")
        return result
    except Exception as e:
        return str(e)

'''
###------------------------------------------------------###
calls the function runScript() within get_spectrogram.py.
The function runScript() is pulled into api.py as "get_spectrogram()."
After the function finishes operations, the uploaded files will
be deleted.
###------------------------------------------------------###
'''
def get_spectro():
    print("[WORKING] Flask is making call to get_spectrogram.py - api.py")
    try:
        result = get_spectrogram()
        print("[SUCCESS] Spectrogram images have been created - api.py")
        return result
    except Exception as e:
        return str(e)

'''
###------------------------------------------------------###
calls the function getAcousticIndices() within acousticIndices.py.
The function getAcousticIndices() is pulled into api.py as "get_acoustic_indices()."
After the function finishes operations, the uploaded files will
be deleted.
###------------------------------------------------------###
'''
def get_indices():
    print("[WORKING] Flask is making call to acousticIndices.py - api.py")
    try:
        result = get_acoustic_indices()
        print("[SUCCESS] Calculated acoustic indices - api.py")
        return result
    except Exception as e:
        return str(e)

print('Starting Flask!')
app.run(debug=True)
