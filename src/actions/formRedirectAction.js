import axios from 'axios'

export function redirect(redirect) {
      return function(dispatch) {
        switch (redirect) {
          case true:
            return dispatch({type: 'FORM_REDIRECT_ENABLED')
          default:  return dispatch({type: 'FORM_REDIRECT_DISABLED')

        }
    }
}
