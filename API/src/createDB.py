from pymongo import MongoClient

mongodb = 'mongodb+srv://libary:ecyfAnTIz058VdrP@cluster0-uuoo5.gcp.mongodb.net/test?retryWrites=true&w=majority'
client = MongoClient(mongodb)

if True:
    client.drop_database('library')
else:
    db = client.library

    if db.list_collection_names() == []:
        # account
        try:
            db.account.insert_many([
                {'_id': 'duy', 'password': '123', 'role': 'admin', 'borrowed': []},
                {'_id': 'bui', 'password': '123', 'role': 'manager', 'borrowed': []},
                {'_id': 'hieu', 'password': '123', 'role': 'manager', 'borrowed': []},
            ])
        except Exception as e:
            print(e)

        # Author
        try:
            db.author.insert_many([
                
            ])
        except Exception as e:
            print(e)