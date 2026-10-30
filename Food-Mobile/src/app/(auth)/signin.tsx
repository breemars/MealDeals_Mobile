import { View, Text, Button, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import useAuthStore from '@/store/auth.store'



const signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ email: '', password: ''})
  const { updateAuthenticatedUser } = useAuthStore()
 
  const onSubmit = async() => {
    if(!form.email || !form.password) Alert.alert('Error', "Please enter valid email address and password.")
  
    setIsSubmitting(true)

    try {
      // call sign in function
      await signInWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );

      Alert.alert('Succcess', "Signed-In Successfully")
      console.log("success")

      //Update user info in the store
      updateAuthenticatedUser()

      router.replace("../(tabs)/")
    } catch (error : any) {
      Alert.alert("Error", error.message) 
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <View className='gap-10 rounded-lg p-5 mt-5'>
      
      <Text className='font-semibold'>Email</Text>
      <TextInput
        placeholder='Enter your email'
        autoCapitalize='none'
        autoCorrect={false}
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({...prev, email:text}))}
        secureTextEntry={false}
        keyboardType='email-address'
        className='font-quicksand p-3 border-b-4 border-theme_primary'
      />

      <Text className='font-semibold'>Password</Text>
      <TextInput
        placeholder='Enter your password'
        autoCapitalize='none'
        autoCorrect={false}
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({...prev, password:text}))}
        secureTextEntry={true}
        className='p-3 border-b-4 border-theme_primary'
      />



    <TouchableOpacity onPress={onSubmit}>
      <View className='justify-center flex-row gap-3 p-3 rounded-3xl bg-theme_primary'>
        {isSubmitting && ( <ActivityIndicator size="small" color="white" /> )} 
        <Text className='text-white font-bold'>Sign-In</Text>
      </View>
    </TouchableOpacity>

    <View className='justify-center mt-5 flex-row gap-2'>
      <Text className='text-gray-400'>Don't have an account?</Text>
      <Link href='/signup' className='font-bold text-theme_primary'>Sign Up</Link>
    </View>


    </View>
  )
}

export default signin