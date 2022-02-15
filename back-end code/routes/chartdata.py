from flask import jsonify
from flask_restful import Resource, Api, request, reqparse, abort
from flask_cors import cross_origin
import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv
load_dotenv()

PATH = os.getenv('SERVICE_ACCOUNT_JSON_PATH')
cred = credentials.Certificate(PATH)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)
db = firestore.client()


class viewtransactionsbydate(Resource):

    @cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_TRANSACTIONS_TABLE_NAME')
            collection = db.collection(DB_NAME)

            user_data_parse = reqparse.RequestParser()

            user_data_parse.add_argument("id", required=True, type=str)
            user_data_parse.add_argument("date", required=True, type=str)

            args = user_data_parse.parse_args()

            id = args["id"]
            date = args["date"]
            print(date)
            transactions_ref = collection.document(id)
            transactions = transactions_ref.get()
          
            transactions_dict = transactions.to_dict()
            data = {}
            if date in transactions_dict:
                data[date] = transactions_dict[date]
                return jsonify({'message': 'data found','data':data})
            else:
                return jsonify({'message': 'data not found'})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})



class chartdatabymonth(Resource):
    @cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_TRANSACTIONS_TABLE_NAME')
            collection = db.collection(DB_NAME)

            user_data_parse = reqparse.RequestParser()

            user_data_parse.add_argument("id", required=True, type=str)
            user_data_parse.add_argument("month", required=True, type=str)
            user_data_parse.add_argument("year", required=True, type=str)


            args = user_data_parse.parse_args()

            id = args["id"]
            month = args["month"]
            year = args["year"]

            dates = {}
            income = {}
            expense = {}
            chartData = {}

            transactions_ref = collection.document(id)
            transactions = transactions_ref.get()
          
            transactions_dict = transactions.to_dict()
            yeardates = transactions_dict.keys()
            print(dates)
            count = 0
            for date in yeardates:
                if month == date[5:7] and year == date[0:4]:
                    dates[count] = date
                    indexes = transactions_dict[date].keys()
                    date_data_dict = transactions_dict[date]
                    incomedata = 0
                    expensedata = 0
                    for index in indexes:
                        data_index_dict = date_data_dict[index]
                        print(data_index_dict['type'])
                        if(data_index_dict['type'] == "Income"):
                            incomedata = incomedata + data_index_dict['amount']
                        else:
                            expensedata = expensedata + data_index_dict['amount']
                    print(incomedata)
                    print(expensedata)
                    income[count] = incomedata
                    expense[count] = expensedata
                    count = count + 1
            chartData = {'dates':dates,'income':income,'expense':expense}       

            if(dates):
                return jsonify({'message': 'data found','data':chartData})
            else:
                return jsonify({'message': 'data not found'})


        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})


class chartdatabyyear(Resource):
    @cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_TRANSACTIONS_TABLE_NAME')
            collection = db.collection(DB_NAME)

            user_data_parse = reqparse.RequestParser()

            user_data_parse.add_argument("id", required=True, type=str)
            user_data_parse.add_argument("year", required=True, type=str)


            args = user_data_parse.parse_args()

            id = args["id"]
            year = args["year"]

            months = {0,0,0,0,0,0,0,0,0,0,0,0}
            income = {0,0,0,0,0,0,0,0,0,0,0,0}
            expense = {0,0,0,0,0,0,0,0,0,0,0,0}
            chartData = {}
            transactions_ref = collection.document(id)
            transactions = transactions_ref.get()
          
            transactions_dict = transactions.to_dict()
            dates = transactions_dict.keys()
            print(dates)
            yearData = {}
            for date in dates:
                print(date)
                if year == date[0:4]:
                    months[count] = date[5:7]
                    indexes = transactions_dict[date].keys()
                    date_data_dict = transactions_dict[date]
                    incomedata = 0
                    expensedata = 0
                    for index in indexes:
                        data_index_dict = date_data_dict[index]
                        print(data_index_dict['type'])
                        if(data_index_dict['type'] == "Income"):
                            incomedata = incomedata + data_index_dict['amount']
                        else:
                            expensedata = expensedata + data_index_dict['amount']
                    print(incomedata)
                    print(expensedata)
                    income[count] = incomedata
                    expense[count] = expensedata
                    count = count + 1
            chartData = {'dates':dates,'income':income,'expense':expense}  


        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})