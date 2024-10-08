import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import Icon from 'react-native-vector-icons/Ionicons';



const HeadNavigation = ({nameScreen}) => {
    const router = useRouter()

    return (
        <View style={styles.head}>
            <View style={styles.headContainer}>
                <TouchableOpacity onPress={()=> router.back()}
                    style={styles.backBTN} 
                >
                    <Icon name="arrow-back" size={23} color={themes.colors.textDark} />
                </TouchableOpacity>

                <Text style={styles.headText}>{nameScreen}</Text>

                <TouchableOpacity onPress={()=> router.push('Orders')}>
                    <Icon name="notifications-outline" size={28} color={themes.colors.textLight} />
                    <View style={styles.point}></View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HeadNavigation

const styles = StyleSheet.create({
    head:{
        width: wp(100),
        justifyContent:'center',
        
        backgroundColor: themes.colors.textDark,
        position:'absolute',
        height: hp(14),
        borderBottomRightRadius: wp(5),
        borderBottomLeftRadius: wp(5),
        paddingTop: hp(3),
        paddingHorizontal: wp(3),
    },
    headContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    headText:{
        color: themes.colors.textLight,
        fontSize: hp(2),
        fontWeight: '700',
        textTransform:'capitalize',
        // marginTop: 50
    },
    point:{
        width: wp(2),
        height: wp(2),
        backgroundColor:'#7fbb00',
        borderRadius: 50,
        position:'absolute',
        left: Platform.select({
            ios:wp(1),
            android:wp(1.5),
        }),
        top: 1
    },
    backBTN:{
        width: wp(12),
        height: wp(12),
        backgroundColor: themes.colors.textLight,
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 50,
    },
})