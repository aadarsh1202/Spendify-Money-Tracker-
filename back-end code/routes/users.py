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

class users(Resource):
    @cross_origin()
    def get(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_USER_TABLE_NAME')
            collection = db.collection(DB_NAME)
            docs = collection.get()
            result = {}
            for doc in docs:
                print(doc.to_dict())
                print(doc.id)

                result[doc.id] = doc.to_dict()
            

            
            return jsonify({'message' : 'data sent','data' : result})              
            # return 
                
        except Exception as e:
            print(e)
            return jsonify({'message' : 'error'})
            
    @cross_origin()
    def post(self):
        try:
            DB_NAME = os.getenv('FIRESTORE_USER_TABLE_NAME')
            collection = db.collection(DB_NAME)
            
            
            user_data_parse = reqparse.RequestParser()

            user_data_parse.add_argument("platform", required=True, type=str)
            user_data_parse.add_argument("emailid", required=True, type=str)
            user_data_parse.add_argument("firstname", required=True, type=str)
            user_data_parse.add_argument("lastname", required=True, type=str)
            user_data_parse.add_argument("fullname", required=True, type=str)

            args = user_data_parse.parse_args()

            user_platform = args["platform"]
            user_emailid = args["emailid"]
            user_firstname = args["firstname"]
            user_lastname = args["lastname"]
            user_fullname = args["fullname"]
            

            docs = collection.get()
            result = {}
            for doc in docs:
                doc_data = doc.to_dict()
                if(doc_data['platform'] == user_platform and doc_data['emailid'] == user_emailid):
                    print(doc.to_dict())
                    print(doc.id)
                    result.update(doc.to_dict())
                    result.update({'id' : doc.id})
                    
                    return jsonify({'message' : 'user exists already','data' : result})

            data = {'platform' : user_platform,'emailid' : user_emailid, 'firstname' : user_firstname, 'lastname' : user_lastname, 'fullname' : user_fullname, 'wallet_present' : 0}

            # collection.add(request.json) It is also working but in this you have to use body of postman to send data
            collection.add(data)


            docs = collection.get()
            for doc in docs:
                doc_data = doc.to_dict()
                if(doc_data['platform'] == user_platform and doc_data['emailid'] == user_emailid):
                    print(doc.to_dict())
                    print(doc.id)
                    result.update(doc.to_dict())
                    result.update({'id' : doc.id})
                    
                    return jsonify({'message' : 'user added','data' : result})


            
            # return {'message' : 'user added'}                
            
                
        except Exception as e:
            print(e)
            return jsonify({'message' : 'error'})