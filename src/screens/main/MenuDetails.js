import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, FlatList, TextInput, KeyboardAvoidingView, Platform, Animated, ActivityIndicator, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import { Fonts } from '../../themes/Fonts'
import CustomButton from '../../components/CustomButton'
import CustomHeader from '../../components/CustomHeader'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import { deleteCommentRequest, getAllCommentsRequest, getAllLikedCommentsRequest, patchLikeCommentRequest, patchUnlikeCommentRequest, postNewCommentRequest, updateCommentRequest } from '../../redux/reducers/CommentReducer'
import { getUserDetailsRequest } from '../../redux/reducers/UserReducer'
import { getAllUsersRequest } from '../../redux/reducers/AllUsersReducer'
import NoData from '../../utils/NoData'
import { Animations } from '../../themes/Animations'
import CommentLoader from '../../utils/helpers/CommentLoader'
import { formatDate } from '../../utils/helpers/FormatDate'
import EditCommentModal from '../../utils/centerModals/EditCommentModal'
import ConfirmationModal from '../../utils/centerModals/ConfirmationModal'

const { width, height } = Dimensions.get('screen')

var status = ''

const likeIcon = `https://cdn-icons-png.flaticon.com/128/15352/15352392.png`
const unlikeIcon = `https://cdn-icons-png.flaticon.com/128/15352/15352224.png`

