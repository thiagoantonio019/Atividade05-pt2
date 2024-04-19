import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

export default function Home() {
    const navigation = useNavigation(); // Hook para utilizar a navegação

    // Corrigido: Código para criar ou abrir o banco de dados SQLite
    const db = DatabaseConnection.getConnection();

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                // Corrigido: Removido a vírgula e o parêntese extras no SQL
                "CREATE TABLE IF NOT EXISTS filmes (id INTEGER PRIMARY KEY AUTOINCREMENT, consulta TEXT NOT NULL, genero TEXT NOT NULL, classificacao TEXT NOT NULL)",
                [],
                () => console.log('Tabela criada com sucesso'),
                (_, error) => console.error(error)
            );
        });
    }, []);

    // Funções para navegação
    const ExibirRegistro = () => {
        navigation.navigate('ExibirRegistro');
    };

    const Cadastrar = () => {
        navigation.navigate('Cadastrar');
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Seja bem-vindo à clínica!</Text>
            <TouchableOpacity style={styles.button} onPress={Cadastrar}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={ExibirRegistro}>
                <Text style={styles.buttonText}>Exibir todos os registros</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414', // Fundo preto
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 30
    },
    welcomeText: {
        color: '#ffffff', // Texto em branco
        fontSize: 24,
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#e50914', // Vermelho Netflix
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#ffffff', // Texto do botão em branco
        fontSize: 16,
        fontWeight: 'bold',
    },
});
