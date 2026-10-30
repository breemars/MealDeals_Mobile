import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import cn from "clsx"

const categories = [
  "All",
  "Breakfast",
  "Starter",
  "Beef",
  "Chicken",
  "Pork",
  "Seafood",
  "Pasta",
  "Side",
  "Vegetarian",
  "Vegan",
  "Dessert",
];

const letters = [
  "A", "B", "C", "D", "E", "F",
  "G", "H", "I", "J", "K", "L",
  "M", "N", "O", "P", "Q", "R",
  "S", "T", "U", "V", "W", "X",
  "Y", "Z"
];

const Filter = () => {
  const searchParams = useLocalSearchParams()
  const { category, query } = useLocalSearchParams<{
    category?: string;
    query?: string;
  }>();
  const [active, setActive] = useState("All")
  const [activeLetter, setActiveLetter] = useState("A")
  
  const onPress = (id: string) => {
    
    setActive(id)
    if(id == "All") router.replace(`/search?category=${id}&letter=${activeLetter}`)
    else router.replace(`/search?category=${id}`)
  }



  const onPressLetter = (letter: string) => {
    
    setActive("All")
    setActiveLetter(letter)
    //router.setParams({letter: letter})
    router.replace(`/search?category=${active}&letter=${letter}`)
    //router.replace(`/search?category=${id}`)
  }

  //Set the category back to 'All' when a user tries to search
  useEffect(() => {
        if(query)
            setActive("All")
    }, [query]);


    //set the URL on initual load 
    useEffect(() => {
      onPress(active)
    }, []);

   return (
    <View className='mb-14'>
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='gap-x-2 m-3'
        renderItem={({item}) => (
            <TouchableOpacity 
                className={cn("p-3 rounded-full shadow-slate-200 shadow-md", active === item ? 'bg-theme_primary' : 'bg-white')}
                style={Platform.OS === 'android' ? {elevation: 5} : {}}
                onPress={() => onPress(item)}
            >  
                <Text className={cn("font-bold", active === item ? 'text-white' : 'text-gray-600')}>{item}</Text>
            </TouchableOpacity>
        )}/>


       {active == "All" && <FlatList
        data={letters}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='gap-x-2 m-3'
        renderItem={({item}) => (
            <TouchableOpacity 
                className={cn("p-3 rounded-full shadow-slate-200 shadow-md", activeLetter === item ? 'bg-theme_primary' : 'bg-white')}
                style={Platform.OS === 'android' ? {elevation: 5} : {}}
                onPress={() => onPressLetter(item)}
            >  
                <Text className={cn("font-bold", activeLetter === item ? 'text-white' : 'text-gray-600')}>{item}</Text>
            </TouchableOpacity>
        )}/> }

      </View>


  )
}

export default Filter