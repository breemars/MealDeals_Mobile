import type { CartItem } from "@/store/cart.store";
import useCartStore from "@/store/cart.store";
import { Trash } from "lucide-react-native";
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'



const CartItemCard = ({ meal, quantity, price }: CartItem) => {
  const { addItem, decreaseQTY, removeItem } = useCartStore()

  return (
    <View className='bg-white shadow rounded-3xl flex-row p-3 gap-4 w-full'>
      <Image
        source={{ uri: meal.strMealThumb }}
        style={{ width: 100, height: 100 }}
        className="rounded-2xl"
        resizeMode="contain"
      />

      <View className='flex-col gap-2 w-[83%]'>
        <Text className='font-bold text-lg'>{meal.strMeal}</Text>
        <Text className='font-bold text-theme_primary'>${price}</Text>


          {/* Quantity controls + Delete */}
          <View className="flex-row items-center justify-between mt-2">

            {/* Quantity group */}
            <View className="flex-row items-center gap-3">
              <TouchableOpacity onPress={() => decreaseQTY(meal.idMeal)} className="bg-gray-200 rounded-full size-8 items-center justify-center">
                <Text className="font-bold text-lg">-</Text>
              </TouchableOpacity>

              <Text className="font-bold text-lg">{quantity}</Text>

              <TouchableOpacity onPress={() => addItem(meal)} className="bg-theme_primary rounded-full size-8 items-center justify-center">
                <Text className="font-bold text-lg text-white">+</Text>
              </TouchableOpacity>
            </View>

            {/* Delete button */}
            <TouchableOpacity onPress={() => removeItem(meal.idMeal)} className="bg-red-100 rounded-xl px-3 py-2">
                <Trash size={18} color="#dc2626"/>
            </TouchableOpacity>

          </View>

      </View>
    </View>
  )
}

export default CartItemCard