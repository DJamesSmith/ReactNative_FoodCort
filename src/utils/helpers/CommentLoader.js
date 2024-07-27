import React from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import LottieView from 'lottie-react-native'
import normalize from './normalize'
import { Animations } from '../../themes/Animations'
import { Colors } from '../../themes/Colors'

const { height, width } = Dimensions.get('screen')

const CommentLoader = props => {
    return props.visible ? (
        <View
            style={[
                {
                    height: 100,
                    width: '90%',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                props.modal == true ? { height: '133%', width: '116.5%' } : null,
            ]}>
            <View style={styles.lottieContainer}>
                <LottieView
                    style={{ flex: 1 }}
                    source={Animations.commentsLoader}
                    autoPlay
                    loop
                />
            </View>
        </View>
    ) : null
}

export default CommentLoader

CommentLoader.propTypes = {
    visible: PropTypes.bool,
    modal: PropTypes.bool,
}

CommentLoader.defaultProps = {
    modal: false,
    visible: false,
}

const styles = StyleSheet.create({
    lottieContainer: {
        // backgroundColor: Colors.blue,
        height: 100,
        width: 100,
        aspectRatio: 1,
        alignSelf: 'center',
        // top: -80,
        // left: -30
    },
})