const MenuDetails = ({ navigation, route }) => {

    const { productId, title, imgIcon, price, rating, isLiked, description, calories, deliveryDuration } = route.params
    // console.log(`title: ${title} \nimgIcon: ${imgIcon} \nprice: ${price} \nrating: ${rating} \nisLiked: ${isLiked} \ndescription: ${description}`)

    const dispatch = useDispatch()
    const CommentReducer = useSelector(state => state.CommentReducer)
    const UserReducer = useSelector(state => state.UserReducer)
    const AllUsersReducer = useSelector(state => state.AllUsersReducer)

    const isFocused = useIsFocused()
    const [allComments, setAllComments] = useState([])
    const [likedComments, setLikedComments] = useState([])
    const [userDetails, setUserDetails] = useState({})
    const [allUsersDetails, setAllUsersDetails] = useState([])

    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

    const [currentComment, setCurrentComment] = useState('')
    const [isEditCommentModalVisible, setIsEditCommentModalVisible] = useState(false)
    const [editingComment, setEditingComment] = useState(null)

    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
    const [commentIdToDelete, setCommentIdToDelete] = useState(null)

    const [likedCommentIds, setLikedCommentIds] = useState(new Set())

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(getAllCommentsRequest({ productId: productId }))
                    dispatch(getUserDetailsRequest())
                    dispatch(getAllUsersRequest())
                    dispatch(getAllLikedCommentsRequest({ productId: productId }))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

    useEffect(() => {
        if (UserReducer?.status !== status || status == '') {
            switch (UserReducer?.status) {
                case 'User/getUserDetailsRequest':
                    status = UserReducer?.status
                    break

                case 'User/getUserDetailsSuccess':
                    status = UserReducer?.status
                    setUserDetails(UserReducer?.userInfo ? UserReducer?.userInfo : {})
                    break

                case 'User/getUserDetailsFailure':
                    status = UserReducer?.status
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [UserReducer])

    // All Users Details (required: profile_pic, first_name, last_name)
    useEffect(() => {
        if (AllUsersReducer?.status !== status || status == '') {
            switch (AllUsersReducer?.status) {
                case 'AllUsers/getAllUsersRequest':
                    status = AllUsersReducer?.status
                    break

                case 'AllUsers/getAllUsersSuccess':
                    status = AllUsersReducer?.status
                    setAllUsersDetails(AllUsersReducer?.allUsers ? AllUsersReducer?.allUsers : [])
                    break

                case 'AllUsers/getAllUsersFailure':
                    status = AllUsersReducer?.status
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [AllUsersReducer])

    useEffect(() => {
        if (CommentReducer?.status !== status || status == '') {
            switch (CommentReducer?.status) {
                case 'Comment/getAllCommentsRequest':
                    status = CommentReducer?.status
                    console.log('-->> getAllCommentsRequest')
                    break

                case 'Comment/getAllCommentsSuccess':
                    status = CommentReducer?.status
                    console.log('-->> getAllCommentsSuccess')
                    setAllComments(CommentReducer?.allComments ? CommentReducer?.allComments : [])
                    break

                case 'Comment/getAllCommentsFailure':
                    status = CommentReducer?.status
                    console.log('-->> getAllCommentsFailure')
                    break





                case 'Comment/postNewCommentRequest':
                    status = CommentReducer?.status
                    console.log('-->> postNewCommentRequest')
                    break

                case 'Comment/postNewCommentSuccess':
                    status = CommentReducer?.status
                    console.log('-->> postNewCommentSuccess')
                    isInternetConnected()
                        .then(() => {
                            dispatch(getAllCommentsRequest({ productId: productId }))
                        })
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'Comment/postNewCommentFailure':
                    status = CommentReducer?.status
                    console.log('-->> postNewCommentFailure')
                    break






                case 'Comment/updateCommentRequest':
                    status = CommentReducer?.status
                    console.log('-->> updateCommentRequest')
                    break

                case 'Comment/updateCommentSuccess':
                    status = CommentReducer?.status
                    console.log('-->> updateCommentSuccess')
                    isInternetConnected()
                        .then(() => {
                            dispatch(getAllCommentsRequest({ productId: productId }))
                        })
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'Comment/updateCommentFailure':
                    status = CommentReducer?.status
                    console.log('-->> updateCommentFailure')
                    break





                case 'Comment/deleteCommentRequest':
                    status = CommentReducer?.status
                    console.log('-->> deleteCommentRequest')
                    break

                case 'Comment/deleteCommentSuccess':
                    status = CommentReducer?.status
                    console.log('-->> deleteCommentSuccess')
                    isInternetConnected()
                        .then(() => {
                            dispatch(getAllCommentsRequest({ productId: productId }))
                        })
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'Comment/deleteCommentFailure':
                    status = CommentReducer?.status
                    console.log('-->> deleteCommentFailure')
                    break

                // ------------------------------------------------------------------------------------------------------------

                case 'Comment/getAllLikedCommentsRequest':
                    status = CommentReducer?.status
                    console.log('-->> getAllLikedCommentsRequest')
                    break

                case 'Comment/getAllLikedCommentsSuccess':
                    status = CommentReducer?.status
                    console.log('-->> getAllLikedCommentsSuccess')
                    setLikedComments(CommentReducer?.allLikedComments ? CommentReducer?.allLikedComments : [])
                    const likedIds = new Set(CommentReducer?.allLikedComments.map(comment => comment._id))
                    setLikedCommentIds(likedIds)

                    break

                case 'Comment/getAllLikedCommentsFailure':
                    status = CommentReducer?.status
                    console.log('-->> getAllLikedCommentsFailure')
                    break




                case 'Comment/patchLikeCommentRequest':
                    status = CommentReducer?.status
                    console.log('-->> patchLikeCommentRequest')
                    break

                case 'Comment/patchLikeCommentSuccess':
                    status = CommentReducer?.status
                    console.log('-->> patchLikeCommentSuccess')
                    break

                case 'Comment/patchLikeCommentFailure':
                    status = CommentReducer?.status
                    console.log('-->> patchLikeCommentFailure')
                    break




                case 'Comment/patchUnlikeCommentRequest':
                    status = CommentReducer?.status
                    console.log('-->> patchUnlikeCommentRequest')
                    break

                case 'Comment/patchUnlikeCommentSuccess':
                    status = CommentReducer?.status
                    console.log('-->> patchUnlikeCommentSuccess')
                    break

                case 'Comment/patchUnlikeCommentFailure':
                    status = CommentReducer?.status
                    console.log('-->> patchUnlikeCommentFailure')
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [CommentReducer])


    const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded)

    const renderDescription = () => {
        if (description.length <= 180 || isDescriptionExpanded) {
            return description
        } else {
            return `${description.slice(0, 180)}...`
        }
    }

    const renderReadMoreButton = () => {
        if (description.length > 150) {
            return (
                <TouchableOpacity onPress={toggleDescription} style={styles.btnReadMore}>
                    <Text style={styles.readMore}>{isDescriptionExpanded ? 'Read less' : 'Read more'}</Text>
                </TouchableOpacity>
            )
        }
    }

    const handleSubmitModalComment = () => {
        // console.log(`Comment userDetails._id: ${userDetails._id}`)
        // console.log(`Comment productId: ${productId}`)

        if (currentComment.trim() !== '') {
            const updatedCommentPayload = {
                comment: currentComment,
                product: productId
            }

            // console.log(`currentComment123: ${currentComment}`)
            // console.log(`editingComment123: ${editingComment?._id}`)

            isInternetConnected()
                .then(() => {
                    dispatch(updateCommentRequest({ commentId: editingComment?._id, updatedCommentPayload }))
                    setIsEditCommentModalVisible(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please type in a comment.', Colors.red)
        }
    }

    const handleDeleteComment = commentId => {
        setCommentIdToDelete(commentId)
        setIsDeleteModalVisible(true)
    }

    const confirmDeleteComment = () => {
        setIsDeleteModalVisible(false)
        isInternetConnected()
            .then(() => {
                dispatch(deleteCommentRequest({ commentId: commentIdToDelete }))
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    const toggleLikeIcon = commentId => {
        // console.log(`index: ${commentId}`)
        // console.log(`likedComments: ${JSON.stringify(likedComments[0])}`)

        const isLikedByCurrentUser = likedCommentIds.has(commentId)

        isInternetConnected()
            .then(() => {
                if (isLikedByCurrentUser) {
                    dispatch(patchUnlikeCommentRequest({ commentId }))
                    setLikedCommentIds(prevState => {
                        const updated = new Set(prevState)
                        updated.delete(commentId)
                        return updated
                    })
                } else {
                    dispatch(patchLikeCommentRequest({ commentId }))
                    setLikedCommentIds(prevState => {
                        const updated = new Set(prevState)
                        updated.add(commentId)
                        return updated
                    })
                }
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    const renderReviewItem = ({ item, index }) => {
        const user = allUsersDetails.find(user => user._id === item.user)
        if (!user) return null

        const isCurrentUser = item.user === userDetails._id
        const isLikedByCurrentUser = likedCommentIds.has(item._id)

        // console.log(`likedByNumberOfPeople: ${item?.likedBy.length}`)

        const longPressEditComment = item => {
            setEditingComment(item)
            setCurrentComment(item.comment)
            setIsEditCommentModalVisible(true)
        }

        return (
            <View style={styles.reviewContainer}>
                <View style={styles.flexView}>
                    <Image
                        source={{ uri: user.profile_pic === '' ? `https://cdn-icons-png.flaticon.com/128/149/149071.png` : `data:image/jpeg;base64,${user.profile_pic}` }}
                        style={styles.imgProfile}
                    />
                    <Text style={styles.txtUsername}>
                        {`${user.first_name} ${user.last_name}`}
                        {isCurrentUser && <Text style={styles.youText}> (You)</Text>}
                    </Text>
                </View>
                <View style={styles.flexReview}>
                    <TouchableOpacity
                        style={styles.btnEditComment}
                        onLongPress={() => longPressEditComment(item)}
                        disabled={!isCurrentUser}>
                        <Text style={styles.txtComment}>{item.comment}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnLikeComment}
                        onPress={() => toggleLikeIcon(item?._id)}>
                        <Image
                            source={{ uri: isLikedByCurrentUser ? likeIcon : unlikeIcon }}
                            style={styles.imgLikeComment}
                        />
                        <Text style={styles.txtLikes}>{item.likedBy.length + (isLikedByCurrentUser ? 1 : 0)}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.flexReview, { marginLeft: 50, }]}>
                    <Text style={styles.txtDate}>{item?.createdAt ? formatDate(item?.createdAt) : '--'}</Text>
                    {isCurrentUser && (
                        <TouchableOpacity
                            style={styles.btnDeleteComment}
                            onPress={() => handleDeleteComment(item?._id)}>
                            <Text style={styles.txtDelete}>Delete</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        )
    }

    const footerPostReview = () => {
        const [postComment, setPostComment] = useState('')
        const [isInputFocused, setIsInputFocused] = useState(false)

        const submitComment = () => {
            // console.log(`Comment userDetails._id: ${userDetails._id}`)
            // console.log(`Comment productId: ${productId}`)

            if (postComment.trim() !== '') {
                const commentPayload = {
                    comment: postComment,
                    product: productId
                }

                isInternetConnected()
                    .then(() => {
                        dispatch(postNewCommentRequest(commentPayload))
                    })
                    .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
            } else {
                showErrorAlert('Please type in a comment.', Colors.red)
            }
        }

        // console.log(`Comment Writeup: ${postComment}`)

        return (
            <View style={styles.viewPostReview}>
                <View style={[styles.textInputView, { borderColor: isInputFocused ? Colors.orange : Colors.grey }]}>
                    <TextInput
                        placeholder={`Add comment for "${title}"...`}
                        value={postComment}
                        onChangeText={txt => setPostComment(txt)}
                        multiline
                        // backgroundColor={Colors.red}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        style={{
                            // backgroundColor: Colors.blue,
                            fontFamily: Fonts.SF_Compact_Rounded_Medium,
                            width: '90%',
                            top: 1
                        }}
                    />
                    {
                        CommentReducer?.status == 'Comment/postNewCommentRequest' ? <ActivityIndicator color={Colors.orange} size={'small'} /> : postComment.length > 0 ? <TouchableOpacity
                            style={styles.btnSendComment}
                            disabled={postComment.length === 0 ? true : false}
                            onPress={submitComment}>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10350/10350926.png' }}
                                style={styles.imgSend}
                            />
                        </TouchableOpacity> : ''
                    }
                </View>
            </View>
        )
    }

    // console.log(`allUsersDetails: ${allUsersDetails}`)

    const renderMenuDetailsContent = ({ item, index }) => {
        // console.log(`MenuDetails_title: ${title} \nMenuDetails_price: ${price}`)

        return (
            <>
                <View style={styles.imgDishView}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${imgIcon}` }}
                        style={styles.imgDish}
                    />
                </View>
                <View style={styles.thumbnailView}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${imgIcon}` }}
                        style={styles.imgThumbnailDish}
                    />
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.txtTitle}>{title}</Text>

                    {/* Flex View: Rating, Kcal, Delivery duration */}
                    <View style={styles.flexViewContainer}>
                        <View style={styles.flexView}>
                            <Image
                                source={Icons.star}
                                style={styles.imgFlexIcons}
                            />
                            <Text style={styles.txtFlex}>{rating}</Text>
                        </View>
                        <View style={styles.flexView}>
                            <Image
                                source={Icons.fire}
                                style={styles.imgFlexIcons}
                            />
                            <Text style={styles.txtFlex}>{calories} Kcal</Text>
                        </View>
                        <View style={styles.flexView}>
                            <Image
                                source={Icons.timer}
                                style={[styles.imgFlexIcons, { tintColor: Colors.orange }]}
                            />
                            <Text style={styles.txtFlex}>{deliveryDuration} min</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <View style={styles.viewDesc}>
                        <Text style={styles.txtHeader}>Description</Text>
                        <Text style={styles.txtDesc}>{renderDescription()}</Text>
                        {renderReadMoreButton()}
                    </View>

                    <CustomButton
                        BGColor={Colors.orange}
                        title={`Add to Cart`}
                        imageIcon={Icons.cart}
                        imageLeft={-width / 2 + 80}
                        fontFamily={Fonts.SF_Compact_Rounded_Medium}
                        viewHeight={60}
                        width={'85%'}
                        alignSelf={'center'}
                        marginTop={10}
                        alignItems={'center'}
                        onPressFunc={() => {
                            // console.log(`Add to Cart`)
                            navigation.navigate(`ExtraIngredients`, {
                                productId: productId,
                                title: title,
                                imgIcon: imgIcon,
                                price: price,
                            })
                        }}
                    />

                    {/* Location */}

                    {/* Reviews Header */}
                    <View style={styles.viewReviewHeader}>
                        <Text style={styles.txtReviewsHeader}>Reviews</Text>
                        {
                            CommentReducer?.status == 'Comment/updateCommentRequest' ? <ActivityIndicator
                                color={Colors.orange} size={'small'} style={styles.activityIndicator} /> : CommentReducer?.status == 'Comment/deleteCommentRequest' ? <ActivityIndicator
                                    color={Colors.orange} size={'small'} style={styles.activityIndicator} /> : null
                        }
                    </View>

                    {
                        CommentReducer?.status == 'Comment/getAllCommentsRequest' ? <CommentLoader visible={CommentReducer?.status == 'Comment/getAllCommentsRequest'} /> : <FlatList
                            data={allComments}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderReviewItem}
                            contentContainerStyle={{
                                backgroundColor: Colors.red,
                            }}
                            ListFooterComponent={footerPostReview}
                            ListFooterComponentStyle={{
                                // backgroundColor: Colors.green,
                            }}
                            ListEmptyComponent={() => {
                                return (
                                    CommentReducer?.status == 'Comment/getAllCommentsRequest' ? <CommentLoader
                                        visible={CommentReducer?.status == 'Comment/getAllCommentsRequest'} /> : <NoData
                                        renderAnimation={Animations.page404} />
                                )
                            }}
                        />
                    }
                </View>
            </>
        )
    }

    const scrollY = useRef(new Animated.Value(0)).current

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={10}>

            <View style={styles.headerBar}>
                <CustomHeader
                    title={`Menu Detail`}
                    color={Colors.white}
                    fontSize={20}
                    titleFontFamily={Fonts.SF_Compact_Rounded_Regular}
                    titleTop={2}

                    leftIcon={Icons.back}
                    leftIconSize={18}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.goBack()}

                    rightIcon={Icons.favorite}
                    rightIconSize={18}
                    onRightPress={() => console.log(`Notifications: Menu Details`)}
                    scrollY={scrollY}
                />
            </View>

            <FlatList
                data={[0]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMenuDetailsContent}
                contentContainerStyle={{
                    // backgroundColor: Colors.blue,
                    paddingBottom: 30
                }}

                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false }
                )}
            />

            <EditCommentModal
                isEditCommentModalVisible={isEditCommentModalVisible}
                setIsEditCommentModalVisible={setIsEditCommentModalVisible}
                btnEditComment={handleSubmitModalComment}
                editingComment={currentComment}
                setEditingComment={txt => {
                    // console.log(`currentComment: ${currentComment}`)
                    setCurrentComment(txt)
                }}
            />

            <ConfirmationModal
                visible={isDeleteModalVisible}
                onClose={() => setIsDeleteModalVisible(false)}
                onConfirm={confirmDeleteComment}
                title={`Delete Comment`}
                question={`Are you sure you want to delete this comment?`}
                rejectTitle={`Cancel`}
                acceptTitle={`OK`}
            />
        </KeyboardAvoidingView>
    )
}

export default MenuDetails

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    imgDishView: {
        // backgroundColor: Colors.red,
        height: height / 2.7,
        width: width,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
    imgDish: {
        height: height / 2.2,
        width: width,
        resizeMode: 'cover',
    },
    thumbnailView: {
        backgroundColor: Colors.white,
        height: 235,
        width: 235,
        borderRadius: 117.5,
        position: 'absolute',
        top: height / 3 - 120,
        left: width / 2 - 117.5,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgThumbnailDish: {
        height: 225,
        width: 225,
        resizeMode: 'cover',
        borderRadius: 112.5,
    },
    headerBar: {
        // backgroundColor: Colors.black,
        width: '100%',
        position: 'absolute',
        zIndex: 1,
    },

    contentContainer: {
        // backgroundColor: Colors.red,
        marginTop: 100,
    },

    txtTitle: {
        // backgroundColor: Colors.red,
        fontSize: 32,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        width: width / 1.5,
        textAlign: 'center',
        alignSelf: 'center',
        // height: 80
    },





    flexViewContainer: {
        // backgroundColor: Colors.pink,
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 60,
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: 10
    },
    flexView: {
        flexDirection: 'row',
        // alignItems: 'center'
    },
    imgFlexIcons: {
        height: 18,
        width: 18,
        resizeMode: 'contain',
    },
    txtFlex: {
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 18,
        marginLeft: 8,
        top: 2
    },




    viewDesc: {
        // backgroundColor: Colors.red,
        width: width - 60,
        alignSelf: 'center',
        marginTop: 20,
    },
    txtHeader: {
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 24,
        marginBottom: 10,
    },
    txtDesc: {
        color: Colors.grey,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 18
    },






    btnReadMore: {
        // backgroundColor: Colors.blue,
        alignSelf: 'flex-end'
    },
    readMore: {
        color: Colors.orange,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
    },




    viewReviewHeader: {
        // backgroundColor: Colors.mediumGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        marginTop: 60
    },
    txtReviewsHeader: {
        // backgroundColor: Colors.red,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 26,
        color: Colors.black,
    },
    activityIndicator: {
        // backgroundColor: Colors.blue,
        right: 10
    },


















    // Reviews
    reviewContainer: {
        // backgroundColor: Colors.green,
        marginVertical: 8,
        paddingHorizontal: 30
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgProfile: {
        height: 40,
        width: 40,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    // imgRating: {
    //     height: 60,
    //     width: '60%',
    //     resizeMode: 'contain',
    //     tintColor: Colors.gold,
    // },
    txtUsername: {
        // backgroundColor: Colors.red,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.black,
        fontSize: 20,
        width: '60%',
        marginLeft: 10
    },
    flexReview: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    youText: {
        // backgroundColor: Colors.red,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.orange,
        fontSize: 20,
    },
    txtDate: {
        // backgroundColor: Colors.red,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.mediumGrey,
        fontSize: 12,
    },
    btnDeleteComment: {
        // backgroundColor: Colors.lightGrey,
        left: 20,
    },
    txtDelete: {
        // backgroundColor: Colors.red,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.red,
        fontSize: 12,
    },
    btnEditComment: {
        // backgroundColor: Colors.green,
        width: '70%',
        marginLeft: 50,

    },
    txtComment: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        color: Colors.grey,
        fontSize: 14,
    },
    btnLikeComment: {
        // backgroundColor: Colors.blue,
        position: 'absolute',
        right: 10,
        alignItems: 'center',
        width: 30
    },
    imgLikeComment: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.red
    },
    txtLikes: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        color: Colors.red,
        fontSize: 12,
    },










    // PostReview
    viewPostReview: {
        // backgroundColor: Colors.red,
        height: 100,
        paddingHorizontal: 30,
        justifyContent: 'center',
    },
    textInputView: {
        // backgroundColor: Colors.green,
        borderColor: Colors.grey,
        borderWidth: 0.7,
        borderRadius: 12,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btnSendComment: {
        // backgroundColor: Colors.red,
    },
    imgSend: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        tintColor: Colors.orange,
    },
})