import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';


const HomeHeader = () => {
    const [user, loading, error] = useAuthState(auth)

    return (
        <View style={styles.header}>
            <Image style={styles.logo} source={require('../../assets/images/app-images/logo/logo-dark.png')} resizeMode='contain' alt='logo' />

            {/* <Text>Home</Text> */}

            <View style={styles.userInfo}>
                <TouchableOpacity>
                    {user ? (
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user.displayName.charAt(0)}
                            </Text>
                        </View>
                    ):(
                        <View style={styles.avatarImage}>
                            <Image style={{width:'90%', height:'90%'}} source={require('../../assets/images/app-images/user.png')} resizeMode='contain' alt='avatar'/>
                        </View>
                    )}
                </TouchableOpacity>

                <View style={styles.userName}>
                    <Text style={styles.name}>{user?.displayName || 'username' }</Text>
                    <Text style={styles.email}>{user?.email || 'user@mail.com' }</Text>
                </View>
            </View>
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    header:{
        width: wp(90),
        // backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        // paddingHorizontal: wp(5),
    },
    logo:{
        width: wp(20),
        
    },
    userInfo:{
        flexDirection:'row-reverse',
        alignItems:'center',
    },
    avatarImage:{
        width: wp(12),
        height: wp(12),
        borderRadius: 50,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    userName:{
        alignItems:'flex-end',
        marginRight: wp(1),
    },
    name:{
        fontSize: hp(1.9),
        fontWeight: '500',
        color: themes.colors.textDark
    },
    email:{
        fontSize: hp(1.4),
        fontWeight: '400',
        color: themes.colors.textGray
    },
    avatar:{
        width: wp(11),
        height: wp(11),
        backgroundColor: '#000',
        borderRadius: 50,
        alignItems:'center',
        justifyContent:'center',
        shadowColor:'#000',
        shadowRadius: 1,
        shadowOffset: {
            width: 0,
            height:1,
        },
        shadowOpacity: 0.5,
        elevation:6,
    },
    avatarText:{
        fontSize: wp(5),
        textTransform:'capitalize',
        fontWeight:'700',
        color: themes.colors.textLight
    },
})