
import tensorflow as tf
import numpy as np
from sklearn.metrics import classification_report, confusion_matrix
from utils.load_dataset import load_data

# تحميل بيانات الـ Validation
_, val_ds, class_names = load_data()

print("Classes:", class_names)

# تحميل الموديل
model = tf.keras.models.load_model("saved_models/final_model_5classes2.h5")
y_true = []
y_pred = []

# المرور على بيانات التقييم
for images, labels in val_ds:

    predictions = model.predict(images, verbose=0)

    # أعلى احتمال = الكلاس المتوقع
    predicted_classes = np.argmax(predictions, axis=1)

    y_true.extend(labels.numpy())
    y_pred.extend(predicted_classes)

# تحويل لـ numpy array
y_true = np.array(y_true)
y_pred = np.array(y_pred)

# التقرير الكامل
print("\n================ Classification Report ================\n")
print(classification_report(y_true, y_pred, target_names=class_names))

# Confusion Matrix
print("\n================ Confusion Matrix ================\n")
print(confusion_matrix(y_true, y_pred))

# Accuracy النهائي
accuracy = np.mean(y_true == y_pred) * 100
print(f"\nValidation Accuracy: {accuracy:.2f}%")