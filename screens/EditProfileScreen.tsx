import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import {doc, setDoc} from 'firebase/firestore';
import {firestore, storage} from '../config/FirebaseConfig';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {UserContext} from '../context/UserContext';
import styles from '../config/Styles';
const EditProfileScreen = () => {
  const {user} = useContext(AuthContext);
  const {userData, getUser, setUserData} = useContext(UserContext);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const [image, setImage] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [transferred, setTransferred] = useState<number>(0);

  const takePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imagePath);
      bottomSheetRef.current?.close();
    });
  };
  const choosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      const imagePath = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imagePath);
      bottomSheetRef.current?.close();
    });
  };
  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    setDoc(doc(firestore, 'users', user?.uid), {
      fName: userData.fName,
      lName: userData.lName,
      about: userData.about || null,
      phone: userData.phone || null,
      country: userData.country || null,
      city: userData.city || null,
      userImg: imgUrl,
    }).then(() => {
      console.log('User Updated!');
      Alert.alert(
        'Profile Updated!',
        'Your profile has been updated successfully.',
      );
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    let docRef = ref(storage, `profile/${fileName}`);
    const img = await fetch(uploadUri);
    const bytes = await img.blob();

    try {
      await uploadBytes(docRef, bytes);

      const url = await getDownloadURL(docRef);

      setUploading(false);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  return (
    <View style={[styles.flexContainer,{padding:24}]}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.panelTitle,{color:'black'}]}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableOpacity style={styles.panelButton} onPress={takePhoto}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton} onPress={choosePhoto}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bottomSheetRef.current?.close()}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: image
                  ? image
                  : userData
                  ? userData.userImg ||
                    'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                  : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
              }}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 50}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: 0.7,
                }}>
                <Ionicons name="camera-outline" size={25} />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={styles.userTitle}>
          {userData ? userData.fName : ''} {userData ? userData.lName : ''}
        </Text>
      </View>
      <ScrollView
        style={styles.inputsContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.fName : ''}
            onChangeText={txt => setUserData({...userData, fName: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.lName : ''}
            onChangeText={txt => setUserData({...userData, lName: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            placeholder="About Me"
            placeholderTextColor="#666666"
            autoCorrect={true}
            multiline={true}
            value={userData ? userData.about : ''}
            onChangeText={txt => setUserData({...userData, about: txt})}
            style={[styles.textInput, {height: 100}]}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="call-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Phone"
            keyboardType="number-pad"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userData ? userData.phone : ''}
            onChangeText={txt => setUserData({...userData, phone: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="globe-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={true}
            value={userData ? userData.country : ''}
            onChangeText={txt => setUserData({...userData, country: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="location-outline" color="#333333" size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={true}
            value={userData ? userData.city : ''}
            onChangeText={txt => setUserData({...userData, city: txt})}
            style={styles.textInput}
          />
        </View>
        <View style={styles.panelButtonContainer}>
          <TouchableOpacity
            style={[styles.panelButton, {width: '40%', height: 40}]}
            onPress={handleUpdate}>
            <Text style={[styles.panelTitle, {fontSize: 18}]}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

