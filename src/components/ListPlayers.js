import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListPlayers({data}) {
	return(
		<View style={styles.container}>
			<Text style={styles.text}>Nome: {data.name}</Text>
			<Text style={styles.text}>Apelido: {data.nickname}</Text>
			<Text style={styles.text}>Número Camisa: {data.number}</Text>
			<Text style={styles.text}>Posição: {data.position}</Text>
			<Text style={styles.text}>Time: {data.team}</Text>
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