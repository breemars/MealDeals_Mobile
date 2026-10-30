import { getUserProfile, logoutUser, updateUserProfile } from '@/lib/users'
import useAuthStore from '@/store/auth.store'
import { CircleUserRound, Mail } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import cn from "clsx"
import { router } from 'expo-router';

const profile = () => {
  const [profile, setProfile] = useState<any>();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { updateAuthenticatedUser } = useAuthStore()

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getUserProfile();
      setProfile(data);
      setNewName(data?.name)
      setNewEmail(data?.email)
    };

    loadProfile();
  }, []);


  useEffect(() => {
    const loadProfile = async () => {

      try {
        await updateUserProfile({name: newName});
      } catch (error) {
        console.log("Error Updating Profile")
      }
    };

    if(isEditing == false && newName != "")
      loadProfile();
  }, [isEditing]);


  const onSignOut = async () => {
  try {
    await logoutUser();
    updateAuthenticatedUser()
    router.replace("../(auth)/signin/");
  } catch (error) {
    console.log("Sign out error:", error);
  }
};
  
  console.log(profile?.name)
  console.log(profile?.email)

  return (
    <View className='p-20 gap-10'>

      <Text className='font-bold text-2xl'>Profile</Text>

      <View className='flex-row gap-5'>
        <CircleUserRound size={60} color="#ff6600" strokeWidth={1.5} />
        <View>
          <Text className='text-xl font-quicksand text-gray-500 p-1'>Name</Text>
          <TextInput
              editable={isEditing}
              value={newName}
              onChangeText={setNewName}
              className={cn("text-xl font-bold p-1", isEditing && "border bg-white")}
            />
        </View>
      </View>

      <View className='flex-row gap-5'>
        <Mail size={60} color="#ff6600" strokeWidth={1.5} />
        <View>
            <Text className='text-xl font-quicksand text-gray-500 p-1'>Email</Text>
            <TextInput
              editable={false}
              value={newEmail}
              onChangeText={setNewEmail}
              className="text-xl font-bold p-1"
            />
        </View>
      </View>


      <TouchableOpacity onPress={() => setIsEditing(!isEditing)} className='border-theme_yellow border-2 bg-yellow-100 rounded-full w-full mt-5'>
        <Text className="text-xl font-bold text-center text-theme_yellow my-2">{isEditing ? "Save" : "Edit"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSignOut} className='border-theme_red border-2 bg-red-100 rounded-full w-full'>
        <Text className="text-xl font-bold text-center text-theme_red my-2">Log-Out</Text>
      </TouchableOpacity>

      
    </View>
  )
}

export default profile