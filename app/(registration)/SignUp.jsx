import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// components
import LogoImage from '../../components/logoImage/LogoImage';
import Form from '../../components/form/Form';
import Providers from '../../components/providers/Providers';
// firebase
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { themes } from '../../constants/Themes';




const SignUp = () => {
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorText, setErrorText] = useState('')

    const [loading, setLoading] = useState(false)

    const [statusNameError, setStatusNameError] = useState(false)
    const [statusEmailError, setStatusEmailError] = useState(false)
    const [statusPassError, setStatusPassError] = useState(false)

    // Function Create New User
    const createNewUser = async()=>{
        setLoading(true)

        if(name !== ''){
            await createUserWithEmailAndPassword(auth, email, password)
            .then(async(userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                await updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });

                setDoc(doc(db, 'Users', `${user.uid}`),{
                    id: user.uid,
                    username: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                    type: 'user'
                })

                setName('')
                setEmail('')
                setPassword('')

                router.replace('Login')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                if(errorCode === "auth/invalid-email" && email === ""){
                    setErrorText('Please enter an email address.')
                    setStatusEmailError(true)
                }
                if(errorCode === "auth/invalid-email" && email !== "" && !email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)){
                    setErrorText("Please include an '@' or ' . ' in the email address. ")
                    setStatusEmailError(true)
                }
                if(errorCode === "auth/missing-password"){
                    setErrorText('Please enter a password.')
                    setStatusPassError(true)
                }
                if(errorCode === "auth/weak-password"){
                    setErrorText('password must be at least 6 char')
                    setStatusPassError(true)
                }
            });
        }else{
            setErrorText('Please enter your username')
            setStatusNameError(true)
        }

        setLoading(false)
        
    }


    return (
        <>
            <StatusBar barStyle={'dark-content'}/>
            <View style={styles.container}>
                {/* start logo image */}
                <LogoImage />
                {/* end logo image */}

                {/* start form */}
                <Form 
                    titleLg='Register'
                    titleSm='Create your new account'
                    username={true}
                    handleSign={createNewUser}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    errorText={errorText}
                    setErrorText={setErrorText}
                    loading={loading}

                    statusNameError={statusNameError}
                    setStatusNameError={setStatusNameError}
                    statusEmailError={statusEmailError}
                    setStatusEmailError={setStatusEmailError}
                    statusPassError={statusPassError}
                    setStatusPassError={setStatusPassError}
                />
                {/* end form */}

                {/* start providers */}
                {/* <Providers /> */}
                {/* end providers */}
            </View>
        </>
    )
}

export default SignUp

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        // alignItems:'center',
        backgroundColor: themes.colors.bgColor,

    },
    
})