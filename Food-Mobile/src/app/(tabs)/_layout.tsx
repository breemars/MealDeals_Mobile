import { Redirect, Slot } from 'expo-router'

const _layout = () => {

    const isAuthenticated = false;
    if(!isAuthenticated) return <Redirect href="/signin" />

    //Slot renders the rest of the content (pages) as is
    return <Slot />
}

export default _layout