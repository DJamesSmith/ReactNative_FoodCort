

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const TextInputHeight = () => {
    const [text, setText] = useState('');
    const [inputHeight, setInputHeight] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Enter Text:</Text>
            <TextInput
                style={[styles.input, { height: Math.max(35, inputHeight) }]}
                value={text}
                onChangeText={setText}
                placeholder="Type here..."
                multiline={true}
                onContentSizeChange={(event) =>
                    setInputHeight(event.nativeEvent.contentSize.height)
                }
            />
            <Text style={styles.output}>You typed: {text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        flex: 1,
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        fontSize: 16,
        paddingVertical: 5,
    },
    output: {
        marginTop: 16,
        fontSize: 16,
    },
});

export default TextInputHeight