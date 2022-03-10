import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import styles from '../styles';
import { Appbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onFooterLinkPress = () => {
        navigation.navigate('RegisterScreen')
    }

    const onLoginPress = () => {
        auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;

        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }

    return (
        <>
        <Appbar style={styles.bar}>
          <Appbar.Content title={<Text style={styles.barText}> My Chores </Text>} />
        </Appbar>
        <View style={{flex: 1}}>
           <ImageBackground source={require('../screens/images/to-do-chores.jpeg')} resizeMode="cover" style={styles.image}>
            </ImageBackground>
        </View>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='E-mail'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholderTextColor="#aaaaaa"
                secureTextEntry
                placeholder='Password'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => onLoginPress()}>
                <Text style={styles.buttonTitle}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Don't have an account? <Text onPress={onFooterLinkPress} style={styles.footerLink}>Sign up</Text></Text>
            </View>
        </View>
      </>
    )
}