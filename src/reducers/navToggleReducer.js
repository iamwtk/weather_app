export default function reducer(state={
  toggle: false
}, action) {
  switch (action.type) {
    case 'NAVIGATION_OPEN': {
      return {...state, toggle: true}
    }
    case 'NAVIGATION_CLOSED': {
      return {...state, toggle: false}
    }
    default: return state;

  }
}
