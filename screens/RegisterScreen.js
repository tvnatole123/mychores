import React, { useState } from 'react';
import { Appbar, ToggleButton } from 'react-native-paper';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import styles from '../styles';
import Todos from './Todos';

export default function RegisterScreen({navigation}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setFullName] = useState();
    const [parent, setParent] = useState("");
    const ref = firestore().collection('users');

  const onRegisterPress = () => { 
    auth()
    .createUserWithEmailAndPassword(email, password, displayName, parent)
    .then((response) => {
      console.log('User account created & signed in!');
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        displayName,
        parent
      }
      ref.doc(uid)
      .set(data)
      .then(() => {
        navigation.navigate('Todos', {user: data})
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      })
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
  
      console.error(error);
    });
  
  }

    return (
      <>
       <Appbar style={styles.bar}>
          <Appbar.Action
            icon="less-than"
            onPress={() => navigation.navigate('Login')}
            size={28}
            style={{paddingLeft: 3}}
          />
          <Appbar.Content title={<Text style={styles.barText}> Registration</Text>} />
        </Appbar>
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder='Name'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setFullName(text)}
                value={displayName}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
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
            <ToggleButton.Row onValueChange={value => setParent(value)} value={parent}>
              <ToggleButton style={styles.toggle} icon={()=><View><Text>Parent</Text></View>} value="true" />
              <ToggleButton style={styles.toggle} icon={()=><View><Text>Child</Text></View>} value="false" />
            </ToggleButton.Row>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onRegisterPress()}>
                <Text style={styles.buttonTitle}>Register</Text>
            </TouchableOpacity>
        </View>
        </>
    )
}