import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';

import Ionicons from 'react-native-vector-icons/Ionicons'
// Firebase
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from '@firebase/firestore';
import { db } from '../../firebase/config';
import AddToCartButton from '../../components/addToCartButton/AddToCartButton';
import AddToFavoriteButton from '../../components/addToFavoriteButton/AddToFavoriteButton';

const ProductDetails = () => {
    const router = useRouter()
    const item = useLocalSearchParams()
    const [data, loading, error] = useDocument(doc(db, 'Products', `${item.id}`))
    
    const [isLoadingImage, setIsLoadingImage] = useState(true)



    if(data && !loading){
        return (
            <View style={styles.container}>

                {/* start box image */}
                <View style={styles.imageBox}>
                    {/* start head */}
                    <View style={styles.head}>
                        <TouchableOpacity style={styles.backBTN} onPress={()=> router.back()}>
                            <Ionicons name="arrow-back" size={25} color={themes.colors.textLight} />
                        </TouchableOpacity>
    
                        <AddToFavoriteButton type={'details'} item={data.data()} />
                    </View>
                    {/* end head */}
    
                    <Image source={{uri: data?.data()?.image}} style={styles.image} onLoad={()=> setIsLoadingImage(false)} />
                    {isLoadingImage && (
                        <ActivityIndicator size={'large'} color={themes.colors.textDark} style={styles.loader} />
                    )}

    
                </View>
                {/* end box image */}

                {/* start box details */}
                <View style={styles.detailsBox}>

                    <Text style={styles.title}>{data?.data()?.title}</Text>
    
                    <Text style={styles.category}>category : {data?.data()?.category}</Text>

                    {/* start price and discount */}
                    <View style={styles.prices}>
                        <View style={styles.priceAndPercent}>
                            {data?.data()?.discount.discount ? (
                                <Text style={styles.price}>${data?.data()?.discount.discount}</Text>
                            ):(
                                <Text style={styles.price}>${data?.data()?.price}</Text>
                            )}

                            {data?.data()?.discount.discount > 0 && (
                                <Text style={styles.discount}>
                                    %{ data?.data()?.discount.percent > 0 ? data.data().discount.percent.toFixed(2) : null}
                                </Text>
                            )}
                        </View>
                        
                        
                        {data?.data()?.discount.discount > 0 && (
                            <Text style={styles.oldPrice}>
                                list Price: {' '}
                                <Text style={styles.linePrice}>
                                    ${data.data().price > 0 ? data.data().price : null}
                                </Text>
                            </Text>
                        )}
                        
                    </View>
                    {/* end price and discount */}


                    {/* start number in stock */}
                    {data?.data()?.quantity < 5 ?(
                        data.data().quantity < 1 ? (
                            <Text style={[styles.stockText, styles.stockWarning]}>Out of stock</Text>
                        ):(
                            <Text style={[styles.stockText, styles.stockWarning]}>Only {data.data().quantity} left in Stock</Text>
                        )
                    ):(
                        <Text style={styles.stockText}>In Stock</Text>
                    )}
                    {/* end number in stock */}

                    
                    <ScrollView style={{marginBottom: hp(8)}}>
                        <Text style={styles.description}>{data?.data()?.description}</Text>
                        <Text style={styles.description}>{data?.data()?.description}</Text>
                    </ScrollView>
                    

                    <View style={styles.buttons}>
                        {/* start add to cart button */}
                        <AddToCartButton type={'text'} item={data.data()} />
                        {/* end add to cart button */}
                    </View>
                </View>
                {/* end box details */}

            </View>
        )
    }
}

export default ProductDetails

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(6)
        }),
        paddingBottom: hp(0),
        backgroundColor: themes.colors.colorProduct,
        width: wp(100)
    },
    imageBox:{
        padding: wp(1),
        paddingBottom: 0,
        width: '100%',
        height: hp(40),
        justifyContent:'space-between',
        paddingHorizontal: wp(5),
    },
    head:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    backBTN:{
        width: wp(10),
        height: wp(10),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#000',
        borderRadius: themes.radius.button,
    },
    image:{
        width: '100%',
        height: '87%',
        resizeMode:'contain',
    },
    loader:{
        position:'absolute',
        top: '45%',
        left: wp(45),
    },
    detailsBox:{
        backgroundColor: themes.colors.bgColor,
        width: wp(100),
        paddingHorizontal: wp(5),
        paddingVertical: hp(3),
        borderTopStartRadius: wp(8),
        borderTopEndRadius: wp(8),
        flex:1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: .5,
        elevation: 6,
    },

    // ////////////
    title:{
        fontSize: wp(5.5),
        fontWeight:'700',
        textTransform:'capitalize',
    },
    category:{
        fontSize: wp(3.5),
        fontWeight:'500',
        textTransform:'capitalize',
        marginVertical: hp(1)
    },
    prices:{
        
    },
    priceAndPercent:{
        flexDirection:'row',
        alignItems:'flex-end',
    },
    discount:{
        color: themes.colors.textError,
        marginBottom: hp(1),
        marginLeft: wp(1.3)
    },
    price:{
        fontSize: wp(7),
        fontWeight:'800',
        marginVertical: hp(.5)
    },
    oldPrice:{
        fontSize: wp(3.5),
        fontWeight:'600',
        marginVertical: hp(.5),
        color: '#666',

    },
    linePrice:{
        textDecorationLine: 'line-through',
        
    },
    //////////////////
    description:{
        marginTop: hp(1.5),
        fontSize: hp(1.6),
        // lineHeight: hp(2.3),
    },
    stockText:{
        fontSize: hp(1.5),
        color: 'green'
    },
    stockWarning:{
        color: themes.colors.textError
    },
    /////////////////////////////////////////
    buttons:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        position:'absolute',
        bottom: hp(4),
        left: 0,
        width: wp(100),
        paddingHorizontal: wp(5),
    },


})