# 🥔 Potato Disease Detection System

A deep learning-based application for detecting potato leaf diseases using Convolutional Neural Networks (CNN). The system classifies potato leaf images into three categories: **Early Blight, Late Blight, and Healthy**.

The project combines machine learning, computer vision, backend API development, and web and mobile application integration to provide an accessible disease classification solution.

## 📌 Project Overview

Potato crops are susceptible to several diseases that can negatively affect agricultural productivity. Early identification of visible symptoms can help farmers and agricultural professionals make more informed decisions.

This project explores the use of deep learning and image classification to identify potato leaf conditions from images.

The application integrates a trained TensorFlow/Keras model with a FastAPI backend, a React web application, and a React Native mobile application.

## 🎯 Main Objectives

- Develop a CNN model capable of classifying potato leaf images.
- Train and evaluate the model using the PlantVillage dataset.
- Build an API to serve model predictions.
- Develop a web interface for uploading and analyzing leaf images.
- Provide a mobile interface for capturing or selecting images.
- Explore cloud deployment using Google Cloud services.

## 🌱 Disease Classification

The model identifies three categories:

**1. Early Blight**

Identifies potato leaves classified as affected by Early Blight.

**2. Late Blight**

Identifies potato leaves classified as affected by Late Blight.

**3. Healthy**

Identifies potato leaves classified as healthy.

## ✨ Key Features

- Deep learning-based image classification using CNN.
- Training and experimentation with TensorFlow and Keras.
- Image augmentation to improve model training.
- REST API developed with FastAPI.
- Web application developed with React.
- Mobile application developed with React Native.
- Image upload and camera capture functionality.
- Prediction results with confidence scores.
- Alternative model-serving implementation using TensorFlow Serving.
- Google Cloud Functions integration for cloud-based prediction.

## 🧠 Machine Learning Model

The project uses a Convolutional Neural Network (CNN) implemented with TensorFlow/Keras.

The main training notebook includes:

- Image dimensions: 256 × 256 pixels.
- Batch size: 32.
- Three classification categories.
- Training, validation, and testing dataset splits.
- Image augmentation, including rotation and flipping.
- Convolutional and max-pooling layers.
- ReLU activation functions.
- Softmax output layer.
- Adam optimizer.
- Sparse categorical cross-entropy loss.
- Training configured for up to 50 epochs.

The repository also contains an alternative training notebook using Keras ImageDataGenerator.

## 🏗️ System Architecture

The application is organized into several independent components:

**1. Training Module**

Responsible for dataset preparation, image preprocessing, CNN construction, model training, and evaluation.

**2. Prediction API**

Built with FastAPI, it receives uploaded images, processes prediction requests, and returns classification results.

**3. Web Application**

Built with React, it allows users to upload potato leaf images and visualize prediction results.

**4. Mobile Application**

Built with React Native, it allows users to capture images using their device camera or select images from their gallery.

**5. Cloud Deployment**

The project includes Google Cloud Functions and Google Cloud Storage integration for cloud-based model inference.

### Prediction Workflow

1. The user uploads or captures a potato leaf image.
2. The image is submitted to the prediction API.
3. The trained CNN model processes the image.
4. The model generates classification scores.
5. The API returns the predicted category and confidence value.
6. The web or mobile application displays the result.

## 🛠️ Technology Stack

**Machine Learning and Data Science**
- Python
- TensorFlow
- Keras
- NumPy
- Matplotlib
- Jupyter Notebook

**Backend and API**
- FastAPI
- Uvicorn
- Python

**Web Development**
- React
- JavaScript
- Material-UI
- Axios

**Mobile Development**
- React Native
- React Native Image Picker
- Axios

**Cloud and Model Deployment**
- Google Cloud Functions
- Google Cloud Storage
- TensorFlow Serving
- Docker-related deployment experiments

**Dataset**
- PlantVillage Dataset

## 📂 Project Structure

