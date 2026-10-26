import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Fragment } from "react/jsx-runtime";
import { ChevronDown, CircleArrowRight  } from "lucide-react-native";
import cn from "clsx"
import CartButton from "@/components/CartButton";

export default function Index() {

  const MenuOptions = [
  {
    title: "SUMMER COMBO",
    image: "",
    bg: "bg-theme_red",
  },
  {
    title: "BURGER BASH",
    image: "",
    bg: "bg-theme_orange", 
  },
  {
    title: "PIZZA PARTY",
    image: "",
    bg: "bg-theme_green",
  },
  {
    title: "BURRITO DELIGHT",
    image: "",
    bg: "bg-theme_yellow",
  },
];

//<Text className="text-5xl text-theme_primary bg-th font-bold">MealDeals</Text>


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
          <Pressable className={`${item.bg} w-full my-3 p-5 h-40 rounded-xl overflow-hidden shadow-lg flex items-center gap-3 ` + cn(isEven ? ' flex-row-reverse' : ' flex-row')}
          android_ripple={{ color: "#ffffff22" }}> 
              
              {({ pressed }) => (
                <Fragment>
                  <View className="h-full w-1/2">
                    <Image source={{ uri: item.image}} className="size-full" resizeMode="contain"></Image>
                  </View>

                  <View className={cn("h-fit w-1/2 ", {"pl-10": isEven})}> 
                    <Text className="text-2xl font-bold text-white leading-tight my-3">{item.title}</Text>
                    <CircleArrowRight size={32} color="#ffffff" strokeWidth={1} />
                  </View>
                </Fragment>
              )}

          </Pressable>
        </View>
      )}} 
      contentContainerClassName="pb-28 px-5"
      ListHeaderComponent={
        <View className="justify-between flex-row w-full my-5">
          <View className="flex-start">
            <Text className="font-bold text-theme_primary">DELIVER TO</Text>
            <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
              <Text className="font-bold text-gray-700">City</Text>
              <ChevronDown size={20} color="#374151" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>

          <Text><CartButton /></Text>
        </View>}
      />

    </SafeAreaView>
  );
}
