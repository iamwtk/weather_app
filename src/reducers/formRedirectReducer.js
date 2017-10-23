export default function reducer(state={}, action) {
  switch (action.type) {
    case 'FORM_REDIRECT_ENABLED': {
      return {...state, redirect: true}
    }
    case 'FORM_REDIRECT_DISABLED': {
      return {...state, redirect: false}
    }
    default: return state;

  }
}
