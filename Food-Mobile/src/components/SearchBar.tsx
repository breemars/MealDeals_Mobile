import { router, useLocalSearchParams } from 'expo-router'
import { Search } from 'lucide-react-native'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useDebouncedCallback } from "use-debounce"

const SearchBar = () => {
   // const params = useLocalSearchParams<{query?: string}>()
    const { category } = useLocalSearchParams<{
    category?: string;
  }>();
    const [query, setQuery] = useState("")
    const debouncedSearch = useDebouncedCallback(
        (text: string) => router.replace(`/search?query=${text}`),
        500,
    )
    
    //keyboard issues 9:59

    const handleSearch = (text: string) => {

        setQuery(text)
        debouncedSearch(text)

    }

    //Clear the search query when a user clicks on a category
    useEffect(() => {
        if(category){
            setQuery("")
        }
    }, [category]);
    

    //prob remove button functionality if I dont need it

  return (
    <View className='flex-row border-gray-500 bg-white rounded-full shadow items-center'>
      <TextInput 
        className='flex-1 p-5' 
        placeholder='Search for pizzas, burgers, and more' 
        placeholderTextColor='#A0A0A0'
        value={query} 
        onChangeText={handleSearch} 
        returnKeyType='search'/>
    <TouchableOpacity className='pr-5' onPress={() => handleSearch(query)}>
        <Search color={"#5D5F6D"} />

    </TouchableOpacity>


    </View>
  )
}

export default SearchBar