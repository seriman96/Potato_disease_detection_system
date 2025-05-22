from fastapi import FastAPI, File, UploadFile
import numpy as np
import uvicorn
from io import BytesIO
from PIL import Image
import tensorflow as tf
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

# React.js ui is running under localhost:3000
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# endpoint = "http://localhost:8601/v1/models/potatoes_model:predict"
# this will use  latest version of this saved model

# Global variable accessible everywhere in the program 
MODEL = tf.keras.models.load_model("../saved_models/1/")
CLASS_Names = ["Early Blight", "Late Blight", "Healthy"]


@app.get("/ping")
async def ping():
    return "Hello, we're alive"


def read_file_as_image(data) -> np.ndarray:  # -> np.ndarray is a returned value
    image = np.array(Image.open(BytesIO(data)))  # turned an image into a numpy array
    return image


@app.post("/predict")
async def predict_(
        file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    # byt = await file.read()

    img_batch = np.expand_dims(image, 0)  # adding one more dimension bcs we need a batch of img as our model is
    # expecting that. This will output [[256,256,3]] for multiple img usage as one batch 
    # containt 32 img mean 32 of [256,256,3]
    # print(img_batch.tolist())

    predictions = MODEL.predict(img_batch)
    predicted_class = CLASS_Names[np.argmax(predictions[0])]  # we've given 0 here bcs we've only one batch
    # np.argmax([0.00045, 0.99, .78]) as we've 3 classes n here argmax will return index 1 which has max value
    confidence = np.max(predictions[0])  # we've given 0 here bcs we've only one batch
    # np.max([0.00045, 0.99, .78])  will return 0.99
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
