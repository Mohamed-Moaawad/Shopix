import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';


const SkeletonCart = () => {
    return (
        <View style={styles.product}>

            <View style={styles.imageBox}>
                <View style={styles.image}></View>
            </View>

            {/* start info */}
            <View style={styles.info}>

                <View style={styles.title}></View>

                <View style={styles.category}></View>

                <View style={styles.priceAndPercent}>
                    <View style={styles.price}></View>
                </View>

                <View style={styles.buttons}>

                {/* start quantity */}
                <View style={styles.quantity}></View>
                {/* end quantity */}
                

                <View style={styles.delete}></View>
                </View>
            </View>
        </View>
    )
}

export default SkeletonCart

const styles = StyleSheet.create({
    product:{
        width: '100%',
        marginBottom: hp(1),
        paddingVertical: hp(2),
        flexDirection:'row',
        gap: wp(2),
        borderBottomWidth: wp(.3),
        borderBottomColor: themes.colors.textGray
    },
    imageBox:{
        width: '34%',
        height: hp(15),
        borderRadius: themes.radius.products,
        backgroundColor: themes.colors.colorProduct,
    },
    image:{
        width: '90%',
        height: '100%',
        resizeMode: 'contain'
    },
    info:{
        width: '64%',
    },
    title:{
        width: wp(22),
        height: wp(3),
        borderRadius: themes.radius.products,
        backgroundColor: themes.colors.colorProduct,
    },
    category:{
        width: wp(15),
        height: hp(1),
        borderRadius: themes.radius.products,
        backgroundColor: themes.colors.colorProduct,
        marginTop: hp(1),
    },
    priceAndPercent:{
        flexDirection:'row',
        alignItems:'flex-end',
        marginVertical: hp(1.7)
    },
    price:{
        width: wp(15),
        height: wp(6),
        borderRadius: themes.radius.products,
        backgroundColor: themes.colors.colorProduct,
    },
    buttons:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    quantity:{
        width: wp(23),
        height: wp(6),
        borderRadius: themes.radius.products,
        backgroundColor: themes.colors.colorProduct,
    },
    delete:{
        width: wp(12),
        height: wp(6),
        borderRadius: themes.radius.products,
        backgroundColor: themes.colors.colorProduct,
    },
})