import CartItemCard from '@/components/CartItemCard'
import useCartStore, { CartItem } from '@/store/cart.store'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const cart = () => {
  const { addItem, getItems } = useCartStore()
  const { items, totalPrice, totalItems } = getItems()
  
  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={({item}) => <CartItemCard {...item} />}
        contentContainerClassName='pb-28 px-5 pt-5 gap-4'
        ListFooterComponent={() =>
        totalPrice > 0 && (
          <View>
            <View className='mt-2 gap-2 border border-gray-500 p-5 rounded-2xl bg-white'>
              <Text className='font-bold text-gray-800 mb-1 text-lg'>Payment Summary</Text>
              
              <View className='flex-row justify-between'>
                <Text className='font-quicksand'>Total Items ({totalItems})</Text>
                <Text className='font-bold'>${totalPrice}</Text>
              </View>

              <View className='flex-row justify-between'>
                <Text className='font-quicksand'>Discount</Text>
                <Text className='text-green-700 font-bold'>- ${(totalPrice / 10).toFixed(2)}</Text>
              </View>

              <View className='flex-row justify-between'>
                <Text className='font-quicksand'>Delivery Fee</Text>
                <Text className='font-bold'>$10</Text>
              </View>

              <View className='flex-row justify-between border-t-2 mt-3 pt-3'>
                <Text className='font-bold'>Total</Text>
                <Text className='font-bold'>${(totalPrice * 0.9 + 10).toFixed(2)}</Text>
              </View>
            
            </View>

              <TouchableOpacity className='mt-5 justify-center flex-row gap-3 p-3 rounded-3xl bg-theme_primary'>
                <Text className='text-white font-bold'>Order Now</Text>
              </TouchableOpacity>

            </View>

        )
        }
        ListEmptyComponent={<Text className='text-center text-xl font-bold text-theme_primary mt-40'>Cart is Empty</Text>}>


      </FlatList>
      


    </SafeAreaView>
  )
}

export default cart