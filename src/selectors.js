import { createSelector } from 'reselect'

const chatSelector = state => state;

export const roomSelector = createSelector(
  chatSelector,
  chat => chat.room
)

export const chatLogSelector = createSelector(
  chatSelector,
  chat => chat.chatLog
)

export const usernameSelector = createSelector(
  chatSelector,
  chat => chat.username
)