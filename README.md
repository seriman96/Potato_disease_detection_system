# 🥔 Potato Disease Detection System
A computer-vision project that uses a convolutional neural network (CNN) to classify potato leaf images into three categories: Early Blight, Late Blight, and Healthy. The repository brings together model training, a FastAPI prediction service, a React web interface, a React Native mobile client, and Google Cloud deployment code.
Project status: This repository contains several training and serving experiments. The setup instructions below describe the components present in the source code; they should be treated as a development guide rather than a guarantee that every deployment path is currently production-ready.

# Overview
Potato plants can be affected by diseases that appear as visible symptoms on their leaves. This project explores the use of deep learning to recognize three potato-leaf classes from an image.

The main workflow is:
1. A user selects or captures a potato leaf image.
2. The image is sent to a prediction endpoint.
3. A TensorFlow/Keras model produces class scores.
4. The service returns the predicted class and a confidence value.
5. The client displays the result.

# Supported classes
| Class | Description |
|---|---|
| Early Blight | Potato leaf image labelled as early blight |
| Late Blight | Potato leaf image labelled as late blight |
| Healthy | Potato leaf image labelled as healthy |

The class labels in the serving code are Early Blight, Late Blight, and Healthy.

# Main components
# 1. Model training
The training/ directory contains Jupyter notebooks and the PlantVillage potato-leaf image folders.

The primary notebook, training/training.ipynb, documents a CNN training workflow with:
- TensorFlow and Keras
- Three output classes
- 256 × 256 image dimensions
- Batch size of 32
- An 80% / 10% / 10% training, validation, and test split
- Random horizontal/vertical flips and rotation augmentation
- Convolutional and max-pooling layers
- ReLU hidden-layer activations and a softmax output layer
- Adam optimizer and sparse categorical cross-entropy loss
- Training configured for up to 50 epochs
A second notebook, training/training-using-image-data-generator.ipynb, explores an ImageDataGenerator-based pipeline with rescaling, rotation, and horizontal flipping.

The notebooks save model artifacts under saved_models/.

