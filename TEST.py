from flask import Flask,render_template,make_response
import os
import json
app = Flask(__name__)

@app.route('/test_post/nn',methods=['GET'])
def hello_world():
    path = 'D:/Flask/static/img/'
    send = []
    for files1 in os.listdir(path):
        add = path+""+files1+""
        for root,dirs,files in os.walk(add):
            files.sort(key=lambda x: str(x[:-4]))
            inf = ({files1:files})
            send.append(inf)
    key = json.dumps(send)
    res = make_response(key)
    res.headers['Access-Control-Allow-Origin'] = '*'
    #print(key)

    return res

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run()