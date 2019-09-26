from flask import Flask,url_for,redirect,render_template,request
import redis
app = Flask(__name__)


@app.route('/',methods=['GET','POST'])
def submit():
    if request.method == 'GET':
        return "hello"
    else:
        var_dragon1 = request.form.get('dragon1')
        var_dragon2 = request.form.get('dragon2')


        r = redis.Redis(host= '192.168.83.35',port = 6379,db = 4)
        r.hmset("activity:15100:951:62891888",{var_dragon1:var_dragon2})

        return "OK"

if __name__ == '__main__':
    app.run(debug=True)