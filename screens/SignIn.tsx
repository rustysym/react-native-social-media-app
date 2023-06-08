import {StyleSheet, Text, View, TextInput, Dimensions,TouchableOpacity} from 'react-native';
import React ,{useContext}from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { UserContext } from '../context/UserContext';
type Props = {
   email:string
   password:string
};
const width = Dimensions.get('window').width;
const SignIn = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {setEmail,setPassword,signIn} = useContext(UserContext)
  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.subText}>sign in to access your account</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <View>
            <Ionicons
              name="mail-outline"
              color={'#AEAEAE'}
              size={20}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Enter your e-mail'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Ionicons
              name="lock-closed-outline"
              color={'#AEAEAE'}
              size={20}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder={'Enter your password'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setPassword}
              secureTextEntry={true}
              textContentType={"password"}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonStyle} onPress={()=> signIn()}>
                    <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            
        </View>
        <View style={styles.newMemberContainer}>
        <Text style={styles.subText}>Are you new member ?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("SignUp")}>
                <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextContainer: {
    alignSelf: 'center',
    paddingTop: '40%',
  },
  headerText: {
    color: '#1D1A20',
    textAlign: 'center',
    fontFamily: 'GeneralSans-Medium',
    fontSize:35,
  },
  subText: {
    color: 'gray',
    textAlign:'center',
  },
  textInput: {
    marginTop: '4%',
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    height: 50,
    backgroundColor: 'rgba(196, 196, 196, 0.2)',
    paddingLeft:15,
    paddingRight: '15%',
    color:'#1D1A20'
  },
  inputContainer:{
    paddingTop:'20%'
  },
  inputIcon: {
    position: 'absolute',
    paddingRight: '13%',
    alignSelf:'flex-end',
    zIndex: 1,
    bottom: 15,
  },
  buttonContainer:{
    alignSelf:'center',
    marginTop:'10%',
  },
  buttonStyle:{
    width:width * 0.50,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center',
    height:40,
    backgroundColor:'#1D1A20',
  },
  buttonText:{
    fontFamily:'GeneralSans-Medium'
  },
  signUpText:{
    color:'gray',
    textDecorationLine:'underline',
  },
  newMemberContainer:{
    paddingTop:15,
    alignSelf:'center',
    flexDirection:'row',
    gap:12,
  }
});
