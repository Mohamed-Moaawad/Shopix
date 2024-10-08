import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const LogoImage = () => {
    return (
        <View style={styles.imageBox}> 
            <Image style={styles.image} resizeMode='contain' source={require('../../assets/images/app-images/logo/logo-dark.png')} />
        </View>
    )
}

export default LogoImage

const styles = StyleSheet.create({
    imageBox:{
        width: wp(90),
        padding:20,
        alignItems:'center',
        marginTop:30
    },
    image:{
        width:wp(30)
    },
})