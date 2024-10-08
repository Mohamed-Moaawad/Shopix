import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
// Icons
import IconAll from 'react-native-vector-icons/Entypo';
import IconHeadPhone from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//
import { themes } from '../../constants/Themes';


const Category = ({sortProductsByCategory}) => {

    const sortProducts = async(categoryName)=>{
        sortProductsByCategory(categoryName)
    }
    
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>sortProducts('All')}
                        style={styles.icon}
                    >
                        <IconAll name="flow-parallel" size={18} color={themes.colors.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>All</Text>
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>sortProducts('headphone')}
                        style={styles.icon}
                    >
                        <IconHeadPhone name="headphones-alt" size={18} color={themes.colors.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>headphones</Text>
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>sortProducts('phone')}
                        style={styles.icon}
                    >
                        <SimpleLineIcons name="screen-smartphone" size={18} color={themes.colors.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>phones</Text>
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>sortProducts('watch')}
                        style={styles.icon}
                    >
                        <Ionicons name="watch" size={18} color={themes.colors.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>smart watch</Text>
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>sortProducts('VR')}
                        style={styles.icon}
                    >
                        <IconHeadPhone name="vr-cardboard" size={18} color={themes.colors.textLight} />
                    </TouchableOpacity>
                    <Text style={[styles.categoryName,{textTransform:'uppercase'}]}>VR</Text>
                </View>

                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>sortProducts('smart pencil')}
                        style={styles.icon}
                    >
                        <Ionicons name="pencil-outline" size={18} color={themes.colors.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>smart pen</Text>
                </View>
                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>sortProducts('airpods')}
                        style={styles.icon}
                    >
                        <MaterialCommunityIcons name="headphones-box" size={23} color={themes.colors.textLight} />
                    </TouchableOpacity>
                    <Text style={styles.categoryName}>airPods</Text>
                </View>

            </ScrollView>
        </View>
    )
}

export default Category

const styles = StyleSheet.create({
    container:{
        width: wp(90),
        // backgroundColor:'red',
        justifyContent:'flex-start',
    },
    box:{
        alignItems:'center',
        marginRight: wp(7)
    },
    icon:{
        width: 45,
        height: 45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50,
        backgroundColor: themes.colors.textDark,
    },
    categoryName:{
        color:themes.colors.textDark,
        textTransform:'capitalize',
        fontSize: hp(1.4),
        marginTop: 2
    },
})