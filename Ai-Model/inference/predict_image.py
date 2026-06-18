

import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from utils.load_dataset import load_data

# تحميل الموديل
model = tf.keras.models.load_model("saved_models/final_model_5classes2.h5")

# class names
_, _, class_names = load_data()
print("Class names:", class_names)

# تحميل الصورة
img_path = "t2.JPG"

img = image.load_img(img_path, target_size=(224, 224))  # نفس الموديل
img_array = image.img_to_array(img)

# ❌ متعملش normalization هنا
# model فيه Rescaling بالفعل

img_array = np.expand_dims(img_array, axis=0)

# prediction
predictions = model.predict(img_array)[0]

# أعلى كلاس
pred_index = np.argmax(predictions)
main_label = class_names[pred_index]
main_conf = predictions[pred_index] * 100

print(f"\nPrediction: {main_label}")
print(f"Confidence: {round(main_conf, 2)}%")

print("\nProbabilities:")
for i, prob in enumerate(predictions):
    print(f" - {class_names[i]}: {round(prob * 100, 2)}%")

# threshold
threshold = 60
if main_conf < threshold:
    print("\n⚠️ النتيجة غير مؤكدة، حاول تستخدم صورة أوضح.")
