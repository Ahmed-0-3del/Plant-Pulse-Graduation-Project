

import tensorflow as tf
from tensorflow.keras import layers
from tensorflow.keras.callbacks import (
    EarlyStopping,
    ModelCheckpoint,
    ReduceLROnPlateau
)

from sklearn.utils.class_weight import compute_class_weight
import numpy as np

from utils.load_dataset import load_data
from models.cnn_model import build_cnn_model


# تحميل البيانات
train_ds, val_ds, class_names = load_data()

AUTOTUNE = tf.data.AUTOTUNE


# ========= Data Augmentation =========
data_augmentation = tf.keras.Sequential([
    # layers.RandomFlip("horizontal"),
    # layers.RandomRotation(0.2),
    # layers.RandomZoom(0.2),
    # layers.RandomContrast(0.2),
    # layers.RandomBrightness(0.2),
    # layers.RandomTranslation(0.1, 0.1),

    layers.RandomFlip("horizontal"),
    layers.RandomRotation(0.1),
    layers.RandomZoom(0.1),
])


train_ds = train_ds.map(
    lambda x, y: (data_augmentation(x, training=True), y),
    num_parallel_calls=AUTOTUNE
)

train_ds = train_ds.prefetch(AUTOTUNE)
val_ds = val_ds.prefetch(AUTOTUNE)


# ========= Build Model =========
model = build_cnn_model()


# ========= Class Weights =========
all_labels = np.concatenate([y.numpy() for x, y in train_ds], axis=0)

weights = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(all_labels),
    y=all_labels
)

class_weight = dict(enumerate(weights))

print("Class Weights:", class_weight)


# ========= Callbacks =========
callbacks = [

    EarlyStopping(
        monitor="val_loss",
        patience=8,
        restore_best_weights=True
    ),

    ReduceLROnPlateau(
        monitor="val_loss",
        factor=0.5,
        patience=3,
        verbose=1,
        min_lr=1e-6
    ),

    ModelCheckpoint(
        "saved_models/final_model_6classes2.h5",
        # monitor="val_accuracy",
      monitor="val_loss",
        save_best_only=True,
        verbose=1
    )
]


# ========= Training =========
history = model.fit(
    train_ds,
    validation_data=val_ds,
    epochs=80,
    callbacks=callbacks,
    class_weight=class_weight
)

print("Training Finished Successfully")







