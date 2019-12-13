from flask import Flask,render_template,make_response
import os
import json
app = Flask(__name__)

@app.route('/test_post/nn',methods=['GET'])
def hello_world():
    path = 'D:/Flask/static/img/'
    send = []
    for files in os.listdir(path):
        add = path+""+files+""
        for files2 in os.listdir(add):
            inf = ({files:[files2]})
            send.append(inf)
    key = json.dumps(send)
    res = make_response(key)
    res.headers['Access-Control-Allow-Origin'] = '*'
    print(key)

    return res

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()