import { StyleSheet, Text, View ,TouchableOpacity,Image,Alert,Platform,Dimensions} from 'react-native'
import React,{useContext} from 'react'
import { PostContext } from '../context/PostContext'
import Entypo from 'react-native-vector-icons/Entypo'
import moment from 'moment'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AuthContext } from '../context/AuthContext'

var width = Dimensions.get('window').width;
const PostItem = (item:any) => {
    const {post} = item;
    const {deletePost,isOpen,setIsOpen} = useContext(PostContext)
    const {user} = useContext(AuthContext);
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

  return (
    <View key={post.key}>

    <View style={styles.postTopContainer} >
      <Image
        source={{
          uri: 'https://blog.readyplayer.me/content/images/2021/04/IMG_0689.PNG',
        }}
        style={styles.avatarImages}
      />
      <View style={styles.postHeaderTextContainer}>
        <View style={styles.textInnerContainer}>
          <Text style={styles.userNameText}>{post.userName}</Text>
          <Text style={styles.postCreateText}>
            created a new post
          </Text>
        </View>
        <Text style={styles.createTimeText}>
          {moment(post.postTime.toDate()).fromNow()}
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
          {user.uid == post.userId ? (
            <TouchableOpacity
              style={{backgroundColor: '#f0f0f0', borderRadius: 20}}
              onPress={() => handleDelete(post.key)}>
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
      {post.postImage !== null ? (
        <Image
          source={{
            uri: post.postImage,
          }}
          style={{borderRadius: 20, width: width * 0.9, height: 350}}
        />
      ) : null}
    </View>
    <View style={styles.postText}>
      <Text style={{color: 'black'}}>{item?.post}</Text>
    </View>
    <View style={styles.postBottom}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Ionicons name={'paw-outline'} color={'gray'} size={24} />
        </TouchableOpacity>
        <Text
          style={{
            color: 'gray',
            alignSelf: 'center',
            paddingLeft: 12,
          }}>
          {post.likes}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity>
          <Ionicons
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
          {post.comments}
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name={'paper-plane-outline'} color={'gray'} size={24} />
      </TouchableOpacity>
    </View>
  </View>

)}

export default PostItem

const styles = StyleSheet.create({
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
      userNameText: {
        fontWeight: '600',
        color: '#1D1A20',
      },
      avatarImages: {
        borderRadius: 50,
        marginHorizontal: 5,
        height: 68,
        width: 68,
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
})