import React from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import normalize from '../utils/helpers/normalize'
import Modal from 'react-native-modal'

const FixedBottomSheetModal = props => {
    function onBackdropPress() {
        if (props?.onBackdropPress) {
            props?.onBackdropPress()
        }
    }

    return (
        <View>
            <Modal
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating={true}
                isVisible={props?.modalVisible}
                style={{
                    width: '100%',
                    alignSelf: 'center',
                    margin: 0,
                }}
                animationInTiming={800}
                animationOutTiming={1000}
                backdropOpacity={0.8}
                backdropColor={'grey'}
                onBackButtonPress={() => onBackdropPress()}
                onBackdropPress={() => onBackdropPress()}>
                <View
                    style={[
                        {
                            backgroundColor: props?.backgroundColor,
                            borderTopLeftRadius: props?.borderTopLeftRadius,
                            borderTopRightRadius: props?.borderTopRightRadius,
                            borderBottomLeftRadius: props?.borderBottomLeftRadius,
                            borderBottomRightRadius: props?.borderBottomRightRadius,
                            height: props?.height,
                            paddingBottom: normalize(15),
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 10,
                        },
                    ]}>
                    {props?.children}
                </View>
            </Modal>
        </View >
    )
}

export default FixedBottomSheetModal

FixedBottomSheetModal.propTypes = {
    modalVisible: PropTypes.bool,
    renderData: PropTypes.func,
    onBackdropPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    search: PropTypes.bool,
    keyExtractor: PropTypes.func,
    children: PropTypes.any,
    borderTopLeftRadius: PropTypes.number,
    borderTopRightRadius: PropTypes.number,
    borderBottomLeftRadius: PropTypes.number,
    borderBottomRightRadius: PropTypes.number,
}

FixedBottomSheetModal.defaultprops = {
    modalVisible: false,
    renderData: () => { },
    onBackdropPress: null,
    backgroundColor: 'white',
    height: normalize(350),
    search: false,
    keyExtractor: () => { },
}