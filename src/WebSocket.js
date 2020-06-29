import React from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { updateChatLog } from './actions';

const WS_BASE = "http://localhost:5000";

export const WebSocketContext = React.createContext(null);

const WebSocket = props => {
  let socket;
  let ws;

  if (!socket) {
    socket = io.connect(WS_BASE);
    socket.on("event://get-message", msg => {
      const payload = JSON.parse(msg);
      props.updateChatLog(payload);
    })
    ws = {
      socket,
      sendMessage: (roomId, message) => {
        const payload = {
          roomId,
          data: message,
        }
        socket.emit("event://send-message", JSON.stringify(payload));
        updateChatLog(payload);
      }
    }
  }
  return (
    <WebSocketContext.Provider value={ws}>
      {props.children}
    </WebSocketContext.Provider>
  );
};

WebSocket.propTypes = {
  children: PropTypes.node.isRequired,
  updateChatLog: PropTypes.func.isRequired,
};

export default connect(null, { updateChatLog })(WebSocket);