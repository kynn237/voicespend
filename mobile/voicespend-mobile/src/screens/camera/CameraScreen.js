// CameraScreen.js — OCR ticket de caisse
import { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Accès caméra requis</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Autoriser la caméra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setScanned(true);
      // TODO: envoyer la photo au backend pour OCR Google Vision
      console.log('Photo prise:', photo.uri);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={cameraRef}>
        {/* Cadre de visée */}
        <View style={styles.overlay}>
          <View style={styles.frame} />
          <Text style={styles.frameHint}>
            Cadrez votre ticket ou budget
          </Text>
        </View>
      </CameraView>

      <TouchableOpacity style={styles.captureBtn} onPress={takePicture}>
        <Text style={styles.captureIcon}>📷</Text>
      </TouchableOpacity>

      {scanned && (
        <Text style={styles.scannedMsg}>
          Photo envoyée — extraction en cours...
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f',
    alignItems: 'center', justifyContent: 'center' },
  camera: { width: '100%', height: '70%' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: {
    width: 250, height: 150,
    borderWidth: 2, borderColor: '#6c63ff',
    borderRadius: 8,
  },
  frameHint: { color: '#fff', marginTop: 12, fontSize: 13 },
  captureBtn: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: '#6c63ff',
    alignItems: 'center', justifyContent: 'center',
    marginTop: 16,
  },
  captureIcon: { fontSize: 30 },
  scannedMsg: { color: '#3CC89A', marginTop: 12, fontSize: 13 },
  title: { color: '#fff', fontSize: 18, fontWeight: '600' },
  btn: { backgroundColor: '#6c63ff', padding: 14,
    borderRadius: 10, marginTop: 20 },
  btnText: { color: '#fff', fontWeight: '600' },
});