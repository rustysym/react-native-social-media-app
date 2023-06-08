import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {UserContext} from '../context/UserContext';
import {AuthContext} from '../context/AuthContext';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {firestore} from '../config/FirebaseConfig';
import {RouteProp, useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
/*type RootStackParamList = {
  UserScreen: { userId: string };
};

type Props = NativeStackScreenProps<RootStackParamList,'UserScreen'>;*/

const UserScreen = ({route}: any) => {
  const {signOut} = useContext(UserContext);
  const {user} = useContext(AuthContext);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const fetchPost = React.useCallback(async () => {
    try {
      setLoading(true);
      const list: any = [];
      const q = query(
        collection(firestore, 'posts'),
        where('userId', '==', route.params ? route.params.userId : user.uid),
        orderBy('postTime', 'desc'),
      );
      onSnapshot(q, snapshot => {
        snapshot.forEach(async doc => {
          const {post, postImage, postTime, userId} = doc.data();
          await Promise.all(
            list.push({
              key: doc.id,
              userId: userId,
              userName: user?.displayName,
              userImage:
                'https://blog.readyplayer.me/content/images/2021/04/IMG_0689.PNG',
              postTime: postTime,
              post: post,
              postImage: postImage,
              liked: false,
              likes: 0,
              comments: 0,
            }),
          );
        });
        setPosts(list);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }, [posts]);
  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <Image
          style={styles.userImg}
          source={{
            uri: 'https://blog.readyplayer.me/content/images/2021/04/IMG_0689.PNG',
          }}
        />
        <Text style={styles.userName}>Emre Kalfa</Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>@emreklf</Text>
        <View style={styles.userBtnWrapper}>
          {!user ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={()=>navigation.navigate('EditProfile')}>
                <Text style={styles.userBtnTxt}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => signOut()}>
                <Text style={styles.userBtnTxt}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{posts.length}</Text>
            <Text style={styles.userInfoSubTitle}>Posts</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>72m</Text>
            <Text style={styles.userInfoSubTitle}>Followers</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Following</Text>
          </View>
        </View>
        <View style={styles.postContainer}>
          {posts.map((item, idx) => (
            <View key={item.key}>
              <TouchableOpacity>
                <View>
                  {item.postImage !== null ? (
                    <Image
                      source={{uri: `${item.postImage}`}}
                      style={styles.postImages}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: '20%',
  },
  userImg: {
    height: 125,
    width: 125,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'black',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: 'black',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: 'black',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  postContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft:4,
    width: '90%',
    gap:8
  },
  postImages: {
    height: 100,
    width: 100,
  },
});
