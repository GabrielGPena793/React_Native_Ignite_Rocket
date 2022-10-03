import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Highlight } from '@components/Highlight';
import React from 'react';

import { Container, Form } from './styles';
import { Input } from '@components/Input';

export function Players() {
  return (
    <Container>
      <Header  showBackButton/>

      <Highlight 
        title='Nome da turma'
        subTitle='adicione a galera e separe os times'
      />

    <Form>
      <Input 
        placeholder='Nome da pessoa'
        autoCorrect={false}
      />
      <ButtonIcon  icon='add' />
    </Form>

    </Container>
  );
}