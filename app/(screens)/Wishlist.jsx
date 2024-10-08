import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import Product from '../../components/allProducts/Product'
import HomeHeader from '../../components/HomeHeader/HomeHeader'
import Skeleton from '../../components/skeleton/Skeleton';

// Firebase
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, where } from '@firebase/firestore'
import { auth, db } from '../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth'


const Wishlist = () => {
    const router = useRouter()
    const [user, loadingFav, errorFav] = useAuthState(auth)

    const [data, loading, error] = useCollection(
        query(collection(db, 'Products'), where('favorite', 'array-contains', `${user?.uid}`))
    )


    if(user){
        return (
            <View style={styles.container}>
                {/* start home header */}
                    <HomeHeader />
                {/* end home header */}
    
                <Text style={styles.namePage}>wishlist</Text>

                {loading && (
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
    
                {data?.docs.length < 1 && (
                    <View style={styles.emptyBox}>
                        <Text style={styles.emptyText}>wishlist is empty</Text>
                        <TouchableOpacity style={styles.emptyBTN} onPress={()=> router.push('Shop')}>
                            <Text style={styles.emptyBTNText}>go to shop</Text>
                        </TouchableOpacity>
                    </View>
                )}
    
                {data && data.docs.length > 0 && (
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
}

export default Wishlist

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
    namePage:{
        fontSize: wp(7.3),
        fontWeight: '700',
        textTransform:'capitalize',
        
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