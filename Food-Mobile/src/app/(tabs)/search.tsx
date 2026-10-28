import CartButton from '@/components/CartButton';
import { searchMeals, type Meal } from '@/lib/tmdb'
import { useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import cn from "clsx"
import MenuCard from '@/components/MenuCard';


const search = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [searchTerm, setSearchTerm] = useState("pizza");

  useEffect(() => {
    async function fetchMeals() {
      try {
          const data = await searchMeals("pizza");
          //console.log(data);
          setMeals(data);
        
      } catch (error) {
        console.log("Error searching", error);
      }
    }

    if(searchTerm.length > 0)
      fetchMeals();

}, [searchTerm]);

  return (
    <SafeAreaView className='h-full'>

      <FlatList 
        ListHeaderComponent={
          <View className='my-5 gap-5'>
          <View className='justify-between flex-row w-full'>
            <View className=''>
              <Text className='font-bold uppercase text-theme_primary'>Search</Text>

              <View className='flex-row gap-x-1 mt-0.5'>
                <Text className='font-semibold text-gray-600'>Find your favorite food</Text>
              </View>

            </View>

            <CartButton />
            </View>

            <Text>SearchHERE</Text>
            <Text>FilterHERE</Text>
          </View>
        }
          
        data={meals} 
        keyExtractor={ item => item.idMeal }
        numColumns={2}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0

          return(
            <View className={cn('flex-1 max-w-[48%]', !isEven ? 'mt-20' : 'mt-0')}>
              <MenuCard meal={item as Meal} />
            </View>
          )
        }} 
        columnWrapperClassName='gap-7'
        contentContainerClassName='gap-7 px-5 pb-32'
        
        ListEmptyComponent={
          <Text>No Results!</Text>
        }
        />
    </SafeAreaView>
  )
}

export default search