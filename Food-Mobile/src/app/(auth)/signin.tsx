import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

const signin = () => {
  return (
    <View>
      <Text>signin</Text>
      <Button title="Sign Up" onPress={() => router.push("/signup")}></Button>
    </View>
  )
}

export default signin