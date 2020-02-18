import yaml
from scipy import signal
import csv
from classification import runScript as get_result

def main():
    Anthro_csv_file = "csv/Anthro.csv"
    Geo_csv_file = "csv/Geo.csv"
    Bio_csv_file = "csv/Bio.csv"

    csv_columns=['category','time']

    dict_data=get_result()

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