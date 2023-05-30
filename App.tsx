import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';

export default function App() {

  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [permission, setPermission] = useState(null);

useEffect(() => {
  (async() => {
    const cameraStatus = await Camera.requestCameraPermissionsAsync();
    setPermission(cameraStatus.status === 'granted');
  })();
}, []);

  async function takePicture(){
    if(camera){
 // tirar uma foto
 const photo = await camera.takePictureAsync();
 console.log(photo.uri);
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
      />a
      <Button  title="Tirar Foto" onPress={()=>{takePicture}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
styleCamera:{
  aspectRatio:1,
  flex:1
}
  
});
