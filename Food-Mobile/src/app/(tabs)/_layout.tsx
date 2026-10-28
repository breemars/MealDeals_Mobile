import useAuthStore from '@/store/auth.store';
import { Redirect, Slot, Tabs } from 'expo-router'
import { House, Search, ShoppingCart, UserRound } from 'lucide-react-native';
import { View, Text } from 'react-native';
import cn from "clsx"

const TabBarIcon = ({focused, icon, title} : {focused: boolean, icon: string, title: string}) => (
    <View>
        {icon === 'Home' && <></>}
    </View>
)


//TabLayout = proper name, which it needs to use hooks
const TabLayout = () => {

    const { isAuthenticated, user } = useAuthStore();
    console.log( "USER: ", user )
    if(!isAuthenticated) return <Redirect href="/signin" />
    

    //Slot renders the rest of the content (pages) as is

    //paddingTop depends on mobile view
    return (
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    borderRadius: 50,
                    marginHorizontal: 40,
                    marginVertical: 20,
                    height: 80,
                    position: 'absolute',
                    shadowColor: "#1a1a1a",
                    shadowOffset: { width: 0, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 5,
                    elevation: 10,
                    paddingTop: 20
                }
            }}
        >
            <Tabs.Screen 
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }) => 
                        <View className={cn('flex-row items-center py-5 px-8 gap-2 rounded-full', focused && 'bg-theme_primary')}>
                            <House size={40} color={focused ? "#fff" : "#000"} strokeWidth={1.5} />
                            {focused && <Text className='text-white font-bold text-xl'>Home</Text>}
                        </View>
                }} />
            <Tabs.Screen 
                name='search'
                options={{
                    title: 'Search',
                    tabBarIcon: ({ focused }) => 
                        <View className={cn('flex-row items-center py-5 px-7 gap-2 rounded-full', focused && 'bg-theme_primary')}>
                            <Search size={40} color={focused ? "#fff" : "#000"} strokeWidth={1.5} />
                            {focused && <Text className='text-white font-bold text-xl'>Search</Text>}
                        </View>
                }} />
            <Tabs.Screen 
                name='cart'
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ focused }) => 
                        <View className={cn('flex-row items-center py-5 px-8 gap-2 rounded-full', focused && 'bg-theme_primary')}>
                            <ShoppingCart size={40} color={focused ? "#fff" : "#000"} strokeWidth={1.5} />
                            {focused && <Text className='text-white font-bold text-xl'>Cart</Text>}
                        </View>
                }} />
            <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => 
                        <View className={cn('flex-row items-center py-5 px-7 gap-2 rounded-full', focused && 'bg-theme_primary')}>
                            <UserRound size={40} color={focused ? "#fff" : "#000"} strokeWidth={1.5} />
                            {focused && <Text className='text-white font-bold text-xl'>Profile</Text>}
                        </View>
                }} />



        </Tabs>
    )
    
    
    //<Slot />
}

export default TabLayout