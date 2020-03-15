# coding: utf-8

from .bottle import Bottle, request, response, error
import sqlite3
import os


app = Bottle()
basedir = os.path.abspath(os.path.dirname(__file__))
dbpath = os.path.join(basedir, 'sqlite3.db')


def db_exec(new_query):
    con = sqlite3.connect(dbpath)
    con.row_factory = sqlite3.Row
    with con:
        cur = con.cursor()
        try:
            result = []
            rows = cur.execute(new_query)
            for row in rows:
                result.append(dict(row))
            return result
        except sqlite3.DatabaseError as err:
            return err


@app.error(404)
def error404(error):
    return 'Page not found, 404'


@app.hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'


@app.route('/api', method=['OPTIONS', 'GET'])
def api():
    response.content_type = 'application/json'
    return {"groups": "http://127.0.0.1:23456/api/groups",
            "metrics": "http://127.0.0.1:23456/api/metrics"}


@app.route('/api/groups', method=['OPTIONS', 'GET'])
def groups():
    response.content_type = 'application/json'
    sql = ''
    with open(os.path.join(basedir, 'groups.sql'), 'r') as file:
        sql = file.read()
    return dict(data= db_exec(sql))


@app.route('/api/metrics', method=['OPTIONS', 'GET'])
def metrics():
    response.content_type = 'application/json'
    sql = ''
    with open(os.path.join(basedir, 'metrics.sql'), 'r') as file:
        sql = file.read()
    return dict(data= db_exec(sql))


