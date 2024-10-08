import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
import Icon from 'react-native-vector-icons/AntDesign'
// Firebase
import { arrayRemove, arrayUnion, doc, updateDoc } from '@firebase/firestore';
import { auth, db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';


const AddToFavoriteButton = ({type, item}) => {
    const router = useRouter()
    const [loader, setLoader] = useState(false)

    const [user, loading, error] = useAuthState(auth)

    const addToFavorite = async()=>{
        
        if(!user){
            router.replace('Login')
        }

        if(user){
            setLoader(true)
            if(!item.favorite.includes(`${user.uid}`)){
                await updateDoc(doc(db, 'Products', `${item.id}`),{
                    favorite: arrayUnion(`${user.uid}`)
                })
            }else{
                await updateDoc(doc(db, 'Products', `${item.id}`),{
                    favorite: arrayRemove(`${user.uid}`)
                })
            }
            setLoader(false)
        }
        
        
        
    }

    return (
        <>
            {type === 'details' ? (
                <TouchableOpacity onPress={addToFavorite}
                    style={styles.favoriteBTNDetails}
                >
                    {loader ? (
                        <ActivityIndicator size={'small'} color={themes.colors.textDark} />
                    ):(
                        <>
                            {item?.favorite.includes(`${user?.uid}`) ? (
                                <Icon name="heart" size={25} color={'red'} />
                            ):(
                                <Icon name="heart" size={25} color={themes.colors.textLight} />
                            )}
                        </>
                    )}
                </TouchableOpacity>
            ):(
                <TouchableOpacity onPress={addToFavorite}
                    style={styles.favoriteBTN}
                >
                    {loader ? (
                        <ActivityIndicator size={'small'} color={themes.colors.textDark} />
                    ):(
                        <>
                            {item.favorite.includes(`${user?.uid}`) ? (
                                <Icon name="heart" size={25} color={'red'} />
                            ):(
                                <Icon name="hearto" size={25} color={themes.colors.textDark} />
                            )}
                        </>
                    )}
                </TouchableOpacity>
                
            )}
        </>
    )
}

export default AddToFavoriteButton

const styles = StyleSheet.create({
    favoriteBTN:{
        position:'absolute',
        top: 0,
        right: 0,
        padding: 4,
    },
    favoriteBTNDetails:{
        width: wp(10),
        height: wp(10),
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#ddd',
        shadowColor: themes.colors.textGray,
        shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: themes.radius.button,
    },
})