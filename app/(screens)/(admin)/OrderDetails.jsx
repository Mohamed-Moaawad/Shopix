import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../../constants/Themes';

import Icon from 'react-native-vector-icons/Octicons';


// Firebase
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../../../firebase/config';


const OrderDetails = () => {
    const {id} = useLocalSearchParams()

    const [data, loading, error] = useDocument(doc(db, 'Orders', `${id}`))


    const completeOrder = ()=>{
        Alert.alert(
            'Order Delivery Confirmation',
            'Have you confirmed that the order has been successfully delivered to the customer? Please confirm to proceed.',
            [
                {
                    text: 'Cancel',
                    onPress: ()=> console.log('cancel'),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: ()=>{
                        updateDoc(doc(db, 'Orders', `${id}`),{
                            reached: true
                        })
                    }
                },
            ],
            { cancelable: false }
        )
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>OrderDetails</Text>
            </View>

            <Text style={styles.titleName}>products :</Text>
            <View style={styles.boxDetails}>
                {data?.data()?.products.map((product, idx)=>(
                    <ScrollView key={idx} style={styles.productsInfo} horizontal showsHorizontalScrollIndicator={false}>
                        <Text>{idx + 1}# </Text>
                        <Text> || Title : <Text style={styles.info}>{product.title}</Text></Text>
                        <Text> || Price : <Text style={styles.info}>${product.discount.discount > 0 ? product.discount.discount : product.price } </Text></Text>
                        <Text> || Quantity : <Text style={styles.info}>{product.cartQuantity}</Text></Text>
                    </ScrollView>
                ))}
            </View> 

            <Text style={styles.titleName}>total price :</Text>
            <View style={styles.boxDetails}>
                <Text style={[styles.textItem, styles.price]}>${data?.data().price}</Text>
            </View>

            <Text style={styles.titleName}>user :</Text>
            <View style={styles.boxDetails}>
                <Text style={styles.textItem}>name :  {' '}
                        <Text style={styles.textData}>{data?.data().user.userName}</Text>
                </Text>
                <Text style={styles.textItem}>email :  {' '}
                        <Text style={styles.textData}>{data?.data().user.email}</Text>
                </Text>
                <Text style={styles.textItem}>phone :  {' '}
                        <Text style={styles.textData}>{data?.data().user.phone}</Text>
                </Text>
                <Text style={styles.textItem}>whatsApp :  {' '}
                        <Text style={styles.textData}>{data?.data().user.whatsApp}</Text>
                </Text>

                <Text style={styles.textItem}>state :  {' '}
                        <Text style={styles.textData}>{data?.data().user.state}</Text>
                </Text>
                <Text style={styles.textItem}>city :  {' '}
                        <Text style={styles.textData}>{data?.data().user.city}</Text>
                </Text>
                <Text style={styles.textItem}>neighborhood :  {' '}
                        <Text style={styles.textData}>{data?.data().user.neighborhood}</Text>
                </Text>
                <Text style={styles.textItem}>street : {' '}
                        <Text style={styles.textData}>{data?.data().user.street}</Text>
                </Text>
            </View>

            <TouchableOpacity onPress={completeOrder} disabled={data?.data()?.reached}
                style={[styles.button, {opacity: data?.data()?.reached ? .5 : 1}]} 
            >
                <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(3)
        }),
        paddingHorizontal: wp(5),
        backgroundColor: themes.colors.bgColor,
        width: wp(100)
    },
    title: {
        width: '100%',
        padding: wp(4),
        borderBottomWidth: wp(0.1),
        borderBottomColor: themes.colors.textGray,
        marginVertical: hp(1.5),
    },
    titleText: {
        fontSize: hp(2.5),
        textTransform:'capitalize',
        textAlign:'center',
        fontWeight:'600',
        color: themes.colors.textDark,
    },
    ////////////////////////////
    titleName: {
        fontSize: hp(1.8),
        textTransform:'capitalize',
        fontWeight:'600',
        color: themes.colors.textDark,
        marginBottom: hp(.5)
    },
    boxDetails: {
        marginBottom: hp(2),
        paddingLeft: wp(4)
    },
    productsInfo: {
        marginVertical: hp(1)
    },
    info: {
        color: '#228B22',
        textDecorationColor:'#000',
        textDecorationStyle: 'solid',
        textDecorationLine:'underline'
    },
    textItem: {
        marginBottom: hp(.7),
        fontWeight:'600',
        textTransform:'capitalize',
        
    },
    price: {
        fontSize:hp(2.3),
        fontWeight:'700',
    },
    textData: {
        fontWeight:'400',
        textTransform:'none',
        marginBottom: hp(.7),
        paddingLeft: wp(5)
    },
    ////////////////////////////
    button: {
        width: '100%'
    },
    button: {
        width: '100%',
        height: hp(5),
        backgroundColor: '#228B22',
        marginTop: hp(6),
        borderRadius: themes.radius.button,
        justifyContent: 'center',
        alignItems:'center'

    },
    buttonText: {
        color: themes.colors.textLight,
        textTransform: 'capitalize',
        fontSize: hp(2),
    },
})