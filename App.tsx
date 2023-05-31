import { Image } from 'expo-image';
import * as MediaLibray from 'expo-media-library';
import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableHighlight } from 'react-native';

export default function App() {

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [permission, setPermission] = useState(null);
  //const [permissionResponse, requestPermission] = MediaLibray()

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === 'granted');
      await MediaLibray.requestPermissionsAsync();
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      // tirar uma foto
      const { uri } = await camera.takePictureAsync();
      console.log(uri);
      setImage(uri);
      await MediaLibray.saveToLibraryAsync(uri);

      // salvar a foto na galeria
      //await MediaLibray.saveToLibraryAsync(image);
    }
  }



  return (
    <View style={styles.container}>
      <Camera
        ref={(minhaCamera) => setCamera(minhaCamera)}
        style={styles.styleCamera}
        type={CameraType.back}
        ratio={'1:1'}
      />

      <Image
        style={styles.image}
        source={image}
        contentFit="cover"
        transition={1000} />

      <TouchableHighlight
        style={styles.button} onPress={() => { takePicture() }}>
        <Text
          style={{ color: '#fff', fontSize: 15 }}>
          Tirar foto
        </Text>
      </TouchableHighlight>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  styleCamera: {
    aspectRatio: 1,
    flex: 1
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#6676f1',
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    bottom: 50,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',

  }


});

