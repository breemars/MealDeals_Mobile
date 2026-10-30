import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fragment } from "react/jsx-runtime";
import { ChevronDown, CircleArrowRight, Pizza  } from "lucide-react-native";
import cn from "clsx"
import CartButton from "@/components/CartButton";
import { Href, router } from "expo-router";

export default function Index() {

  const MenuOptions = [
  {
    title: "SUMMER COMBO",
    image: "https://www.themealdb.com/images/media/meals/wuyd2h1765655837.jpg",
    bg: "bg-theme_red",
    route: "/meal/53367"
  },
  {
    title: "BURGER BASH",
    image: "https://www.themealdb.com/images/media/meals/44bzep1761848278.jpg",
    bg: "bg-theme_orange", 
    route: "/search?query=burger"
  },
  {
    title: "PIZZA PARTY",
    image: "https://www.themealdb.com/images/media/meals/wf49qs1763075222.jpg",
    bg: "bg-theme_green",
    route: "/search?query=pizza"
  },
  {
    title: "CINNAMON DELIGHT",
    image: "https://www.themealdb.com/images/media/meals/as88dq1762772486.jpg",
    bg: "bg-theme_yellow",
    route: "/meal/53116",
  },
];




  return (
    <SafeAreaView className="flex-1">

      <FlatList 
      data={MenuOptions} 
      renderItem={({ item, index }) => {
        const isEven = index % 2 === 0

        return(
        <View>
          
          { /* Makes each menu option pressable 
          the addition syntax needs a SPACE inbetween the two it to be valid */}
          <TouchableOpacity className={`${item.bg} w-full my-3 h-40 rounded-xl overflow-hidden shadow-lg flex items-center gap-3 ` + cn(isEven ? ' flex-row-reverse' : ' flex-row')}
          activeOpacity={0.7}
          onPress={() => router.push(item.route as Href)}> 
              
             
                <Fragment>
                  <View className="h-full w-1/2">
                    <Image source={{ uri: item.image}} className="size-full rounded-r-xl rounded-l-xl" resizeMode="cover"></Image>
                  </View>

                  <View className={cn("h-fit w-1/2 pl-10 ", {"pl-14": isEven})}> 
                    <Text className="text-2xl font-bold text-white leading-tight my-3">{item.title}</Text>
                    <CircleArrowRight size={32} color="#ffffff" strokeWidth={1} />
                  </View>
                </Fragment>


          </TouchableOpacity>
        </View>
      )}} 
      contentContainerClassName="pb-28 px-5"
      ListHeaderComponent={
        <View className="justify-between flex-row w-full my-5">
          {/*<View className="flex-start">
            <Text className="font-bold text-theme_primary">DELIVER TO</Text>
            <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
              <Text className="font-bold text-gray-700">City</Text>
              <ChevronDown size={20} color="#374151" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>*/}

          <View className="flex-row gap-2">
            <Pizza size={50} color="#FE8C00" strokeWidth={1.5} />
            <Text className="text-5xl text-theme_primary bg-th font-bold">MealDeals</Text>
          </View>

          <Text><CartButton /></Text>

          
        </View>}
      />

    </SafeAreaView>
  );
}
