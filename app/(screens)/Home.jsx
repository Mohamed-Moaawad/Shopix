import { Image, Platform, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
//
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Slider from '../../components/slider/Slider';
import Category from '../../components/category/Category';
import PopularProducts from '../../components/popularProducts/PopularProducts';
import NavigationBar from '../../components/navigationBar/NavigationBar';
// react-firebase-hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/config';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from '@firebase/firestore';


const Home = () => {
    const router = useRouter()
    const [user, loading, error] = useAuthState(auth)
    
    const [initialValue, setInitialValue] = useState(query(collection(db, 'Products')))
    const [data, loadingData, errorData] = useCollection(initialValue)


    // Function sort Products By Category
    const sortProductsByCategory = async(categoryName)=>{
        if(categoryName === 'All'){
            setInitialValue(query(collection(db, 'Products')))
        }else{
            setInitialValue(query(
                collection(db, 'Products'), where('category', '==', categoryName)
            ))
        }
    }


    // if(!user){
    //     router.replace('Login')
    // }

    return (
        <>
            <StatusBar barStyle={'dark-content'} />
            <View style={styles.container}>
                {/* start header */}
                <HomeHeader />
                {/* end header */}

                <View style={styles.titleMessage}>
                    <Text style={styles.titleSm}>Hi, {user?.displayName || 'username'}</Text>
                    <Text style={styles.titleLg}>Let's find Your Gadget!</Text>
                </View>

                {/* start slider */}
                <Slider />
                {/* end slider */}

                {/* start category */}
                <Text style={styles.title}>Category</Text>
                <Category sortProductsByCategory={sortProductsByCategory} />
                {/* end category */}

                {/* start Popular Products */}
                <Text style={styles.title}>Popular Products</Text>
                <PopularProducts data={data} loadingData={loadingData} />
                {/* end Popular Products */}


                {/* start navigation bar */}
                <NavigationBar />
                {/* end navigation bar */}
            </View>          
        </>
    )

}

export default Home

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(3)
        }),
        paddingHorizontal: wp(5),
        // alignItems:'center',
        backgroundColor: themes.colors.bgColor,
        width: wp(100)
    },
    titleMessage:{
        width: wp(90),
        marginVertical: hp(0),
    },
    titleSm:{
        fontSize: hp(1.7),
        color: '#666',
        fontStyle:'italic',
        color: themes.colors.textGray

    },
    titleLg:{
        fontSize: hp(3),
        fontWeight:'700',
        maxWidth: wp(40),
        color: themes.colors.textDark
        
    },
    title:{
        color: themes.colors.textDark,
        marginVertical: hp(1),
        fontWeight:'700',
        fontSize: hp(1.8),
    },
})