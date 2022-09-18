import { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles"

export function Home() {
  const [ participants, setParticipants ] = useState<string[]>([])
  const [ participantName, setParticipantName ] = useState('');

  function handleParticipantAdd(participant: string) {
    
    if (participants.includes(participant)) {
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome")
    }

    if (!participant) {
      return Alert.alert("Escreva algo", "É necessário um nome")
    }

    setParticipants( oldState => [...oldState, participant] )
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(oldState => oldState.filter(participant => participant !== name ))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sexta, 4 novembro de 2022
      </Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantName}
          onChangeText={setParticipantName}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd(participantName)}>
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => ( 
          <Participant
            name={item}
            onRemove={handleParticipantRemove}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda ? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  )
}
