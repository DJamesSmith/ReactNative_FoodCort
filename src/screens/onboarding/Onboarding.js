import { View, Text, TouchableOpacity, Image, FlatList, Dimensions, } from 'react-native'
import React, { useRef, useState } from 'react'
import normalize from '../../utils/helpers/normalize'
import MyStatusBar from '../../utils/MyStatusBar'
import { Colors } from '../../themes/Colors'
import { Directions, FlingGestureHandler, GestureHandlerRootView, State, } from 'react-native-gesture-handler'
import { Images } from '../../themes/Images'
import { Styles } from './Styles'

const DATA = [
    {
        id: 1,
        img: Images.foodDelivery1,
        txt1: 'The Experience Of Buying Food Quickly',
        txt2: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elit nulla, maximus at.`,
    },
    {
        id: 2,
        img: Images.foodDelivery2,
        txt1: `Foodie's Courier Send With Love`,
        txt2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elit nulla, maximus at.',
    },
    {
        id: 3,
        img: Images.foodDelivery3,
        txt1: `Find And Get Your Best Food`,
        txt2: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas elit nulla, maximus at.',
    },
]

const Onboarding = ({ navigation }) => {
    const width = Dimensions.get('screen').width
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const ref = useRef()

    function onHandlerStateChange(index) {
        if (index >= 0 && index < DATA.length) {
            const offset = index * width
            ref?.current?.scrollToOffset({ offset })
            setCurrentSlideIndex(index)
        }
    }

    const renderOnboardingItem2 = ({ item, index }) => {
        return (
            <View
                style={{
                    // backgroundColor: Colors.red,
                    width: width,
                }}
                key={index}>
                <View
                    style={{
                        // backgroundColor: Colors.blue,
                        width: width,
                        height: 400,
                        marginTop: 30,
                        alignItems: 'center',
                    }}
                    key={index}>
                    <Image
                        source={item.img}
                        resizeMode='cover'
                        style={Styles.OnboardingStyle.onboardImg}
                    />
                </View>
                <View
                    style={Styles.OnboardingStyle.onboardTextContainer}>
                    <Text
                        style={Styles.OnboardingStyle.onboardTextStyle}>
                        {
                            item.txt1.split(' ').map((text, index, arr) => (
                                <React.Fragment key={index}>
                                    {['', ''].includes(text) ? (
                                        <Text style={Styles.OnboardingStyle.onboardTextStyle}>
                                            {text}
                                        </Text>
                                    ) : (
                                        <Text>{text}</Text>
                                    )}
                                    {index !== arr.length - 1 && <Text> </Text>}
                                </React.Fragment>
                            ))
                        }
                    </Text>
                    <Text
                        style={
                            Styles.OnboardingStyle.onboardSubTextStyle
                        }>
                        {item.txt2}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <View style={Styles.OnboardingStyle.container}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <FlingGestureHandler
                        direction={Directions.LEFT}
                        onHandlerStateChange={({ nativeEvent }) => {
                            if (nativeEvent.state === State.ACTIVE) {
                                onHandlerStateChange(currentSlideIndex + 1);
                            }
                        }}>
                        <FlingGestureHandler
                            direction={Directions.RIGHT}
                            onHandlerStateChange={({ nativeEvent }) => {
                                if (
                                    nativeEvent.state === State.ACTIVE &&
                                    currentSlideIndex > 0
                                ) {
                                    onHandlerStateChange(currentSlideIndex - 1);
                                }
                            }}>

                            <View style={{
                                // backgroundColor: Colors.blue,
                                flex: 1
                            }}>

                                <FlatList
                                    ref={ref}
                                    scrollEnabled={false}
                                    data={DATA}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal
                                    renderItem={renderOnboardingItem2}
                                    showsHorizontalScrollIndicator={false}
                                    pagingEnabled={true}
                                    contentContainerStyle={{
                                        // backgroundColor: Colors.green,
                                    }}
                                />

                                <View style={Styles.OnboardingStyle.paginationContainer}>
                                    <View style={Styles.OnboardingStyle.pagination}>
                                        <View
                                            style={[
                                                Styles.OnboardingStyle.paginationBtn,
                                                propStyle(currentSlideIndex == 0 && true),
                                            ]}></View>
                                        <View
                                            style={[
                                                Styles.OnboardingStyle.paginationBtn,
                                                propStyle(currentSlideIndex == 1 && true),
                                            ]}></View>
                                        <View
                                            style={[
                                                Styles.OnboardingStyle.paginationBtn,
                                                propStyle(currentSlideIndex == 2 && true),
                                            ]}></View>
                                    </View>
                                </View>

                            </View>
                        </FlingGestureHandler>
                    </FlingGestureHandler>
                </GestureHandlerRootView>

                <TouchableOpacity
                    style={Styles.OnboardingStyle.nextBtnContainer}
                    activeOpacity={0.88}
                    onPress={() => {
                        if (currentSlideIndex == 2) {
                            navigation.navigate('Register')
                        } else {
                            onHandlerStateChange(currentSlideIndex + 1);
                        }
                    }}>
                    <Text
                        style={[
                            Styles.OnboardingStyle.onboardSubTextStyle,
                            { marginTop: 0, fontSize: normalize(16), color: Colors.white, },
                        ]}>
                        {/* {currentSlideIndex == 2 ? 'Get Started' : 'Next'} */}
                        Create Account
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.OnboardingStyle.btnExistingAcct} onPress={() => navigation.navigate(`Login`)}>
                    <Text style={[Styles.OnboardingStyle.txtExistingAcct]}>Already have an account</Text>
                </TouchableOpacity>

            </View>
        </>
    )
}

export default Onboarding