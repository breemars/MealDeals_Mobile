import { View, Text, Button, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../lib/firebase";
import { createUserProfile } from '@/lib/users';
import useAuthStore from '@/store/auth.store';

const signup = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: ''})
  const { fetchAuthenticatedUser } = useAuthStore()
 
  const onSubmit = async() => {

    //Error Handling 
    if(!form.name || !form.email || !form.password) 
      return Alert.alert('Error', "Please fill in all the fields.")
    if (form.password.length <= 6) 
      return Alert.alert('Error', "Password must be longer than 6 characters.")
    if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))) //Checks if it is an email format
      return Alert.alert('Error', "Please enter a valid email.")

    setIsSubmitting(true)

    try {
      // call sign up function
      await createUserWithEmailAndPassword(
          auth,
          form.email.trim(),
          form.password
        );

        //Store User Profile info
        await createUserProfile(form.name);

      Alert.alert('Succcess', "Signed-Up Successfully")

      //Update user info in the store
      fetchAuthenticatedUser()

      router.replace("../(tabs)/") //????????????
    } catch (error : any) {
      Alert.alert("Error", error.message) 
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <View className='gap-10 rounded-lg p-5 mt-5 bg-yellow-100'>

      <Text className='font-semibold'>Name</Text>
            <TextInput
              placeholder='Enter your name'
              autoCapitalize='none'
              autoCorrect={false}
              value={form.name}
              onChangeText={(text) => setForm((prev) => ({...prev, name:text}))}
              className='p-3 border-b-4 border-theme_primary'
            />

      <Text className='font-semibold'>Email</Text>
            <TextInput
              placeholder='Enter your email'
              autoCapitalize='none'
              autoCorrect={false}
              value={form.email}
              onChangeText={(text) => setForm((prev) => ({...prev, email:text}))}
              secureTextEntry={false}
              keyboardType='email-address'
              className='p-3 border-b-4 border-theme_primary'
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
              <Text className='text-white font-bold'>Sign-Up</Text>
            </View>
          </TouchableOpacity>
      
          <View className='justify-center mt-5 flex-row gap-2'>
            <Text className='text-gray-400'>Already have an account?</Text>
            <Link href='/signin' className='font-bold text-theme_primary'>Sign In</Link>
          </View>
    
    </View>
  )
}

export default signup