import {Text, View, TextInput,TouchableOpacity} from 'react-native';
import React ,{useContext}from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { UserContext } from '../context/UserContext';
import styles from '../config/Styles';

const SignIn = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {setEmail,setPassword,signIn} = useContext(UserContext)
  return (
    <View style={styles.flexContainer}>
      <View style={styles.authHeaderTextContainer}>
        <Text style={styles.authHeaderText}>Welcome Back</Text>
        <Text style={styles.authSubText}>sign in to access your account</Text>
      </View>
      <View style={styles.authInputContainer}>
        <View>
          <View>
            <Ionicons
              name="mail-outline"
              color={'#AEAEAE'}
              size={20}
              style={styles.authInputIcon}
            />
            <TextInput
              style={styles.authTextInput}
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
              style={styles.authInputIcon}
            />
            <TextInput
              style={styles.authTextInput}
              placeholder={'Enter your password'}
              placeholderTextColor={'#AEAEAE'}
              onChangeText={setPassword}
              secureTextEntry={true}
              textContentType={"password"}
            />
          </View>
        </View>
        <View style={styles.authButtonContainer}>
            <TouchableOpacity style={styles.authButtonStyle} onPress={()=> signIn()}>
                    <Text style={styles.authButtonText}>Sign In</Text>
            </TouchableOpacity>
            
        </View>
        <View style={styles.authNewMemberContainer}>
        <Text style={styles.authSubText}>Are you new member ?</Text>
            <TouchableOpacity onPress={()=> navigation.navigate("SignUp")}>
                <Text style={styles.signUpText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

