from pyAudioAnalysis import audioSegmentation as aS
import sys
import wave
import contextlib
import os
from flask import jsonify

# function that runs the classification functions on the selected audio file
# builds the dictionary of category with associated timestamps
def classify_file( audiofile, model, model_type, model_color ):

    # sets duration of audiofile, for getting the timestamps of each classification
    with contextlib.closing(wave.open(audiofile,'r')) as f:
        frames = f.getnframes()
        rate = f.getframerate()
        duration = frames / float(rate)
        print(duration)

    # only used for console output, can be removed to speed up runtime
    #   function will throw error because of true flag at end,
    #   console log is still displayed in spite of
    try:
        aS.mtFileClassification(audiofile, model,"svm", True)
    except TypeError:
        print("TypeError")

    # pulls all the data given from the classification function
    [flagsInd, classesAll, acc, CM] = aS.mtFileClassification(audiofile, model,"svm")
    print( flagsInd )
    print( classesAll )
    print( acc )
    print( CM )

    flag_len = len(flagsInd) # amount of segments made
    segment = duration / flag_len # length of each time segment

    # dictionary to be built of timestamps and categories
    classify_dict = {'name' : model_type,
                     'color' : model_color,
                     'data' : []}

    classify_dict['data'].append(  { "category" : "NO",
                                             "time" : 0 } )

    for index in range(flag_len):
        timestamp = segment * index + 1 # current timestamp

        # builds dictionary
        classify_dict['data'].append(  { "category" : classesAll[int(flagsInd[index])],
                                         "time" : timestamp } )
        # used for console logging
        print( str( "{ category: '" + classesAll[int(flagsInd[index])] ) + "', time: " + str(timestamp) + " }," )

    return classify_dict

def anthro_model():
    # for filename in os.listdir('model/anthro'):
    modelfile = 'model/anthro/svmAnthroClassModel'
    return modelfile

def bio_model():
   # for filename in os.listdir('model/bio'):
   modelfile = 'model/bio/svmBioClassModel'
   return modelfile

def geo_model():
    #for filename in os.listdir('model/geo'):
    modelfile = 'model/geo/svmGeoClassModel'
    return modelfile

# driver function
def runScript(isMultipleFiles = False):
    # Checks is a file was uploaded corrently, if not program runs on default audio file
    # default file select
    if(isMultipleFiles):
        finalResult = {}
        fileCount = 0
        try:
            for filename in os.listdir('instance/upload/'):
                audiofile = "instance/upload/" + filename
                result = []
                result.append( classify_file( audiofile, anthro_model(), 'Anthrophony', '#0088FE' ) )
                result.append( classify_file(audiofile, bio_model(), 'Biophony', '#00C49F' ) )
                result.append( classify_file(audiofile, geo_model(), 'Geophony', '#FFBB28' ) )

                finalResult[fileCount] = result
                fileCount += 1


        except:
            print('[FAILURE] File upload unsuccessful, or not file uploaded. Choosing default audio file instead.')


        return finalResult

    # creates list of dictionaries, to be returned to the front-end

    else:

        for filename in os.listdir('instance/upload/'):
            audiofile = "instance/upload/" + filename

        result = []
        result.append( classify_file( audiofile, anthro_model(), 'Anthrophony', '#0088FE' ) )
        result.append( classify_file(audiofile, bio_model(), 'Biophony', '#00C49F' ) )
        result.append( classify_file(audiofile, geo_model(), 'Geophony', '#FFBB28' ) )

        return result