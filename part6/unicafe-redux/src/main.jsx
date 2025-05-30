import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const ok = () => {
    store.dispatch({ type: "OK" });
  };

  const bad = () => {
    store.dispatch({ type: "BAD" });
  };

  return (
    <div>
      <button onClick={good}>good</button>
      <div>good {store.getState().good}</div>

      <button onClick={ok}>ok</button>
      <div>ok {store.getState().ok}</div>
      <button onClick={bad}>bad</button>
      <div>bad {store.getState().bad}</div>
      <button>reset stats</button>
      <div>ok</div>
      <div>bad</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
