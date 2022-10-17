import { useState } from 'react'

import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { Input } from '@components/Input'

import { useNavigation } from '@react-navigation/native'

import { Container, Content, Icon } from './styles'
import { groupCreate } from '@storage/group/groupCreate'

export function NewGroup() {

  const [group, setGroup] = useState('')
  const navigation = useNavigation()

  async function handleNew() {
    try {
      await groupCreate(group)
      navigation.navigate('players', { group })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Container>
      <Header showBackButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova Turma"
          subTitle='Crie a turma para adicionar as pessoas'
        />

        <Input
          placeholder='Nome da turma'
          onChangeText={setGroup}
          value={group}

        />

        <Button
          title='Criar'
          style={{ marginTop: 20 }}
          onPress={handleNew}
        />
      </Content>

    </Container>
  )
}