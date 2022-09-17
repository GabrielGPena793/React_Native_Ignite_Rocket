import { Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from "./styles"

export function Home() {
  const participants = ['Gabriel', 'Jorge', 'Karla', 'Kaio', 'Pipo', 'Pepinho', 'Lara', 'Cafu', 'Mario']

  function handleParticipantAdd() {
    console.log("Clicou no botão de adicionar!")
  }

  function handleParticipantRemove(name: string) {
    console.log(`Clicou no botão para remover o participant ${name}`)
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
        />

        <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
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
