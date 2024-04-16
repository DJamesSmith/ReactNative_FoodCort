import { View, Text, TouchableOpacity, Image, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Linking } from 'react-native'

import { Colors } from '../themes/Colors'
import { Icons } from '../themes/Images'
import { Fonts } from '../themes/Fonts'

const { height, width } = Dimensions.get('screen')

const CustomButton = (props) => {
    const isPressFunc = () => {
        if (props?.onPressFunc) {
            props?.onPressFunc()
            // console.log("onPressFunc")// Called when you want to use it as an attribute for Header Component
        }
        // console.log("isPress")
    }

    return (
        <>
            {
                props?.title ? <TouchableOpacity
                    style={{
                        backgroundColor: props?.BGColor,
                        height: props?.viewHeight,
                        width: props?.width,
                        borderRadius: props.borderRadius,
                        borderColor: props?.borderColor,
                        borderWidth: props?.borderWidth,
                        alignItems: props?.alignItems,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: props?.paddingHorizontal,
                        alignSelf: props?.alignSelf,
                        marginTop: props?.marginTop,

                        shadowColor: props?.shadowColor,
                        shadowOffset: { width: props?.offsetWidth, height: props?.offsetHeight },
                        shadowOpacity: props?.shadowOpacity,
                        shadowRadius: props?.shadowRadius,
                        elevation: props?.elevation,
                    }}
                    activeOpacity={0.8}
                    onPress={() => isPressFunc()}>
                    {
                        props?.imageIcon ? <Image
                            source={props?.imageIcon}
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                left: props?.imageLeft,
                                tintColor: props?.tintColor
                            }}
                        /> : null
                    }
                    {
                        props?.loading ? <ActivityIndicator color={Colors.white} size={'small'} /> : <Text
                            style={{
                                color: props?.color,
                                fontSize: props?.fontSize,
                                marginLeft: 15,
                                fontFamily: props?.fontFamily,
                                position: 'absolute',
                                left: props?.left,
                            }}>
                            {props?.title}
                        </Text>
                    }

                </TouchableOpacity> : null
            }
        </>
    )
}

export default CustomButton

CustomButton.propTypes = {
    viewHeight: PropTypes.number,
    width: PropTypes.string,
    BGColor: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    imageLeft: PropTypes.number,
    title: PropTypes.string,
    tintColor: PropTypes.string,
    loading: PropTypes.bool,

    shadowColor: PropTypes.string,
    offsetWidth: PropTypes.number,
    offsetHeight: PropTypes.number,
    shadowOpacity: PropTypes.number,
    shadowRadius: PropTypes.number,
    elevation: PropTypes.number,

    placeholder: PropTypes.string,
    imageIcon: PropTypes.any,
    alignSelf: PropTypes.string,
    alignItems: PropTypes.string,
    left: PropTypes.number,
    onPressFunc: PropTypes.func,

    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    marginTop: PropTypes.number,
}

const viewHeight = 48
CustomButton.defaultProps = {
    viewHeight: viewHeight,
    width: '100%',
    BGColor: Colors.violet,
    color: '#FFF',
    fontSize: 22,
    borderRadius: height / 2,
    tintColor: Colors.white,
    loading: false,
}