import {
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Text,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  useCameraDevices,
  Camera,
  CameraPosition,
} from 'react-native-vision-camera';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import Styles from '../config/Styles';

interface ITypes {
  navigation: any;
}
const AddScreen: React.FC<ITypes> = ({navigation}) => {
  const isScreenFocused = useIsFocused();
  const [isFocused, setFocused] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [isTorch, setIsTorch] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<any>(null);
  const [deviceDir, setDeviceDir] = useState<CameraPosition>('back');

  const devices = useCameraDevices(deviceType);
  const camera = useRef<Camera>(null);
  const device = devices[deviceDir];
  useFocusEffect(
    useCallback(() => {
      setImage(null);
      setFocused(true);
      return () => {
        setFocused(false);
        setIsTorch(false);
      };
    }, []),
  );

  const permissionCheck = async () => {
    const camPermission = await Camera.requestCameraPermission();
    if (camPermission == 'denied') await Linking.openSettings();
  };
  const torchHandle = () => {
    setIsTorch(!isTorch);
    return () => setIsTorch(false);
  };
  const takePhoto = async () => {
    if (camera.current != null) {
      const photo = await camera.current?.takePhoto();
      setImage(photo.path);
    }
  };
  const pickImage = async () => {
    ImagePicker.openPicker({
      cropping: true,
    })
      .then(image => {
        const imageUri: any =
          Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };
  useEffect(() => {
    permissionCheck();
  }, []);
  if (device == null) return <ActivityIndicator color={'black'} />;
  if (image != null) {
    return (
      <SafeAreaView style={Styles.flexContainer}>
        {image != null ? (
          <View style={Styles.flexContainer}>
            <Image source={{uri: 'file://' + image}} style={Styles.flexContainer} />
            <TouchableOpacity
              onPress={() => navigation.navigate('EditPost', {param: image})}
              style={Styles.addEditButton}>
              <Text
                style={Styles.addEditButtonText}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
  return (
    <>
      {isFocused && (
        <SafeAreaView style={Styles.flexContainer}>
          <Camera
            ref={camera}
            photo={true}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isScreenFocused}
            enableZoomGesture={true}
            focusable={true}
            torch={isTorch ? 'on' : 'off'}
          />
          <TouchableOpacity onPress={takePhoto} style={Styles.addTakePhoto} />
          <TouchableOpacity onPress={pickImage} style={Styles.addPickImage}>
            <Ionicons name="images-outline" size={24} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity onPress={torchHandle} style={Styles.addFlashIcon}>
            {!isTorch ? (
              <Ionicons name="flash-off" size={24} color={'white'} />
            ) : (
              <Ionicons name="flash" size={24} color={'white'} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              deviceDir === 'back'
                ? setDeviceDir('front')
                : setDeviceDir('back')
            }
            style={Styles.addCameraChange}>
            <Ionicons name="camera-reverse-outline" size={24} color={'white'} />
          </TouchableOpacity>
        </SafeAreaView>
      )}
    </>
  );
};

export default AddScreen;
