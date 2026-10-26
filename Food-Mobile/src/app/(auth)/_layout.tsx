import { Slot } from 'expo-router';
import { Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const _layout = () => {
    //BUtton is fine for simple pressables

  return (
    <SafeAreaView>
      <Text>AUTH _layout</Text>
      <Slot />
    </SafeAreaView>
  )
}

export default _layout