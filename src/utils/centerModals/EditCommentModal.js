import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../themes/Colors'
import normalize from '../helpers/normalize'
import CustomButton from '../../components/CustomButton'
import { Fonts } from '../../themes/Fonts'
import CenterModal from '../../components/CenterModal'

const { width, height } = Dimensions.get('screen')

const EditCommentModal = ({
    isEditCommentModalVisible,
    setIsEditCommentModalVisible,
    btnEditComment,
    editingComment,
    setEditingComment }) => {

    const [isFocused, setIsFocused] = useState(false)

    const [error, setError] = useState('')

    const onInputChange = text => {
        setError('')
        setEditingComment(text)
    }

    const btnHandleEditComment = () => {
        if (!editingComment.trim()) {
            setError('***Please enter Comment.')
            return
        }

        setError('')
        btnEditComment()
    }

    return (
        <>
            <CenterModal
                modalVisible={isEditCommentModalVisible}
                backgroundColor={Colors.white}
                height={300}
                borderRadius={normalize(12)}
                onBackdropPress={() => setIsEditCommentModalVisible(false)}>

                {/* Input View */}
                <View style={styles.inputContainer}>
                    {/* Comment Input */}
                    <View style={styles.flexView}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/12559/12559750.png' }}
                            style={[styles.imgComment, {
                                tintColor: isFocused ? Colors.orange : Colors.black,
                            }]}
                        />
                        <Text style={[styles.txtComment, {
                            color: isFocused ? Colors.orange : Colors.black,
                        }]}>Comment</Text>
                    </View>

                    <View style={[styles.viewCommentInput, {
                        borderColor: isFocused ? Colors.orange : Colors.grey,
                        borderWidth: isFocused ? 1 : 0.5,
                    }]}>
                        <TextInput
                            placeholder={'Enter comment'}
                            placeholderTextColor={Colors.mediumGrey}
                            textAlignVertical='top'
                            multiline
                            value={editingComment}
                            onChangeText={onInputChange}
                            style={styles.inputComment}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>
                </View>

                {error ? <Text style={styles.txtValidation}>{error}</Text> : null}

                <View style={styles.viewBtnContainer}>
                    <CustomButton
                        BGColor={Colors.orange}
                        title={`Save`}
                        fontFamily={Fonts.SF_Compact_Rounded_Medium}
                        viewHeight={60}
                        alignItems={'center'}
                        alignSelf={'center'}
                        width={'85%'}
                        onPressFunc={btnHandleEditComment}
                    />
                </View>

            </CenterModal>
        </>


    )
}

export default EditCommentModal

const styles = StyleSheet.create({
    inputContainer: {
        // backgroundColor: Colors.blue,
        backgroundColor: Colors.white,
        height: 160,
        width: width - 60,
        alignSelf: 'center',
        marginVertical: 1,
    },
    flexView: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtComment: {
        color: Colors.black,
        fontSize: 20,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        top: 1,
        marginLeft: 10
    },
    viewCommentInput: {
        backgroundColor: Colors.white,
        height: 125,
        width: '100%',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 5,

        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    imgComment: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
    },
    inputComment: {
        // backgroundColor: Colors.violet,
        flex: 1,
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 10,
        height: '100%',
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
    },
    txtValidation: {
        // backgroundColor: Colors.blue,
        color: Colors.red,
        fontSize: 15,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        marginBottom: 5,
        textAlign: 'right',
        paddingHorizontal: 30
    },
    viewBtnContainer: {
        // backgroundColor: Colors.black,
        width: width,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20
    },
})
