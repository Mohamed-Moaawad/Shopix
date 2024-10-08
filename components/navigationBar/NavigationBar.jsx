import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/AntDesign';

import Entypo from 'react-native-vector-icons/Entypo';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { themes } from '../../constants/Themes';
import { useRouter } from 'expo-router';
// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/config';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from '@firebase/firestore';



const NavigationBar = () => {
    const router = useRouter()

    const [user, loading, error] = useAuthState(auth)

    const [userData, loadingData, errorData] = useDocument(doc(db, 'Users' , `${user?.uid}`))

    if(!user){
        return (
            <View style={styles.container}>
                <View  style={styles.containerBox}>
                    <TouchableOpacity onPress={()=> router.push('Shop')}>
                        <Entypo name="shop" size={23} color={themes.colors.textDark} />
                        {/* <Text style={styles.text}>shop</Text> */}
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={()=> router.push('Wishlist')}>
                        <Icon name="hearto" size={23} color={themes.colors.textDark} />
                        {/* <Text style={styles.text}>favorite</Text> */}
                    </TouchableOpacity>

                    <View style={styles.homeIcon}>
                        <TouchableOpacity onPress={()=> router.push('Home')}
                        style={styles.homeIconBTN}>
                            <Icon name="home" size={28} color={themes.colors.textLight} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={()=> router.push('Cart')}>
                        <Icon name="shoppingcart" size={23} color={themes.colors.textDark} />
                        {/* <Text style={styles.text}>cart</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> router.push('Profile')}>
                        <Icon name="user" size={23} color={themes.colors.textDark} />
                        {/* <Text style={styles.text}>profile</Text> */}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    if(user && userData && !loading && !loadingData){
        return (
            <View style={styles.container}>
                <View  style={styles.containerBox}>
    
                    {userData?.data()?.type === 'admin'? (
                        <>
                            <TouchableOpacity onPress={()=> router.push('Admin')}>
                                <Icon name="setting" size={23} color={themes.colors.textDark} />
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=> router.push('Shop')}>
                                <Entypo name="shop" size={23} color={themes.colors.textDark} />
                            </TouchableOpacity>
    
                            <View style={styles.homeIcon}>
                                <TouchableOpacity onPress={()=> router.push('Home')}
                                style={styles.homeIconBTN}>
                                    <Icon name="home" size={28} color={themes.colors.textLight} />
                                </TouchableOpacity>
                            </View>
    
                            <TouchableOpacity onPress={()=> router.push('Orders')}>
                                <Ionicons name="notifications-outline" size={23} color={themes.colors.textDark} />
                            </TouchableOpacity>
    
                            <TouchableOpacity onPress={()=> router.push('Profile')}>
                                <Icon name="user" size={23} color={themes.colors.textDark} />
                            </TouchableOpacity>
                        </>
                    ):(
                        <>
                            <TouchableOpacity onPress={()=> router.push('Shop')}>
                                <Entypo name="shop" size={23} color={themes.colors.textDark} />
                                {/* <Text style={styles.text}>shop</Text> */}
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={()=> router.push('Wishlist')}>
                                <Icon name="hearto" size={23} color={themes.colors.textDark} />
                                {/* <Text style={styles.text}>favorite</Text> */}
                            </TouchableOpacity>

                            <View style={styles.homeIcon}>
                                <TouchableOpacity onPress={()=> router.push('Home')}
                                style={styles.homeIconBTN}>
                                    <Icon name="home" size={28} color={themes.colors.textLight} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={()=> router.push('Cart')}>
                                <Icon name="shoppingcart" size={23} color={themes.colors.textDark} />
                                {/* <Text style={styles.text}>cart</Text> */}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=> router.push('Profile')}>
                                <Icon name="user" size={23} color={themes.colors.textDark} />
                                {/* <Text style={styles.text}>profile</Text> */}
                            </TouchableOpacity>
                        </>
                    )}
                    
                </View>
            </View>
        )
    }
}

export default NavigationBar

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#eee',
        width: wp(90),
        position:'absolute',
        bottom: hp(3),
        left: wp(4),
        padding: 2,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: Platform.select({
            ios: 27,
            android: 24
        }),
        shadowColor:'#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,  
        shadowOffset:{
            width: 0,
            height: 0
        },
        elevation: 5
    },  
    containerBox:{
        // backgroundColor:'blue',
        width: '85%',
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row'
    },  
    text:{
        fontSize: hp(1.1),
        textAlign:'center'
    },  
    homeIcon:{
        width: wp(16),
        height: wp(16),
        overflow:'hidden',
        borderRadius: 50,
        backgroundColor:themes.colors.textDark,
        // left: '40%',
        transform: [{translateY: -30, }],
        shadowColor:'#000',
        shadowOpacity: .25,
        shadowRadius: 3,  
        shadowOffset:{
            width: 0,
            height: 9
        },
        elevation: 5
    },  
    homeIconBTN:{
        width: '100%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
    },  
})