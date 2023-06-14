import { Text, View,TouchableOpacity,TextInput,KeyboardAvoidingView,Platform} from 'react-native'
import React,{useContext} from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ParamListBase, useNavigation } from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { UserContext } from '../context/UserContext';
import styles from '../config/Styles';
const SignUp = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const {setEmail,setPassword,createAccount,setName} = useContext(UserContext)
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.flexContainer}>

    <View style={styles.authHeaderTextContainer}>
      <Text style={styles.authHeaderText}>Get Started</Text>
      <Text style={styles.authSubText}>create your account</Text>
    </View>
    <View style={styles.authInputContainer}>
      <View>
        <View>
          <Ionicons
            name="person-outline"
            color={'#AEAEAE'}
            size={20}
            style={styles.authInputIcon}
          />
          <TextInput
            style={styles.authTextInput}
            placeholder={'Enter your name'}
            placeholderTextColor={'#AEAEAE'}
            onChangeText={setName}
          />
        </View>
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
            textContentType={"password"}
            secureTextEntry={true}
          />
        </View>
      </View>
      
      <View style={styles.authButtonContainer}>
          <TouchableOpacity style={styles.authButtonStyle} onPress={()=>createAccount()}>
                  <Text style={styles.authButtonText}>Sign Up</Text>
          </TouchableOpacity>
          
      </View>
      <View style={styles.authNewMemberContainer}>
      <Text style={styles.authSubText}>Do you already have an account ?</Text>
          <TouchableOpacity onPress={()=> navigation.navigate("SignIn")}>
              <Text style={styles.signUpText}>Sign In</Text>
          </TouchableOpacity>
      </View>
    </View>
  </KeyboardAvoidingView>
  )
}

export default SignUp
