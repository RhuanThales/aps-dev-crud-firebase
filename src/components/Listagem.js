import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Listagem({data}) {
	return(
		<View style={styles.container}>
			<Text style={styles.text}>Nome: {data.nome}</Text>
			<Text style={styles.text}>Apelido: {data.apelido}</Text>
			<Text style={styles.text}>Número Camisa: {data.numero}</Text>
			<Text style={styles.text}>Posição: {data.posicao}</Text>
			<Text style={styles.text}>Time: {data.time}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
		backgroundColor: '#9BCCf9'
	},
	text:{
		color: '#222',
		fontSize: 17
	}
})