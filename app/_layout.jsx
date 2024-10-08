import { View, Text, Platform } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
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