import { View, Image, TextInput, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../themes/Colors'
import { Fonts } from '../themes/Fonts'
import { Icons } from '../themes/Icons'

const CustomTextInput = ({
    placeholder,
    value,
    icon,
    onChangeText,
    secureTextEntry,
    keyboardType,
    label,
    fontSize = 15,
    fontFamily = Fonts.SF_Compact_Rounded_Regular,
}) => {

    const [isFocused, setIsFocused] = useState(false)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false)

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        <View style={{
            // backgroundColor: Colors.red,
            height: 100,
            marginVertical: 1,

        }}>
            <Text style={{
                color: Colors.black,
                fontSize: 20,
                fontFamily: Fonts.SF_Compact_Rounded_Medium
            }}>{label}</Text>
            <View
                style={{
                    height: 52,
                    width: '100%',
                    backgroundColor: Colors.lightGrey,
                    borderRadius: 16,
                    shadowColor: 'rgba(0,0,0,0.2)',
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    elevation: 8,

                    shadowOpacity: 1,
                    shadowRadius: 8,
                    // marginVertical: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 15,
                    borderColor: isFocused ? Colors.orange : 'transparent',
                    borderWidth: isFocused ? 1 : 0,
                }}>
                {
                    icon ? <Image
                        source={icon}
                        style={{
                            height: 25,
                            width: 25,
                            resizeMode: 'contain',
                            tintColor: isFocused ? Colors.orange : Colors.mediumGrey,
                        }}
                    /> : null
                }
                <TextInput
                    placeholder={placeholder}
                    placeholderTextColor={Colors.mediumGrey}
                    style={{
                        // backgroundColor: Colors.red,
                        flex: 1,
                        color: 'black',
                        fontSize: fontSize,
                        fontWeight: '400',
                        paddingHorizontal: 10,
                        height: '100%',
                        fontFamily: fontFamily,
                        letterSpacing: secureTextEntry && (!isPasswordVisible && value.length > 0 ? 4 : 0) ? 4 : 0,
                    }}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    // caretHidden={true}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {secureTextEntry &&
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Image
                            source={isPasswordVisible ? Icons.showEye : Icons.hideEye}
                            style={{
                                height: 20,
                                width: 20,
                                resizeMode: 'contain',
                                tintColor: Colors.mediumGrey
                            }}
                        />
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default CustomTextInput