export default function reducer(state={}, action) {
  switch (action.type) {
    case 'GET_PLACE_NAME': {
      return {...state, data: action.payload}
    }
    default: return state;

  }
}
