import { ActivityIndicator, Keyboard, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import CheckBox from 'react-native-check-box';
// react-native-responsive-screen
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { themes } from '../../constants/Themes';
// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/config';
import { addDoc, arrayRemove, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from '@firebase/firestore';
import { useLocalSearchParams } from 'expo-router';
import { useCollection } from 'react-firebase-hooks/firestore';


const Checkout = () => {
    const {totalPrice} = useLocalSearchParams()


    const [user, loading, error] = useAuthState(auth)

    const [data, loadingData, errorData] = useCollection(collection(db, `cart-${user?.uid}`))

    const [loader, setLoader] = useState(false)

    const [isSelected, setSelection] = useState(true);

    const [email, setEmail] = useState(`${user?.email}`)
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [street, setStreet] = useState('')
    const [numberCode, setNumberCode] = useState(0)
    const [number, setNumber] = useState(0)
    const [whatsApp, setWhatsApp] = useState(0)
    
    
    const [errorText, setErrorText] = useState({
        email: false,
        fName: false,
        lName: false,
        country: false,
        city: false,
        neighborhood: false,
        street: false,
        numberCode: false,
        number: false,
        whatsApp: false,
    })


    // Function delete All user Cart
    const deleteAllCart = async()=>{
        const querySnapshot = await getDocs(collection(db, `cart-${user?.uid}`))

        const deletePromises = querySnapshot.docs.map((docSnapshot)=>{
            return deleteDoc(doc(db, `cart-${user?.uid}`, `${docSnapshot.data().id}`))
        })
        
        Promise.all(deletePromises)
    }
    // Function delete UserID From Products
    const deleteUserIDFromProducts = async()=>{
        
        const querySnapshot = await getDocs(query(collection(db, 'Products'),where('cart', 'array-contains', user?.uid)))

        const deletePromises = querySnapshot.docs.map(async(docSnapshot)=>{
            await updateDoc(doc(db, 'Products', docSnapshot.id),{
                cart: arrayRemove(`${user?.uid}`)
            })
        })
        
        await Promise.all(deletePromises)
    }



    // Function check Out products 
    const saveHandler = async()=>{  
        // console.log(data.docs);
        const allProducts = data.docs.map((item)=> item.data())
        
        setLoader(true)
        if(email != "" && fName != '' && lName != '' && country != '' && city != '' && neighborhood != '' && street != '' && numberCode > 0 && number > 0 && whatsApp > 0){
            await addDoc(collection(db, 'Orders'),{
                user: {
                    email,
                    userName: fName + ' '+ lName,
                    state: country,
                    city,
                    neighborhood,
                    street,
                    phone:'+' + numberCode + ' ' + number,
                    whatsApp,
                },
                reached: false,
                products: allProducts,
                price: totalPrice
            })

            deleteAllCart()
            deleteUserIDFromProducts()

            setEmail('')
            setFName('')
            setLName('')
            setCountry('')
            setCity('')
            setNeighborhood('')
            setStreet('')
            setNumberCode(0)
            setNumber(0)
            setWhatsApp(0)
        }else{
            if(whatsApp <= 0) setErrorText({...errorText, whatsApp: true})
                if(number <= 0) setErrorText({...errorText, number: true})
                    if(numberCode <= 0) setErrorText({...errorText, numberCode: true})
                        if(street == '') setErrorText({...errorText, street: true})
                            if(neighborhood == '') setErrorText({...errorText, neighborhood: true})
                                if(city == '') setErrorText({...errorText, city: true})
                                    if(country == '') setErrorText({...errorText, country: true})
                                        if(lName == '') setErrorText({...errorText, lName: true})
                                            if(fName == '') setErrorText({...errorText, fName: true})
                                                if(email == '') setErrorText({...errorText, email: true})
        }
        

        

        setLoader(false)
        
    }

    const [focusInput, setFocusInput] = useState(false);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.titleText}>add shopping address</Text>
                </View>

                <ScrollView scrollEnabled={focusInput} showsVerticalScrollIndicator={false} style={{marginBottom: focusInput ? Platform.select({ios: hp(30), android: hp(0)}) : hp(0)}}>
                    <View style={styles.formBox}>

                        <View style={styles.emailBox}>
                            <TextInput defaultValue={email} editable={!isSelected}
                            onChangeText={(value)=>{
                                setEmail(value)
                                setErrorText({...errorText, email: false})
                            }}
                                style={styles.input} 
                                placeholder='Email Address' 
                                placeholderTextColor={themes.colors.textGray} 
                            />
                            {errorText.email && <Text style={styles.errorText}>email field required</Text>}
                            <View style={styles.checkEmail}>
                                <CheckBox
                                    isChecked={isSelected}
                                    onClick={() => setSelection(!isSelected)}
                                />
                                <Text>Set as default</Text>
                            </View>
                        </View>


                        <View style={styles.nameBox}>
                            <TextInput defaultValue={fName}
                                onChangeText={(value)=>{
                                    setFName(value)
                                    setErrorText({...errorText, fName: false})
                                }}
                                style={[styles.input, styles.nameInput]} 
                                placeholder='First name' 
                                placeholderTextColor={themes.colors.textGray} />
                            <TextInput defaultValue={lName}
                                onChangeText={(value)=>{
                                    setLName(value)
                                    setErrorText({...errorText, lName: false})
                                }}
                                style={[styles.input, styles.nameInput]} 
                                placeholder='last name' 
                                placeholderTextColor={themes.colors.textGray} />
                        </View>
                        {errorText.fName && <Text style={styles.errorText}>first Name field required</Text>}
                        {errorText.lName && <Text style={styles.errorText}>last Name field required</Text>}



                        <TextInput defaultValue={country}
                            onChangeText={(value)=>{
                                setCountry(value)
                                setErrorText({...errorText, country: false})
                            }}
                            style={styles.input} 
                            placeholder='State/Province' 
                            placeholderTextColor={themes.colors.textGray} />
                        {errorText.country && <Text style={styles.errorText}>country field required</Text>}

                        <View style={styles.city}>

                            <TextInput defaultValue={city}
                                onChangeText={(value)=>{
                                    setCity(value)
                                    setErrorText({...errorText, city: false})
                                }}
                                style={[styles.input, styles.cityInput]} 
                                placeholder='City' 
                                placeholderTextColor={themes.colors.textGray} />

                            <TextInput defaultValue={neighborhood}
                                onChangeText={(value)=>{
                                    setNeighborhood(value)
                                    setErrorText({...errorText, neighborhood: false})
                                }}
                                style={[styles.input, styles.cityInput]} 
                                placeholder='The neighborhood' 
                                placeholderTextColor={themes.colors.textGray} />
                        </View>
                        {errorText.city && <Text style={styles.errorText}>city field required</Text>}
                        {errorText.neighborhood && <Text style={styles.errorText}>neighborhood field required</Text>}

                        <TextInput defaultValue={street}
                            onChangeText={(value)=>{
                                setStreet(value)
                                setErrorText({...errorText, street: false})
                            }}
                            style={styles.input} 
                            placeholder='Street Address' 
                            placeholderTextColor={themes.colors.textGray} />
                        {errorText.street && <Text style={styles.errorText}>Street field required</Text>}

                        <View 
                            style={styles.phoneNumber}>

                            <TextInput defaultValue={numberCode}
                                onChangeText={(value)=>{
                                    setNumberCode(value)
                                    setErrorText({...errorText, numberCode: false})
                                }}
                                style={[styles.input, styles.phoneNumberInputCode]} 
                                keyboardType='numeric' 
                                placeholder='+20' 
                                placeholderTextColor={themes.colors.textGray} />

                            <TextInput defaultValue={number}
                                onChangeText={(value)=>{
                                    setNumber(value)
                                    setErrorText({...errorText, number: false})
                                }}
                                style={[styles.input, styles.phoneNumberInput]} 
                                keyboardType='numeric' 
                                placeholder='0XXXXXXXXXX' 
                                placeholderTextColor={themes.colors.textGray} />

                        </View>
                        {errorText.numberCode && <Text style={styles.errorText}>This field required</Text>}
                        {errorText.number && <Text style={styles.errorText}>This field required</Text>}

                        <TextInput defaultValue={whatsApp} onFocus={()=> setFocusInput(true)} onBlur={()=> setFocusInput(false)}
                            onChangeText={(value)=>{
                                setWhatsApp(value)
                                setErrorText({...errorText, whatsApp: false})
                            }}
                            style={styles.input} 
                            keyboardType='numeric' 
                            placeholder='WhatsApp Number' 
                            placeholderTextColor={themes.colors.textGray} />
                        {errorText.whatsApp && <Text style={styles.errorText}>whatsApp field required</Text>}

                        <TouchableOpacity onPress={saveHandler}
                            style={styles.saveButton}
                        >
                            {loader? (
                                <ActivityIndicator size={'small'} color={themes.colors.textLight} />
                            ):(
                                <Text style={styles.saveText}>Save</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: Platform.select({
            ios: hp(4),
            android: hp(3)
        }),
        paddingHorizontal: wp(5),
        // alignItems:'center',
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
    /////////////////////////////////
    formBox: {
        width: '100%',

    },
    input: {
        width: '100%',
        height: hp(5.8),
        paddingHorizontal: wp(4),
        borderRadius: themes.radius.input,
        backgroundColor: '#eee',
        marginTop: hp(2.4),
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    errorText: {
        color: themes.colors.textError,
        // textTransform: 'capitalize'
        fontSize: hp(1.3)
    },
    emailBox: {
        width: '100%',
        // backgroundColor: 'red',
    },
    checkEmail: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp(1),
        marginTop: hp(.4)
    },
    nameBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    nameInput: {
        width: '48%',
    },
    city: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cityInput: {
        width: '48%',
    },
    phoneNumber: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    phoneNumberInputCode: {
        width: '20%',
    },
    phoneNumberInput: {
        width: '78%',
    },
    saveButton: {
        width: '100%',
        height: hp(5),
        backgroundColor: themes.colors.textDark,
        marginTop: hp(6),
        borderRadius: themes.radius.button,
        justifyContent: 'center',
        alignItems:'center'

    },
    saveText: {
        color: themes.colors.textLight,
        textTransform: 'capitalize',
        fontSize: hp(2),
    },


})