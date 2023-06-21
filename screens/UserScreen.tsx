import {
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
import styles from '../config/Styles';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import {firestore} from '../config/FirebaseConfig';
import UserLoader from '../components/UserLoader';

interface Types {
  navigation: any;
  route: any;
}
const UserScreen: React.FC<Types> = ({navigation, route}) => {
  const {signOut} = useContext(UserContext);
  const {user} = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [userPosts, setUserPosts] = useState<Posts[]>();
  const [userData, setUserData] = useState<any>([]);

  const fetchUserPost = async () => {
    try {
      const q = query(
        collection(firestore, 'posts'),
        where(
          'userId',
          '==',
          route.params?.userId != null ? route.params?.userId : user.uid,
        ),
        orderBy('postTime', 'desc'),
      );
      onSnapshot(q, snapshot => {
        const list: any = [];
        snapshot.forEach(async doc => {
          const {post, postImage, postTime, userId} = doc.data();
          await Promise.all(
            list.push({
              id: doc.id,
              userId: userId,
              userName: user?.displayName,
              postTime: postTime,
              post: post,
              postImage: postImage,
              liked: false,
              likes: 0,
              comments: 0,
            }),
          );
          setUserPosts(list);
          setLoading(false);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    const refCol = collection(firestore, 'users');
    const refDoc = doc(
      refCol,
      route.params?.userId != null ? route.params?.userId : user.uid,
    );
    await getDoc(refDoc).then(snap => {
      if (snap.exists()) {
        setUserData(snap.data());
      }
    });
  };
  useEffect(() => {
    getUser();
    fetchUserPost();
  }, [route.params?.userId]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {loading ? (
        <UserLoader />
      ) : (
        <ScrollView
          style={styles.userContainer}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <Image
            style={styles.userImg}
            source={{
              uri: userData
                ? userData?.userImg ||
                  'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
                : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
            }}
          />
          <Text style={styles.userName}>
            {userData ? userData?.fName || 'Test' : 'Test'}{' '}
            {userData ? userData?.lName || 'User' : 'User'}
          </Text>
          <Text style={styles.userAbout}>
            {userData ? userData?.about || 'No details added.' : ''}
          </Text>
          <View style={styles.userBtnWrapper}>
            {route.params?.userId != null ? (
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
                <TouchableOpacity
                  style={styles.userBtn}
                  onPress={() => navigation.navigate('EditProfile')}>
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
              <Text style={styles.userInfoTitle}>
                {userPosts && userPosts?.length > 0 ? userPosts?.length : 0}
              </Text>
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
          <View style={styles.userPostContainer}>
            {userPosts &&
              userPosts.map((item: Posts) => (
                <View key={item?.id}>
                  <TouchableOpacity>
                    <View>
                      {item?.postImage !== null ? (
                        <Image
                          source={{uri: `${item?.postImage}`}}
                          style={styles.userPostImages}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default UserScreen;
