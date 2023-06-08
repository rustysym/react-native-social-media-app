import { View, Text } from 'react-native'

import React ,{useState}from 'react'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import { createStackNavigator } from '@react-navigation/stack'
import { UserProvider } from '../context/UserProvider'


const stack = createStackNavigator();
const Auth = () => {

  return (
    
    <stack.Navigator>
    <stack.Screen name={"SignIn"} component={SignIn} options={{headerShown:false}}/>
    <stack.Screen name={"SignUp"} component={SignUp} options={{headerShown:false}}/>
    </stack.Navigator>
    
  )
}

export default Auth