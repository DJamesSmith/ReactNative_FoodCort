// import React, { Component, useRef } from 'react';
// import {
//     Animated,
//     Image,
//     ScrollView,
//     StyleSheet,
//     Text,
//     View,
// } from 'react-native';

// const HEADER_MAX_HEIGHT = 200;
// const HEADER_MIN_HEIGHT = 60;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

// const Header = () => {

//     const scrollY = useRef(new Animated.Value(0)).current;

//     const headerHeight = scrollY.interpolate({
//         inputRange: [0, HEADER_SCROLL_DISTANCE],
//         outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
//         extrapolate: 'clamp',
//     });

//     const imageOpacity = scrollY.interpolate({
//         inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
//         outputRange: [1, 1, 0],
//         extrapolate: 'clamp',
//     });
//     const imageTranslate = scrollY.interpolate({
//         inputRange: [0, HEADER_SCROLL_DISTANCE],
//         outputRange: [0, -50],
//         extrapolate: 'clamp',
//     });

//     return (
//         <View style={styles.fill}>
//             <ScrollView
//                 style={styles.fill}
//                 scrollEventThrottle={16}
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { y: scrollY } } }]
//                 )}

//             >
//                 {<View style={styles.scrollViewContent}>
//                     {Array.from({ length: 30 }).map((_, i) =>
//                         <View key={i} style={styles.row}>
//                             <Text>{i}</Text>
//                         </View>
//                     )}
//                 </View>}
//             </ScrollView>

//             <Animated.View style={[styles.header, { height: headerHeight }]}>
//                 <Animated.Image
//                     style={[
//                         styles.backgroundImage,
//                         { opacity: imageOpacity, transform: [{ translateY: imageTranslate }] },
//                     ]}
//                     source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4gpkLdBd1M6jfmSoeYYhx60SFoRyMMxTwCp3VT-UcMw&s' }}
//                 />
//                 <View style={styles.bar}>
//                     <Text style={styles.title}>Title</Text>
//                 </View>
//             </Animated.View>
//         </View>
//     )
// }

// export default Header

// const styles = StyleSheet.create({
//     fill: {
//         flex: 1,
//     },
//     row: {
//         height: 40,
//         margin: 16,
//         backgroundColor: '#D3D3D3',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     header: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: '#03A9F4',
//         overflow: 'hidden',
//     },
//     bar: {
//         marginTop: 28,
//         height: 32,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         backgroundColor: 'transparent',
//         color: 'white',
//         fontSize: 18,
//     },
//     scrollViewContent: {
//         marginTop: HEADER_MAX_HEIGHT,
//     },
//     backgroundImage: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         width: null,
//         height: HEADER_MAX_HEIGHT,
//         resizeMode: 'cover',
//     },
// })