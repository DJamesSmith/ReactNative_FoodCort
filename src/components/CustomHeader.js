import { View, Text, TouchableOpacity, Image, Animated } from 'react-native'
import React, { memo } from 'react'
import normalize from '../utils/helpers/normalize'
import PropTypes from 'prop-types'
import { Colors } from '../themes/Colors'
import { Fonts } from '../themes/Fonts'

const HEADER_MAX_HEIGHT = 400
const HEADER_MIN_HEIGHT = 30
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

const CustomHeader = props => {

    function isleftPress() {
        if (props?.onLeftPress) {
            props?.onLeftPress()
        }
    }

    function isRightPress() {
        if (props?.onRightPress) {
            props?.onRightPress()
        }
    }

    const mainBackgroundColor = props.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [Colors.transparent, Colors.transparent, Colors.white],
        extrapolate: 'clamp',
    })

    const optionsBackgroundColor = props.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [Colors.white, Colors.white, Colors.orange],
        extrapolate: 'clamp',
    })

    const optionsTextColor = props.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [Colors.white, Colors.white, Colors.black],
        extrapolate: 'clamp',
    })

    const iconBackgroundColor = props.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [Colors.black, Colors.black, Colors.white],
        extrapolate: 'clamp',
    })

    return (
        <Animated.View
            style={{
                backgroundColor: mainBackgroundColor,
                height: 65,
                width: props?.width,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: props?.borderBottomColor,
                borderBottomWidth: props?.borderBottomWidth,
                marginTop: props?.marginTop,
                alignSelf: props?.alignSelf,
                position: 'absolute',
                paddingVertical: 10,
                // opacity: opacity
            }}>

            {
                props?.leftIcon ? <TouchableOpacity
                    onPress={() => isleftPress()}
                    activeOpacity={0.7}
                    style={{
                        height: '100%',
                        width: normalize(40),
                        position: 'absolute',
                        left: props?.leftIconLeft,
                    }}>
                    <Animated.View
                        style={{
                            backgroundColor: optionsBackgroundColor,
                            height: 48,
                            width: 48,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 24
                        }}>
                        <Animated.Image
                            source={props?.leftIcon}
                            style={{
                                height: props?.leftIconSize,
                                width: props?.leftIconSize,
                                tintColor: iconBackgroundColor,
                                resizeMode: 'contain'
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity> : null
            }

            {
                props?.doubleTitle ? <View>
                    <Text style={{
                        color: Colors.mediumGrey,
                        fontSize: 16,
                        fontFamily: Fonts.SF_Compact_Rounded_Medium,
                        textAlign: 'center',
                        top: 6
                    }}>{props?.upTitle}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // top: -6
                    }}>
                        <Image
                            source={{ uri: props?.imgDownIcon }}
                            style={{
                                height: 16,
                                width: 16,
                                resizeMode: 'contain',
                                tintColor: Colors.orange,
                                top: -2
                            }}
                        />
                        <Animated.Text style={{
                            color: optionsTextColor,
                            fontSize: 20,
                            fontFamily: Fonts.SF_Compact_Rounded_Medium,
                            marginLeft: 5,
                        }}>{props?.downTitle}</Animated.Text>
                    </View>
                </View> : props?.title ? <Animated.Text
                    style={{
                        color: optionsBackgroundColor,
                        fontWeight: '600',
                        fontSize: props?.fontSize,
                        fontFamily: props?.titleFontFamily,
                        top: props?.titleTop
                    }}>
                    {props?.title}
                </Animated.Text> : null
            }

            {
                props?.rightIcon ? <TouchableOpacity
                    onPress={() => isRightPress()}
                    activeOpacity={0.7}
                    style={{
                        height: '100%',
                        width: normalize(40),
                        position: 'absolute',
                        right: 35,
                    }}>
                    <Animated.View style={{
                        backgroundColor: optionsBackgroundColor,
                        height: 48,
                        width: 48,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 24
                        // top: -5
                    }}>
                        <Animated.Image
                            source={props?.rightIcon}
                            style={{
                                height: props?.rightIconSize,
                                width: props?.rightIconSize,
                                tintColor: iconBackgroundColor
                            }}
                        />
                    </Animated.View>
                </TouchableOpacity> : null

            }
        </Animated.View>
    )
}

export default memo(CustomHeader)

CustomHeader.propTypes = {
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    width: PropTypes.string,
    alignSelf: PropTypes.string,
    marginTop: PropTypes.number,
    borderBottomColor: PropTypes.string,
    titleFontFamily: PropTypes.string,
    borderBottomWidth: PropTypes.number,
    leftIconLeft: PropTypes.number,
    scrollY: PropTypes.any,

    leftIcon: PropTypes.any,
    onLeftPress: PropTypes.func,
    leftIconSize: PropTypes.number,
    leftIconTintColor: PropTypes.string,

    rightIcon: PropTypes.any,
    onRightPress: PropTypes.func,
    rightIconSize: PropTypes.number,
    rightIconTintColor: PropTypes.string,

    rightText: PropTypes.string,
    rightTextColor: PropTypes.string,
    rightTextFontSize: PropTypes.number,
}

CustomHeader.defaultProps = {
    height: 48,
    width: '100%',
    backgroundColor: Colors.white,
    color: 'black',
    fontSize: 25,
    leftIconSize: 30,
    leftIconTintColor: 'black',
    rightIconSize: 30,
    rightIconTintColor: 'black',
    leftIconLeft: 35,
    // marginTop: 40,
}