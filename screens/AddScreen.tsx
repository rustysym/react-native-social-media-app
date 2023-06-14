import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {firestore, storage} from '../config/FirebaseConfig';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {Timestamp, addDoc, collection} from 'firebase/firestore';
import {AuthContext} from '../context/AuthContext';
import {UserContext} from '../context/UserContext';
import styles from '../config/Styles';
interface Types {
  text?: string;
  image?: any | null;
}
const AddScreen: React.FC<Types> = () => {
  const {user} = useContext(AuthContext);
  const {getUser, userData} = useContext(UserContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getUser();
  }, []);

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

  const takePhoto = async () => {
    ImagePicker.openCamera({
      cropping: true,
    })
      .then(image => {
        const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
        setImage(imageUri);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          return false;
        }
      });
  };

  const submitPost = async () => {
    const imageUrl = await uploadImage();

    addDoc(collection(firestore, 'posts'), {
      userId: user.uid,
      post: text,
      postImage: imageUrl,
      postTime: Timestamp.fromDate(new Date()),
      likes: null,
      comments: null,
    })
      .then(() => {
        console.log('post added');
        setText('');
        setImage(null);
      })
      .catch(e => {
        console.log(e);
      });
  };
  const uploadImage = async () => {
    if (image === null) {
      return null;
    }
    const uploadUri: any = image;
    const fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    let docRef = ref(storage, `images/${fileName}`);
    const img = await fetch(uploadUri);
    const bytes = await img.blob();

    setLoading(true);
    try {
      await uploadBytes(docRef, bytes);
      setLoading(false);
      Alert.alert('Post published');
      const url = await getDownloadURL(docRef);
      return url;
    } catch (e) {
      console.log(e);
    }
    setImage(null);
  };
  return (
    <SafeAreaView style={styles.flexContainer}>
      <View style={styles.addHeader}>
        <TouchableOpacity onPress={submitPost}>
          <Text style={styles.addText}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addInputContainer}>
        <Image
          source={{
            uri: userData
              ? userData.userImg ||
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
              : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
          }}
          style={styles.addAvatar}
        />
        <TextInput
          placeholder="Share your photos"
          placeholderTextColor={'lightgray'}
          onChange={() => text}
          onChangeText={setText}
          style={styles.addInputStyle}
        />
      </View>
      <View style={styles.addIconContainer}>
        <TouchableOpacity style={styles.addPhotoIcon} onPress={pickImage}>
          <Ionicons name="add" size={32} color={'gray'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addPhotoIcon} onPress={takePhoto}>
          <Ionicons name="md-camera" size={32} color={'gray'} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 2, alignSelf: 'center', marginTop: '20%'}}>
        {image !== null ? (
          <Image source={{uri: image}} style={{width: 300, height: 300}} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
export default AddScreen;

