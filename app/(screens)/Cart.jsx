import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import QuantityButton from '../../components/quantityButton/QuantityButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SkeletonCart from '../../components/skeletonCart/SkeletonCart';
// Firebase
import { useCollection } from 'react-firebase-hooks/firestore';
import { arrayRemove, collection, deleteDoc, doc, updateDoc} from '@firebase/firestore';
import { auth, db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';


const Cart = () => {
    const router = useRouter()
    const [loader, setLoader] = useState(true)

    const [user, loadingCart, errorCart] = useAuthState(auth)

    const [data, loading, error] = useCollection(collection(db, `cart-${user?.uid}`))
    
    
    
    
        // Get total price
        const totalPrice = data?.docs?.reduce((acc, current)=>{
            // const newAcc = acc.data().discount.discount > 0 ? acc.data().discount.discount : acc.data().price 
            // const newCrr = current.data().discount.discount > 0 ? current.data().discount.discount : current.data().price
            // const totalAcc = newAcc * acc.data().cartQuantity
            // const totalCrr = newCrr * current.data().cartQuantity
            // return totalCrr + totalAcc

             // حساب الخصم أو السعر الكامل
                const currentPrice = current.data().discount.discount > 0 ? current.data().discount.discount : current.data().price;
                
                // حساب الكمية
                const currentTotal = currentPrice * current.data().cartQuantity;

                // إضافة المجموع التراكمي للسعر الحالي
                return acc + currentTotal;
            
        },0)

        // Function delete product from cart
        const deleteProductFromCart = async(id)=>{
            await deleteDoc(doc(db, `cart-${user.uid}`, `${id}` ))

            await updateDoc(doc(db, 'Products', `${id}`),{
                cart: arrayRemove(`${user.uid}`)
            })
        }

    
    if(user){
        return (
            <View style={styles.container}>
                {/* start home header */}
                    <HomeHeader />
                {/* end home header */}
    
                <Text style={styles.namePage}>my Cart</Text>

                {/* start table */}
                <View style={styles.table}>
                    <View style={styles.tableHead}>
                        <Text style={styles.tableHeadText}>{data?.docs.length} products</Text>
                    </View>
    
                    <ScrollView style={styles.cartContainer}>
                        {loading && (
                            <>
                                <SkeletonCart />
                                <SkeletonCart />
                            </>
                        )}

                        {data && data.docs.length < 1 && (
                            <View style={styles.emptyBox}>
                                <Text style={styles.emptyText}>cart list is empty</Text>
                                <TouchableOpacity style={styles.emptyBTN} onPress={()=> router.push('Shop')}>
                                    <Text style={styles.emptyBTNText}>go to shop</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        
                        {data && data.docs.map((item)=>(
                            <View key={item.data().id} style={styles.product}>

                                <View style={styles.imageBox}>
                                    <Image source={{uri: item.data().image}} style={styles.image} onLoad={()=> setLoader(false)} />
                                    {loader && (
                                        <ActivityIndicator size={'large'} color={themes.colors.textDark} style={styles.loader} />
                                    )}
                                </View>

                                {/* start info */}
                                <View style={styles.info}>

                                    <Text style={styles.title}>{item.data().title}</Text>

                                    <Text style={styles.category}>category : {item.data().category}</Text>


                                    <View style={styles.priceAndPercent}>
                                        <Text style={styles.price}>Price : ${item.data().discount.discount ?  item.data().discount.discount : item.data().price}</Text>
                                        {item.data().discount.discount > 0 && (
                                            <Text style={styles.discount}>%{item.data().discount.percent.toFixed(2)}</Text>
                                        )}
                                    </View>
        
                                    <View style={styles.buttons}>

                                    {/* start quantity */}
                                    <QuantityButton data={item.data()} user={user} />
                                    {/* end quantity */}
                                    
        
                                    <TouchableOpacity onPress={()=>deleteProductFromCart(item.data().id)}>
                                        <Icon name="delete-outline" size={28} color={themes.colors.textError} />
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}

                    </ScrollView>
                </View>
                {/* end table */}

                {/* start total price */}
                <View style={styles.total}>
                    <Text style={styles.totalText}>Sub total</Text>
                    <Text style={styles.totalPrice}>${totalPrice} {loading && '000.0'}</Text>
                </View>
                {/* end total price */}
                
                {/* start checkout */}
                <View style={styles.checkout}>
                    <TouchableOpacity onPress={()=>{ 
                        router.push({
                            pathname: 'Checkout', 
                            params: {totalPrice}
                        })
                    }}
                        style={[styles.checkoutButton, {opacity: data?.docs.length < 1 ? .7 : 1}]} disabled={data?.docs.length < 1 ? true : false}
                    >
                        <Text style={styles.checkoutButtonText}>Check out</Text>
                    </TouchableOpacity>

                    <Text style={styles.checkoutText}>continue shopping</Text>
                </View>
                {/* end checkout */}

            </View>
        )
    }
}


export default Cart

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(3)
        }),
        paddingHorizontal: wp(5),
        // alignItems:'center',
        backgroundColor: themes.colors.bgColor,
        width: wp(100)
    },
    namePage:{
        fontSize: wp(7.3),
        fontWeight: '700',
        textTransform:'capitalize',
        
    },
/////////////////////////////

    table:{
        width: '100%',
    },
    tableHead:{
        width: '100%',
        marginTop: hp(1.5),
        paddingVertical: hp(1),
        borderBottomWidth: wp(.7),
        borderBlockColor: themes.colors.textDark,
    },
    tableHeadText:{
        textTransform: 'capitalize',
        fontSize: hp(1.6),
    },
/////////////////////////////
    cartContainer:{
        maxHeight: hp(50),
        minHeight: hp(50),
    },
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
    },
    image:{
        width: '90%',
        height: '100%',
        resizeMode: 'contain'
    },
    loader:{
        position: 'absolute',
        top: '40%',
        left: '40%',
    },
    info:{
        width: '64%',
    },
    title:{
        fontWeight: '500',
        color: themes.colors.textDark,
    },
    category:{
        fontWeight: '300',
        marginTop: hp(.5)
    },
    priceAndPercent:{
        flexDirection:'row',
        alignItems:'flex-end',
        marginVertical: hp(1.7)
    },
    discount:{
        fontSize: wp(3),
        color: themes.colors.textError,
        marginLeft: wp(1.3)
    },
    price:{
        fontSize: wp(3.5),
        fontWeight:'800',
    },
    buttons:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
//////////////////////////
    total:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingVertical: hp(1),
    },
    totalText:{
        fontWeight: '600',
    },
    totalPrice:{
        fontSize: wp(5.3),
        fontWeight: '800',
    },
    checkout:{
        width: '100%',
        alignItems: 'center',
        gap: hp(3),
        marginTop: hp(3.5)
    },
    checkoutButton:{
        width: '100%',
        height: hp(5),
        backgroundColor: themes.colors.textDark,
        borderRadius: themes.radius.button,
        justifyContent:'center',
        alignItems:'center'
    },
    checkoutButtonText:{
        textTransform: 'capitalize',
        color: themes.colors.textLight
    },
    checkoutText:{
        textTransform: 'capitalize',
        color: themes.colors.textDark
    },
     /////////////////////////////
    emptyBox:{
        width: '100%',
        alignItems:'center',
        marginTop: hp(2),
    },
    emptyText:{
        fontSize: hp(3),
        textTransform: 'capitalize',
        
    },
    emptyBTN:{
        width: wp(40),
        height: hp(5),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: themes.colors.textDark,
        borderRadius: themes.radius.button,
        marginTop: hp(2),
    },
    emptyBTNText:{
        fontSize: hp(1.5),
        textTransform: 'capitalize',
        color: themes.colors.textLight,
    },
})