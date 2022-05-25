# MUST INCLUDE -c CONFIG in the command line, i.e. gunicorn -c CONFIG twibon.wsgi:application
# https://docs.gunicorn.org/en/latest/settings.html#

import multiprocessing
from twibon.development_status import DEVELOPMENT_STATUS

user = "aksa"
group = "aksa"
wsgi_app = "twibon.wsgi:application"
loglevel = "debug"
bind = ["0.0.0.0:8080"]
reload = True
workers = multiprocessing.cpu_count() * 2 + 1
accesslog = errorlog = "/var/log/gunicorn/dev.log"
capture_output = True
pidfile = "/var/run/gunicorn/dev.pid"

if DEVELOPMENT_STATUS == True:
    daemon = False
else:
    daemon =  True