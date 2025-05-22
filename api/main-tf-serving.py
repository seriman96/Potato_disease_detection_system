import json

from fastapi import FastAPI, File, UploadFile
import numpy as np
import uvicorn
from io import BytesIO
from PIL import Image
import tensorflow as tf
import keras
import requests

#################
# model = tf.keras.models.load_model("../saved_models/1")
# keras.experimental.export_saved_model(model, '../saved_models/')
############

##########################
# This file is used for versioning management in our project acheived through tf-serving technq
###################################

app = FastAPI()

endpoint = "http://localhost:8601/v1/models/potatoes_model:predict"
# this will use  latest version of this saved model,
# n we've to pass it this link to postman

# MODEL = tf.keras.models.load_model("../saved_models/1") # code line being replace by endpoint var
CLASS_Names = ["Early Blight", "Late Blight", "Healthy"]


@app.get("/ping")
async def ping():
    return "Hello, we're alive"


def read_file_as_image(data) -> np.ndarray:  # -> np.ndarray is a returned value
    # img = Image.open(data)
    image = np.array(Image.open(BytesIO(data)))  # turned an image into a numpy array
    # image = np.array(img)
    return image


@app.post("/predict")
async def predict_(
        file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    # byt = await file.read()

    img_batch = np.expand_dims(image, 0)  # adding one more dimension bcs we need a batch of img as our model is
    # expecting that

    # predictions = MODEL.predict(img_batch)
    # print(img_batch)  #

    # json_data = '{""instances"": {0}}'.format([img_batch.tolist()])  #
    '''data = {
        'instances': [
            {
                "input_image": image.tolist(),
            }
        ]
    }'''
    # json_data = '{"instances": img_batch.tolist()}' #--------Not working
    json_data = {"instances": img_batch.tolist()}

    # print(json_data)
    responses = requests.post(endpoint, json=json_data)
    # responses = requests.post(endpoint, json=json.dumps(data),)  # {"inputs": {"text": [img_batch.tolist()]}}
    prediction = np.array(responses.json()["predictions"][0])  # here we've a batch of only 1 img that's y 0

    predicted_class = CLASS_Names[np.argmax(prediction)]
    # np.argmax([0.00045, 0.99, .78]) as we've 3 classes n here argmax will return index 1
    confidence = np.max(prediction)
    # np.max([0.00045, 0.99, .78])  will return 0.99
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }


if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8501)
