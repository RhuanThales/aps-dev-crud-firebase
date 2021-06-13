import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import firebase from "./src/firebaseConnection";
import Listagem from "./src/components/Listagem";

export default function App() {
  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [numero, setNumero] = useState("");
  const [posicao, setPosicao] = useState("");
  const [time, setTime] = useState("");
  const [listaDeJogadores, setListaDeJogadores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      await firebase
        .database()
        .ref("listaDeJogadores")
        .on("value", (snapshot) => {
          setListaDeJogadores([]);
          snapshot.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
              apelido: childItem.val().apelido,
              numero: childItem.val().numero,
              posicao: childItem.val().posicao,
              time: childItem.val().time,
            };
            setListaDeJogadores((oldArray) => [...oldArray, data].reverse());
          });
          setLoading(false);
        });
    }
    loadData();
  }, []);

  async function cadJogador() {
    if (
      (nome !== "") &
      (apelido !== "") &
      (numero !== "") &
      (posicao !== "") &
      (time !== "")
    ) {
      let listaDeJogadores = await firebase.database().ref("listaDeJogadores");
      let chave = listaDeJogadores.push().key;

      listaDeJogadores.child(chave).set({
        nome: nome,
        apelido: apelido,
        numero: numero,
        posicao: posicao,
        time: time,
      });
      alert("Cadastro do jogador realizado com sucesso!");
      setNome("");
      setApelido("");
      setNumero("");
      setPosicao("");
      setTime("");
    } else {
      alert("Informe os dados para realizar o cadastro do jogador!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.principal}>CRUD de Jogadores de Futebol!</Text>

      <Text style={styles.texto}>Nome:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setNome(texto)}
        value={nome}
      />

      <Text style={styles.texto}>Apelido:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setApelido(texto)}
        value={apelido}
      />

      <Text style={styles.texto}>Número Camisa:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setNumero(texto)}
        value={numero}
      />

      <Text style={styles.texto}>Posição:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setPosicao(texto)}
        value={posicao}
      />

      <Text style={styles.texto}>Time:</Text>
      <TextInput
        style={styles.input}
        underlineColorAndroid="transpartent"
        onChangeText={(texto) => setTime(texto)}
        value={time}
      />

      <Button title="Cadastrar" onPress={cadJogador} />

      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={listaDeJogadores}
          renderItem={({ item }) => <Listagem data={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  texot: {
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
});