import { Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import AntDesign from 'react-native-vector-icons/AntDesign';


import { themes } from '../../../constants/Themes';
import Users from '../../../components/users/Users';
import AllProducts from '../../../components/allProducts/AllProducts';
import HeadNavigation from '../../../components/headNavigation/HeadNavigation';
// Firebase
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from '@firebase/firestore';
import { db } from '../../../firebase/config';


const Admin = () => {
    const router = useRouter()

    const [data, loadingData, errorData] = useCollection(collection(db, 'Products'))

    return (
            <>
                <StatusBar barStyle={'light-content'} />
                <View style={styles.container}>
                    {/* start Head */}
                        <HeadNavigation nameScreen={'admin control'} />
                    {/* end Head */}


                    <View style={styles.form}>
                        <Text style={styles.textTitle}>users</Text>
                        {/* start users */}
                        <Users />
                        {/* end users */}

                        <View style={styles.title}>
                            <Text style={styles.textTitle}>products</Text>

                            <TouchableOpacity onPress={()=> router.push('addProduct')}
                                style={styles.addProductBTN}
                            >
                                <Text style={styles.textBTN}>add product</Text>
                                <AntDesign name="arrowright" size={14} color={themes.colors.textLight} />
                            </TouchableOpacity>
                        </View>

                        {/* start products */}
                            <AllProducts data={data} loadingData={loadingData} />
                        {/* end products */}
                    </View>
                </View>
            </>
    )
}

export default Admin

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        // alignItems:'flex-start',
        paddingTop: hp(15),
        backgroundColor: themes.colors.bgColor,
        
    },
    
    textTitle:{
        fontSize: hp(2),
        fontWeight:'600',
        textTransform:'capitalize',
        marginVertical: hp(1),
        color: themes.colors.textDark
    },
    title:{
        width: wp(90),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    addProductBTN:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.textDark,
        borderRadius: themes.radius.button,
        paddingHorizontal: wp(3)
    },
    textBTN:{
        fontSize: hp(1.7),
        fontWeight:'600',
        textTransform:'capitalize',
        marginVertical: hp(1),
        color: themes.colors.textLight,
        marginRight: wp(1)
    },


})