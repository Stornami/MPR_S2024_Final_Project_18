import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, ImageBackground, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase';
const image = (require('../assets/images/bg.jpeg'));

const RegisterScreen = ({navigation}) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isRePasswordHidden, setIsRePasswordHidden] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rePasswordError, setRePasswordError] = useState(false);

    const handleRegister = () => {
        setEmailError(email === '');
        setPasswordError(password === '');
        setRePasswordError(rePassword === '' || rePassword !== password);

        if (email !== '' && password !== '' && rePassword === password) {
            
            createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log('user register: ', user.email);
        navigation.navigate('Login');
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        }
    };

    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>

            <View style={styles.inputContainer}>
                <Text style={styles.registerText}>Register</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <Text style={{color: 'white', fontWeight: '600'}}>Already had an account? <Text style={{color: '#F14C01'}} onPress={() => {navigation.navigate('Login')}}>Login</Text></Text>
                </View>
                <View  style={[styles.inputView, {borderColor: emailError ? '#F14C01' : 'white'}]}>
                    <Feather name='user' size={20} color={emailError ? '#F14C01' : 'black'}/>
                    <TextInput 
                    placeholder='Email' 
                    style={styles.input} 
                    value={email}
                    onChangeText={text => setEmail(text)}
                    >
                    </TextInput>
                </View>

                <View style={[styles.inputView, {borderColor: passwordError ? '#F14C01' : 'white'}]}>
                    <Feather name='lock' size={20} color={passwordError ? '#F14C01' : 'black'}/>

                    <TextInput 
                    placeholder='Password' 
                    style={styles.input} 
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={isPasswordHidden}
                    >
                    </TextInput>
                    <Text onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                        {isPasswordHidden ? 'Show' : 'Hide'}
                    </Text>
                </View>
                <View style={[styles.inputView, {borderColor: rePasswordError ? '#F14C01' : 'white'}]}>
                    <Feather name='lock' size={20} color={rePasswordError ? '#F14C01' : 'black'}/>

                    <TextInput 
                    placeholder='Re-enter Password' 
                    style={styles.input} 
                    value={rePassword}
                    onChangeText={text => setRePassword(text)}
                    secureTextEntry={isRePasswordHidden}
                    >
                    </TextInput>
                    <Text onPress={() => setIsRePasswordHidden(!isRePasswordHidden)}>
                        {isRePasswordHidden ? 'Show' : 'Hide'}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleRegister}
                    style={styles.button}
                >
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 17}}>Register</Text>
                </TouchableOpacity>
            </View>
            </View>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerText: {
        color: 'white',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: 'bold',
    },
    inputView:{
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        height: 60,
        borderWidth: 2,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
        borderRadius: 10,
    },
    inputContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        height: 460,
        padding: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#F14C01',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    
});

export default RegisterScreen;