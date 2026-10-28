import { Text, TouchableOpacity, Image, Platform } from 'react-native'
import { type Meal } from '@/lib/tmdb'

const MenuCard = ({ meal: {strMeal, strMealThumb}} : { meal: Meal}) => {  
    return (
    <TouchableOpacity className='p-5 flex-col bg-white rounded-2xl items-center shadow-gray-300 shadow-lg' style={Platform.OS === 'android' ? {elevation: 10} : {}}>
        <Image source={{uri:strMealThumb}} className="absolute -top-20 size-32 rounded-full" resizeMode="contain" />
        <Text className='font-bold text-gray-800 p-2 px-10 text-lg' numberOfLines={1} style={{ backgroundColor: 'white' }}>{strMeal}</Text>
        <Text className='text-gray-500 mb-2 font-quicksand'>$10.99</Text>
        <TouchableOpacity>
            <Text className='font-bold text-theme_primary'>Add to Cart +</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MenuCard