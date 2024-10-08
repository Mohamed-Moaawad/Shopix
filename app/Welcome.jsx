import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { Sail_400Regular, useFonts } from '@expo-google-fonts/sail';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// 
import { themes } from '../constants/Themes';




const Welcome = () => {
    const router = useRouter()
    const [fontsLoaded] = useFonts({Sail_400Regular})
    

    if(fontsLoaded){
        return (
            <>
                <StatusBar barStyle={'light-content'}/>
                <View  style={styles.container}>

                    <View style={styles.textTitle}>
                        <Text style={styles.title}>start your online journey</Text>
                    </View>
                    
                    <Image style={styles.image} source={require('../assets/images/app-images/headphone-1.png')} resizeMode="contain" />
                    
                    <TouchableOpacity style={styles.button} onPress={()=> router.push('Home')}>
                        <Text style={styles.textButton}>get started</Text>
                    </TouchableOpacity>
                    
                </View>
            </>
        )
    }
}

export default Welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        backgroundColor: '#000',
        justifyContent:'space-between',
        alignItems:'center',
    },
    image:{
        width: 400,
        // height: hp(10),
        position:'absolute',
        right: -90,
        top: 100
    },
    textTitle:{
        width: wp(100),
        padding:wp(5)
    },
    title:{
        color: themes.colors.textLight,
        fontFamily:'Sail_400Regular',
        fontSize: 50,
        maxWidth: 200,
        margin:20
    },
    button:{
        width: wp(80),
        backgroundColor: themes.colors.textLight,
        padding: 15,
        marginBottom: 35,
        alignItems:'center',
        textTransform:'uppercase',
        borderRadius: themes.radius.button
    },
    textButton:{
        textTransform:'uppercase',
        fontSize:15,
        fontWeight:'600',
    },
})