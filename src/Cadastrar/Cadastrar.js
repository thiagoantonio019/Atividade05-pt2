import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, Alert, FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

export default function Home() {
    const navigation = useNavigation();
    const [telefone, setTelefone] = useState('');
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');

    const db = DatabaseConnection.getConnection();

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS contatos (id INTEGER PRIMARY KEY AUTOINCREMENT, telefone TEXT NOT NULL, nome TEXT NOT NULL, tipo TEXT NOT NULL)",
                [],
                () => console.log('Tabela de contatos criada com sucesso'),
                (_, error) => console.error(error)
            );
        });
    }, []);

    const handleCadastro = () => {
        if (!telefone || !nome || !tipo) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        db.transaction(tx => {
            tx.executeSql(
                "INSERT INTO contatos (telefone, nome, tipo) VALUES (?, ?, ?)",
                [telefone, nome, tipo],
                () => {
                    Alert.alert("Sucesso", "Contato cadastrado com sucesso!");
                    setTelefone('');
                    setNome('');
                    setTipo('');
                },
                (_, error) => console.error(error)
            );
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Seja bem-vindo!</Text>
            <TextInput style={styles.input} placeholder="Telefone" onChangeText={setTelefone} value={telefone} />
            <TextInput style={styles.input} placeholder="Nome" onChangeText={setNome} value={nome} />
            <TextInput style={styles.input} placeholder="Tipo" onChangeText={setTipo} value={tipo} />

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar Contato</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExibirRegistros')}>
                <Text style={styles.buttonText}>Exibir todos os registros</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Novo componente para exibir os registros
function ExibirRegistros() {
    const [contatos, setContatos] = useState([]);

    useEffect(() => {
        const db = DatabaseConnection.getConnection();
        db.transaction(tx => {
            tx.executeSql(
                "SELECT * FROM contatos",
                [],
                (_, { rows: { _array } }) => setContatos(_array),
                (_, error) => console.error(error)
            );
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={contatos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listText}>Nome: {item.nome}</Text>
                        <Text style={styles.listText}>Telefone: {item.telefone}</Text>
                        <Text style={styles.listText}>Tipo: {item.tipo}</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 30
    },
    welcomeText: {
        color: '#ffffff',
        fontSize: 24,
        marginBottom: 30,
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#fff',
        color: '#000',
    },
    button: {
        backgroundColor: '#e50914',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        width: '100%'
    },
    listText: {
        color: '#000'
    }
});

