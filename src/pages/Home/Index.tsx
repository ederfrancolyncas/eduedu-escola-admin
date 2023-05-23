import { Center } from "@mantine/core";
import { Link } from "@tanstack/router";

export const Home = () => {
  return (
    <div>
      <Center>
        <h1>Bem-vindo!</h1>
        <Link to="/login">Sair</Link>
      </Center>
    </div>
  );
};
