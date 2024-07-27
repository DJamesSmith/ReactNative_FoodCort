import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, Alert, FlatList, ImageBackground, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Icons } from '../../themes/Icons'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import AnimatedButton from '../../components/AnimatedButton'
import { Menu, MenuOption, MenuOptions, MenuProvider, MenuTrigger } from 'react-native-popup-menu'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsRequest, updateUserDetailsRequest } from '../../redux/reducers/UserReducer'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import normalize from '../../utils/helpers/normalize'
import ImageCropPicker from 'react-native-image-crop-picker'

const { width, height } = Dimensions.get('screen')

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const mobileNumberRegex = /^\+\d{1,15}$/

var status = ''

const EditProfile = ({ navigation, route }) => {

    const { userProfileDetails } = route.params
    // console.log(`userID: ${userProfileDetails._id}`)

    const dispatch = useDispatch()
    const UserReducer = useSelector(state => state.UserReducer)

    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        contactData: '',
    })

    const [error, setError] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    const [productImage, setProductImage] = useState('')
    const [imagePath, setImagePath] = useState({})

    const getImage = () => {
        ImageCropPicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
        })
            .then(image => {
                const imageUri = image.path

                let imageObj = {
                    name: image.filename ? image.filename : 'upload_image',
                    type: image.mime,
                    uri: image.path,
                }
                setImagePath(imageObj)
                setProductImage(imageUri)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const InputChange = (field, value) => {
        let newError = { ...error }

        if (field === 'firstName' || field === 'lastName') {
            if (!value.trim()) {
                newError[field] = '***Please enter ' + field.charAt(0).toUpperCase() + field.slice(1) + '.'
            } else {
                newError[field] = ''
            }
        }

        if (field === 'contactData') {
            if (!value.trim()) {
                newError.contactData = '***Please enter Email address or Mobile number.'
            } else if (!emailRegex.test(value) && !mobileNumberRegex.test(value)) {
                newError.contactData = 'Please enter a valid Email address or Mobile number.'
            } else {
                newError.contactData = ''
            }
        }

        setError(newError)
        setUserInfo(prevCredentials => ({ ...prevCredentials, [field]: value.trim() }))
    }

    if (UserReducer?.status !== status || status == '') {
        switch (UserReducer?.status) {
            case 'User/updateUserDetailsRequest':
                status = UserReducer?.status
                break

            case 'User/updateUserDetailsSuccess':
                status = UserReducer?.status
                navigation.navigate('My Profile')
                isInternetConnected()
                    .then(() => {
                        dispatch(getUserDetailsRequest())
                    })
                    .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                break

            case 'User/updateUserDetailsFailure':
                status = UserReducer?.status
                break

            default:
            // console.log(`Sorry, we are out of ${expr}.`)
        }
    }

    const submitProfile = () => {
        const { firstName, lastName } = userInfo

        if (firstName.trim() !== '' && lastName.trim() !== '' && imagePath) {
            const userData = new FormData()

            // userProfileDetails._id       ||     How to dispatch the userID to UserSaga API endpoint's params ?
            // userData.append('image', imagePath)

            userData.append('first_name', firstName)
            userData.append('last_name', lastName)
            userData.append('contact', userProfileDetails.contact)
            userData.append('password', userProfileDetails.decryptedPassword)

            if (imagePath.uri) {
                const filename = imagePath.uri.split('/').pop()
                userData.append('profile_pic', {
                    uri: imagePath.uri,
                    name: filename,
                    type: imagePath.type
                })
            }

            isInternetConnected()
                .then(() => {
                    dispatch(updateUserDetailsRequest({
                        userId: userProfileDetails._id,
                        userData,
                    }))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please fill up all the fields.', Colors.yellow, Colors.black)
        }
    }

    const arrMenuOptions = [
        { title: 'Deactivate account', btnSelectedFunc: () => deactivateAccount() },
        { title: 'Skills & Expertise', btnSelectedFunc: () => SkillsAndExpertise() },
        { title: 'Privacy', btnSelectedFunc: () => Privacy() },
    ]

    const deactivateAccount = () => {
        console.log(`deactivateAccount`)
        setIsOpen(false)
        Alert.alert('Are you sure you want to deactivate your account ?')
    }

    const SkillsAndExpertise = () => {
        console.log(`SkillsAndExpertise`)
        setIsOpen(false)
        Alert.alert('Skills & Expertise')
    }

    const Privacy = () => {
        console.log(`Privacy`)
        setIsOpen(false)
        Alert.alert('Privacy')
    }

    const isEmail = emailRegex.test(userProfileDetails.contact)
    const isPhoneNumber = mobileNumberRegex.test(userProfileDetails.contact)

    return (
        <MenuProvider>
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Header
                        backgroundColor={Colors.transparent}
                        title={`Edit Profile`}
                        fontSize={20}
                        titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                        color={Colors.black}
                        borderBottomColor={Colors.mediumGrey}
                        borderBottomWidth={0.5}

                        leftIcon={Icons.back}
                        leftIconSize={18}
                        leftIconLeft={10}
                        leftIconTintColor={Colors.grey}
                        onLeftPress={() => navigation.goBack()}

                        rightMenu
                        rightIconTintColor={Colors.grey}
                        onRightPress={() => {
                            setIsOpen(true)
                        }}
                    />
                </View>

                <Menu
                    opened={isOpen}
                    onBackdropPress={() => setIsOpen(false)}
                    onClose={() => setIsOpen(false)}>
                    <MenuTrigger />
                    <MenuOptions
                        optionsContainerStyle={{
                            // backgroundColor: Colors.red,
                            padding: 8,
                            marginLeft: 155,
                            marginTop: -35,
                            borderRadius: 8,
                            overflow: 'hidden'
                        }}>

                        {
                            arrMenuOptions.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <MenuOption
                                            onSelect={item?.btnSelectedFunc}
                                            customStyles={{
                                                optionWrapper: {
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                },
                                            }}>
                                            <Text style={styles.txtMenuOptions}>{item?.title}</Text>
                                        </MenuOption>
                                    </React.Fragment>
                                )
                            })
                        }

                    </MenuOptions>
                </Menu>


                <ScrollView style={styles.viewContentContainer}>
                    <TouchableOpacity
                        onPress={() => getImage()}
                        style={styles.btnAddImage}
                        activeOpacity={1}>
                        <ImageBackground
                            // source={{ uri: productImage ? productImage : 'https://cdn-icons-png.flaticon.com/128/4904/4904233.png' }}
                            source={{ uri: productImage ? productImage : `data:image/jpeg;base64,${userProfileDetails.profile_pic}` }}
                            style={{
                                height: 100,
                                width: 100
                            }}
                            borderRadius={normalize(12)}>
                            {
                                productImage ? '' : <Image
                                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/148/148764.png' }}
                                    style={{
                                        height: normalize(25),
                                        width: normalize(25),
                                        position: 'absolute',
                                        bottom: -10,
                                        right: -10,
                                        borderWidth: 2,
                                        borderColor: Colors.white,
                                        borderRadius: normalize(12.5),
                                    }}
                                />
                            }
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={styles.viewTextEditableContent}>
                        <View style={styles.nameInputView}>
                            <View style={styles.firstName}>
                                <CustomTextInput
                                    label={`First Name`}
                                    icon={Icons.user}
                                    placeholder={`${userProfileDetails.first_name}`}
                                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                                    fontSize={18}
                                    value={userInfo.firstName}
                                    onChangeText={text => InputChange('firstName', text)}
                                />
                            </View>

                            <View style={styles.lastName}>
                                <CustomTextInput
                                    label={`Last Name`}
                                    placeholder={`${userProfileDetails.last_name}`}
                                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                                    fontSize={18}
                                    value={userInfo.lastName}
                                    onChangeText={text => InputChange('lastName', text)}
                                />
                            </View>
                        </View>

                        <Text style={styles.txtContactLabel}>Contact</Text>
                        <TouchableOpacity
                            style={styles.btnMail}
                            activeOpacity={0.7}
                            onPress={() => {
                                if (isEmail) {
                                    Linking.openURL(`mailto:${userProfileDetails.contact}`)
                                } else if (isPhoneNumber) {
                                    const phoneNumber = Platform.OS === 'ios' ? `telprompt:${userProfileDetails.contact}` : `tel:${userProfileDetails.contact}`
                                    Linking.openURL(phoneNumber)
                                }
                            }}>
                            <Image
                                source={isEmail ? Icons.email : Icons.phone}
                                style={styles.imgMailIcon}
                            />
                            <Text style={styles.txtContact}>{userProfileDetails.contact}</Text>
                        </TouchableOpacity>

                        <Text style={styles.txtSubtitle}>Account Linked With</Text>

                        <AnimatedButton
                            leftIcon={Icons.google}
                            leftIconSize={20}
                            leftIconLeft={10}

                            title={'Google'}

                            rightIcon={Icons.link}
                            rightIconSize={20}
                            rightIconRight={10}

                            onPress={() => console.log('Google Linking...')}
                        />
                    </View>
                </ScrollView>

                <View style={styles.btnSaveChanges}>
                    <CustomButton
                        BGColor={Colors.orange}
                        title={`Save Changes`}
                        fontFamily={Fonts.SF_Compact_Rounded_Medium}
                        viewHeight={60}
                        width={'90%'}
                        alignItems={'center'}
                        loading={'User/updateUserDetailsRequest' == UserReducer?.status}
                        onPressFunc={() => {
                            console.log(`Profile: Save Changes`)
                            submitProfile()
                        }}
                    />
                </View>

            </View>
        </MenuProvider>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        // backgroundColor: Colors.black,
        width: '100%',
        paddingTop: 20
    },



    viewContentContainer: {
        // backgroundColor: Colors.red,
    },
    // viewImgContainer: {
    //     backgroundColor: Colors.orange,
    //     alignSelf: 'center',
    //     marginTop: 40,
    //     borderRadius: 55,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     overflow: 'hidden',

    //     shadowColor: Colors.black,
    //     shadowOffset: { width: 0, height: 0 },
    //     shadowOpacity: 0.7,
    //     shadowRadius: 7,
    //     elevation: 8
    // },
    // imgUser: {
    //     height: 110,
    //     width: 110,
    //     resizeMode: 'cover'
    // },
    btnAddImage: {
        // backgroundColor: Colors.red,
        height: 150,
        width: 150,
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 12,
        // borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewTextEditableContent: {
        // backgroundColor: Colors.red,
        paddingHorizontal: 35,
        marginTop: 30,
    },
    nameInputView: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstName: {
        // backgroundColor: Colors.blue,
        width: '48%',
        alignItems: 'center',

    },
    lastName: {
        // backgroundColor: Colors.black,
        width: '48%',
        alignItems: 'center',
    },
    txtContactLabel: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black
    },
    btnMail: {
        backgroundColor: Colors.lightGrey,
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center',
        borderRadius: 12,
        height: 60,
        paddingHorizontal: 15
    },
    txtContact: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.grey,
        marginLeft: 10,
        top: 1,
    },
    imgMailIcon: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        tintColor: Colors.mediumGrey
    },
    txtValidation: {
        color: Colors.red,
        fontSize: 15,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        marginBottom: 5,
        marginTop: -15,
        textAlign: 'right'
    },




    txtSubtitle: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black,
        marginTop: 15
    },


    btnSaveChanges: {
        backgroundColor: Colors.white,
        position: 'absolute',
        alignSelf: 'center',
        height: 80,
        width: width,
        alignItems: 'center',
        bottom: 0,
    },


    txtMenuOptions: {
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 16,
        top: 1
    },
})