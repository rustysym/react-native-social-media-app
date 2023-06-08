import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Image} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import moment from 'moment';
import { PostContext } from '../context/PostContext';

var width = Dimensions.get('window').width;
const HomeScreen = () => {
  const [avatars, setAvatars] = useState<Api[]>([]);
  
  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  const {user} = useContext(AuthContext);
  const {fetchPost,setLoading,loading,posts,deletePost,isOpen,setIsOpen,deleted,setDeleted} = useContext(PostContext)
  const avatarApi = async () => {
    try {
      const data = await fetch(apiUrl, {
        method: 'GET',
      });
      const jsonData = await data.json();
      setAvatars(jsonData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPost();
    avatarApi();
    setLoading(false)
  }, []);
  useEffect(()=>{
    fetchPost();
    setDeleted(false)
  },[deleted])
  const storyFirstItem = () => {
    return (
      <View>
        <Image
          style={styles.avatarImages}
          source={{
            uri: 'https://blog.readyplayer.me/content/images/2021/04/IMG_0689.PNG',
          }}
        />
        <Text style={{color: '#1D1A20', textAlign: 'center'}}>You</Text>
      </View>
    );
  };
  const handleDelete = (postId:any) =>{
    Alert.alert("Delete Post","Are you sure ?",
    [
      {
        text:'Cancel',
        onPress: () => setIsOpen(false),
        style: 'cancel'
      },
      {
        text:'Confirm',
        onPress: () => deletePost(postId),
        
      },
    ],{cancelable : false})
  }
 

  const storyComponent = () => {
    return (
      <FlatList
        horizontal={true}
        data={avatars}
        ListHeaderComponent={storyFirstItem}
        style={styles.avatarList}
        scrollEnabled={true}
        initialNumToRender={7}
        showsHorizontalScrollIndicator={false}
        keyExtractor={key => key.id}
        renderItem={({item}) => (
          <View>
            <View>
              <Image style={styles.avatarImages} source={{uri: item.url}} />
              <Text style={{color: '#1D1A20', textAlign: 'center'}}>
                Friends
              </Text>
            </View>
          </View>
        )}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.petText}>Rusty.</Text>
        <TouchableOpacity>
          <Icon name={'mail-unread-outline'} color={'#1D1A20'} size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.latestText}>The Latest</Text>
      </View>
      <View></View>
      {loading ? (
        <ActivityIndicator
          color={'black'}
          style={{flex: 1, alignSelf: 'center'}}
        />
      ) : 
        <FlatList
          data={posts}
          keyExtractor={(item,index) => index.toString()}
          style={styles.postContainer}
          initialNumToRender={6}
          ListHeaderComponent={storyComponent}
          contentContainerStyle={{paddingBottom:5}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}:{item: Posts}) => (
            
            <View key={item.index}>

              <View style={styles.postTopContainer} >
                <Image
                  source={{
                    uri: 'https://blog.readyplayer.me/content/images/2021/04/IMG_0689.PNG',
                  }}
                  style={styles.avatarImages}
                />
                <View style={styles.postHeaderTextContainer}>
                  <View style={styles.textInnerContainer}>
                    <Text style={styles.userNameText}>{item.userName}</Text>
                    <Text style={styles.postCreateText}>
                      created a new post
                    </Text>
                  </View>
                  <Text style={styles.createTimeText}>
                    {moment(item.postTime.toDate()).fromNow()}
                  </Text>
                </View>
                <View style={styles.iconContainer}>
                  <TouchableOpacity
                    style={styles.iconStyle}
                    onPress={() =>
                      !isOpen ? setIsOpen(true) : setIsOpen(false)
                    }>
                    <Entypo
                      name={'dots-three-horizontal'}
                      color={'gray'}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
                {isOpen ? (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: '#f1f1f1',
                      borderRadius: 20,
                      width: 100,
                      height: 100,
                      right: 15,
                      zIndex: 20,
                      marginTop: 50,
                      elevation: Platform.OS === 'android' ? 50 : 0,
                    }}>
                    {user.uid == item.userId ? (
                      <TouchableOpacity
                        style={{backgroundColor: '#f0f0f0', borderRadius: 20}}
                        onPress={() => handleDelete(item.id)}>
                        <Text
                          style={{
                            color: 'red',
                            textAlign: 'center',
                            marginTop: 5,
                          }}>
                          Delete
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null}
              </View>
              <View style={{alignSelf: 'center', marginTop: 12, zIndex: -1}}>
                {item.postImage !== null ? (
                  <Image
                    source={{
                      uri: item.postImage,
                    }}
                    style={{borderRadius: 20, width: width * 0.9, height: 350}}
                  />
                ) : null}
              </View>
              <View style={styles.postText}>
                <Text style={{color: 'black'}}>{item.post}</Text>
              </View>
              <View style={styles.postBottom}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <Icon name={'paw-outline'} color={'gray'} size={24} />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'gray',
                      alignSelf: 'center',
                      paddingLeft: 12,
                    }}>
                    {item.likes}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity>
                    <Icon
                      name={'chatbubble-outline'}
                      color={'gray'}
                      size={24}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      color: 'gray',
                      alignSelf: 'center',
                      paddingLeft: 12,
                    }}>
                    {item.comments}
                  </Text>
                </View>
                <TouchableOpacity>
                  <Icon name={'paper-plane-outline'} color={'gray'} size={24} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      }
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: '4%',
  },
  postContainer: {
    flex: 2,
    display: 'flex',
    height: '100%',
  },
  topSection: {
    paddingHorizontal: '8%',
    paddingTop: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  petText: {
    color: '#1D1A20',
    fontSize: 24,
    fontFamily: 'GeneralSans-Bold',
  },
  latestText: {
    paddingHorizontal: '8%',
    color: '#1D1A20',
    fontSize: 34,
    fontFamily: 'GeneralSans-Bold',
  },
  avatarList: {
    marginLeft: '5%',
    marginTop: '6%',
    flexDirection: 'row',
    display: 'flex',
    paddingBottom: '10%',
  },
  avatarImages: {
    borderRadius: 50,
    marginHorizontal: 5,
    height: 68,
    width: 68,
  },
  userNameText: {
    fontWeight: '600',
    color: '#1D1A20',
  },
  postTopContainer: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    
  },
  postHeaderTextContainer: {
    flexDirection: 'column',
    paddingTop: 12,
    paddingLeft: 6,
  },
  postCreateText: {
    color: '#1D1A20',
    marginLeft: 5,
  },
  postText: {
    marginHorizontal: '8%',
    marginVertical: '2%',
  },
  postBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 18,
    marginBottom:'10%',
  },
  createTimeText: {
    paddingTop: 6,
    color: 'lightgray',
  },
  iconContainer:{
    position:'absolute',
    right:0
  },
  iconStyle: {
    justifyContent: 'center',
    height: 50,
    width: 50,
    
  },
  textInnerContainer: {
    flexDirection: 'row',
  },
});
export default HomeScreen;
