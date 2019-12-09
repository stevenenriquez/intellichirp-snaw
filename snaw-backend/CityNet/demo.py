import os
import yaml
import zipfile
import numpy as np
import pickle
from six.moves import urllib
import matplotlib.pyplot as plt
import sys
import base64
sys.path.append('lib')
sys.path.append('prediction')

from tf_classifier import TFClassifier, HOP_LENGTH

def runFunction():
    # where to download the pretrained models from
    models_dl_path = 'https://www.dropbox.com/s/50ketdmtn6bd1oa/tf_models.zip?dl=1'


    #############################################

    print("-> Downloading and unzipping pre-trained model...")

    if not os.path.exists('tf_models/biotic/network_opts.yaml'):

        if not os.path.isdir("tf_models"):
            os.makedirs("tf_models")

        if not os.path.exists('tf_models/models.zip'):
            urllib.request.urlretrieve(models_dl_path, "tf_models/models.zip")
            # wget.download(models_dl_path, 'models')

        with zipfile.ZipFile('tf_models/models.zip', 'r') as zip_ref:
            zip_ref.extractall('./')

    print("-> ...Done")


    ############################################################

    print("->  Making predictions for biotic and anthropogenic separately")

    preds = {}

    for classifier_type in ['biotic', 'anthrop']:

        with open('tf_models/%s/network_opts.yaml' % classifier_type) as f:
            options = yaml.load(f)

        model_path = 'tf_models/%s/weights_99.pkl-1' % classifier_type

        predictor = TFClassifier(options, model_path)
        preds[classifier_type] = predictor.classify('CityNet/demo/DEMO.wav')

    print("-> ...Done")

    ############################

    print("-> Saving predictions to disk")

    with open('CityNet/demo/predictions.pkl', 'wb') as f:
        pickle.dump(preds, f, -1)

    print("-> ...Done")


    ######################

    print("-> Plotting predictions")

    plt.figure(figsize=(15, 5))
    cols = {'anthrop': 'b', 'biotic': 'g'}

    for key, val in preds.items():
        len_in_s = val.shape[0] * HOP_LENGTH / predictor.sample_rate
        print(len_in_s)

        x = np.linspace(0, len_in_s, val.shape[0])
        plt.plot(x, val, cols[key], label=key)

        plt.xlabel('Time (s)')
        plt.ylabel('Activity level')

    # plt.ylim(0, 1.2)
    plt.xlim(0, 60)
    plt.legend()
    plt.savefig('CityNet/demo/predictions.png')

    print("-> ...Done")
    with open("CityNet/demo/predictions.png", "rb") as analysis:
        encoding = base64.b64encode(analysis.read())
    return encoding.decode("utf-8")