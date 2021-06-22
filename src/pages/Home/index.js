import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "../../firebaseConnection";

export default function Home() {
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [city, setCity] = useState("");
	const [user, setUser] = useState("");

	async function createUser() {
		await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((value) => {
				firebase.database().ref("users").child(value.user.uid).set({
					city: city,
				});
				alert("Registro realizado com sucesso!" + ' ' + value.user.email);
				setEmail("");
				setPassword("");
				setCity("");
			})
			.catch((error) => {
				alert("Algo deu errado no seu cadastro! Tente novamente!");
				return;
			});
	}

	async function login() {
		await firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((value) => {
				alert("Bem vindo(a):" + value.user.email);
				setUser(value.user.email);
			})
			.catch((error) => {
				alert("Algo deu errado no login! Tente novamente!");
				return;
			})
		setEmail("");
		setPassword("");
		setCity("");
	}

	async function logout() {
		await firebase.auth().signOut();
		setUser("");
		alert("Obrigado pela visita! Volte sempre!");
	}

	return (
		<View style={styles.container}>
			<Text style={styles.principal}>Registro / Login</Text>

			<Text style={styles.texto}>E-mail:</Text>
			<TextInput
				style={styles.input}
				underlineColorAndroid="transpartent"
				onChangeText={(texto) => setEmail(texto)}
				value={email}
			/>

			<Text style={styles.texto}>Senha:</Text>
			<TextInput
				style={styles.input}
				secureTextEntry={true}
				underlineColorAndroid="transpartent"
				onChangeText={(texto) => setPassword(texto)}
				value={password}
			/>

			<Text style={styles.texto}>Cidade:</Text>
			<TextInput
				style={styles.input}
				underlineColorAndroid="transpartent"
				onChangeText={(texto) => setCity(texto)}
				value={city}
			/>
			<Button title="Criar Conta" onPress={createUser} />

			{ user.length > 0 ?
				(
					<Button  title="Sair" onPress={logout} />
				) :
				(
					<Button  title="Entrar" onPress={login} />
				)
			}
			{ user.length > 0 ?
				(
					<Text style={styles.texto}>Usuário:{user}</Text>
				) :
				(
					<Text style={styles.texto}>Visitante</Text>
				)
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 10,
	},
	texto: {
		fontSize: 20,
	},
	input: {
		marginBottom: 10,
		padding: 10,
		borderWidth: 1,
		borderColor: "#121212",
		height: 45,
		fontSize: 17,
	},
	principal: {
		fontSize: 25,
		fontWeight: 600,
		textAlign: "center",
	}
})