// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('db.db');

// export default function Editar({ route, navigation }) {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [clientId, setClientId] = useState(null);

//   useEffect(() => {
//     if (route.params?.id) {
//       setClientId(route.params.id);
//       loadClientDetails(route.params.id);
//     }
//   }, [route.params]);

//   const loadClientDetails = (id) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM clients WHERE id = ?;',
//         [id],
//         (_, { rows: { _array } }) => {
//           if (_array.length > 0) {
//             setName(_array[0].name);
//             setPhone(_array[0].phone);
//           }
//         },
//         (_, error) => {
//           console.error("Failed to fetch client from database", error);
//         }
//       );
//     });
//   };

//   const handleUpdateClient = () => {
//     if (name === '' || phone === '') {
//       Alert.alert("Erro", "Por favor, preencha todos os campos.");
//       return;
//     }

//     db.transaction(tx => {
//       tx.executeSql(
//         'UPDATE clients SET name = ?, phone = ? WHERE id = ?;',
//         [name, phone, clientId],
//         () => {
//           Alert.alert("Sucesso", "Cliente atualizado com sucesso!");
//           navigation.goBack();
//         },
//         (_, error) => {
//           console.error("Failed to update client in database", error);
//           Alert.alert("Erro", "Falha ao atualizar o cliente.");
//         }
//       );
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Nome do Cliente"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Telefone do Cliente"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />
//       <TouchableOpacity style={styles.button} onPress={handleUpdateClient}>
//         <Text style={styles.buttonText}>Atualizar</Text>
//       </TouchableOpacity>
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
//     padding: 15,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   }
// });