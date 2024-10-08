import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../../constants/Themes';

import AntDesign from 'react-native-vector-icons/AntDesign';


// Firebase
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from '@firebase/firestore';
import { db } from '../../../firebase/config';




const Orders = () => {
    const router = useRouter()
    const [data, loading, error] = useCollection(collection(db, 'Orders'))

    const orderDetails = (id)=>{
        router.push(
            {
                pathname: 'OrderDetails', 
                params: {id}
            }
        )
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Orders</Text>
            </View>

            {data?.docs.length < 1 && (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>Orders is empty</Text>
                    <TouchableOpacity style={styles.emptyBTN} onPress={()=> router.back()}>
                        <Text style={styles.emptyBTNText}>go to back</Text>
                    </TouchableOpacity>
                </View>
            )}
                <ScrollView showsVerticalScrollIndicator={false} >
                {data?.docs.length > 0 && data.docs.map((item, idx)=>(
                        <TouchableOpacity key={item.id}  onPress={()=>orderDetails(item.id)}
                            style={[styles.button, {opacity:item.data().reached ? 0.4 : 1}]}
                        >
                            <View style={styles.startBox}>
                                <Text style={styles.boxID}>{idx + 1}#0</Text>
                                <View>
                                    {item.data().products.map((product, idx)=>(
                                        <Text key={idx}>{product.title}</Text>
                                    ))}
                                </View>
                            </View>

                            <Text style={styles.price}>${item.data().price}.00</Text>

                            <AntDesign name="arrowright" size={25} color={themes.colors.textDark} />
                        </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Orders

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(3)
        }),
        paddingHorizontal: wp(5),
        backgroundColor: themes.colors.bgColor,
        width: wp(100)
    },
    title: {
        width: '100%',
        padding: wp(4),
        borderBottomWidth: wp(0.1),
        borderBottomColor: themes.colors.textGray,
        marginVertical: hp(1.5),
    },
    titleText: {
        fontSize: hp(2.5),
        textTransform:'capitalize',
        textAlign:'center',
        fontWeight:'600',
        color: themes.colors.textDark,
    },
    ////////////////////////////
    button:{
        width: '100%',
        flexDirection:'row',
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: '#ddd',
        borderBottomWidth: wp(.2),
        paddingBottom: hp(1.5),
        marginBottom: hp(1.5)
    },
    startBox:{
        flexDirection:'row',
        alignItems: "center",
        gap: wp(5),
    },
    boxID:{
        fontSize: hp(2),
        fontWeight: '600',
        // color:themes.colors.textGray
    },
    price:{
        fontSize: hp(2),
        fontWeight: '800',
        // color:themes.colors.textGray
    },
    /////////////////////////////
    emptyBox:{
        width: '100%',
        alignItems:'center',
        marginTop: hp(2),
    },
    emptyText:{
        fontSize: hp(3),
        textTransform: 'capitalize',
        
    },
    emptyBTN:{
        width: wp(40),
        height: hp(5),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: themes.colors.textDark,
        borderRadius: themes.radius.button,
        marginTop: hp(2),
    },
    emptyBTNText:{
        fontSize: hp(1.5),
        textTransform: 'capitalize',
        color: themes.colors.textLight,
    },
})