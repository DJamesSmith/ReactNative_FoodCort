import React from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import PropTypes from 'prop-types'
import normalize from '../utils/helpers/normalize'
import Modal from 'react-native-modal'
import { Colors } from '../themes/Colors'

const CenterModal = props => {
    function onBackdropPress() {
        if (props?.onBackdropPress) {
            props?.onBackdropPress()
        }
    }

    return (
        <SafeAreaView>
            <Modal
                animationIn={'bounceInUp'}
                animationOut={'zoomOut'}
                backdropTransitionOutTiming={0}
                hideModalContentWhileAnimating={true}
                isVisible={props?.modalVisible}
                style={{
                    width: '95%',
                    alignSelf: 'center',
                }}
                animationInTiming={1200}
                animationOutTiming={1000}
                backdropOpacity={0.8}
                backdropColor={'grey'}
                onBackButtonPress={() => onBackdropPress()}
                onBackdropPress={() => onBackdropPress()}>
                <View
                    style={[
                        {
                            backgroundColor: props?.backgroundColor,
                            borderRadius: props?.borderRadius,
                            height: props?.height,
                            paddingVertical: 20

                        },
                    ]}>
                    {props?.children}
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default CenterModal

CenterModal.propTypes = {
    dataList: PropTypes.array,
    modalVisible: PropTypes.bool,
    renderData: PropTypes.func,
    onBackdropPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    height: PropTypes.number,
    search: PropTypes.bool,
    keyExtractor: PropTypes.func,
    children: PropTypes.any,
    borderRadius: PropTypes.number,
}

CenterModal.defaultprops = {
    dataList: [],
    modalVisible: false,
    renderData: () => { },
    onBackdropPress: null,
    backgroundColor: Colors.white,
    height: normalize(350),
    search: false,
    keyExtractor: () => { },
}
