import React, { useEffect, useRef, useState } from 'react';
import { Header } from '@components/Header';
import { FlatList, TextInput } from 'react-native';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from '@components/Highlight';
import { ButtonIcon } from '@components/ButtonIcon';
import { PlayerCard } from '@components/PlayerCard';
import { Alert } from "react-native"

import { Container, Form, HeaderList, NumberOfPlayers } from './styles';
import { useRoute, useNavigation } from '@react-navigation/native'
import { AppError } from '@utils/AppError';
import { playerAddByGroup } from '@storage/Player/playerAddByGroup';
import { playerGeyByGroupAndTeam } from '@storage/Player/playerGeyByGroupAndTeam';
import { PlayerStorageDTO } from '@storage/Player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/Player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import Loading from '@components/Loading';

type RouteParams = {
  group: string;
}

export function Players() {
  const [isLoading, setIsLoading] = useState(true)
  const [newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const inputRef = useRef<TextInput>(null)

  const navigate = useNavigation()
  const route = useRoute();
  const { group } = route.params as RouteParams

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)

      inputRef.current?.blur()

      fetchPlayerByTeam()
      setNewPlayerName('')

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova Pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova Pessoa', 'Não foi possível adicionar')
      }
    }
  }

  async function fetchPlayerByTeam() {
    try {
      setIsLoading(true)
      const playersTeam = await playerGeyByGroupAndTeam(group, team)
      setPlayers(playersTeam)

    } catch (error) {
      console.log(error)
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time')
    }

    setIsLoading(false)
  }

  async function handlePlayerRemove(name: string) {

    try {
      await playerRemoveByGroup(group, name)
      fetchPlayerByTeam()

    } catch (error) {
      console.log(error);
    }
  }

  async function removeGroup() {
    try {
      await groupRemoveByName(group);
      navigate.navigate('groups')
    } catch (error) {
      console.log(error);
      Alert.alert('Remoção do grupo', 'Não foi possível remover o grupo!')
    }
  }

  function handleRemoveGroup() {
    Alert.alert(
      'Remover grupo',
      'Tem certeza que deseja remover a turma?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => removeGroup() }
      ]
    )
  }

  useEffect(() => {
    fetchPlayerByTeam()
  }, [team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle='adicione a galera e separe os times'
      />

      <Form>
        <Input
          inputRef={inputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />
        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)} />
          )}
          horizontal
        />

        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>


      {isLoading ? <Loading /> :
        <FlatList
          data={players}
          keyExtractor={item => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty
              message='Não há pessoas nesse time.'
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 }
          ]}
        />
      }


      <Button
        title='Remover Turma'
        type='SECONDARY'
        onPress={handleRemoveGroup}
      />

    </Container>
  );
}