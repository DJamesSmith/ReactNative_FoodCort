import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import normalize from '../utils/helpers/normalize'
import PropTypes from 'prop-types'
import { Colors } from '../themes/Colors'

const Header = (props) => {

    function isleftPress() {
        if (props?.onLeftPress) {
            props?.onLeftPress()
            // console.log("onLeftPress")// Called when you want to use it as an attribute for Header Component
        }
        // console.log("isleftPress")
    }

    function isRightPress() {
        if (props?.onRightPress) {
            props?.onRightPress()
            // console.log("onRightPress")// Called when you want to use it as an attribute for Header Component
        }
        // console.log("isRightPress")
    }

    return (
        <View
            style={{
                backgroundColor: props?.backgroundColor,
                height: props?.height,
                width: props?.width,
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomColor: props?.borderBottomColor,
                borderBottomWidth: props?.borderBottomWidth,
                marginTop: props?.marginTop,
                alignSelf: props?.alignSelf,
                // paddingBottom: 20
            }}>

            {
                props?.leftIcon ? <TouchableOpacity
                    // disabled={props?.onLeftPress ? false : true}
                    onPress={() => isleftPress()}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: props?.leftIconBackgroundColor,
                        height: '100%',
                        width: normalize(40),
                        position: 'absolute',
                        left: props?.leftIconLeft,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 24
                        // top: -5,
                    }}>

                    <Image
                        source={props?.leftIcon}
                        style={{
                            height: props?.leftIconSize,
                            width: props?.leftIconSize,
                            tintColor: props?.leftIconTintColor,
                            resizeMode: 'contain'
                        }}
                    />

                </TouchableOpacity> : null
            }

            {
                props?.title ?
                    <Text style={{
                        color: props?.color,
                        fontWeight: '600',
                        fontSize: props?.fontSize,
                        fontFamily: props?.titleFontFamily,
                        top: props?.titleTop
                    }}>
                        {props?.title}
                    </Text> : null
            }

            {
                props?.rightIcon ? <TouchableOpacity
                    onPress={() => isRightPress()}
                    activeOpacity={0.7}
                    style={{
                        backgroundColor: Colors.white,
                        height: '100%',
                        width: normalize(40),
                        position: 'absolute',
                        right: props?.rightIconRight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 24
                        // top: -5
                    }}>
                    <Image
                        source={props?.rightIcon}
                        style={{
                            height: props?.rightIconSize,
                            width: props?.rightIconSize,
                            tintColor: props?.rightIconTintColor
                        }}
                    />
                </TouchableOpacity> : props?.rightText ? (
                    <TouchableOpacity
                        onPress={() => isRightPress()}
                        disabled={props?.isDisabled}
                        style={{
                            position: 'absolute',
                            right: props?.rightTextRight,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{
                            color: props?.rightTextColor,
                            fontSize: props?.rightTextFontSize,
                            fontFamily: props?.rightTextFontFamily,
                            top: props?.rightTextTop,
                        }}>
                            {props.rightText}
                        </Text>
                    </TouchableOpacity>
                ) : props?.rightMenu ?
                    <TouchableOpacity
                        onPress={() => isRightPress()}
                        style={{
                            position: 'absolute',
                            right: props?.rightTextRight,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Image
                            source={{ uri: `https://cdn-icons-png.flaticon.com/128/15730/15730926.png` }}
                            style={{
                                height: 24,
                                width: 24,
                                resizeMode: 'contain',
                                tintColor: props?.rightIconTintColor
                            }}
                        />
                    </TouchableOpacity> : null
            }
        </View>
    )
}

export default Header

Header.propTypes = {
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
    rightIconRight: PropTypes.number,
    titleTop: PropTypes.number,


    leftIcon: PropTypes.any,
    onLeftPress: PropTypes.func,
    leftIconSize: PropTypes.number,
    leftIconBackgroundColor : PropTypes.string,
    leftIconTintColor: PropTypes.string,

    rightIcon: PropTypes.any,
    onRightPress: PropTypes.func,
    rightIconSize: PropTypes.number,
    rightIconTintColor: PropTypes.string,

    rightText: PropTypes.string,
    rightTextColor: PropTypes.string,
    rightTextFontSize: PropTypes.number,
    rightTextFontFamily: PropTypes.string,
    rightTextTop: PropTypes.number,
    rightTextRight: PropTypes.number,
    isDisabled: PropTypes.bool,
}

Header.defaultProps = {
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
    rightIconRight: 35,
    rightTextRight: 20,
    leftIconBackgroundColor: Colors.white,
    // marginTop: 40,
}