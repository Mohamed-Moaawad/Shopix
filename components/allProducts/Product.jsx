import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//
import { themes } from '../../constants/Themes'

import Icon from 'react-native-vector-icons/AntDesign'
import { ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AddToCartButton from '../addToCartButton/AddToCartButton';
import AddToFavoriteButton from '../addToFavoriteButton/AddToFavoriteButton';


const Product = ({item}) => {
    const router = useRouter()

    const [loadingImage, setLoadingImage] = useState(true)


    const goToProductDetails = ()=>{
        router.push(
            {
                pathname: 'ProductDetails', 
                params: item.data()
            }
        )
    }

    return (
        <View style={styles.product}>
            {/* start image and favorite button */}
            <TouchableOpacity style={styles.imageBox} onPress={goToProductDetails}>
                
                <Image style={styles.image} source={{uri: item?.data().image}} onLoad={()=>setLoadingImage(false)} alt='product' />
                {loadingImage && (
                    <ActivityIndicator size={'large'} color={themes.colors.textDark} style={{position:'absolute'}} />
                )}

                {/* start add to favorite button */}
                <AddToFavoriteButton type={'product'} item={item.data()} />
                {/* end add to favorite button */}

            </TouchableOpacity>
            {/* end image and favorite button */}

            <View style={styles.info}>

                <Text style={styles.text}>{item.data().title}</Text>

                <View style={styles.priceAndCart}>

                    <View style={styles.priceBox}>
                        {item.data().discount.discount ?(
                            <Text style={styles.price}>${item.data().discount.discount}</Text>
                        ):(
                            <Text style={styles.price}>${item.data().price}</Text>
                        )}
                        {item.data().discount.discount > 0 && (
                            <Text style={styles.percent}> %{item.data().discount.percent.toFixed(2)}</Text>
                        )}
                    </View>


                    {/* start add to cart button */}
                    <AddToCartButton type={'icon'} item={item.data()} quantity={1} />
                    {/* end add to cart button */}
                </View>
            </View>
        </View>
    )
}

export default Product

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
        justifyContent:'center',
        alignItems:'center',
        borderRadius: themes.radius.products,
        overflow:'hidden',
        
    },
    image:{
        width: '80%',
        height: '90%',
        resizeMode: 'contain',
    },

    info:{
        paddingVertical: hp(.5)
    },
    text:{
        color: themes.colors.textDark,
        textTransform: 'capitalize',
        fontSize: hp(1.5),
    },
    priceAndCart:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
    },
    priceBox:{
        flexDirection:'row',
        alignItems:'center',
    },
    price:{
        fontSize: hp(2),
        fontWeight: '700',
        color: themes.colors.textDark,
    },
    percent:{
        fontSize: hp(1.5),
        fontWeight: '500',
        color: themes.colors.textError,
    },
    cartBTN:{
        
    },
})