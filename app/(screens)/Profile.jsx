import { ActivityIndicator, Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import { useRouter } from 'expo-router';

import Ionicons from 'react-native-vector-icons/Ionicons'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config';
import Moment from 'react-moment';
import { signOut } from '@firebase/auth';



const Profile = () => {
    const router = useRouter()

    const [user, loading , error] = useAuthState(auth)

    const [loader, setLoader] = useState(false)

    const logOut = async()=>{
        try{
            setLoader(true)

            await signOut(auth)

            setLoader(false)

            router.replace('Home')

        }catch(err){
            Alert.alert('ERROR :', err)
            
        }
    }

    if(!user && !loading){
        router.replace('Login')
    }

    if(user && !loading){
        return (
            <View style={styles.container}>

                    {/* start head */}
                    <View style={styles.head}>
                        <TouchableOpacity style={styles.backBTN} onPress={()=> router.back()}>
                            <Ionicons name="arrow-back" size={25} color={themes.colors.textDark} />
                        </TouchableOpacity>
    
                        <Text style={styles.headText}>my Profile</Text>

                        <TouchableOpacity style={styles.logOutBTN} onPress={logOut}>
                            {loader ? (
                                <ActivityIndicator size={'small'} color={themes.colors.textLight} />
                            ):(
                                <Ionicons name="log-out-outline" size={25} color={themes.colors.textLight} />
                            )}
                        </TouchableOpacity>
                    </View>
                    {/* end head */}
    
                    <View style={styles.profileBox}>
                        
                        <View style={styles.avatarBox}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {user.displayName.charAt(0)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.informationUser}>
                            <View style={styles.infoBox}>
                                <Text style={styles.textTitle}>my email</Text>
                                <Text style={styles.text}>{user.email}</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.textTitle}>my name</Text>
                                <Text style={styles.text}>{user.displayName}</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.textTitle}>id</Text>
                                <Text style={styles.text}>{user.uid}</Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.textTitle}>last signIn</Text>
                                <Text style={styles.text}>
                                    <Moment element={Text} fromNow style={[styles.text, styles.date]} >
                                        {user.metadata.lastSignInTime}
                                    </Moment>
                                </Text>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.textTitle}>account created</Text>
                                <Moment element={Text} fromNow  style={[styles.text, styles.date]}>
                                    {user.metadata.creationTime}
                                </Moment>
                            </View>
                        </View>
    
                    </View>
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(3)
        }),
        paddingHorizontal: wp(5),
        backgroundColor: themes.colors.bgColor,
        width: wp(100),
        paddingTop: hp(15)
    },
    head:{
        width: wp(100),
        position:'absolute',
        top: 0,
        left: 0,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor: themes.colors.textDark,
        height: hp(15),
        paddingHorizontal: wp(5),
        borderBottomRightRadius: wp(5),
        borderBottomLeftRadius: wp(5),
        paddingTop: hp(4)
    },
    backBTN:{
        width: wp(10),
        height: wp(10),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: themes.colors.textLight,
        borderRadius: themes.radius.button,
    },
    headText:{
        color: themes.colors.textLight,
        fontSize: wp(5),
        textTransform: 'capitalize',
        fontWeight:'600',
        color: themes.colors.textLight
    },
    logOutBTN:{
        width: wp(10),
        height: wp(10),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: themes.colors.textError,
        borderRadius: themes.radius.button,
    },
    ////////////////////////////////////
    profileBox:{
        width: '100%',
    },
    avatarBox:{
        width: '100%',
        alignItems:'center',
        paddingVertical: hp(3),
    },
    avatar:{
        width: wp(20),
        height: wp(20),
        backgroundColor: '#228B22',
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
        fontSize: wp(7),
        textTransform:'capitalize',
        fontWeight:'700',
        color: themes.colors.textLight
    },
    informationUser:{
        width: '100%',
    },
    infoBox:{
        paddingVertical: hp(1.5),
        gap: hp(1),
        borderBottomWidth: hp(0.2), 
        borderBottomColor: themes.colors.textGray,
        marginBottom: hp(1)

    },
    textTitle:{
        fontSize: wp(4),
        textTransform:'capitalize',
        fontWeight:'500',
        color: themes.colors.textDark,
        // opacity: 0.5
        // color: themes.colors.textGray
    },
    text:{
        fontSize: wp(3.4),
        fontWeight:'500',
        paddingLeft:wp(3)
    },
    date:{
        opacity: 0.3,
    },
})