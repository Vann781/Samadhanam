import pandas as pd
from pymongo import MongoClient
import bcrypt

# --- Step 1: Connect to your MongoDB instance ---
# Replace with your MongoDB connection string if it's different.
client = MongoClient('mongodb://localhost:4040/') 
db = client['municipality'] # Choose a name for your database
collection = db['districts']      # Choose a name for your collection

# --- Step 2: Define a function to hash passwords ---
# IMPORTANT: Storing plain-text passwords is a major security risk.
# This function takes a password and securely hashes it before storage.
def hash_password(password):
    # Generate a "salt" to add random data to the password before hashing
    salt = bcrypt.gensalt()
    # Hash the password with the salt
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password

# --- Step 3: Read the CSV file ---
# Make sure your CSV file is in the same directory as the script, or provide the full path.
try:
    df = pd.read_csv('your_file.csv')
except FileNotFoundError:
    print("Error: The CSV file was not found. Please check the file path.")
    exit()

# --- Step 4: Process the data and prepare it for MongoDB ---
documents_to_insert = []
for index, row in df.iterrows():
    # For each row in the CSV, create a dictionary (a MongoDB document)
    district_document = {
        'district_id': row['dist id'],
        'district_name': row['dist name'],
        'state_name': row['state name'],
        'state_id': row['state id'],
        
        # Add your new fields here
        # You should have a secure way to generate/assign these.
        # For this example, we'll create a default username and password.
        'official_username': f"official_{row['dist name'].lower().replace(' ', '_')}",
        'hashed_password': hash_password('DefaultPassword123'), # Hash a default password
        
        # This is your dynamic array for complaints, initialized as empty.
        'complaints': [] 
    }
    documents_to_insert.append(district_document)

# --- Step 5: Insert all the documents into the collection ---
if documents_to_insert:
    collection.insert_many(documents_to_insert)
    print(f"Successfully inserted {len(documents_to_insert)} documents into the '{collection.name}' collection.")
else:
    print("No data to insert.")