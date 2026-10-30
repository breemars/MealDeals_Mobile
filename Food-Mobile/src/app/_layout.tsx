import '../global.css'
import { SplashScreen, Stack } from "expo-router";

import { useFonts } from 'expo-font'

import { useEffect } from 'react';
import useAuthStore from '@/store/auth.store';

export default function RootLayout() {

const { isLoading, updateAuthenticatedUser } = useAuthStore()

const [fontsLoaded, error] = useFonts({
  "Quicksand-Regular": require("../../assets/fonts/Quicksand-Regular.ttf"),
  "Quicksand-Bold": require("../../assets/fonts/Quicksand-Bold.ttf"),
  "Quicksand-Medium": require("../../assets/fonts/Quicksand-Medium.ttf"),
  "Quicksand-Light": require("../../assets/fonts/Quicksand-Light.ttf"),
  "Quicksand-SemiBold": require("../../assets/fonts/Quicksand-SemiBold.ttf"),
});

//Hides the splash screen once the fonts are done loading
useEffect(() => {
  if(error) throw Error;
  if(fontsLoaded) SplashScreen.hideAsync();
}), [fontsLoaded, error]

useEffect(() => {
  updateAuthenticatedUser()
}, [])

if(isLoading) return null; //?
  
//Hide the default top header
  return <Stack screenOptions={{ headerShown: false }} />;
}
