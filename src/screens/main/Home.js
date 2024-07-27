import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Colors } from '../../themes/Colors'
import RenderMain from '../../components/home/RenderMain'
import HeaderComponent from '../../components/home/HeaderComponent'
import { Icons } from '../../themes/Icons'
import CustomHeader from '../../components/CustomHeader'
import NetworkStatus from '../../utils/helpers/NetworkStatus'

const { width, height } = Dimensions.get('screen')

const Home = ({ navigation }) => {

    const scrollY = useRef(new Animated.Value(0)).current

    return (
        <NetworkStatus homeTitle={`Home`}>
            <View style={styles.container}>

                {/* Header contains SliderBox & Search */}
                {/* RenderMain contains Category, "HotDeals", Ad & "TOTW" */}
                <FlatList
                    data={[0]}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={HeaderComponent}
                    ListHeaderComponentStyle={styles.flatlistHeaderContainer}
                    renderItem={({ item }) => <RenderMain navigation={navigation} />}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false }
                    )}
                />

                <CustomHeader
                    doubleTitle
                    upTitle={`Location`}
                    imgDownIcon={`https://cdn-icons-png.flaticon.com/128/4178/4178437.png`}
                    downTitle={`San Diego, CA`}

                    leftIcon={Icons.menu}
                    leftIconSize={25}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.openDrawer()}

                    rightIcon={Icons.notification}
                    rightIconSize={25}
                    rightIconTintColor={Colors.grey}
                    onRightPress={() => navigation.navigate(`Notifications`)}
                    scrollY={scrollY}
                />
            </View>
        </NetworkStatus>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,

    },
    headerBar: {
        // backgroundColor: Colors.black,
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 1,
        paddingTop: 40
    },
    flatlistHeaderContainer: {

    },
    flatlistFooterContainer: {

    }
})