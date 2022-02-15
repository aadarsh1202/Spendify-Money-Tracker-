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

class wallet(Resource):
            
    @cross_origin()
    def put(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_USER_TABLE_NAME')
            collection = db.collection(DB_NAME)
            
            
            user_data_parse = reqparse.RequestParser()

            user_data_parse.add_argument("wallet_name", required=True, type=str)
            user_data_parse.add_argument("currency_type", required=True, type=str)
            user_data_parse.add_argument("initial_balance", required=True, type=int)
            user_data_parse.add_argument("id", required=True, type=str)
  

            args = user_data_parse.parse_args()

            wallet_name = args["wallet_name"]
            currency_type = args["currency_type"]
            initial_balance = args["initial_balance"]
            id = args["id"]           

            user_ref = collection.document(id)
                          
            user_ref.update({'wallet_name' : wallet_name, 'currency_type' : currency_type, 'initial_balance' : initial_balance, 'wallet_present' : 1})
            
            result = {}
            docs = collection.get()
            for doc in docs:
                doc_data = doc.to_dict()
                if(doc.id == id):
                    print(doc.to_dict())
                    print(doc.id)
                    result.update(doc.to_dict())
                    result.update({'id' : doc.id})
                    
                    return jsonify({'message' : 'wallet created','data' : result})

        except Exception as e:
            print(e)
            return jsonify({'message' : 'error'})