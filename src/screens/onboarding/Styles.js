import { Dimensions, StyleSheet } from 'react-native'
import { Colors } from '../../themes/Colors'
import normalize from '../../utils/helpers/normalize'
import { Fonts } from '../../themes/Fonts'
import { windowHeight } from '../../../App'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

propStyle = _b => {
    if (_b == true) {
        return {
            backgroundColor: Colors.orange,
            width: normalize(15),
        }
    } else {
        return {
            backgroundColor: Colors.mediumGrey,
            width: normalize(6),
        }
    }
}

export const Styles = {
    SplashStyle: StyleSheet.create({
        container: {
            // backgroundColor: Colors.white,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    }),
    OnboardingStyle: StyleSheet.create({
        container: {
            backgroundColor: Colors.white,
            flex: 1,
        },
        onboardImg: {
            backgroundColor: Colors.green,
            width: width - 30,
            height: 400,
            borderRadius: 20,
        },
        onboardTextContainer: {
            // backgroundColor: Colors.red,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: normalize(10),
            marginTop: 20
        },
        onboardTextStyle: {
            fontFamily: Fonts.SF_Compact_Rounded_Bold,
            fontSize: normalize(26),
            color: Colors.black,
            textAlign: 'center',
            paddingHorizontal: 30
        },
        onboardSubTextStyle: {
            fontFamily: Fonts.SF_Compact_Rounded_Medium,
            fontSize: normalize(14),
            color: Colors.grey,
            // marginTop: normalize(5),
            textAlign: 'center',
            paddingHorizontal: 10,
            lineHeight: 35
        },
        paginationContainer: {
            // backgroundColor: Colors.black,
            position: 'absolute',
            bottom: normalize(windowHeight / 8),
            width: width,
        },
        pagination: {
            flexDirection: 'row',
            justifyContent: 'center'
        },
        paginationBtn: {
            // backgroundColor: Colors.red,
            width: normalize(6),
            height: normalize(6),
            borderRadius: normalize(20),
            marginRight: normalize(5),
        },

        nextBtnContainer: {
            backgroundColor: Colors.orange,
            bottom: 100,
            alignSelf: 'center',
            width: '80%',
            height: normalize(48),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: normalize(100),
        },
        btnExistingAcct: {
            // backgroundColor: Colors.orange,
            alignSelf: 'center',
            width: '80%',
            borderRadius: normalize(100),
        },
        txtExistingAcct: {
            fontFamily: Fonts.SF_Compact_Rounded_Medium,
            fontSize: normalize(16),
            color: Colors.orange,
            textAlign: 'center',
            paddingHorizontal: 10,
            marginTop: -20,
            bottom: 40
        }
    }),
}