# MUST INCLUDE -c CONFIG in the command line, i.e. gunicorn -c CONFIG twibon.wsgi:application
# https://docs.gunicorn.org/en/latest/settings.html#

import multiprocessing

bind = ["127.0.0.1:8000"]
workers = multiprocessing.cpu_count() * 2 + 1
# accesslog = "-"