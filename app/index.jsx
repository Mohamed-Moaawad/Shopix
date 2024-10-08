import { View, Text, Button, StyleSheet, Platform, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const index = () => {
    
    const router = useRouter()

    useEffect(()=>{
        setTimeout(()=>{
            router.replace('Welcome')
        },2000)
    },[])

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/images/app-images/logo/logo.gif')} /> 
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(3)
        }),
        paddingHorizontal: wp(5),
        backgroundColor: '#000',
        width: wp(100),
        justifyContent: 'center',
        alignItems:'center',
    },
    image:{
        width: wp(50),
        resizeMode: 'contain',
    },
})