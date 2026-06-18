
import tensorflow as tf

IMG_SIZE = (128, 128)
BATCH_SIZE = 32
AUTOTUNE = tf.data.AUTOTUNE


def load_data():

    # ======================
    # Train Dataset
    # ======================
    train_ds = tf.keras.utils.image_dataset_from_directory(
        "dataset",
        validation_split=0.2,
        subset="training",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        color_mode="rgb"
    )

    # ======================
    # Validation Dataset
    # ======================
    val_ds = tf.keras.utils.image_dataset_from_directory(
        "dataset",
        validation_split=0.2,
        subset="validation",
        seed=123,
        image_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        color_mode="rgb"
    )

    # class names
    class_names = train_ds.class_names

    print("Classes:", class_names)

    # ======================
    # Performance Optimization
    # ======================
    train_ds = train_ds.cache().shuffle(1000).prefetch(buffer_size=AUTOTUNE)
    val_ds = val_ds.cache().prefetch(buffer_size=AUTOTUNE)

    return train_ds, val_ds, class_names


if __name__ == "__main__":
    train_ds, val_ds, class_names = load_data()


