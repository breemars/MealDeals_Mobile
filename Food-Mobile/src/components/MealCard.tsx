import { Text, TouchableOpacity, Image, Platform } from 'react-native'
import { type Meal } from '@/lib/tmdb'
import useCartStore from '@/store/cart.store';
import { router } from 'expo-router';

const MealCard = ({ meal } : { meal: Meal}) => {

    const { addItem } = useCartStore()
    const price = Number(((Number(meal.idMeal) - 50000) / 200).toFixed(2)); //Using the Meal ID to create a fake price

    return (
    <TouchableOpacity onPress={() => router.push(`../meal/${meal.idMeal}`)} className='p-5 flex-col bg-white rounded-2xl items-center shadow-gray-300 shadow-lg' style={Platform.OS === 'android' ? {elevation: 10} : {}}>
        <Image source={{uri:meal.strMealThumb}} className="absolute -top-20 size-32 rounded-full" resizeMode="contain" />
        <Text className='font-bold text-gray-800 p-2 px-10 text-lg' numberOfLines={1} style={{ backgroundColor: 'white' }}>{meal.strMeal}</Text>
        <Text className='text-gray-500 mb-2 font-quicksand'>${price}</Text>
        <TouchableOpacity onPress={() => addItem(meal)}>
            <Text className='font-bold text-theme_primary'>Add to Cart +</Text>
        </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MealCard