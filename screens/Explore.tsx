import {StyleSheet, Text, View, TextInput,Dimensions,Keyboard} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
const width = Dimensions.get('window').width;
const Explore = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>Explore</Text>
        <View>
        <Ionicons name="ios-search-outline" color={'#AEAEAE'}  size={20} style={styles.searchIcon}/>
        <TextInput style={styles.searchInput} placeholder={'What are you looking for?'} placeholderTextColor={'#AEAEAE'}/>
        </View>
        
      </View>
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
  },
  headerText: {
    color: '#1D1A20',
    fontFamily: 'GeneralSans-Bold',
    fontSize: 34,
    marginLeft: '8%',
  },
  searchInput: {
    marginTop:'4%',
    borderRadius:20,
    alignSelf:'center',
    justifyContent:'center',
    width:width*.85,
    height:50,
    backgroundColor:'#DADADA',
    paddingLeft:35
  },
  searchIcon:{
    position:'absolute',
    paddingLeft:'10%',
    zIndex:1,
    bottom:15,
  }
});
