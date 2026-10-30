import useAuthStore from '@/store/auth.store';
import { Redirect, Slot } from 'expo-router';
import { Pizza } from 'lucide-react-native';
import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
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
          
          {/* Background image */}
            <Image
              source={{
                uri: "https://www.themealdb.com/images/media/meals/ytogg31784397116.jpg"
              }}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
            />

  

            {/* Dark overlay */}
            <View className="absolute inset-0 bg-black/40 border-b-8" />

          
        
          {/* Logo */}
          <View className='self-center size-36 bg-[#F2F2F2] rounded-full absolute -bottom-12 z-10 justify-center items-center border-8'>
            <Pizza size={80} color="#ff6600" strokeWidth={1.5} />
          </View>
        </View>

        <Slot />

      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthLayout