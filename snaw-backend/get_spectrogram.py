import numpy as np
from matplotlib import pyplot as plt
import scipy.io.wavfile as wav
from numpy.lib import stride_tricks
import sys
import os
import base64

""" short time fourier transform of audio signal """
def stft(sig, frameSize, overlapFac=0.5, window=np.hanning):
    win = window(frameSize)
    hopSize = int(frameSize - np.floor(overlapFac * frameSize))

    # zeros at beginning (thus center of 1st window should be for sample nr. 0)   
    samples = np.append(np.zeros(int(np.floor(frameSize/2.0))), sig)    
    # cols for windowing
    cols = np.ceil( (len(samples) - frameSize) / float(hopSize)) + 1
    # zeros at end (thus samples can be fully covered by frames)
    samples = np.append(samples, np.zeros(frameSize))

    frames = stride_tricks.as_strided(samples, shape=(int(cols), frameSize), strides=(samples.strides[0]*hopSize, samples.strides[0])).copy()
    frames *= win

    return np.fft.rfft(frames)    

""" scale frequency axis logarithmically """    
def logscale_spec(spec, sr=44100, factor=20.):
    timebins, freqbins = np.shape(spec)

    scale = np.linspace(0, 1, freqbins) ** factor
    scale *= (freqbins-1)/max(scale)
    scale = np.unique(np.round(scale))

    # create spectrogram with new freq bins
    newspec = np.complex128(np.zeros([timebins, len(scale)]))
    for i in range(0, len(scale)):        
        if i == len(scale)-1:
            newspec[:,i] = np.sum(spec[:,int(scale[i]):], axis=1)
        else:        
            newspec[:,i] = np.sum(spec[:,int(scale[i]):int(scale[i+1])], axis=1)

    # list center freq of bins
    allfreqs = np.abs(np.fft.fftfreq(freqbins*2, 1./sr)[:freqbins+1])
    freqs = []
    for i in range(0, len(scale)):
        if i == len(scale)-1:
            freqs += [np.mean(allfreqs[int(scale[i]):])]
        else:
            freqs += [np.mean(allfreqs[int(scale[i]):int(scale[i+1])])]

    return newspec, freqs

""" plot spectrogram"""
def plotstft(audiopath, binsize=2**10, plotpath=None, colormap="jet"):
    samplerate, samples = wav.read(audiopath)

    s = stft(samples, binsize)

    sshow, freq = logscale_spec(s, factor=1.0, sr=samplerate)

    ims = 20.*np.log10(np.abs(sshow)/10e-6) # amplitude to decibel

    timebins, freqbins = np.shape(ims)

    print("timebins: ", timebins)
    print("freqbins: ", freqbins)

    plt.figure(figsize=(15, 7.5))
    plt.imshow(np.transpose(ims), origin="lower", aspect="auto", cmap=colormap, interpolation="none")
    plt.colorbar()

    plt.xlabel("time (s)")
    plt.ylabel("frequency (hz)")
    plt.xlim([0, timebins-1])
    plt.ylim([0, freqbins])

    xlocs = np.float32(np.linspace(0, timebins-1, 5))
    plt.xticks(xlocs, ["%.02f" % l for l in ((xlocs*len(samples)/timebins)+(0.5*binsize))/samplerate])
    ylocs = np.int16(np.round(np.linspace(0, freqbins-1, 10)))
    plt.yticks(ylocs, ["%.02f" % freq[i] for i in ylocs])

    if plotpath:
        plt.savefig(plotpath, bbox_inches="tight")
    else:
        plt.show()

    plt.clf()

    return ims

def runScript(isMultipleFiles = False):
    # Check if multiple files are being analyzed
    if(isMultipleFiles):

        # Create a dictionary for storying
        # And a counter for the files
        listOfImages = {}
        fileCount = 0
        try:
            # Retrieve file
            for filename in os.listdir('instance/upload/'):
                audiofile = "instance/upload/" + filename

                # Correct Path
                path= "spectrogram/SpectroedImage"+ str(fileCount)

                # Run spectrogram plotting
                ims = plotstft(audiofile, plotpath=path)

                # Convert spectrograms into a base64 string to be sent to front end
                with open(path + ".png", "rb") as spect_image:
                    encode = base64.b64encode(spect_image.read())
                    # Add file number as key and file name and data as values
                    listOfImages[fileCount] = [filename, 'data:image/png;base64,' + encode.decode("utf-8")]

                fileCount += 1

            # remove all spectrogram pictures from storage
            for file in os.listdir("spectrogram/"):
                os.remove("spectrogram/"+file)

        except:
                print('[FAILURE] File upload unsuccessful, or not file uploaded. Choosing default audio file instead.')

        return listOfImages

    # If only one image is being analyzed
    else:
        # Dictionary for storing return information
        singleImage = {}

        try:
            # Retrieve file
            for filename in os.listdir('instance/upload/'):
                 audiofile = "instance/upload/" + filename

            # Creates and returns path of created spectrogram file
            path= "spectrogram/SpectroedImage"

            # Run spectrogram plotting
            ims = plotstft(audiofile, plotpath=path)

            # Convert spectrograms into a base64 string to be sent to front end
            with open(path + ".png", "rb") as spect_image:
                encode = base64.b64encode(spect_image.read())

            singleImage[0] = [filename, 'data:image/png;base64,' + encode.decode("utf-8")]

            # remove all spectrogram pictures from storage
            for file in os.listdir("spectrogram/"):
                os.remove("spectrogram/"+file)

        except:
                print('[FAILURE] File upload unsuccessful, or not file uploaded. Choosing default audio file instead.')

        return singleImage