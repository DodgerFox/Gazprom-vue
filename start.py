# coding: utf-8 

from backend.bottle import run
from backend import app


if __name__=="__main__":
  run(app, host='127.0.0.1', port=23456, debug=True)