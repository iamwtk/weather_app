import axios from 'axios'
import { unsplash as apikey} from "../apikeys.js"

export function getPlaceImage(place) {
      return function(dispatch) {

      const placeid = place
      const url = 'https://api.unsplash.com/photos/random/'      
      const getUrl = `${url}?query=${placeid}&w=1920&h=1080&client_id=${apikey}`;

      dispatch({type: 'GET_PLACE_IMAGE'})

      axios.get(getUrl)
        .then(res => {
          dispatch({type: 'GET_PLACE_IMAGE_FULLFILLED', payload: res.data})
        })
        .catch(err => {
          dispatch({type: 'GET_PLACE_IMAGE_REJECTED', payload: err})
        })
    }
}
