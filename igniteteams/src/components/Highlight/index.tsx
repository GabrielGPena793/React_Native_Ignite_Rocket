import { Container, Title, SubTitle } from "./styles";


type Props = {
  title: string;
  subTitle: string;
}

export function Highlight({ subTitle, title }: Props) {
  return (
    <Container>
      <Title>
        { title }
      </Title>

      <SubTitle>
        { subTitle }
      </SubTitle>
    </Container>
  );
}