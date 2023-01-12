import { useEffect, useRef, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

const clickAndHold = (btnEl) => {
  let timerId;
  const DURATION = 200;

  //handle when clicking down
  const onMouseDown = () => {
    timerId = setInterval(() => {
      btnEl && btnEl.click();
    }, DURATION);
  };

  //stop or clear interval
  const clearTimer = () => {
    timerId && clearInterval(timerId);
  };

  //handle when mouse is clicked
  btnEl.addEventListener('mousedown', onMouseDown);
  //handle when mouse is raised
  btnEl.addEventListener('mouseup', clearTimer);
  //handle mouse leaving the clicked button
  btnEl.addEventListener('mouseout', clearTimer);

  // a callback function to remove listeners useful in libs like react
  // when component or element is unmounted
  return () => {
    btnEl.removeEventListener('mousedown', onMouseDown);
    btnEl.removeEventListener('mouseup', () => {
      console.log('is out up');
    });
    btnEl.removeEventListener('mouseout', () => {
      console.log('is out');
    });
  };
};

function App() {
  const [count, setCount] = useState(0);
  const btnUpRef = useRef(null);
  const testRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const removeListenerUp = clickAndHold(btnUpRef.current);
    return () => {
      removeListenerUp();
    };
  }, []);

  const clickHandler = (e) => {
    // setActive(true);
    // console.log(target);
    // document.getElementById('leaf-sin').classList.add('leaf');
    // console.log(e.target);
  };

  return (
    <div className="App">
      <div
        style={{ position: 'relative' }}
        ref={btnUpRef}
        onClick={clickHandler}
        onMouseUp={() => setActive(false)}
        onTouchEnd={() => setActive(false)}
        onTouchStart={() => setActive(true)}
        onMouseDown={() => setActive(true)}
      >
        <img
          src="/vite.svg"
          alt="Vite logo"
          style={{ width: '200px', height: '300px' }}
        />

        <img
          id="leaf-sin"
          src={reactLogo}
          alt="React logo"
          className={`${active ? 'leaf' : ''}`}
          style={{ width: '200px', position: 'absolute', left: 80 }}
        />
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
