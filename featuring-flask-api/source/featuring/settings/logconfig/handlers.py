import os
import logging
import errno


def mkdir(path):
    try:
        os.makedirs(path, exist_ok=True)  # Python>3.2
    except TypeError:
        try:
            os.makedirs(path)
        except OSError as exc:  # Python >2.5
            if exc.errno == errno.EEXIST and os.path.isdir(path):
                pass
            else:
                raise


class FileHandler(logging.FileHandler):
    """This logging file handler makes sure the target directory
        exists before creating the log file.
    """

    def __init__(self, filename, mode='a', encoding=None, delay=0):
        mkdir(os.path.dirname(filename))
        logging.FileHandler.__init__(self, filename, mode, encoding, delay)
