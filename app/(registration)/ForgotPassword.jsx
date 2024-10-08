import { ActivityIndicator, Alert, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons';

import LogoImage from '../../components/logoImage/LogoImage';
import { themes } from '../../constants/Themes';
import { useRouter } from 'expo-router';
// Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/config';


const ForgotPassword = () => {
    const router = useRouter()


    const [email, setEmail] = useState('')
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(false)

    // Function Reset Password
    const resetPassword = async()=>{
        setLoading(true)

        await sendPasswordResetEmail(auth, email)
        .then(() => {
            // ..
            setEmail('')
            Alert.alert( "Successfully", "we`ve resent the confirmation ot email, Check your inbox.",[
                {
                    text: 'Ok',
                    onPress:()=> console.log('hi'),
                    style:'cancel'
                    
                }
            ])
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..            
            if(errorCode === 'auth/missing-email'){
                setErrorText('Please enter your email')
            }else if(errorCode === 'auth/invalid-email'){

                setErrorText('invalid email')
            }
        });

        setLoading(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* start logo */}
                <LogoImage />
                {/* end logo */}

                <View style={styles.form}>
                    {/* start title */}
                    <View style={styles.title}>
                        <Text style={styles.titleLg}>Enter your email address</Text>
                        <Text style={styles.titleSm}>To reset your password, please enter your email address you may have used with Shopix.</Text>
                    </View>
                    {/* end title */}
                    
                    <TextInput 
                        defaultValue={email}
                        onChangeText={(value)=> {
                            setEmail(value)
                            setErrorText('')
                        }}
                        autoCapitalize='none' 
                        style={[styles.input,{color: errorText !== '' ? themes.colors.textError : themes.colors.textDark}]} 
                        placeholder='Email' 
                        placeholderTextColor={themes.colors.textGray} 
                    />
                    {errorText !== '' && <Text style={styles.errorMessage}>{errorText}</Text>}
                    
                    <TouchableOpacity onPress={resetPassword}
                        style={styles.sendButton} 
                    >
                        {loading ? (
                            <ActivityIndicator color={themes.colors.textLight} size={'small'} />
                        ):(
                        <Text style={{textAlign:'center', textTransform:'capitalize', color: themes.colors.textLight}}>Send</Text>
                        )}
                    </TouchableOpacity>


                </View>

                {/* back to login button */}
                <TouchableOpacity onPress={()=> router.back()}
                        style={{flexDirection:'row',
                        alignItems:'center',
                        marginTop:hp(2),
                    }}>
                    <Text style={{marginRight:wp(1 )}}>
                        <Icon name="arrow-back" size={25} color={themes.colors.textDark} />
                    </Text>
                    <Text style={{color:themes.colors.textDark}}>
                        Back to login
                    </Text>
                </TouchableOpacity>

            </View>
        </TouchableWithoutFeedback>
    )
    }

export default ForgotPassword

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        alignItems:'center',
        backgroundColor: themes.colors.bgColor,
    },
    form:{
        width: wp(90),
        marginTop:hp(4),
    },
    title:{
        width: '100%',
        marginTop:hp(3)
    },
    titleLg:{
        fontSize: wp(7),
        textAlign:'center',
        fontWeight:'600',
        color: themes.colors.textDark
    },
    titleSm:{
        // fontSize: wp()
        textAlign:'center',
        color: themes.colors.textGray,
        marginVertical: hp(1),
        color: themes.colors.textGray
    },
    input:{
        width:'100%',
        height: hp(5.8),
        paddingHorizontal: 12,
        borderRadius: themes.radius.input,
        backgroundColor:'#eee',
        marginTop: hp(4.5),
    },
    errorMessage:{
        // marginVertical: hp(.4),
        fontSize: hp(1.29),
        color: themes.colors.textError,
    },
    sendButton:{
        width: '100%',
        height: hp(5),
        backgroundColor:themes.colors.textDark,
        marginTop:hp(4),
        borderRadius: themes.radius.button,
        justifyContent:'center',
    },

})