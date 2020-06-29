import React from 'react';
import { connect } from 'react-redux';
import { WebSocketContext } from './WebSocket';
import { usernameSelector, roomSelector, chatLogSelector } from './selectors';
import { setUsername } from './actions';
import PropTypes from 'prop-types';

ChatRoom.propTypes = {
  chatLog: PropTypes.array.isRequired,
  setUsername: PropTypes.func.isRequired,
  username: PropTypes.string,
  room: PropTypes.object,
};

ChatRoom.defaultProps = {
  username: null,
  room: null,
};

function ChatRoom(props) {
  const [usernameInput, setUsernameInput] = React.useState("");
  const [messageInput, setMessageInput] = React.useState("");
  const ws = React.useContext(WebSocketContext);

  return (
    <div>
      <h3>{props.room.name} {props.room.id}</h3>
      {!props.username && <div className="user">
        <input type="text" placeholder="Enter Username" value={usernameInput} onChange={e => setUsernameInput(e.target.value)} />
        <button onClick={() => props.setUsername(usernameInput)}>Enter Room</button>
      </div>}
      {props.username && <div className="room">
        <div className="history">
          {props.chatLog.map((c, i) => <div key={i}>
            <i>{c.username}: </i><p>{c.message}</p>
          </div>)}
        </div>
        <div className="control">
          <input type="text" value={messageInput} onChange={e => setMessageInput(e.target.value)} />
          <button onClick={() => {
            ws.sendMessage(props.room.id, {
              username: props.username,
              message: messageInput,
            })
          }}>Send</button>
        </div>
      </div>}
    </div>
  );
}

export default connect(state => ({
  username: usernameSelector(state),
  chatLog: chatLogSelector(state),
  room: roomSelector(state),
}), {
  setUsername
})(React.memo(ChatRoom));