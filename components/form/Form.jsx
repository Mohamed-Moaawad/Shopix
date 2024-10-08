import { ActivityIndicator, Keyboard, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { themes } from '../../constants/Themes'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// react-native-vector-icons
import Icon from 'react-native-vector-icons/Ionicons';

const Form = (props) => {
    
    const { titleLg, titleSm, forgotPass,
        username, screenName,
        handleSign, 
        name, setName, email, setEmail, password, setPassword, 
        setErrorText, errorText, loading,
        statusEmailError, setStatusEmailError,
        statusPassError, setStatusPassError,
        statusNameError, setStatusNameError
    } = props
    
    const router = useRouter()

    const [isPassword, setIsPassword] = useState(true)
    const togglePassword =()=>{
        setIsPassword((isPassword)=> !isPassword)
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.formBox}>

                <View style={styles.title}>
                    <Text style={styles.titleLg}>{titleLg}</Text>
                    <Text style={styles.titleSm}>{titleSm}</Text>
                </View>

                <View style={styles.inputs}>
                    {username && (
                        <TextInput 
                            defaultValue={name}
                            textContentType='name'
                            onChangeText={(value)=>{
                                setName(value)
                                setErrorText('')
                                setStatusNameError(false)
                            }}
                            style={[styles.input,
                                {borderBottomColor: statusNameError ? themes.colors.textError : 'transparent' }
                            ]}
                            placeholder='Username' 
                            placeholderTextColor={themes.colors.textGray}
                        />
                    )}
                    
                    <TextInput 
                        autoCapitalize='none'
                        textContentType='emailAddress'
                        defaultValue={email}
                        onChangeText={(value)=>{
                            setEmail(value)
                            setErrorText('')
                            setStatusEmailError(false)
                        }}
                        style={
                            [
                                styles.input,
                                {borderBottomColor: statusEmailError ? themes.colors.textError : 'transparent',
                                    color: statusEmailError ? themes.colors.textError : themes.colors.textDark,
                                }
                            ]
                        } 
                        placeholder='Email' 
                        placeholderTextColor={themes.colors.textGray}
                    />
                    
                    <View style={[styles.inputPassword, styles.input, {paddingHorizontal:0}]}>

                        <TextInput 
                            defaultValue={password}
                            onChangeText={(value)=>{
                                setPassword(value)
                                setErrorText('')
                                setStatusPassError(false)
                            }}
                            secureTextEntry={isPassword} 
                            style={[styles.inputPass,{
                                borderBottomColor: statusPassError ? themes.colors.textError : 'transparent',
                                color: statusPassError ? themes.colors.textError : themes.colors.textDark,
                            }]} 
                            placeholder='Password' 
                            placeholderTextColor={themes.colors.textGray}
                        />
                        <TouchableOpacity style={styles.eyes}
                            onPress={togglePassword}
                        >
                            <Text>
                                {isPassword ? (

                                    <Icon name="eye-off-outline" size={25} color={themes.colors.textDark} />
                                ):(
                                    <Icon name="eye-outline" size={25} color={themes.colors.textDark} />
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* start message */}
                    <View style={styles.messageBox}>
                        {errorText !== '' && <Text style={styles.messageError}>{errorText}</Text>}

                        {forgotPass && (
                            <View style={styles.forgotPassBTN}>
                                <TouchableOpacity
                                    onPress={()=> router.push('ForgotPassword')}>
                                        <Text style={styles.textForgot}>forgot password?</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    {/* end message */}

                    {/* start Button Sign */}
                    <TouchableOpacity style={[styles.loginButton,{opacity: loading ? 0.6 : 1}]} 
                        onPress={handleSign} 
                        disabled={loading ? true : false }>
                        {loading ? (
                            <ActivityIndicator color={themes.colors.textLight}  />
                        ):(
                            <Text style={{textAlign:'center', textTransform:'capitalize', color: themes.colors.textLight}}>
                                {screenName === 'login' ? 'login' :' sign up'}
                            </Text>
                        )}
                    </TouchableOpacity>
                    {/* end Button Sign */}


                        {/* have an account */}
                    <View style={{flexDirection:'row', marginTop:hp(1.5), justifyContent:'center'}}>
                        <Text>
                            {screenName === 'login' ? "Don't have account? " : 'Already have an account? '}
                        </Text>

                        <TouchableOpacity onPress={()=> router.replace(screenName === 'login' ? 'SignUp' : 'Login')}>
                            <Text style={{color:themes.colors.LinksColor}}>
                                {screenName === 'login' ? 'Sign Up' : 'Log in'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </TouchableWithoutFeedback>
    )
}

export default Form

const styles = StyleSheet.create({
    formBox:{
        width: wp(90),
        paddingVertical: hp(5),
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        marginTop: Platform.select({
            ios: hp(2),
            android: hp(0)
        }),
    },
    titleLg:{
        fontSize: wp(10),
        textTransform:'capitalize',
        fontWeight:'700',
        textAlign:'center',
        color: themes.colors.textDark
    },
    titleSm:{
        fontSize: wp(4),
        color:themes.colors.textGray,
        textAlign:'center',
        marginVertical: hp(.3),
        color: themes.colors.textGray
    },
    inputs:{
        width: '100%',
        // backgroundColor:'red'
    },
    input:{
        width: '100%',
        height: hp(5.8),
        paddingHorizontal: wp(4),
        borderRadius: themes.radius.input,
        backgroundColor:'#eee',
        marginTop: hp(2.4),
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    inputPass:{
        width:'100%', 
        height:'100%',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
        paddingHorizontal: 12,
    },

    inputPassword:{
        
    },
    eyes:{
        position:'absolute',
        top:hp(1.4),
        right:wp(3),
    },
    messageBox:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical:hp(1),
        // flexWrap:'wrap',
        flexDirection:'column'
        
    },
    messageError:{
        fontSize: hp(1.29),
        color: themes.colors.textError,
        // backgroundColor:'red'
    },
    forgotPassBTN:{
        alignItems:'flex-end',
    },
    textForgot:{
        color: themes.colors.textDark
    },
    loginButton:{
        width: '100%',
        height: hp(5),
        backgroundColor:themes.colors.textDark,
        marginTop:hp(6),
        borderRadius: themes.radius.button,
        justifyContent:'center',
    },
})