import React, { useState, useCallback } from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { DatabaseConnection } from '../../database/database';

function ExibirRegistros() {
    const [contatos, setContatos] = useState([]);

    useFocusEffect(
        useCallback(() => {
            const db = DatabaseConnection.getConnection();
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM contatos",
                    [],
                    (_, { rows: { _array } }) => setContatos(_array),
                    (_, error) => console.error(error)
                );
            });
        }, [])
    );

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

export default ExibirRegistros;