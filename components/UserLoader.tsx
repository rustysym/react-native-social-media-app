import {StyleSheet, View, Dimensions} from 'react-native';
import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const UserLoader = () => {
  const width = Dimensions.get('window').width;
  const ASPECT_RATIO = 400 / 900;
  return (
    <View
      style={{
        top: '10%',
        justifyContent: 'center',
        aspectRatio: ASPECT_RATIO,
        width: width,
      }}>
      <ContentLoader
        speed={1}
        width={'100%'}
        height={'100%'}
        backgroundColor="#fff"
        foregroundColor="#ecebeb"
        viewBox="0 0 400 900">
        <Circle cx="200" cy="59" r="49" />
        <Rect x="125" y="120" rx="0" ry="0" width="156" height="8" />
        <Rect x="150" y="137" rx="0" ry="0" width="100" height="8" />
        <Rect x="0" y="180" rx="2" ry="2" width="400" height="900" />
      </ContentLoader>
    </View>
  );
};

export default UserLoader;

const styles = StyleSheet.create({});