```text
Potato_disease_detection_system/
│
├── api/
│   ├── main.py
│   ├── main-tf-serving.py
│   └── requirement.txt
│
├── docker/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── gcp/
│   ├── main.py
│   ├── requirements.txt
│   └── steps_of_gcp_deployment.txt
│
├── mobile_app/
│   ├── android/
│   ├── ios/
│   ├── App.js
│   └── package.json
│
├── saved_models/
│   ├── 1/
│   └── 2.h5
│
└── training/
    ├── PlantVillage/
    ├── training.ipynb
    └── training-using-image-data-generator.ipynb
```

## 🚀 Installation and Setup

### Prerequisites

Make sure you have installed:

- Python
- Node.js and npm
- MongoDB is not required for this project.
- Git

You will also need the appropriate Python and TensorFlow versions for the dependencies specified in the repository.

### 1. Clone the Repository

```bash
git clone https://github.com/seriman96/Potato_disease_detection_system.git

cd Potato_disease_detection_system
```

### 2. Configure the Backend API

Navigate to the API directory:

```bash
cd api
```

Create and activate a Python virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```bash
.venv\Scripts\activate
```

On Linux or macOS:

```bash
source .venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirement.txt
```

Start the FastAPI application:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

The API will be available at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Run the Web Application

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Configure the API endpoint in your local environment file, based on `.env.example`:

```env
REACT_APP_API_URL=http://127.0.0.1:8000/predict
```

Start the React application:

```bash
npm start
```

The web application will be available at:

```text
http://localhost:3000
```

Make sure the FastAPI backend is running before submitting images.

### 4. Run the Mobile Application

Navigate to the mobile application directory:

```bash
cd mobile_app
```

Install dependencies:

```bash
npm install
```

Configure the API address in your local environment file:

```env
URL=http://YOUR_COMPUTER_LAN_IP:8000/predict
```

Replace `YOUR_COMPUTER_LAN_IP` with your computer's accessible local network IP address.

Start the React Native development server:

```bash
npm start
```

For Android:

```bash
npm run android
```

For iOS:

```bash
npm run ios
```

Additional native development environment configuration may be required.

## 📊 Model Training and Evaluation

The training notebooks are located in the `training/` directory.

They cover:

- Dataset preparation.
- Image preprocessing.
- Data augmentation.
- CNN architecture construction.
- Model training.
- Training and validation performance visualization.
- Model evaluation.
- Sample image predictions.

The trained models are stored in the `saved_models/` directory.

**Note:** Model performance metrics should be obtained by running the evaluation notebook. No final verified accuracy or classification metrics are claimed in this documentation.

## ☁️ Deployment

The repository explores different model-serving and deployment approaches:

- FastAPI for local prediction services.
- TensorFlow Serving for model-serving integration.
- Google Cloud Functions for cloud-based inference.
- Google Cloud Storage for model artifact storage.
- Docker-related deployment experiments.

Refer to the `gcp/steps_of_gcp_deployment.txt` file for the Google Cloud deployment notes.

Cloud deployment requires appropriate project configuration, storage permissions, and environment setup.

## ⚠️ Limitations

- Model predictions depend on the quality and characteristics of input images.
- Different model-serving implementations may require consistent image preprocessing.
- Model performance should be evaluated on independent test data.
- Predictions should not be considered a replacement for professional agricultural diagnosis.
- The web and mobile applications require a reachable prediction API.

## 🔮 Future Improvements

- Improve model accuracy and generalization.
- Add detailed classification reports and confusion matrices.
- Standardize preprocessing across all application components.
- Improve API testing and error handling.
- Implement a fully documented TensorFlow Lite mobile inference workflow.
- Enhance the web and mobile user interfaces.
- Add Docker-based reproducible deployment.
- Improve cloud deployment automation.
- Introduce prediction history and reporting features.

## 👨‍💻 Author

**Seriman Doumbia**

GitHub: [@seriman96](https://github.com/seriman96)

Project Repository: [Potato Disease Detection System](https://github.com/seriman96/Potato_disease_detection_system)

---

*This project demonstrates the practical application of deep learning and computer vision to agricultural challenges, combining model development with backend, web, mobile, and cloud technologies.*
