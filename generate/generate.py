import csv


class Generate(object):

    def __init__(self, filepath):
        self.filepath = filepath

    def read_csv(self):
        return [*csv.DictReader(open(self.filepath))]
