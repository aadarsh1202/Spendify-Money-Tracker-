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


class addtransactions(Resource):
    @cross_origin()
    def get(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_USER_TABLE_NAME')
            collection = db.collection(DB_NAME)

            # docs = collection.get()
            # result = {}
            # for doc in docs:
            #     print(doc.to_dict())
            #     print(doc.id)

            #     result[doc.id] = doc.to_dict()

            # return jsonify({'message': 'data sent', 'data': result})
            return jsonify({'message': 'data sent'})

            # return

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})

    @cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_TRANSACTIONS_TABLE_NAME')
            collection = db.collection(DB_NAME)

            user_data_parse = reqparse.RequestParser()

            user_data_parse.add_argument("id", required=True, type=str)
            user_data_parse.add_argument("walletname", required=True, type=str)
            user_data_parse.add_argument("type", required=True, type=str)
            user_data_parse.add_argument("date", required=True, type=str)
            user_data_parse.add_argument("category", required=True, type=str)
            user_data_parse.add_argument("note", required=True, type=str)
            user_data_parse.add_argument("amount", required=True, type=int)

            args = user_data_parse.parse_args()

            id = args["id"]
            walletname = args["walletname"]
            type = args["type"]
            date = args["date"]
            category = args["category"]
            note = args["note"]
            amount = args["amount"]

            docs = collection.get()
            for doc in docs:

                if(doc.id == id):
                    print(doc.to_dict())
                    doc_data = doc.to_dict()
                    print(doc_data)

                    user_ref = collection.document(id)
                    transaction_data = {}
                    if date in doc_data:
                        transaction_data = doc_data[date]
                        transaction_data[str(len(transaction_data.keys()))] = {'type': type,
                                                                               'category': category,
                                                                               'note': note,
                                                                               'amount': amount}
                        user_ref.update({date: transaction_data})
                        return jsonify({'message': 'same id same date'})
                    else:
                        transaction_data['0'] = {'type': type,
                                                 'category': category,
                                                 'note': note,
                                                 'amount': amount}
                        user_ref.update({date: transaction_data})

                        return jsonify({'message': 'same id new date'})

            data = {
                'walletname': walletname,
                date:    {
                    '0': {'type': type,
                          'category': category,
                          'note': note,
                          'amount': amount
                          }
                }
            }
            collection.document(id).set(data)

            return jsonify({'message': 'new id'})

        except Exception as e:
            print(e)
            return jsonify({'message': 'error'})
