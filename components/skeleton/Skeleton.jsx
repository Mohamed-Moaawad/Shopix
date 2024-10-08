import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//
import { themes } from '../../constants/Themes'



const Skeleton = () => {
    return (
        <View style={styles.product}>
            <View style={styles.imageBox}></View>

            <View style={styles.info}>

                <View style={styles.text}></View>

                <View style={styles.priceAndCart}>

                    <View style={styles.priceBox}>
                        <View style={styles.sm}></View>
                        <View style={[styles.sm, styles.one]}></View>
                    </View>

                    <View style={styles.button}></View>
                </View>
            </View>
        </View>
    )
}

export default Skeleton

const styles = StyleSheet.create({
    product:{
        width: wp(42),
        padding: 7,
        backgroundColor: themes.colors.bgColor,
        marginBottom: hp(2),
        borderRadius: themes.radius.products,
        shadowColor: '#999',
        shadowOpacity: .9,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 0
        },
        elevation: 6
    },
    imageBox:{
        width: '100%',
        height: hp(15),
        backgroundColor: themes.colors.colorProduct,
        borderRadius: themes.radius.products,
        opacity: 0.8,
        
    },
    text:{
        width: wp(23),
        height: hp(1),
        backgroundColor: '#888',
        opacity: 0.3,
        borderRadius: 2,
        marginVertical: hp(1)
    },
    priceAndCart:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    sm:{
        width: wp(20),
        height: hp(1),
        backgroundColor: themes.colors.colorProduct,
        borderRadius: 2,
        opacity: 1,
        marginVertical: hp(.2)
    },
    one:{
        width: wp(15),
        backgroundColor: '#888',
        opacity: 0.3
    },
    button:{
        width: wp(8),
        height: hp(3),
        backgroundColor: '#888',
        borderRadius: 2,
        opacity: 0.5,
    },
    
})