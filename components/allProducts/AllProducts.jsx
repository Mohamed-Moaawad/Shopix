import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Product from './Product'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Skeleton from '../skeleton/Skeleton';


const AllProducts = ({data, loadingData}) => {




    return (
        <View style={styles.container}>
            {loadingData && ( 
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
            )}

            {data && (
                <FlatList
                    data={data.docs}
                    initialNumToRender={10}
                    numColumns={2}
                    keyExtractor={(item, idx)=> item.data().id}
                    contentContainerStyle={{width:'100%', padding: wp(1),paddingBottom: hp(28)}}
                    columnWrapperStyle={{justifyContent:'space-between'}}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item})=>(
                        <Product key={item.data().id} item={item}/>
                    )}
                />
            )}
            
        </View>
    )
}


export default AllProducts

const styles = StyleSheet.create({
    container:{
        width: wp(90),
        marginTop: hp(0),
        height: '100%',
        paddingBottom: hp(20),
    }
})