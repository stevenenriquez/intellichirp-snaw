import librosa
import numpy as np
from scipy import interpolate
from scipy.signal import butter, lfilter, freqz

class AudioProcessing(object):

    def __init__(self):
        pass

    @staticmethod
    def convert_to_mono(x):
        if x.ndim > 1:
            return librosa.to_mono(x)
        return x

    @staticmethod
    def get_stft(data,n_fft,win_length,hop_length):
        stft = librosa.stft(y = data,n_fft=n_fft,hop_length=hop_length,win_length=win_length)
        return stft

    @staticmethod
    def butter_highpass_filter(data, cutoff, fs, order=5):
        nyq = 0.5 * fs
        normal_cutoff = cutoff / nyq
        b,a = butter(order, normal_cutoff, btype='high', analog=False)
        y = lfilter(b, a, data)
        return y

    @staticmethod
    def get_energy(data,frame_length,hop_length):
        energy = librosa.feature.rmse(y=data,n_fft=frame_length,hop_length=hop_length)
        energy = energy[0,:]
        return energy

    @staticmethod
    def resample(data,fs,new_fs):

        # more the sampling rate - more the number of samples in one second
        # Less samples, less quality
        # More samples, good quality, but my lead to more storage requirements.
        # optimal value of sampling rate - 44100 samples per second

        # print("Changing from sampling rate {} to {}".format(fs,new_fs))

        # converting into single channel (monosteric)
        if data.ndim > 1:
            data = librosa.to_mono(data)

        fs = float(fs)
        new_fs = float(new_fs)
        size = data.size

        # old time axis
        old_time_axis = np.arange(size)/fs
        total_time = old_time_axis[-1]
        total_samples = round(total_time*new_fs)

        # getting new time axis wrt old time axis and new sampling rate
        new_time_axis = np.arange(total_samples)/new_fs

        # fills in the values between the samples
        f = interpolate.interp1d(old_time_axis,data)

        new_data = f(new_time_axis)
        return new_data

    @staticmethod
    def rescale(data,scale_range = (-1,1)):
        mini = np.min(data)
        maxi = np.max(data)

        new_min = scale_range[0]
        new_max = scale_range[1]

        new_data = ((new_max - new_min)*(data - mini)/(maxi - mini)) + new_min
        # print("Old min-max :{}-{}, New min-max: {}:{}".format(mini,maxi,new_min,new_max))

        return new_data

    @staticmethod
    def get_histogram(data,bins=np.arange(0,1 + 1.0/256,1.0/256),density = True):

        hist,bins =  np.histogram(data,bins=bins)
        if density == True:
            hist = hist/float(np.sum(hist))

        return hist,bins

    @staticmethod
    def get_entropy(pdf):

        lg = np.log2(pdf)
        lg[np.isneginf(lg)] = 0

        return np.sum(-1.0*pdf*lg)

    @staticmethod
    def get_stft(data,n_fft,win_length,hop_length):
        stft = librosa.stft(y = data,n_fft=n_fft,hop_length=hop_length,win_length=win_length)
        return stft

    @staticmethod
    def get_envelope(data,frame_size = 256):
        total_size = data.size

        envelope = np.copy(data)
        i = 0
        while i < total_size:
            if i + frame_size > total_size:
                envelope[i:] = np.max(abs(data[i:]))
            else:
                envelope[i:i+frame_size] = np.max(data[i:i+frame_size])

            i = i + frame_size

        return envelope


    @staticmethod
    def get_background_noise(envelope):
        envelope = envelope[np.nonzero(envelope)]
        envelope[envelope < 0.001]  = 0

        envelope_non_zero = envelope[np.nonzero(envelope)]
        db_envelope = 20*np.log10(envelope_non_zero)

        sorted_db_envelope = sorted(db_envelope)
        min_index = int(db_envelope.size/200.0)

        db_envelope_min = np.mean(sorted_db_envelope)

        if db_envelope_min < -50:
            db_envelope_min = -50.0

        noise_samples = np.copy(db_envelope)
        # noise_samples[noise_samples > db_envelope_min + 10] = 0

        if ((np.mean(sorted_db_envelope)) - 5 <  (sorted_db_envelope[0] + sorted_db_envelope[-1])/2.0 ) :
            noise_samples[noise_samples > db_envelope_min + 0.4 * ((sorted_db_envelope[-1]) - np.mean(sorted_db_envelope))] = 0
        else:
            noise_samples[noise_samples > db_envelope_min ] = 0


        noise_samples[noise_samples > db_envelope_min + 2*np.std(sorted_db_envelope)] = 0
        noise_samples = noise_samples[np.nonzero(noise_samples)]

        noise_std = np.std(noise_samples)

        try:
            hist,bins = np.histogram(noise_samples,bins=100)
        except:
            import pdb
            pdb.set_trace()

        actual_bins = []
        for i in range(len(bins)-1):
            actual_bins.append((bins[i] + bins[i+1])/2.0)

        new_hist = []
        new_hist.append(hist[0]/3.0)

        for i in range(1,hist.size-1):
            new_hist.append((hist[i-1] + hist[i] + hist[i+1])/3.0)

        new_hist.append(hist[-1]/3.0)
        background_noise = actual_bins[np.argmax(new_hist)] + 0.5*noise_std

        return background_noise

    @staticmethod
    def get_row_background_noise(envelope):
        envelope = envelope[np.nonzero(envelope)]

        envelope_min = np.min(envelope)

        envelope_non_zero = envelope[np.nonzero(envelope)]
        db_envelope = 20 * np.log10(envelope_non_zero)

        db_envelope_min = 20 * np.log10(envelope_min)

        if db_envelope_min < -60:
            db_envelope_min = -60.0

        noise_samples = np.copy(db_envelope)
        noise_samples[noise_samples > db_envelope_min + 10] = 0
        noise_samples = noise_samples[np.nonzero(noise_samples)]

        noise_std = np.std(noise_samples)

        try:
            hist, bins = np.histogram(noise_samples, bins=100)
        except:
            import pdb
            pdb.set_trace()

        actual_bins = []
        for i in range(len(bins) - 1):
            actual_bins.append((bins[i] + bins[i + 1]) / 2.0)

        new_hist = []
        new_hist.append(hist[0] / 3.0)

        for i in range(1, hist.size - 1):
            new_hist.append((hist[i - 1] + hist[i] + hist[i + 1]) / 3.0)

        new_hist.append(hist[-1] / 3.0)

        background_noise = actual_bins[np.argmax(new_hist)] + 0.2 * noise_std

        return background_noise



