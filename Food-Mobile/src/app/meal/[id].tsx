import { getMealByID, Meal } from '@/lib/tmdb';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowBigLeft } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native'

const MealDetails = () => {
    const [meal, setMeal] = useState<Meal | null>(null);
     const { id } = useLocalSearchParams<{ id: string }>();

       useEffect(() => {
         const loadDetails = async () => {
           const meal = await getMealByID(id);
           setMeal(meal);
            console.log(meal)
         };
     
         loadDetails();
       }, []);


  if (!meal) {
  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator
        size="large"
        color="#ff6600"
      />
    </View>
  );
}

  return (
    <ScrollView className='p-10'>

       

        
        <View className='gap-5 flex-row'>

        <View className='gap-8 flex-col w-[40%]'>
             <TouchableOpacity onPress={() => router.back()}>
                <ArrowBigLeft size={40} color="#ff6600" strokeWidth={1.5} />
            </TouchableOpacity>

            <Text className='font-bold text-3xl'>{meal.strMeal}</Text>

            <View className='flex-row gap-5'>
            <View className='bg-theme_primary w-fit rounded-3xl p-3'>
                <Text className='font-quicksand text-lg text-white text-center'>Category</Text>
                <Text className='font-bold text-2xl text-white text-center'>{meal.strCategory}</Text>
            </View>
            
            <View className='bg-theme_red w-fit rounded-3xl p-3'>
                <Text className='font-quicksand text-lg text-white text-center'>Country</Text>
                <Text className='font-bold text-2xl text-white text-center'>{meal.strCountry}</Text>
            </View>
            </View>
            

            
        </View>

        <Image
            source={{ uri: meal.strMealThumb }}
            style={{ width: 400, height: 400 }}
            className="rounded-3xl"
            resizeMode="cover"
        />
        </View>

        <Text className='font-quicksand text-3xl mb-5'>Instructions</Text>
        <Text className='font-quicksand text-lg'>{meal.strInstructions}</Text>
        
      
    </ScrollView>
  )
}

export default MealDetails