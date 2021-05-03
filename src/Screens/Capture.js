import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ToastAndroid,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {GlobalContext} from '../context/context';

export default function Capture(props) {
  const [visible, setVisible] = useState(false);
  const [toggleCam, setToggleCam] = useState(false);
  const [imageMode, setImageMode] = useState(true);
  const [imageUri, setImageUri] = useState([]);
  const {addPhoto} = useContext(GlobalContext);

  const ref = React.createRef();

  const takePicture = async () => {
    if (ref.current) {
      const options = {quality: 1.5};
      const data = await ref.current.takePictureAsync(options);
      addPhoto({uri: data.uri});
      setImageUri([...imageUri, {key: data.uri}]);
      alert('Image Saved');
      setToggleCam(false);
    }
  };

  return (
    <>
      {toggleCam ? (
        <View style={{flex: 1}}>
          <RNCamera
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
            ref={ref}
            type={RNCamera.Constants.Type.back}
            captureAudio={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.photoVideoSwitch}
                onPress={() => {
                  setImageMode(true);
                  console.log('pressP');
                }}>
                <Text style={{fontFamily: 'aerial', fontSize: 18}}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.photoVideoSwitch}
                onPress={() => {
                  setImageMode(false);
                  console.log('pressedV');
                }}>
                <Text style={{fontFamily: 'aerial', fontSize: 18}}>Video</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: 100,
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{flexDirection: 'row', backgroundColor: 'transparent'}}>
                {imageMode ? (
                  <TouchableOpacity onPress={takePicture}>
                    <Text style={styles.capture}>[Photo]</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={takePicture}>
                    <Text style={styles.capture}>[Video]</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </RNCamera>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <Text style={{fontSize: 22, fontFamily: 'aerial'}}>
              Media App By Shubham Nishad
            </Text>
          </View>
          <View style={styles.botContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={() => setVisible(true)}>
              <Text style={{fontFamily: 'aerial', fontSize: 18}}>
                Capture / View Media
              </Text>
            </TouchableOpacity>
          </View>

          {visible ? (
            <Modal animationType="slide" transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={[styles.button, styles.uploadButton]}
                    onPress={() => {
                      setToggleCam(true);
                      setVisible(false);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'aerial',
                        fontSize: 15,
                      }}>
                      Capture Media
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.uploadButton]}
                    onPress={() => {
                      props.navigation.navigate('Gallery');
                      setVisible(!visible);
                    }}>
                    <Text
                      style={{
                        fontFamily: 'aerial',
                        fontSize: 15,
                      }}>
                      Open Gallery
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.uploadButton]}
                    onPress={() => setVisible(!visible)}>
                    <Text
                      style={{
                        fontFamily: 'aerial',
                        fontSize: 15,
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          ) : null}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  captureButton: {
    backgroundColor: 'skyblue',
    width: '60%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: `#E5EBF0`,
    borderRadius: 60,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#F7812E',
    borderColor: '#F7812E',
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  uploadButton: {
    backgroundColor: 'white',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  topContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
  },
  botContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    margin: 5,
    marginBottom: 10,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40,
  },
  photoVideoSwitch: {
    width: 70,
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },
});
