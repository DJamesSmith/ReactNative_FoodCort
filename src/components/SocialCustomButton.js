import { View, Text, TouchableOpacity, Image, Dimensions, Linking } from 'react-native'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Colors } from '../themes/Colors'
import { Icons } from '../themes/Icons'
import { Fonts } from '../themes/Fonts'

const { height, width } = Dimensions.get('screen')

const SocialCustomButton = (props) => {
    const handlePress = (url) => {
        Linking.openURL(url).catch((err) => console.error('An error occurred', err))
    }

    return (
        <>
            {
                props?.isCircle ? <TouchableOpacity style={{
                    backgroundColor: props?.BGColor,
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                    justifyContent: 'center',
                    alignItems: 'center',

                    shadowColor: Colors.grey,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.7,
                    shadowRadius: 7,
                    elevation: 12
                }}
                    activeOpacity={0.8}
                    onPress={() => handlePress(props?.url)}>
                    <Image
                        source={props?.imageIcon}
                        style={{
                            height: 28,
                            width: 28,
                            resizeMode: 'contain',
                            tintColor: props?.tintColor,
                        }}
                    />
                </TouchableOpacity> : <View>
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
                            activeOpacity={0.4}
                            onPress={() => handlePress(props?.url)}>
                            <Image
                                source={props?.imageIcon}
                                style={{
                                    height: 20,
                                    width: 20,
                                    resizeMode: 'contain',
                                    left: props?.imageLeft,
                                }}
                            />
                            <Text
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
                        </TouchableOpacity> : null
                    }
                </View>
            }
        </>
    )
}

export default SocialCustomButton

SocialCustomButton.propTypes = {
    isCircle: PropTypes.bool,

    viewHeight: PropTypes.number,
    width: PropTypes.string,
    BGColor: PropTypes.string,
    fontSize: PropTypes.number,
    fontFamily: PropTypes.string,
    imageLeft: PropTypes.number,
    title: PropTypes.string,
    tintColor: PropTypes.string,

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

    borderRadius: PropTypes.number,
    borderColor: PropTypes.string,
    borderWidth: PropTypes.number,
    paddingHorizontal: PropTypes.number,
    marginTop: PropTypes.number,
}

const viewHeight = 48
SocialCustomButton.defaultProps = {
    viewHeight: viewHeight,
    width: '100%',
    BGColor: Colors.violet,
    color: '#FFF',
    fontSize: 22,
    borderRadius: height / 2,

    isCircle: false,
}