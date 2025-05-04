from django.shortcuts import render
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response

from Accounts.models import symptoms_diseases, Predicted_Diseases
from Accounts.serializers import PredictionSerializer

import pandas as pd
import numpy as np
from django_pandas.io import read_frame
from imblearn.over_sampling import RandomOverSampler
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

import os
import csv
import pickle

# -----------------------------
# Insert CSV data into database
# -----------------------------
def insert_patient_data(request):
    data_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'Training.csv')
    
    with open(data_path, 'r') as file:
        reader = csv.reader(file)
        headers = next(reader)  # skip header

        with transaction.atomic():
            for row in reader:
                symptom_values = [int(value) for value in row[:-1]]
                prognosis = row[-1]

                field_names = [field.name for field in symptoms_diseases._meta.fields if field.name not in ['id', 'prognosis']]
                field_values = dict(zip(field_names, symptom_values))

                instance = symptoms_diseases.objects.create(prognosis=prognosis, **field_values)
                instance.save()

    return render(request, 'index.html')

# -----------------------------
# Scale & oversample dataset
# -----------------------------
def scale_dataset(dataframe, oversample=False):
    X = dataframe[dataframe.columns[:-1]].values
    y = dataframe[dataframe.columns[-1]].values

    scaler = StandardScaler()
    X = scaler.fit_transform(X)

    if oversample:
        ros = RandomOverSampler()
        X, y = ros.fit_resample(X, y)

    data = np.hstack((X, np.reshape(y, (-1, 1))))
    return data, X, y

# -----------------------------
# Train the model
# -----------------------------
svm_model = None

def train(request):
    global svm_model
    data = pd.DataFrame.from_records(symptoms_diseases.objects.all().values()).drop('id', axis=1)

    train_data, X, Y = scale_dataset(data, oversample=True)

    svm_model = SVC(probability=True)
    svm_model = svm_model.fit(X, Y)

    with open('model.pkl', 'wb') as f:
        pickle.dump(svm_model, f)

    return render(request, 'index.html')

# -----------------------------
# Predict API
# -----------------------------
@api_view()
def predict(request, symptoms=''):
    with open('model.pkl', 'rb') as f:
        svm_model = pickle.load(f)

    x = np.asarray(list(map(int, symptoms.strip().split(','))))  # Expecting comma-separated symptom values
    x = x.reshape(1, -1)

    scaler = StandardScaler()
    x_scaled = scaler.fit_transform(x)

    prediction = svm_model.predict(x_scaled)
    probas = svm_model.predict_proba(x_scaled)

    top5_indices = np.argsort(probas, axis=1)[:, -5:]
    top5_values = np.take_along_axis(probas, top5_indices, axis=1)
    top5_labels = svm_model.classes_[top5_indices]

    pd_labels = top5_labels[0][::-1].tolist()
    pd_probabilities = top5_values[0][::-1].astype(float).tolist()

    predicted_disease = pd_labels[0]

    # -----------------------------
    # Recommend specialist
    # -----------------------------
    Rheumatologist = ['Osteoarthristis', 'Arthritis']
    Cardiologist = ['Heart attack', 'Bronchial Asthma', 'Hypertension']
    ENT_specialist = ['(vertigo) Paroymsal Positional Vertigo', 'Hypothyroidism']
    Neurologist = ['Varicose veins', 'Paralysis (brain hemorrhage)', 'Migraine']
    Allergist_Immunologist = ['Allergy', 'Pneumonia', 'AIDS', 'Common Cold', 'Tuberculosis', 'Malaria']
    Urologist = ['Urinary tract infection', 'Dimorphic hemmorhoids']
    Dermatologist = ['Acne', 'Chicken pox', 'Fungal infection', 'Psoriasis', 'Impetigo']
    Gastroenterologist = [
        'Peptic ulcer diseae', 'GERD', 'Chronic cholestasis', 'Alcoholic hepatitis',
        'Jaundice', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis E'
    ]

    if predicted_disease in Rheumatologist:
        consult_doctor = "Rheumatologist"
    elif predicted_disease in Cardiologist:
        consult_doctor = "Cardiologist"
    elif predicted_disease in ENT_specialist:
        consult_doctor = "ENT Specialist"
    elif predicted_disease in Neurologist:
        consult_doctor = "Neurologist"
    elif predicted_disease in Allergist_Immunologist:
        consult_doctor = "Allergist/Immunologist"
    elif predicted_disease in Urologist:
        consult_doctor = "Urologist"
    elif predicted_disease in Dermatologist:
        consult_doctor = "Dermatologist"
    elif predicted_disease in Gastroenterologist:
        consult_doctor = "Gastroenterologist"
    else:
        consult_doctor = "Other Specialist"

    # -----------------------------
    # Save prediction to database
    # -----------------------------
    Predicted_Diseases.objects.all().delete()
    Predicted_Diseases.objects.create(
        diseases=pd_labels,
        diseases_prob=pd_probabilities,
        consult_doctor=consult_doctor
    )

    data = Predicted_Diseases.objects.all()
    serializer = PredictionSerializer(data, many=True)
    return Response(serializer.data)
