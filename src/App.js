import React from 'react';
import './App.scss';
import { Container } from 'react-bootstrap';
import { Game } from './components/Game/Game';
const boardGame = [["", "", ""], ["", "", ""], ["", "", ""]]

function App() {
  return (
    <Container className="main-board-wrapper">
      <Game boardGame={boardGame} />
    </Container>);
}

export default App;
