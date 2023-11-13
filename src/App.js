import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 6 });
  const [isGameOver, setIsGameOver] = useState(false);

  const maze = [
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 2],
    [1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const handleKeyDown = (e) => {
    if (!isGameOver) {
      let newPlayerPosition = { ...playerPosition };

      switch (e.key) {
        case 'ArrowUp':
          newPlayerPosition.y -= 1;
          break;
        case 'ArrowDown':
          newPlayerPosition.y += 1;
          break;
        case 'ArrowLeft':
          newPlayerPosition.x -= 1;
          break;
        case 'ArrowRight':
          newPlayerPosition.x += 1;
          break;
        default:
          break;
      }

      if (isValidMove(newPlayerPosition.x, newPlayerPosition.y)) {
        setPlayerPosition(newPlayerPosition);

        if (maze[newPlayerPosition.y][newPlayerPosition.x] === 2) {
          setIsGameOver(true);
        }
      }
    }
  };

  const isValidMove = (x, y) => {
    return (
      x >= 0 &&
      x < maze[0].length &&
      y >= 0 &&
      y < maze.length &&
      maze[y][x] !== 1
    );
  };

  const restartGame = () => {
    setIsGameOver(false);
    setPlayerPosition({ x: 0, y: 6 });
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, isGameOver]);

  return (
    <div>
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, columnIndex) => (
            <div
              key={columnIndex}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor:
                  playerPosition.x === columnIndex &&
                  playerPosition.y === rowIndex
                    ? 'green'
                    : cell === 1
                    ? 'black'
                    : cell === 2
                    ? 'red'
                    : 'white',
                border: '1px solid gray',
              }}
            ></div>
          ))}
        </div>
      ))}
      {isGameOver && 
      <>
        <p>Перемога!</p>
        <button onClick={restartGame}>Рестарт</button>
      </>}
    </div>
  );
}

export default App;
