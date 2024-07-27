import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import SwitchSelector from '../../components/SwitchSelector'
import { arrHistory, arrMyOrderImages } from '../../assets/Data'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import NoData from '../../utils/NoData'
import { Animations } from '../../themes/Animations'
import NetworkStatus from '../../utils/helpers/NetworkStatus'

const { width } = Dimensions.get('screen')

const MyOrder = () => {
    const [selectedSegment, setSelectedSegment] = useState('My Order')
    const [isSelected, setIsSelected] = useState(false)

    const handleSegmentChange = segment => {
        setSelectedSegment(segment)
        setIsSelected(!isSelected)
        // console.log(`selectedSegment: ${segment}`)
    }

    const handleGestureEvent = event => {
        if (event.nativeEvent.translationX > 50) {
            // Swipe right detected
            if (selectedSegment === 'History') {
                handleSegmentChange('My Order')
            }
        } else if (event.nativeEvent.translationX < -50) {
            // Swipe left detected
            if (selectedSegment === 'My Order') {
                handleSegmentChange('History')
            }
        }
    }

    const renderMyOrder = ({ item, index }) => {

        // console.log(`item: ${JSON.stringify(item)}`)
        return (
            <View style={styles.componentContainer}>
                <View style={styles.topDetail}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={{ uri: item?.imgIcon }}
                            style={styles.imgIcon}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.flexBetween}>
                            <Text style={styles.txtTitle}>{item?.title}</Text>
                            <View style={styles.viewOnProgress}>
                                <Text style={styles.txtRight}>On Progress</Text>
                            </View>
                        </View>
                        <View style={[styles.flexBetween, { marginTop: 4 }]}>
                            <Text style={styles.txtDatePrice}>Date</Text>
                            <Text style={styles.txtRight}>{item?.date}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text style={styles.txtDatePrice}>Price</Text>
                            <Text style={styles.txtRightPrice}>{item?.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomDetail}>
                    <TouchableOpacity style={styles.btnBottom}>
                        <Text style={styles.txtBottom}>Detail</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnBottom, { backgroundColor: Colors.orange, borderWidth: 0, }]}>
                        <Text style={[styles.txtBottom, { color: Colors.white }]}>Tracking</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderHistory = ({ item, index }) => {
        return (
            <View style={styles.componentContainer}>
                <View style={styles.topDetail}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={{ uri: item?.imgIcon }}
                            style={styles.imgIcon}
                        />
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.flexBetween}>
                            <Text style={styles.txtTitle}>{item?.title}</Text>
                            <View style={styles.viewCompleted}>
                                <Text style={[styles.txtRight, { color: Colors.green }]}>Completed</Text>
                            </View>
                        </View>
                        <View style={[styles.flexBetween, { marginTop: 4 }]}>
                            <Text style={styles.txtDatePrice}>Date</Text>
                            <Text style={styles.txtRight}>{item?.date}</Text>
                        </View>
                        <View style={styles.flexBetween}>
                            <Text style={styles.txtDatePrice}>Price</Text>
                            <Text style={styles.txtRightPrice}>{item?.price}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomDetail}>
                    <TouchableOpacity style={styles.btnBottom}>
                        <Text style={styles.txtBottom}>Rate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnBottom, { backgroundColor: Colors.orange, borderWidth: 0, }]}>
                        <Text style={[styles.txtBottom, { color: Colors.white }]}>Re-order</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <NetworkStatus>
            <PanGestureHandler
                onGestureEvent={handleGestureEvent}
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                        nativeEvent.translationX = 0
                    }
                }}>
                <View style={styles.container}>
                    <View style={styles.headerBar}>
                        <Header
                            backgroundColor={Colors.transparent}
                            title={`My Order`}
                            fontSize={20}
                            titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                            color={Colors.black}
                            borderBottomColor={Colors.mediumGrey}
                            borderBottomWidth={0.5}
                        />
                    </View>

                    <View style={styles.switchSelectorContainer}>
                        <SwitchSelector
                            isSelected={isSelected}
                            onSegmentChange={handleSegmentChange}
                        />
                    </View>

                    {
                        selectedSegment === 'My Order' ? <FlatList
                            data={arrMyOrderImages}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderMyOrder}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={() => {
                                return (
                                    <NoData renderAnimation={Animations.noOrdersYet} />
                                )
                            }}
                        /> :
                            selectedSegment === 'History' ? <FlatList
                                data={arrHistory}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderHistory}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={() => {
                                    return (
                                        <NoData renderAnimation={Animations.noHistory} />
                                    )
                                }}
                            /> : null
                    }
                </View>
            </PanGestureHandler>
        </NetworkStatus>
    )
}

export default MyOrder

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        backgroundColor: Colors.white,
        width: '100%',
        paddingTop: 20,
    },
    switchSelectorContainer: {
        marginTop: 20,
        marginBottom: 5
    },























    componentContainer: {
        // backgroundColor: Colors.red,
        borderRadius: 12,

        borderColor: Colors.mediumGrey,
        borderWidth: 0.7,
        width: width - 30,
        alignSelf: 'center',
        marginVertical: 8,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12
    },




    topDetail: {
        flexDirection: 'row',

    },
    imgContainer: {
        // backgroundColor: Colors.red,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        // backgroundColor: Colors.blue,
        width: '75%',
    },
    flexBetween: {
        // backgroundColor: Colors.green,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 8,
        alignItems: 'center',
        margin: 0.3
    },
    txtTitle: {
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 16,
        width: '60%',
        top: 4
    },
    txtDatePrice: {
        color: Colors.grey,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 14,
    },
    viewOnProgress: {
        // backgroundColor: Colors.green,
        borderColor: Colors.mediumGrey,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        borderRadius: 4,
        paddingHorizontal: 10,
    },
    txtRight: {
        color: Colors.grey
    },
    txtRightPrice: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.black,
        fontSize: 16
    },















    bottomDetail: {
        // backgroundColor: Colors.green,
        flexDirection: 'row',
        width: width - 60,
        justifyContent: 'space-between',
        marginTop: 10
    },
    imgIcon: {
        height: 80,
        width: 80,
        resizeMode: 'cover',
        borderRadius: 8
    },
    btnBottom: {
        borderColor: Colors.mediumGrey,
        borderWidth: 0.8,
        paddingVertical: 10,
        width: (width / 2) - 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtBottom: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.black,
        fontSize: 16
    },

    viewCompleted: {
        // backgroundColor: Colors.green,
        borderColor: Colors.mediumGrey,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        borderRadius: 4,
        paddingHorizontal: 10,
    }
})