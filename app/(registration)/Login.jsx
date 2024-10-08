import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// components
import LogoImage from '../../components/logoImage/LogoImage';
import Form from '../../components/form/Form';
// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/config';
import { themes } from '../../constants/Themes';


const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorText, setErrorText] = useState('')

    const [loading, setLoading] = useState(false)

    const [statusEmailError, setStatusEmailError] = useState(false)
    const [statusPassError, setStatusPassError] = useState(false)



    // Function log in User
    const loginUser = async()=>{

        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            router.push('Home')

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            
            if(errorCode === "auth/invalid-email" && email === ""){
                setErrorText('Please enter an email address.')
                setStatusEmailError(true)
            }
            if(errorCode === "auth/invalid-email" && email !== "" && !email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)){
                setErrorText("Please include an '@' or ' . ' in the email address. ")
                setStatusEmailError(true)
            }
            if(errorCode === "auth/missing-password"){
                setErrorText('Please enter an password.')
                setStatusPassError(true)
            }
            if(errorCode === "auth/invalid-credential"){
                setErrorText('We do not have an account with this data.')
                // setStatusPassError(true)
                // setStatusEmailError(true)

            }
        });

        setLoading(false)

    } 

    return (
        <>
            <StatusBar barStyle={'dark-content'}/>
            <View  style={styles.container}>
                {/* start logo image */}
                    <LogoImage />
                {/* end logo image */}

                {/* start form */}
                <Form 
                    titleLg='welcome back' 
                    titleSm='Login to your account' 
                    forgotPass={true} 
                    username={false} 
                    screenName='login'

                    handleSign={loginUser}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    errorText={errorText}
                    setErrorText={setErrorText}
                    loading={loading}
                    statusEmailError={statusEmailError}
                    setStatusEmailError={setStatusEmailError}
                    statusPassError={statusPassError}
                    setStatusPassError={setStatusPassError}
                />
                {/* end form */}
                
            </View>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        // alignItems:'center',
        backgroundColor: themes.colors.bgColor,

    },
})