import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
// Firebase
// import {  signInWithPopup } from 'firebase/auth';
// import { auth, googleProvider } from '../../firebase/config';


const Providers = () => {

    // create user with google
    const createUserWithGoogle = async()=>{

        // await signInWithPopup(auth, googleProvider)
        //     .then((userCredential) => {
        //         const user = userCredential.user;
        //         // ...
        //         console.log(user);
                
        //     }).catch((error) => {

        //         console.log(error)
        //     });

    }
    // create user with facebook

    return (
        <View>

            <View style={styles.line}>
                <View style={[styles.after, styles.shape]} />
                <Text style={styles.text}>or</Text>
                <View style={[styles.before, styles.shape]} />
            </View>

            <View style={styles.icons}>

                <TouchableOpacity style={styles.icon}
                    >
                    <Image style={styles.iconImage} source={require('../../assets/images/app-images/facebook.png')}
                        resizeMode='contain' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}
                    onPress={createUserWithGoogle}
                >
                    <Image style={styles.iconImage} source={require('../../assets/images/app-images/google.png')}
                        resizeMode='contain' />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                    <Image style={styles.iconImage} source={require('../../assets/images/app-images/apple.png')}
                        resizeMode='contain' />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Providers

const styles = StyleSheet.create({
    line:{
        width: wp(80),
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical: hp(2)
    },
    shape:{
        width: '45%',
        height: 0.5,
        backgroundColor: themes.colors.textGray
    },
    text:{
        fontSize:wp(3),
        color: themes.colors.textGray,
        // textTransform:'uppercase'
    },

// ===========
    icons:{
        justifyContent:'space-around',
        alignItems:'center',
        flexDirection:'row',
        width: wp(80)
    },
    icon:{
        padding: 7,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        shadowColor:'#999',
        shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5
    },
    iconImage:{
        width: 35,
        height: 35
    }
})