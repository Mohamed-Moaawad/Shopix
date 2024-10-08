import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import { useDocument } from 'react-firebase-hooks/firestore';



const QuantityButton = ({data, user}) => {

    const [value, loading, error] = useDocument(doc(db, 'Products', `${data.id}`))



    const decreaseQuantity = async()=>{
        
        if(value.data().quantity > data.cartQuantity){
            await updateDoc(doc(db, `cart-${user.uid}`, `${data.id}`),{
                cartQuantity: data.cartQuantity + 1
            })
        }
    }
    const increaseQuantity = async()=>{
        if(data.cartQuantity > 1){
            await updateDoc(doc(db, `cart-${user.uid}`, `${data.id}`),{
                cartQuantity: data.cartQuantity - 1
            })
        }
    }

    return (
        <View style={styles.countQuantity}>

            <TouchableOpacity style={styles.countBTN} onPress={decreaseQuantity}>
                <Text style={styles.textBTN}>+</Text>
            </TouchableOpacity>

            <Text style={styles.countText}>{data.cartQuantity}</Text>

            <TouchableOpacity style={styles.countBTN} onPress={increaseQuantity}>
                <Text style={styles.textBTN}>-</Text>
            </TouchableOpacity>

        </View>
    )
}

export default QuantityButton

const styles = StyleSheet.create({
    countQuantity:{
        flexDirection:'row',
        alignItems:'center',
        shadowColor: '#eee',
        shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 1,
        borderRadius: themes.radius.button,
        overflow:'hidden',
        borderColor: '#eee',
        borderWidth: 1,
        backgroundColor: themes.colors.textLight

    },
    countBTN:{
        justifyContent:'center',
        alignItems:'center',
        width: wp(10),
        height: wp(10),
        backgroundColor: themes.colors.colorProduct,
    },
    textBTN:{
        fontSize: hp(3),
        lineHeight: hp(3),
        // backgroundColor:'red'
    },
    countText:{
        fontSize: hp(2.5),
        marginHorizontal: wp(2),
    },
})