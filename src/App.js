import React from 'react';
import { Provider } from 'react-redux';
import HomeComponent from './HomeComponent';
import WebSocketProvider from './WebSocket';
import store from './store';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <WebSocketProvider>
        <div className="App">
          <HomeComponent />
        </div>
      </WebSocketProvider>
    </Provider>
  );
}

export default App;
