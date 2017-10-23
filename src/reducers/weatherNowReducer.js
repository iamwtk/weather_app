export default function reducer(state={
  data: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'GET_WEATHER': {
      return {...state, fetching: true}
    }
    case 'GET_WEATHER_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'GET_WEATHER_FULLFILLED': {
      return {...state, fetching: false, fetched: true, data: action.payload}
    }
    default: return state;

  }
}
