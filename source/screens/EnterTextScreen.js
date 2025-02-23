import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { speak } from '../services/speechService';

const EnterTextScreen = () => {
    const [text, setText] = useState('');

    return (
        <View>
            <TextInput
                placeholder="Type something..."
                value={text}
                onChangeText={setText}
                style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <Button title="Speak" onPress={() => speak(text)} />
        </View>
    );
};

export default EnterTextScreen;