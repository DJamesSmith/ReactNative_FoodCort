import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import normalize from './normalize';
import { Animations } from '../../themes/Animations'
import { Colors } from '../../themes/Colors';

const { height, width } = Dimensions.get('screen')
export default function Loader(props) {
    return props.visible ? (
        <View
            style={[
                {
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 999,
                    top: 0,
                    left: 0,
                    height: height,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                props.modal == true ? { height: '133%', width: '116.5%' } : null,
            ]}>
            <View style={styles.lottieContainer}>
                <LottieView
                    style={{ flex: 1 }}
                    source={Animations.animatedLoader}
                    autoPlay
                    loop
                />
            </View>
        </View>
    ) : null
}

Loader.propTypes = {
    visible: PropTypes.bool,
    modal: PropTypes.bool,
};

Loader.defaultProps = {
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