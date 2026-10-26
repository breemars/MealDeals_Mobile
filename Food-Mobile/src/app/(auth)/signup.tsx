import { View, Text, Button } from 'react-native'
import { router } from 'expo-router'

const signup = () => {
  return (
    <View>
      <Text>signup</Text>
      <Button title="Sign In" onPress={() => router.push("/signin")}></Button>
    </View>
  )
}

export default signup