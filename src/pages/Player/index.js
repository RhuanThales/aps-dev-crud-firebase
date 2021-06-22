import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import firebase from "../../firebaseConnection";
import ListPlayers from '../../components/ListPlayers'

export default function Player() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [number, setNumber] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState("");
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function dados() {
      await firebase
        .database()
        .ref("players")
        .on("value", (snapshot) => {
          setPlayers([]);
          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              name: childItem.val().name,
              nickname: childItem.val().nickname,
              number: childItem.val().number,
              position: childItem.val().position,
              team: childItem.val().team,
            };
            setPlayers((oldArray) => [...oldArray, data].reverse());
          });
          setLoading(false);
        });
    }
    dados();
  }, []);

  async function createPlayer() {
    if (
      (name !== "") &
      (nickname !== "") &
      (number !== "") &
      (position !== "") &
      (team !== "")
    ) {
      let players = await firebase.database().ref("players");
      let chave = players.push().key;

      players.child(chave).set({
        name: name,
        nickname: nickname,
        number: number,
        position: position,
        team: team,
      });
      alert("Jogador Cadastrado com sucesso!");
      setNickname("");
      setName("");
      setNumber("");
      setPosition("");
      setTeam("");
    } else {
      alert("Preencha o formulario para o Cadastro do Jogador!");
    }
  }

  return(
    <View style={styles.container}>
      <Text style={styles.principal}>Cadastro de Jogadores de Futebol:</Text>

      <Text style={styles.texto}>Nome do Jogador:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setName(texto)}
        value={name}
      />

      <Text style={styles.texto}>Apelido:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setNickname(texto)}
        value={nickname}
      />

      <Text style={styles.texto}>Número da Camisa:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setNumber(texto)}
        value={number}
      />

      <Text style={styles.texto}>Posição:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setPosition(texto)}
        value={position}
      />

      <Text style={styles.texto}>Time:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setTeam(texto)}
        value={team}
      />

      <Button title="Concluir" onPress={createPlayer} />

      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={players}
          renderItem={({ item }) => <ListPlayers data={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
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
  },
})