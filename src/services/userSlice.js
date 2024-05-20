import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    isNews: true,
  user: {
    _id: "",
    username: "",
    email: "",
    avatar: "",
phone_number: "",
status: "",
token: ""
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => initialState,
    login: (state, action) => {
      state.user = action.payload,
      state.isAuthenticated = true
    },
    setNews: (state, action) => {
      state.isNews = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, setNews} = userSlice.actions

export default userSlice.reducer