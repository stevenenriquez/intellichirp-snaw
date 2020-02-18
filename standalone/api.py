from werkzeug.utils import secure_filename
import os
import sys, getopt
import subprocess
import yaml
from scipy import signal
import csv
import classification

ALLOWED_EXTENSIONS = {'wav'}


filePath = ''


def output():
    Anthro_csv_file = "csv/Anthro.csv"
    Geo_csv_file = "csv/Geo.csv"
    Bio_csv_file = "csv/Bio.csv"

    csv_columns=['category','time']

    dict_data=classification.runScript()

    Anthro_output_dict=dict_data[0]["data"]
    Geo_output_dict=dict_data[1]["data"]
    Bio_output_dict=dict_data[2]["data"]


    # Output anthrophony csv file
    try:
        with open(Anthro_csv_file, 'w') as csvfile_a:
            writer = csv.DictWriter(csvfile_a, fieldnames=csv_columns)
            writer.writeheader()
            for data in Anthro_output_dict:
                writer.writerow(data)
    except IOError:
        print("I/O error")

    # Output geophony csv file
    try:
        with open(Geo_csv_file, 'w') as csvfile_g:
            writer = csv.DictWriter(csvfile_g, fieldnames=csv_columns)
            writer.writeheader()
            for data in Geo_output_dict:
                writer.writerow(data)
    except IOError:
        print("I/O error")

    # Output biophony csv file
    try:
        with open(Bio_csv_file, 'w') as csvfile_b:
            writer = csv.DictWriter(csvfile_b, fieldnames=csv_columns)
            writer.writeheader()
            for data in Bio_output_dict:
                writer.writerow(data)
    except IOError:
        print("I/O error")

    
def path():
    return filePath


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
        result = classification.runScript()

        print("[Success] Classification has been completed - api.py")
        return result
    except Exception as e:
        return str(e)


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

if __name__ == "__main__":
    main(sys.argv[1:])
