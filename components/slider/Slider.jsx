import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// pinar
import Carousel from "pinar";
import { themes } from '../../constants/Themes';

const Slider = () => {
    return (
        <View style={styles.container}>
            <Carousel 
            loop
            showsControls={false}
            // showsDots={false}
            dotsContainerStyle={styles.dotsContainer}
            
            style={styles.carouselContainer}>
                <View style={styles.slide}>
                    <View style={styles.text}>
                        <Text style={styles.headTitle}>Apple Devices</Text>
                        <Text style={styles.description}>VR - HeadPhone - Smart watch</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textBTN}>shop now</Text>
                        </TouchableOpacity>
                    </View>

                    <Image style={[styles.image,styles.image1]} source={require('../../assets/images/app-images/apple-devices-1.png')} />
                </View>

                <View style={styles.slide}>
                    <View style={styles.text}>
                        <Text style={styles.headTitle}>SONY - WH-1000XM4</Text>
                        <Text style={styles.description}>Noise cancelling wireless headphone</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textBTN}>shop now</Text>
                        </TouchableOpacity>
                    </View>

                    <Image style={styles.image} source={require('../../assets/images/app-images/SONY-1000.png')} />
                </View>

            </Carousel>
        </View>
    )
}

export default Slider

const styles = StyleSheet.create({
    container:{
        width: wp(93),
        height: hp(20),
        marginBottom: hp(3),
        marginTop: hp(1.5),
        // backgroundColor:'red'
    },
    carouselContainer:{
        width:'100%',
        height: hp(20),
        borderRadius: themes.radius.card,
        
    },
    dotsContainer:{
        position:'absolute',
        bottom: -20,
        transform: [{translateX: wp(40)}],
        flexDirection:'row',

    },
    slide:{
        width:'97%',
        height: hp(20),
        paddingHorizontal:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: themes.colors.textDark,
        borderRadius: themes.radius.card,
        
    },
    text:{
        
    },
    headTitle:{
        fontSize: hp(2.1),
        fontWeight:'800',
        color: themes.colors.textLight
    },
    description:{
        fontSize: hp(1.5),
        fontWeight:'300',
        color: themes.colors.textGray,
        maxWidth: wp(40),
        marginVertical:hp(.9),
        // textTransform:'capitalize'
    },
    button:{
        backgroundColor: themes.colors.textLight,
        marginVertical:hp(.5),
        padding: 10,
        width: wp(25),
        borderRadius: themes.radius.button,
        
    },
    textBTN:{
        color:themes.colors.textDark,
        textAlign:'center',
        textTransform:'capitalize',
        
    },
    image:{
        width: wp(35),
        height:'85%',
        resizeMode:'contain',
        position:'absolute',
        right:0,
        // transform:[{translateY:-45}]
    },
    image1:{
        width: wp(45),
        height:'90%',
    },
})