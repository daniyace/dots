import React from 'react';
import '../styles/selection.css';

const Selection = (props) => {
  return (
    <div className='selection container'>
      <header>
        <h1 className='text-center'>tic-tac-toe on React</h1>
      </header>
      <section>
        <h3 className='text-center par'>Choose the number of players</h3>
        <div className='center'>
          <button
            className='btn btn-primary disabled'
            onClick={() => props.setPlayers(1)}
          >
            1
          </button>
          <button
            className='btn btn-primary'
            onClick={() => props.setPlayers(2)}
          >
            2
          </button>
        </div>
      </section>
    </div>
  );
};

export default Selection;
