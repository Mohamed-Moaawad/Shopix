import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import Product from '../allProducts/Product';
import Skeleton from '../skeleton/Skeleton';






const PopularProducts = ({data, loadingData}) => {
        return (
            <View style={styles.container}>

                {/* start products */}
                <ScrollView horizontal contentContainerStyle={{gap: wp(5), padding: hp(.5)}}>
                    {loadingData && (
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    )}
                    {data && data.docs.map((item)=>(
                        <Product key={item.data().id} item={item} />
                    ))}
                </ScrollView>
                {/* end products */}
                
            </View>
        )
    }

export default PopularProducts

const styles = StyleSheet.create({
    container:{
        width: wp(90),
        // backgroundColor:'red',
        justifyContent:'flex-start',
        marginVertical: hp(1)
    },
    
})