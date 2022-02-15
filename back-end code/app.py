from flask import Flask
from flask_restful import Resource, Api, request
from flask_cors import CORS, cross_origin
from routes.users import users
from routes.addtransactions import addtransactions
from routes.viewtransactions import viewtransactionsbydate
from routes.viewtransactions import viewtransactionsbymonth
from routes.viewtransactions import viewtransactionsbyyear
from routes.chartdata import chartdatabymonth
from routes.chartdata import chartdatabyyear
import os
from dotenv import load_dotenv

from routes.wallet import wallet
load_dotenv()
# from routes.transactions import transactions

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

api = Api(app)

api.add_resource(users, '/users')
api.add_resource(wallet, '/wallet')
api.add_resource(addtransactions, '/addtransactions')
api.add_resource(viewtransactionsbydate, '/viewtransactionsbydate')
api.add_resource(viewtransactionsbymonth, '/viewtransactionsbymonth')
api.add_resource(viewtransactionsbyyear, '/viewtransactionsbyyear')
api.add_resource(chartdatabymonth, '/chartdatabymonth')
api.add_resource(chartdatabyyear, '/chartdatabyyear')



if __name__ == '__main__':
    if(os.getenv("enviornment_production") == "True"):
        app.run(host='0.0.0.0', port=80)
    else:
        app.run(debug=True)
