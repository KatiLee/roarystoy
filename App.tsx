import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashMode, setFlashMode] = useState('off');
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === 'granted') {
        setStartCamera(true);
      } else {
        Alert.alert('Access denied');
      }
    })();
  }, []);

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === 'granted') {
      setStartCamera(true);
    } else {
      Alert.alert('Access denied');
    }
  };

  const __takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setPreviewVisible(true);
    setCapturedImage(photo);
  };

  const __retakePicture = () => {
    setCapturedImage(null);
    setPreviewVisible(false);
    __startCamera();
  };

  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };

  const __switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  return (
    <View style={styles.container}>
      {startCamera ? (
        <Camera
          style={styles.camera}
          type={cameraType}
          flashMode={flashMode}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={__switchCamera}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {cameraType === Camera.Constants.Type.back ? '?' : '?'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={__handleFlashMode}
              style={styles.button}
            >
              <Text style={styles.buttonText}>⚡️</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              onPress={__takePicture}
              style={styles.captureButton}
            />
          </View>
        </Camera>
      ) : previewVisible && capturedImage ? (
        <CameraPreview
          photo={capturedImage}
          savePhoto={() => {}}
          retakePicture={__retakePicture}
        />
      ) : (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            Open up App.tsx to start working on your app!
          </Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const CameraPreview = ({ photo, retakePicture }) => {
  return (
    <View style={styles.cameraPreviewContainer}>
      <ImageBackground
        source={{ uri: photo && photo.uri }}
        style={styles.cameraPreview}
      >
        <View style={styles.cameraPreviewButtons}>
          <TouchableOpacity onPress={retakePicture}>
            <AntDesign name="retweet" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 8,
  },
  buttonText: {
    fontSize: 24,
  },
  captureButtonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    width: '100%',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  messageContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 20,
    textAlign: 'center',
  },
  cameraPreviewContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  cameraPreview: {
    flex: 1,
  },
  cameraPreviewButtons: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
