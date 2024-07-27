import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'

const FloatingMenu = ({
    isVisible,
    position,
    onClose,

    titleOptionA,
    onPressOptionA,
    textColorOptionA,

    titleOptionB,
    onPressOptionB,
    textColorOptionB,
    item
}) => {
    if (!isVisible) return null

    return (
        <Modal transparent visible={isVisible} animationType='fade'>
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <View style={[styles.floatingMenu, { top: position.y, left: position.x }]}>

                    <TouchableOpacity onPress={onPressOptionA}>
                        <Text style={[styles.menuItem, { color: textColorOptionA }]}>{titleOptionA}</Text>
                    </TouchableOpacity>

                    <View style={styles.viewSeperator}></View>

                    <TouchableOpacity onPress={onPressOptionB}>
                        <Text style={[styles.menuItem, { color: textColorOptionB }]}>{titleOptionB}</Text>
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default FloatingMenu

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    floatingMenu: {
        backgroundColor: Colors.white,
        position: 'absolute',
        borderRadius: 8,
        padding: 10,
        shadowColor: Colors.black,
        elevation: 5,
    },
    viewSeperator: {
        backgroundColor: Colors.mediumGrey,
        height: 0.5,
    },
    menuItem: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
        color: Colors.black,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
})