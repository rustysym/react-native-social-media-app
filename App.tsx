import {
  
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Routes from './navigation/Routes';
import { AuthProvider } from './context/AuthProvider';
import 'react-native-gesture-handler'



function App(): JSX.Element {
  return (
   <AuthProvider>
    <SafeAreaView style={{flex:1}}>
    <StatusBar translucent={true} barStyle={'dark-content'} backgroundColor={'transparent'}/>
      <Routes/>
   </SafeAreaView>
   </AuthProvider>
  );
}


export default App;
