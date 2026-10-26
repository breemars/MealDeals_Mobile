import { ShoppingBasket } from 'lucide-react-native'
import { View, Text, TouchableOpacity } from 'react-native'

const CartButton = () => {
const totalItems = 5

  return (
    <TouchableOpacity onPress={()=>{}}>

        { /* Displays how many items are in the cart, or nothing if there is none */}
        {totalItems > 0 && <Text className='absolute right-[-12] z-10 font-bold bg-theme_primary rounded-3xl text-white p-1 px-2'>{totalItems}</Text>}
       
        { /* Displays the cart button */}
        <View className='bg-gray-700 rounded-3xl p-1 mt-3'>
            <ShoppingBasket size={30} color="#ffffff" strokeWidth={1} />
        </View>

    </TouchableOpacity>
  )
}

export default CartButton