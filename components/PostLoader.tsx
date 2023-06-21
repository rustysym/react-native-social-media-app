import {Dimensions, View} from 'react-native';
import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';

const PostLoader = () => {
  const width = Dimensions.get('window').width;
  const ASPECT_RATIO = 400 / 600;
  return (
    <View
      style={{
        padding: 14,
        justifyContent: 'center',
        aspectRatio: ASPECT_RATIO,
        width: width,
      }}>
      <ContentLoader
        speed={1}
        width={'100%'}
        height={'100%'}
        viewBox="0 0 400 600"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <Circle cx="45" cy="66" r="40" />
        <Circle cx="135" cy="66" r="40" />
        <Circle cx="225" cy="66" r="40" />
        <Circle cx="315" cy="66" r="40" />
        <Circle cx="405" cy="66" r="40" />
        <Circle cx="45" cy="193" r="40" />
        <Rect x="94" y="165" rx="0" ry="0" width="177" height="16" />
        <Rect x="94" y="198" rx="0" ry="0" width="140" height="11" />
        <Rect x="0" y="260" rx="0" ry="0" width="480" height="379" />
      </ContentLoader>
    </View>
  );
};

export default PostLoader;
