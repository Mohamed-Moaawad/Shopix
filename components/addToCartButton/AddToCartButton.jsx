import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes'
import Icon from 'react-native-vector-icons/AntDesign'
// Firebase
import { arrayUnion, doc, setDoc, updateDoc } from '@firebase/firestore';
import { auth, db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';


const AddToCartButton = ({type, item}) => {
    const router = useRouter()

    const [loader, setLoader] = useState(false)

    const [user, loading, error] = useAuthState(auth)



    const addToCart = async()=>{

        if(!user){
            router.replace('Login')
        }
        
        if(user){
            setLoader(true)
            await setDoc(doc(db, `cart-${user.uid}`, `${item.id}`),{
                id: item.id,
                title: item.title,
                price: item.price,
                discount: {
                    discount: item.discount.discount,
                    percent: item.discount.percent
                },
                description: item.description,
                category: item.category,
                image: item.image,
                cartQuantity: 1
            })

            await updateDoc(doc(db, 'Products', `${item.id}`),{
                cart: arrayUnion(`${user.uid}`)
            })
        
        setLoader(false)
        }
    }

    return (
        <>
            {type === 'icon' ?(
                <TouchableOpacity onPress={addToCart} disabled={item.cart.includes(`${user?.uid}`)} 
                    style={{opacity: item.cart.includes(`${user?.uid}`) ? 0.5: 1}}
                >
                    {loader ? (
                        <ActivityIndicator size={'small'} color={themes.colors.textDark} />
                    ):(
                        <Icon name="shoppingcart" size={25} color={themes.colors.textDark} />
                    )}
                </TouchableOpacity>
            ):(
                <TouchableOpacity onPress={addToCart} disabled={item.cart.includes(`${user?.uid}`)}
                    style={[styles.btnAddToCart,{opacity: item.cart.includes(`${user?.uid}`) ? 0.5: 1}]}
                >
                    {loader ? (
                        <ActivityIndicator size={'small'} color={themes.colors.textLight} />
                    ):(
                        <>
                            {item.cart.includes(`${user?.uid}`) ?( 
                                <Text style={styles.textAddToCart}>in cart</Text>
                            ):(
                                <Text style={styles.textAddToCart}>add to cart</Text>
                            )}
                        </>
                    )}
                </TouchableOpacity>
            )}
        </>
    )
}

export default AddToCartButton

const styles = StyleSheet.create({
    btnAddToCart:{
        width: wp(55),
        width: '100%',
        height: wp(10),
        backgroundColor: themes.colors.textDark,
        borderRadius: themes.radius.button,
        justifyContent:'center',
        alignItems:'center',
    },
    textAddToCart:{
        color: themes.colors.textLight,
        textTransform:'capitalize',
        fontWeight: '500'
    },
})