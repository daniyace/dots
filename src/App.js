import React, { useState } from 'react';
import Game from './components/Game';
import Selection from './components/Selection';

function App() {
  const [players, setPlayers] = useState(0);
  return (
    <div className='container'>
      {players === 0 ? (
        <Selection setPlayers={setPlayers} />
      ) : (
        <Game players={players} />
      )}
    </div>
  );
}

export default App;
