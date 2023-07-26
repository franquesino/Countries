import axios from "axios";
export const ALL_COUNTRIES = "ALL_COUNTRIES";
export const GET_COUNTRY_NAME = "GET_COUNTRY_NAME";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const CLEAR = "CLEAR";
export const SORT = "SORT";
export const SORT_POPULATION = "SORT_POPULATION";
export const SORT_CONTINENT = "SORT_CONTINENT";
export const SORT_ACTIVITY = "SORT_ACTIVITY";
export const ALL_ACTIVITY = "ALL_ACTIVITY";
// actions.js
//export const CLEAR_FILTERS = "CLEAR_FILTERS";// quitar si no funcaa
//export const CLEAR_CONTINENT_FILTER = "CLEAR_CONTINENT_FILTER"; //quit sgte si no funca
//export const CLEAR_POPULATION_FILTER = "CLEAR_POPULATION_FILTER";
//export const CLEAR_ACTIVITY_FILTER= "CLEAR_ACTIVITY_FILTER";//hasta aca




//eliminar sgtes si lo de home no funca:
// export const clearContinentFilter = () => {
//   return {
//     type: "CLEAR_CONTINENT_FILTER",
//   };
// };

// export const clearPopulationFilter = () => {
//   return {
//     type: "CLEAR_POPULATION_FILTER",
//   };
// };

// export const clearActivityFilter = () => {
//   return {
//     type: "CLEAR_ACTIVITY_FILTER",
//   };
// };
//hasta aqui eliminar




const API_URL = "http://localhost:3001";

export function allCountries() {
  return async (dispatch) => {
    await axios.get(`${API_URL}/countries`).then((result) => {
      return dispatch({
        type: ALL_COUNTRIES,
        payload: result.data, // action.payload es la informacion que devuelvo aca
      });
    });
  };
}




// export function countryByName(name) {
//   return async (dispatch) => {
//     await axios
//       .get(`${API_URL}/countries/?name=${name}`)
//       .then((result) => {
//         return dispatch({
//           type: GET_COUNTRY_NAME,
//           payload: result.data,
//         });
//       })
//       .catch((e) => {
//         console.log(e);
        
//       });
//   };
// }

// actions.js
export function clearFilters() {
  return {
    type: CLEAR_FILTERS,
  };
}


// export function countryByName(name) {
//   return async (dispatch) => {
//     try {
//       const result = await axios.get(`${API_URL}/countries/?name=${name}`);
//       return dispatch({
//         type: GET_COUNTRY_NAME,
//         payload: result.data,
//       });
//     } catch (e) {
//       console.log(e);
//       // handle error here
//       return null;
//     }
//   };
// }


export function countryByName(name) {
  return async (dispatch) => {
    await axios
      .get(`${API_URL}/countries/?name=${name}`)
      .then((result) => {
        return dispatch({
          type: GET_COUNTRY_NAME,
          payload: result.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}


// export function countryById(id) {
//   return async (dispatch) => {
//     await axios.get(`${API_URL}/countries/${id}`).then((result) => {
//       return dispatch({
//         type: GET_COUNTRY_ID,
//         payload: result.data,
//       });
//     });
//   };
// }


export function countryById(id) {
  return async (dispatch) => {
    await axios.get(`${API_URL}/countries/${id}`).then((result) => {
      if(result.status == 200) {
        return dispatch({
          type: GET_COUNTRY_ID,
          payload: result.data,
        });
      }
    });
  };
}

export function createActivity(activity) {
  return async (dispatch) => {
    await axios.post(`${API_URL}/activity`, activity).then((result) => {
      return dispatch({
        type: CREATE_ACTIVITY,
        payload: result,
      });
    });
  };
}

export function clear() {
  return (dispatch) => {
    return dispatch({
      type: CLEAR,
      payload: [],
    });
  };
}

export function sort(orden) {
  return (dispatch) => {
    return dispatch({
      type: SORT,
      payload: orden,
    });
  };
}

export function sorNumerico(ordenNum) {
  return (dispatch) => {
    return dispatch({
      type: SORT_POPULATION,
      payload: ordenNum,
    });
  };
}

export function sortContinent(payload) {
  return (dispatch) => {
    return dispatch({
      type: SORT_CONTINENT,
      payload,
    });
  };
}

export function sortActivity(payload) {
  return (dispatch) => {
    return dispatch({
      type: SORT_ACTIVITY,
      payload,
    });
  };
}
