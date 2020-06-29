import axios from 'axios';

const API_BASE = "http://localhost:5000";

export function createRoomRequest() {
  return {
    type: 'CREATE_ROOM_REQUEST',
  }
}

export function createRoomSuccess(payload) {
  return {
    type: 'CREATE_ROOM_SUCCESS',
    payload
  }
}

export function createRoomError(error) {
  return {
    type: 'CREATE_ROOM_ERROR',
    error
  }
}

export function createRoom(roomName) {
  return async function (dispatch) {
    dispatch(createRoomRequest());
    try {
      const res = await axios.get(API_BASE + "/room?name=" + roomName);
      dispatch(createRoomSuccess(res.data));
    } catch (error) {
      dispatch(createRoomError(error));
    }
  }
}

export function joinRoomRequest() {
  return {
    type: 'JOIN_ROOM_REQUEST'
  }
}

export function joinRoomSuccess(payload) {
  return {
    type: 'JOIN_ROOM_SUCCESS',
    payload
  }
}

export function joinRoomError(error) {
  return {
    type: 'JOIN_ROOM_ERROR',
    error
  }
}

export function joinRoom(roomId) {
  return async function (dispatch) {
    dispatch(joinRoomRequest());
    try {
      const response = await axios.get(`${API_BASE}/room/${roomId}`)
      dispatch(joinRoomSuccess(response.data));
    } catch (error) {
      dispatch(joinRoomError(error));
    }
  }
}

export function setUsername(username) {
  return {
    type: 'SET_USERNAME',
    username
  }
}

export function updateChatLog(payload) {
  return {
    type: 'UPDATE_CHAT_LOG',
    payload,
  }
}