# 2. Prediction API
The api/ directory contains two FastAPI implementations:
- api/main.py loads the TensorFlow SavedModel from saved_models/1/.
- api/main-tf-serving.py forwards prediction requests to a TensorFlow Serving endpoint.
The direct FastAPI implementation exposes:
| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/ping` | Basic service health response |
| `POST` | `/predict` | Accept an uploaded image and return a prediction |n


A successful prediction response has this shape:
{
  "class": "Early Blight",
  "confidence": 0.98
}
The confidence value in this API implementation is a model score between 0 and 1. The web and mobile interfaces format confidence values for display.

# 3. Web application
The frontend/ directory contains a React application built with React 17 and Create React App.

The interface supports:
- Selecting or dragging and dropping a leaf image
- Previewing the selected image
- Sending the image to the prediction API
- Displaying the predicted class and confidence
The frontend uses Axios for HTTP requests, Material-UI for interface components, and material-ui-dropzone for image selection.

# 4. Mobile application
The mobile_app/ directory contains a React Native application.

The source code includes:
- Camera capture and photo-library selection
- Image preview
- Image upload to the prediction API
- Display of the predicted class and confidence
- A control to clear the current result
The mobile client reads its API address from the URL environment setting. Although a TensorFlow Lite React Native dependency is present, the current App.js prediction flow sends the selected image to the configured API.

# 5. Google Cloud deployment
The gcp/ directory contains a Google Cloud Function implementation and deployment notes.

The function in gcp/main.py:
1. Downloads the 2.h5 model artifact from a Google Cloud Storage bucket.
2. Loads the model when the function first needs it.
3. Reads an uploaded image and resizes it to 256 × 256.
4. Normalizes pixel values and runs inference.
5. Returns the predicted class and confidence.
The source currently specifies a bucket name in the Python file. Configure your own bucket and access permissions before attempting deployment. Do not publish credentials or private cloud configuration.

# Technology stack
| Area | Technologies |
|---|---|
| Machine learning | Python, TensorFlow, Keras |
| Image processing | NumPy, Pillow |
| Model development | Jupyter Notebook, Matplotlib |
| Prediction API | FastAPI, Uvicorn |
| Web client | React 17, Material-UI, Axios |
| Mobile client | React Native, React Native Image Picker, Axios |
| Model serving experiment | TensorFlow Serving |
| Cloud deployment | Google Cloud Functions, Google Cloud Storage |
| Model formats | TensorFlow SavedModel, HDF5 (`.h5`) |
# Repository structure
Potato_disease_detection_system/
│
├── api/
│   ├── main.py                    # FastAPI app loading SavedModel
│   ├── main-tf-serving.py         # FastAPI app forwarding to TF Serving
│   └── requirement.txt            # API Python dependencies
│
├── docker/                        # Docker-related notes and experiments
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env.example
│   └── package.json
│
├── gcp/
│   ├── main.py                    # Google Cloud Function prediction handler
│   ├── requirements.txt
│   └── steps_of_gcp_deployment.txt
│
├── mobile_app/
│   ├── android/
│   ├── ios/
│   ├── App.js
│   ├── .env.example
│   └── package.json
│
├── saved_models/
│   ├── 1/                         # TensorFlow SavedModel
│   └── 2.h5                       # Keras HDF5 model
│
└── training/
    ├── PlantVillage/              # Potato leaf image dataset
    ├── training.ipynb
    └── training-using-image-data-generator.ipynb

# Getting started
The repository has separate environments for the API, web client, and mobile client. Start with the API and web client if you want to run the browser-based workflow.

## Prerequisites
- Python environment compatible with the TensorFlow version in api/requirement.txt
- Node.js and npm
- A local copy of the repository, including the model artifact used by the selected API implementation
- Git

# 1. Clone the repository

git clone https://github.com/seriman96/Potato_disease_detection_system.git

cd Potato_disease_detection_system

# 2. Set up the prediction API

Create and activate a Python virtual environment, then install the API dependencies:

cd api

python -m venv .venv

On Windows PowerShell:

.venv\Scripts\Activate.ps1

On macOS or Linux:

source .venv/bin/activate

Install the dependencies:

pip install -r requirement.txt

The direct API in api/main.py loads the model using a path relative to the API working directory. From inside api/, start the service with:

uvicorn main:app --reload --host 127.0.0.1 --port 8000

API documentation is available at:

http://127.0.0.1:8000/docs

Health check:

http://127.0.0.1:8000/ping

Prediction endpoint:

POST http://127.0.0.1:8000/predict

Send a multipart/form-data request with an image field named file.

# 3. Set up the web application

Open a second terminal:

cd frontend

npm install

Create a local .env file based on .env.example and set the API URL:

REACT_APP_API_URL=http://127.0.0.1:8000/predict

Start the React development server:

npm start

The web application should be available at:

http://localhost:3000

Keep the API running while using the frontend.

# 4. Set up the mobile application

The mobile project requires the React Native development environment for the target platform. From the repository root:

cd mobile_app

npm install

Create a local .env file based on .env.example and configure the API address:

URL=http://YOUR_COMPUTER_LAN_IP:8000/predict

For a physical phone, use the computer's reachable LAN IP address rather than localhost or 0.0.0.0. Ensure the phone and development computer can reach each other and that the API server accepts connections on the required network interface.

Start Metro:

npm start

In another terminal, run the Android or iOS application:

npm run android

or:

npm run ios

Platform-specific native dependencies and permissions may require additional setup.

# Training the model
1. Open the training/ directory in Jupyter Notebook.
2. Install TensorFlow, NumPy, and Matplotlib in the notebook environment.
3. Make sure the PlantVillage directory is available at the path expected by the notebook.
4. Run the cells in training.ipynb in order.
5. Review the training and validation accuracy/loss plots and evaluate the model on the test split.
6. Save the trained model under saved_models/.
The notebook includes code for dataset partitioning, augmentation, model construction, training, evaluation, and sample predictions.

Important: The repository contains more than one model artifact and more than one preprocessing/serving path. Check that the selected model, input dimensions, pixel scaling, class order, and API implementation match before running inference. The training notebooks and serving scripts should not be assumed to share an identical preprocessing pipeline.

# Model evaluation
The training notebook evaluates the model on a held-out test dataset and plots training and validation accuracy and loss. It also displays sample predictions with their actual labels and confidence scores.

No verified final test accuracy, precision, recall, F1-score, or confusion matrix is documented in this repository's README. Those metrics should be added only after rerunning evaluation and recording the results.

# Deployment notes
The repository includes experiments and notes for TensorFlow Serving and Google Cloud Functions. These are alternative serving approaches, not steps that must all be run together.
- FastAPI: Loads the SavedModel locally.
- TensorFlow Serving: Exposes a model-serving endpoint that the alternate FastAPI app calls.
- Google Cloud Functions: Uses the handler in gcp/main.py and downloads a Keras model from Cloud Storage.
Cloud deployment requires a configured Google Cloud project, storage bucket, runtime dependencies, function permissions, and a correctly configured entry point. Review and update the deployment notes and hard-coded resource names before deploying.

# Current limitations and considerations
- The repository contains multiple model artifacts and serving implementations; their preprocessing assumptions need to be aligned.
- The direct FastAPI implementation does not explicitly resize or normalize the uploaded image before prediction. Confirm the model's expected input shape and preprocessing before relying on this endpoint.
- The web and mobile clients depend on a reachable prediction API.
- The mobile client currently sends images to the API; the presence of a TensorFlow Lite package alone does not mean on-device inference is implemented.
- A successful classification is not a substitute for expert agricultural diagnosis.
- Model performance metrics should be documented after reproducible evaluation.

# Possible future improvements
- Standardize image resizing and normalization across training, API, web, mobile, and cloud inference.
- Add a reproducible Python environment file and document tested dependency versions.
- Add API tests for valid images, invalid files, and model errors.
- Record class-wise precision, recall, F1-score, and a confusion matrix.
- Add prediction history and clearer error handling in the clients.
- Complete and document an on-device TensorFlow Lite inference path if desired.
- Add a reproducible Dockerfile and deployment configuration.
- Add screenshots or a short demonstration video of the web and mobile applications.

# Author
Seriman Doumbia

GitHub: @seriman96

Repository: Potato Disease Detection System


This project is an applied machine-learning and software engineering project combining image classification, API development, and client application integration.
