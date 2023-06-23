import React, {useState, useEffect, useContext, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PostContext} from '../context/PostContext';
import PostItem from '../components/PostItem';
import {UserContext} from '../context/UserContext';
import styles from '../config/Styles';
import PostLoader from '../components/PostLoader';

interface Types {
  navigation: any;
}
const HomeScreen: React.FC<Types> = ({navigation}) => {
  const [avatars, setAvatars] = useState<Api[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
  const {userData} = useContext(UserContext);
  const {
    fetchPost,
    setLoading,
    loading,
    posts,
    deletePost,
    setIsOpen,
    deleted,
    setDeleted,
  } = useContext(PostContext);
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
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchPost();
    setRefreshing(false);
  }, [refreshing]);
  
  useEffect(() => {
    fetchPost();
    avatarApi();
    setLoading(false);
  }, []);
  useEffect(() => {
    fetchPost();
    setDeleted(false);
  }, [deleted]);

  const storyFirstItem = () => {
    return (
      <View>
        <Image
          style={styles.avatarImages}
          source={{
            uri: userData
              ? userData.userImg ||
                'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
              : 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg',
          }}
        />
        <Text style={{color: '#1D1A20', textAlign: 'center'}}>You</Text>
      </View>
    );
  };
  const handleDelete = (postId: any) => {
    Alert.alert(
      'Delete Post',
      'Are you sure ?',
      [
        {
          text: 'Cancel',
          onPress: () => setIsOpen(false),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => deletePost(postId),
        },
      ],
      {cancelable: false},
    );
  };
  const renderItem = ({item}: {item: Posts}) => (
    <PostItem
      item={item}
      onDelete={handleDelete}
      onPress={() => navigation.navigate('User', {userId: item.userId})}
    />
  );
  const memoizedValue = useMemo(() => renderItem, [posts]);
  const storyComponent = () => {
    return (
      <FlatList
        horizontal={true}
        data={avatars}
        ListHeaderComponent={storyFirstItem}
        style={styles.avatarList}
        scrollEnabled={true}
        initialNumToRender={4}
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
        <Text style={styles.xlText}>Rusty.</Text>
        <TouchableOpacity>
          <Icon name={'mail-unread-outline'} color={'#1D1A20'} size={30} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.xxlText}>The Latest</Text>
      </View>
      <View></View>
      {loading ? (
        <PostLoader />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          style={styles.postContainer}
          initialNumToRender={3}
          ListHeaderComponent={storyComponent}
          contentContainerStyle={{paddingBottom: 5}}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
          renderItem={memoizedValue}
        />
      )}
    </View>
  );
};

export default HomeScreen;
