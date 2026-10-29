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

const Filter = () => {
  const searchParams = useLocalSearchParams()
  const { category, query } = useLocalSearchParams<{
    category?: string;
    query?: string;
  }>();
  const [active, setActive] = useState("All")
  
  const onPress = (id: string) => {
    
    setActive(id)
    //router.setParams({category: id})
    router.replace(`/search?category=${id}`)
  }

  //Set the category back to 'All' when a user tries to search
  useEffect(() => {
        if(query)
            setActive("All")
    }, [query]);

   return (
    <FlatList
        data={categories}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName='gap-x-2 m-3 mb-14'
        renderItem={({item}) => (
            <TouchableOpacity 
                className={cn("p-3 rounded-full shadow-slate-200 shadow-md", active === item ? 'bg-theme_primary' : 'bg-white')}
                style={Platform.OS === 'android' ? {elevation: 5} : {}}
                onPress={() => onPress(item)}
            >  
                <Text className={cn("font-bold", active === item ? 'text-white' : 'text-gray-600')}>{item}</Text>
            </TouchableOpacity>
        )}/>

  )
}

export default Filter