import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import React, { Suspense, useState } from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import HomeHeader from '../../components/HomeHeader/HomeHeader';
import Category from '../../components/category/Category';
import Skeleton from '../../components/skeleton/Skeleton';
// Firebase
import { collection, query, where } from '@firebase/firestore';
import { db } from '../../firebase/config';
import { useCollection } from 'react-firebase-hooks/firestore';


// import AllProducts from '../../components/allProducts/AllProducts';

const LazyComponentAllProducts = React.lazy(()=> import('../../components/allProducts/AllProducts'))


const Shop = () => {

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

    return (
        <View style={styles.container}>
            {/* start header */}
            <HomeHeader />
            {/* end header */}

            {/* start category */}
            <View style={styles.containerBox}>
                <Category sortProductsByCategory={sortProductsByCategory} />
            </View>
            {/* end category */}

            {/* start products */}
            <View style={styles.containerBox}>
                <Suspense fallback={<>
                    <FlatList
                        data={[1,2,3,4,5,6]}
                        numColumns={2}
                        keyExtractor={(item)=> item}
                        contentContainerStyle={{width:'100%', padding: wp(1),paddingBottom: hp(28)}}
                        columnWrapperStyle={{justifyContent:'space-between'}}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item})=>(
                            <Skeleton  />
                        )}
                    />
                    </>} 
                >
                    <LazyComponentAllProducts data={data} loadingData={loadingData}  />
                </Suspense>
            </View>
            {/* end products */}
        </View>
    )
}

export default Shop

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
    containerBox:{
        marginVertical: hp(2)
    },  
})