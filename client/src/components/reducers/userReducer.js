
// const initialState = {
//   token: null,
//   username: null,
//   role: null,
// };

// export function userReducer (state = initialState, action) {
//   switch (action.type) {
//     case "LOGIN":
  
//       return {
//         ...state,
//         token: action.payload.token,
//         username: action.payload.username,
//         role: action.payload.role,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         token: null,
//         username: null,
//         role: null,
//       };
//     default:
//       return state;
//   }
// };



const initialState = {
  token: null,
  username: null,
  role: null,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        role: action.payload.role,
      };
    case "LOGOUT":
      localStorage.removeItem("token"); // เปลี่ยนจาก clear() เป็น removeItem เฉพาะ token
      return initialState;
    default:
      return state;
  }
}