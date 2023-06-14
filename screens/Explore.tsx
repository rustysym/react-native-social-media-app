import {Text, View, TextInput} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from '../config/Styles';

const Explore = () => {
  return (
    <View style={[styles.flexContainer,{paddingTop:'20%'}]}>
      <View>
        <Text style={styles.xxlText}>Explore</Text>
        <View>
        <Ionicons name="ios-search-outline" color={'#AEAEAE'}  size={20} style={styles.exploreSearchIcon}/>
        <TextInput style={styles.exploreSearchInput} placeholder={'What are you looking for?'} placeholderTextColor={'#AEAEAE'}/>
        </View>
        
      </View>
    </View>
  );
};

export default Explore;

