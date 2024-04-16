import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../themes/Colors'
import { Icons } from '../themes/Icons'
import PropTypes from 'prop-types'
import { Fonts } from '../themes/Fonts'

const Checkbox = props => {

    const [isChecked, setIsChecked] = useState(false)

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    function isPress() {
        if (props?.onPressFunc) {
            toggleCheckbox()
            props?.onPressFunc()
        }
    }

    return (
        <View
            style={{
                // backgroundColor: Colors.red,
                flexDirection: 'row',
                width: props?.width,
                height: 40,
                alignItems: 'center',

                alignSelf: props?.alignSelf,
                marginHorizontal: props?.marginHorizontal,
                marginTop: props?.marginTop,

            }}
            activeOpacity={0.8}
            onPress={() => isPress()}
        >
            <TouchableOpacity style={{
                // backgroundColor: Colors.blue,
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 4,
            }}
                onPress={() => isPress()}>
                <Image
                    source={isChecked ? Icons.checkedBox : Icons.uncheckedBox}
                    style={{
                        height: isChecked ? 24 : props?.imgSize,
                        width: isChecked ? 24 : props?.imgSize,
                        resizeMode: 'contain',
                    }}
                />
            </TouchableOpacity>

            <Text style={{
                marginHorizontal: 5,
                fontSize: 14,
                color: props?.color,
                fontFamily: Fonts.Compact_Rounded_Medium,
            }}
                numberOfLines={2}>{props?.showTextRight}</Text>
            <TouchableOpacity>
                <Text style={{
                    fontSize: 14,
                    color: Colors.blue,
                    fontFamily: Fonts.Compact_Rounded_Medium,
                    textDecorationLine: 'underline'
                }}
                    numberOfLines={2}>{props?.btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Checkbox

Checkbox.propTypes = {
    onPressFunc: PropTypes.func,
    showTextRight: PropTypes.string,
    color: PropTypes.string,
    alignSelf: PropTypes.string,
    marginHorizontal: PropTypes.number,
    marginTop: PropTypes.number,
    width: PropTypes.string,
    btnText: PropTypes.string,
    imgSize: PropTypes.number,
}

Checkbox.defaultProps = {

}