import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useCallback, useContext, useMemo, useRef} from 'react';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/AuthContext';

const EditProfileScreen = () => {
  const {user} = useContext(AuthContext)
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['1%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
   console.log("handleChangeSheet",index)
  }, []);

  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <BottomSheetView style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.panelButton}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.panelButton}
            onPress={() => bottomSheetRef.current?.close()}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => bottomSheetRef.current?.expand()}>
          <View
            style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={{
                uri: 'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
              }}
              style={{height: 100, width: 100}}
              imageStyle={{borderRadius: 50}}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <Text style={styles.userTitle}>{user?.uid}</Text>
      </View>
      <ScrollView style={styles.inputsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#333333" size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
          <TextInput
            placeholder="About Me"
            placeholderTextColor="#666666"
            autoCorrect={true}
            multiline={true}
            style={[styles.textInput, {height: 100}]}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="call-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Phone"
            keyboardType="number-pad"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
        <Ionicons name="globe-outline" color="#333333" size={20} />
          <TextInput
            placeholder="Country"
            keyboardType="number-pad"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
        <Ionicons name="location-outline" color="#333333" size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.panelButton,{width:'40%',height:40}]}>
          <Text style={[styles.panelTitle,{fontSize:18,}]}>Update</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  imageContainer: {
    paddingTop: '12%',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  buttonContainer:{
    alignItems:'center',
    
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    marginVertical: 7,
    justifyContent:'center',
    
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
    borderRadius: 15,
    paddingLeft: 15,
  },
  userTitle: {
    fontFamily: 'GeneralSans-Medium',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    
  },
  inputsContainer: {
    paddingHorizontal: '4%',
    paddingTop: '10%',
    zIndex:-4,
    
  },

  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: '#333333',
  },
});
