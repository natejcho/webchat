const initialState = {
  room: null,
  chatLog: [],
  username: null,
}

export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case 'CREATE_ROOM_SUCCESS':
      return {
        ...state,
        room: action.payload,
      }
    case 'JOIN_ROOM_SUCCESS':
      return {
        ...state,
        room: action.payload,
      }
    case 'SET_USERNAME':
      return {
        ...state,
        username: action.username,
      }
    case 'UPDATE_CHAT_LOG':
      return {
        ...state,
        chatLog: (state.room != null && action.payload.roomId === state.room.id) ? [...state.chatLog, action.payload.data] : state.chatLog,
      }
    default:
      return { ...state };
  }
}