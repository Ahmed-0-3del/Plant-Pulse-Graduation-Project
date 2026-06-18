

import tensorflow as tf
from tensorflow.keras import layers, models

def build_cnn_model():

    model = models.Sequential([

        # Input
        layers.Input(shape=(128, 128, 3)),

        # Normalize
        layers.Rescaling(1./255),

        # ========= Block 1 =========
        layers.Conv2D(64, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(),
        layers.Dropout(0.2),

        # ========= Block 2 =========
        layers.Conv2D(128, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(128, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(),
        layers.Dropout(0.25),

        # ========= Block 3 =========
        layers.Conv2D(256, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(256, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(),
        layers.Dropout(0.3),

        # ========= Block 4 =========
        layers.Conv2D(512, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.Conv2D(512, (3,3), padding='same', activation='relu'),
        layers.BatchNormalization(),
        layers.MaxPooling2D(),
        layers.Dropout(0.35),

        # Global Pooling
        layers.GlobalAveragePooling2D(),

        # Dense Layers
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),

        layers.Dense(256, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.4),

        # Output
        layers.Dense(6, activation='softmax')

    ])

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=0.0003),
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )

    return model


if __name__ == "__main__":
    model = build_cnn_model()
    model.summary()


