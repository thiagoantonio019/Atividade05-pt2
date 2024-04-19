// // src/Pesquisar/Pesquisar.js

// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('db.db');

// export default function Pesquisar() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = () => {
//     db.transaction(tx => {
//       tx.executeSql(
//         `SELECT * FROM clients WHERE name LIKE ? OR phone LIKE ?;`,
//         [`%${searchTerm}%`, `%${searchTerm}%`],
//         (_, { rows: { _array } }) => {
//           setResults(_array);
//         },
//         (_, error) => {
//           console.error("Failed to search clients in database", error);
//           return false;
//         }
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Digite o nome ou telefone"
//         value={searchTerm}
//         onChangeText={setSearchTerm}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleSearch}>
//         <Text style={styles.buttonText}>Pesquisar</Text>
//       </TouchableOpacity>
//       <ScrollView style={styles.resultsContainer}>
//         {results.map(client => (
//           <View key={client.id} style={styles.resultItem}>
//             <Text style={styles.resultText}>Nome: {client.name}</Text>
//             <Text style={styles.resultText}>Telefone: {client.phone}</Text>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   button: {
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   resultsContainer: {
//     marginTop: 20,
//   },
//   resultItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   resultText: {
//     fontSize: 16,
//   }
// });
