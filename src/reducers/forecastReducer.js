export default function reducer(state={
  data: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'GET_FORECAST': {
      return {...state, fetching: true}
    }
    case 'GET_FORECAST_REJECTED': {
      return {...state, fetching: false, error: action.payload}
    }
    case 'GET_FORECAST_FULLFILLED': {
      return {...state, fetching: false, fetched: true, data: action.payload}
    }  
    default: return state;

  }
}
