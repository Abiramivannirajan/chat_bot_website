from flask import Flask, request, jsonify
import pandas as pd
from sklearn.metrics.pairwise import euclidean_distances
from flask_cors import CORS
import os
import logging
import traceback

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

file_path = 'skill_assessment.csv'

if not os.path.exists(file_path):
    logging.error(f"File '{file_path}' not found.")
    raise FileNotFoundError(f"File '{file_path}' not found.")

df = pd.read_csv(file_path)

expected_columns = ["Q1", "Q2", "Q3", "Q4", "Q5", "Score"]
if not all(col in df.columns for col in expected_columns):
    logging.error("Dataset missing required columns.")
    raise KeyError("Dataset must contain columns: Q1, Q2, Q3, Q4, Q5, Score")

answer_columns = ["Q1", "Q2", "Q3", "Q4", "Q5"]
df[answer_columns] = df[answer_columns].applymap(lambda x: 1 if str(x).strip().lower() == "yes" else 0)

df['Score'] = pd.to_numeric(df['Score'], errors='coerce')
df = df.dropna(subset=['Score'])

logging.info("Dataset successfully loaded.")

@app.route('/predict', methods=['POST'])
def predict_skill():
    try:
        data = request.get_json()
        if not data or 'answers' not in data:
            logging.warning("Invalid request format.")
            return jsonify({'error': 'Invalid request format. Expected JSON with key "answers".'}), 400

        user_inputs = data['answers']
        logging.info(f"Received answers: {user_inputs}")

        if not isinstance(user_inputs, list) or len(user_inputs) != 5:
            logging.warning("Invalid input length.")
            return jsonify({'error': 'Provide exactly 5 Yes/No answers.'}), 400

        if not all(ans.lower() in ['yes', 'no'] for ans in user_inputs):
            logging.warning("Invalid answer values.")
            return jsonify({'error': "Invalid answers. Allowed values: 'Yes' or 'No'."}), 400

        user_vector = [[1 if ans.lower() == "yes" else 0 for ans in user_inputs]]

        distances = euclidean_distances(user_vector, df[answer_columns])
        best_match_index = distances.argmin()

        if best_match_index < 0 or best_match_index >= len(df):
            logging.error("No valid match found.")
            return jsonify({'error': 'Prediction failed. No close match found.'}), 500

        predicted_score = df.iloc[best_match_index]['Score']

        logging.info(f"Best match index: {best_match_index}, Predicted Score: {predicted_score}")

        return jsonify({'score': int(predicted_score)})

    except Exception as e:
        logging.error(f"Server Error: {traceback.format_exc()}")
        return jsonify({'error': 'Internal Server Error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
