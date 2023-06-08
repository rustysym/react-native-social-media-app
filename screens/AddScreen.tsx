import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PostContext} from '../context/PostContext';
import ImagePicker from 'react-native-image-crop-picker';
import {firestore, storage} from '../config/FirebaseConfig';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {Timestamp, addDoc, collection, doc} from 'firebase/firestore';
import {AuthContext} from '../context/AuthContext';

interface Types {
  text?: string;
  image?: any | null;
}
const AddScreen: React.FC<Types> = () => {
  const {writeUserData} = useContext(PostContext);
  const {user} = useContext(AuthContext);
  const [text, setText] = useState('');
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
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
      })
      .catch(e => {
        console.log(e);
      });
  };
  const uploadImage = async () => {
    if(image === null){
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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={submitPost}>
          <Text style={styles.text}>Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Image
          source={{
            uri: 'https://blog.readyplayer.me/content/images/2021/04/IMG_0689.PNG',
          }}
          style={styles.avatar}
        />
        <TextInput
          placeholder="Share your pets picture"
          placeholderTextColor={'lightgray'}
          onChange={() => text}
          onChangeText={setText}
          style={styles.inputStyle}
        />
      </View>
      <TouchableOpacity style={styles.photoIcon} onPress={pickImage}>
        <Ionicons name="md-camera" size={32} color={'gray'} />
      </TouchableOpacity>
      <View style={{flex: 2, alignSelf: 'center', marginTop: '20%'}}>
        {image !== null ? (
          <Image source={{uri: image}} style={{width: 300, height: 300}} />
        ) : null}
      </View>
    </SafeAreaView>
  );
};
export default AddScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 32,
    paddingTop: '15%',
  },
  inputContainer: {
    flexDirection: 'row',
    margin: 32,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'GeneralSans-Bold',
  },
  avatar: {
    borderRadius: 24,
    height: 48,
    width: 48,
    marginRight: 16,
  },
  photoIcon: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
  inputStyle: {
    color: 'black',
  },
});
