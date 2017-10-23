export default function reducer(state={
  data: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'GET_PLACE_IMAGE': {
      return {...state, fetching: true}
    }
    case 'GET_PLACE_IMAGE_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'GET_PLACE_IMAGE_FULLFILLED': {
      return {...state, fetching: false, fetched: true, data: action.payload}
    }
    default: return state;

  }
}
