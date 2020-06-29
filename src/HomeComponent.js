import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChatRoom from './ChatRoom';
import { roomSelector } from './selectors';
import { createRoom, joinRoom } from './actions';

const HomeComponent = props => {
  const [roomName, setRoomName] = React.useState("");
  const [roomId, setRoomId] = React.useState("");

  return (
    <div>
      {!props.room && <div className="create">
        <div>
          <span>Create new room</span>
          <input type="text" placeholder="Room name" value={roomName} onChange={e => setRoomName(e.target.value)} />
          <button onClick={() => props.createRoom(roomName)}>Create</button>
        </div>
        <div>
          <span>Join existing room</span>
          <input type="text" placeholder="Room code" value={roomId} onChange={e => setRoomId(e.target.value)} />
          <button onClick={() => props.joinRoom(roomId)}>Join</button>
        </div>
      </div>}
      {props.room && <ChatRoom />}
    </div>
  );
};

HomeComponent.propTypes = {
  room: PropTypes.object,
  createRoom: PropTypes.func.isRequired,
  joinRoom: PropTypes.func.isRequired,
};

export default connect(state => ({
  room: roomSelector(state),
}), {
  createRoom,
  joinRoom
})(React.memo(HomeComponent));