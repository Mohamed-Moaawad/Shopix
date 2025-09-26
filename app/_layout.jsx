import { View, Text, Platform, I18nManager } from 'react-native'
import React, { useEffect } from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
    
    useEffect(()=>{
        I18nManager.forceRTL(false)
        I18nManager.allowRTL(false)
    },[])

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen 
                name='(screens)/ProductDetails' 
                options={{
                    title: 'ProductDetails',
                    presentation: Platform.select({
                        ios:  'formSheet' ,
                        android: 'card'
                    })
                }} 
            />
        </Stack>
    )
}

export default _layout