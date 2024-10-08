import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
// Firebase
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from '@firebase/firestore';
import { db } from '../../firebase/config';



const Users = () => {

    const [data, loading, error] = useCollection(collection(db, 'Users'))


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} horizontal style={styles.usersContainer}>
            {data?.docs.map((item, idx)=>(
                <View key={idx} style={styles.user}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{item.data().username.charAt(0)}</Text>
                    </View>
                    <Text style={styles.name}>{item.data().username}</Text>
                    <Text style={styles.email}>{item.data().email}</Text>
                </View>
            ))}
            </ScrollView>
        </View>
    )
}

export default Users

const styles = StyleSheet.create({
    container:{
        width: wp(90),
        // backgroundColor:'blue'
    },
    usersContainer:{
        maxHeight: hp(40),
        // justifyContent:'space-between'
        padding: hp(1)
    },
    user:{
        alignItems:'center',
        backgroundColor: themes.colors.colorProduct,
        borderRadius: themes.radius.products,
        paddingVertical: hp(1),
        paddingHorizontal: wp(1),
        marginRight: hp(2),
        shadowColor: '#999',
        shadowOpacity: .9,
        shadowRadius: 2,
        shadowOffset: {
            width: 1,
            height: 0
        },
        elevation: 6
    },
    image:{
        width: wp(15),
        height: wp(15),
        borderRadius: 50,
        backgroundColor: themes.colors.bgColor
    },
    avatar:{
        width: wp(12),
        height: wp(12),
        backgroundColor: themes.colors.textDark,
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
    name:{
        fontSize: hp(1.5),
        fontWeight:'600',
        textAlign:'center',
        
    },
    email:{
        fontSize: hp(1.1),
        maxWidth: 100,
        textAlign:'center',
    },
})