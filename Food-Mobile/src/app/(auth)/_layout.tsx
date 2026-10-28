import useAuthStore from '@/store/auth.store';
import { Redirect, Slot } from 'expo-router';
import { Pizza } from 'lucide-react-native';
import { Dimensions, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
    //keyboardShouldPersistTaps closes the keyboard when you click out of it
// * Use a `View` with an absolutely positioned `Image` instead.


  //if the user is already authenticated, go right to the homepage 
  const { isAuthenticated } = useAuthStore()
  if(isAuthenticated) return <Redirect href="/" />


  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className='h-full' keyboardShouldPersistTaps='handled'>
        <View className='w-full relative h-96 bg-black'>
          
          {/*<ImageBackground source="" className='size-full rounded-b-lg'  resizeMode='stretch' />8*/}
        
          {/* Logo */}
          <View className='self-center size-36 bg-orange-100 rounded-full absolute -bottom-12 z-10 justify-center items-center'>
            <Pizza size={80} color="#ff6600" strokeWidth={1.5} />
          </View>
        </View>

        <Slot />

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout