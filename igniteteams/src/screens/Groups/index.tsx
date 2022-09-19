import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Container } from './styles';

export function Groups() {
  return (
    <Container >
      <Header />
      <Highlight 
        title='Turmas'
        subTitle='Jogue com a sua turma'
      />
    </Container>
  );
}
