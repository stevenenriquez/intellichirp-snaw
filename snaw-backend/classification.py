from pyAudioAnalysis import audioSegmentation as aS
import sys
import wave
import contextlib
import os

def classify_file( audiofile, model ):

    with contextlib.closing(wave.open(audiofile,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)
        print(duration)

    try:
        aS.mtFileClassification(audiofile, model,"svm", True)
    except TypeError:
        print("TypeError")
        
    [flagsInd, classesAll, acc, CM] = aS.mtFileClassification(audiofile, model,"svm")
    print( flagsInd )
    print( classesAll )
    print( acc )
    print( CM )

    flag_len = len(flagsInd)
    segment = duration / flag_len

    series = []

    for index in range(flag_len):
        
        #series[0] = { "category" : classesAll[int(flagsInd[index])], time[segment * index] } }
        print( str( "{ category: '" + classesAll[int(flagsInd[index])] ) + "', time: " + str(segment * index) + " }," )

def anthro_model():
    for filename in os.listdir('model/anthro'):
        modelfile = 'model/anthro/' + filename
        return modelfile

def bio_model():
    for filename in os.listdir('model/bio'):
        modelfile = 'model/bio/' + filename
        return modelfile

def geo_model():
    for filename in os.listdir('model/geo'):
        modelfile = 'model/geo/' + filename
        return modelfile

def runScript():
    print("hello :(")

    for filename in os.listdir('audio'):
        audiofile = 'audio/' + filename

    classify_file(audiofile, anthro_model() )
    classify_file(audiofile, bio_model() )
    classify_file(audiofile, geo_model() )

    return "[SUCCESS] Classified sound file using a variety of SVM models. "