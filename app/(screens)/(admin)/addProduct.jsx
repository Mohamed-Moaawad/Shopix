import { Button, Image, Keyboard, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Platform } from 'react-native';
import { ActivityIndicator } from 'react-native';
import React, { useState } from 'react'
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeadNavigation from '../../../components/headNavigation/HeadNavigation';
import { themes } from '../../../constants/Themes';
// Icons
import Entypo from 'react-native-vector-icons/Entypo';
// select Options
import { Picker } from '@react-native-picker/picker';
// Firebase
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storageDB } from '../../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

import { v4 } from 'uuid';

import * as ImagePicker from 'expo-image-picker';



const addProduct = () => {
    const [selectedValue, setSelectedValue] = useState('headphone')
    const [loading, setLoading] = useState(false)
    
    const [title, setTitle] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)


    const [errorTitle, setErrorTitle] = useState(false)
    const [errorQuantity, setErrorQuantity] = useState(false)
    const [errorPrice, setErrorPrice] = useState(false)
    const [errorDesc, setErrorDesc] = useState(false)
    const [errorImage, setErrorImage] = useState(false)
    



    // Function upload image
    const uploadImage = async()=>{
        setErrorImage(false)

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        const response = await fetch(result.assets[0].uri)
        const blob = await response.blob()

        const imgRef = ref(storageDB, `media/${Date.now()}`)        
        await uploadBytes(imgRef, blob)
        .then((data)=>{            
            getDownloadURL(data.ref).then((val)=>{
                setFile(val);
            })
        })

    }
    
    
    
    // Function add new product
    const addNewProduct = async()=>{
        setLoading(true)

        const portion = +price - +discount
        const percent = (portion / +price) * 100

        // console.log(percent);
        
        
        if(title !== '' && quantity > 0 && price > 0 && description !== '' && file !== null){
            const productID = new Date().getTime()
            await setDoc(doc(db, 'Products', `${productID}`),{
                id: productID,
                title,
                price: +price,
                discount: {
                    discount: +discount,
                    percent, 
                },
                description,
                category: selectedValue,
                image: file,
                quantity,
                cart: [],
                favorite: []
            })

            setTitle('')
            setQuantity(0)
            setPrice(0)
            setDiscount(0)
            setDescription('')
            setFile(null)
            setSelectedValue('')
            
        }else{
            if(title === ''){
                setErrorTitle(true)
            }
            if(quantity <= 0){
                setErrorQuantity(true)
            }
            if(price <= 0){
                setErrorPrice(true)
            }
            if(description === ''){
                setErrorDesc(true)
            }
            if(file === null){
                setErrorImage(true)
            }
            
        }
        setLoading(false)
    }


    return (
        <>
            <StatusBar barStyle={'light-content'} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    {/* start Head */}
                        <HeadNavigation nameScreen={'add product'} />
                    {/* end Head */}

                    <View style={styles.form}>

                        

                        <View style={styles.inputs}>
                            <View style={styles.inputSm}>
                                <TextInput style={styles.input} placeholder='title' 
                                    placeholderTextColor={themes.colors.textGray} 
                                    defaultValue={title}
                                    onChangeText={(value)=> {
                                        setTitle(value)
                                        setErrorTitle(false)
                                    }}
                                />
                                {errorTitle && (
                                    <Text style={styles.textError}>This field is required</Text>
                                )}
                            </View>

                            <View style={styles.inputSm}>
                                <TextInput style={styles.input} placeholder='Quantity' 
                                    placeholderTextColor={themes.colors.textGray} 
                                    defaultValue={quantity}
                                    onChangeText={(value)=> {
                                        setQuantity(value)
                                        setErrorQuantity(false)
                                    }}
                                    keyboardType='numeric'
                                />
                                {errorQuantity && (
                                    <Text style={styles.textError}>This field is required</Text>
                                )}
                            </View>
                            
                        </View>


                        <View style={styles.inputs}>
                            <TextInput style={[ styles.input, styles.inputSm]} placeholder='price' 
                                placeholderTextColor={themes.colors.textGray} 
                                defaultValue={price}
                                onChangeText={(value)=> {
                                    setPrice(value)
                                    setErrorPrice(false)
                                }}
                                keyboardType='numeric'
                            />

                            <TextInput style={[ styles.input, styles.inputSm]} placeholder='discount' 
                                placeholderTextColor={themes.colors.textGray} 
                                defaultValue={discount}
                                onChangeText={(value)=> setDiscount(value)}
                                keyboardType='numeric' 
                            />
                        </View>
                        {errorPrice && (
                            <Text style={styles.textError}>This field is required</Text>
                        )}


                        <TextInput style={styles.input} placeholder='description' 
                            placeholderTextColor={themes.colors.textGray} 
                            defaultValue={description}
                            onChangeText={(value)=> {
                                setDescription(value)
                                setErrorDesc(false)
                            }}
                        />
                        {errorDesc && (
                            <Text style={styles.textError}>This field is required</Text>
                        )}


                        <Picker 
                            selectedValue={selectedValue}
                            onValueChange={(value)=> {
                                setSelectedValue(value)
                                
                            }}
                            style={styles.select} 
                        >
                            <Picker.Item label='headphone' value={'headphone'} />
                            <Picker.Item label='watch' value={'watch'} />
                            <Picker.Item label='VR' value={'VR'} />
                            <Picker.Item label='phone' value={'phone'} />
                            <Picker.Item label='smart pencil' value={'smart pencil'} />
                            <Picker.Item label='airpods' value={'airpods'} />
                        </Picker>

                        <TouchableOpacity style={[styles.uploadBTN,{opacity:file ? 0.5 : 1}]} onPress={uploadImage} disabled={file ? true : false} >

                            <Entypo name="upload" size={20} color={themes.colors.textDark} />
                            <Text style={styles.textBTN}>Upload image</Text>

                            {file && (
                                <Image source={{uri: file}} style={styles.imageUploaded} resizeMode='contain' />
                            )}

                        </TouchableOpacity>
                        {errorImage && (
                            <Text style={styles.textError}>This field is required</Text>
                        )}


                        <TouchableOpacity onPress={addNewProduct}
                            style={styles.addBTN}
                        >
                            {loading ? (
                                <ActivityIndicator size={'small'} color={themes.colors.textLight}/>
                            ):(
                                <Text style={styles.textAddBTN}>add product</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

export default addProduct

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingVertical: hp(5),
        paddingHorizontal: wp(5),
        // alignItems:'flex-start',
        paddingTop: hp(15), 
        backgroundColor: themes.colors.bgColor,
    },
    form:{
        width: wp(90),
        paddingVertical: hp(5),
        justifyContent:'center',
        alignItems:'center',
    },
    textError:{
        width: '95%',
        fontSize: hp(1.2),
        color: themes.colors.textError,
        textAlign: 'left',
    },
    inputs:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width: '100%',
    },
    input:{
        width: '100%',
        height: hp(5.8),
        paddingHorizontal: 12,
        borderRadius: themes.radius.input,
        backgroundColor:'#eee',
        marginTop: hp(3),
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',

    },
    inputSm:{
        width: '48%',
        
    },
    select:{
        width: Platform.select({
            ios: wp(100),
            android: '100%'
        }),
        height: hp(2.5),
        paddingHorizontal: 12,
        borderRadius: themes.radius.input,
        marginVertical: Platform.select({
            ios: hp(-2),
            android: hp(2)
        }),
        
        backgroundColor: Platform.select({
            ios: '',
            android: '#eee'
        }),
        
        
    },
    uploadBTN:{
        width: '100%',
        height: hp(9),
        backgroundColor: '#eee',
        justifyContent:'center',
        alignItems:'center',
        gap: wp(2),
        borderRadius: themes.radius.button,
        marginTop: Platform.select({
            ios: hp(23),
            android: hp(4)
        })
        
    },
    textBTN:{
        color: themes.colors.textDark,
        fontSize: hp(1.4),
        textTransform:'capitalize',
    },
    imageUploaded:{
        width: wp(20), 
        height: '100%', 
        position:'absolute', 
        left: 0,
        top: 0
    },
    addBTN:{
        width: '100%',
        height: hp(5),
        backgroundColor: themes.colors.textDark,
        justifyContent:'center',
        alignItems:'center',
        marginTop: hp(4),
        borderRadius: themes.radius.button,
    },
    textAddBTN:{
        color: themes.colors.textLight,
        fontSize: hp(1.4),
        textTransform:'capitalize',
        fontWeight:'600'
    },
})