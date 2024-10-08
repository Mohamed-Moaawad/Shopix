// react-native-responsive-screen
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const themes = {
    colors: {
        mainColor: '#4945EA',
        secondColor: '#333',
        bgColor: '#fff',
        colorProduct: '#eee',
        LinksColor: 'blue',
        
        textLight: '#fff',
        textDark: '#222',
        // textDark: 'green',
        textGray: '#999',
        textGray: '#999',
        textError: '#E60023',
    },

    fonts:{

    },
    radius:{
        button: wp(2),
        input: wp(1.5),
        card: hp(2),
        products: wp(2.5),
        xl: 18,
        xxl: 22,
    },
}