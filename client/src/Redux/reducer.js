import {
  ALL_COUNTRIES,
  GET_COUNTRY_ID,
  GET_COUNTRY_NAME,
  CREATE_ACTIVITY,
  CLEAR,
  SORT,
  SORT_POPULATION,
  SORT_CONTINENT,
  SORT_ACTIVITY,
  // CLEAR_FILTERS,
  // CLEAR_CONTINENT_FILTER,
  // CLEAR_POPULATION_FILTER,
  // CLEAR_ACTIVITY_FILTER
 
} from "./actions";

const initialState = {
  countries: [],
  detail: [],
  copyCountries: [],
  allActivity: [],
  error: "",
  // filterByContinent: null, // Estado para almacenar el filtro por continente
  // filterByPopulation: null, // Estado para almacenar el filtro por población
  // filterByActivity: null,
  
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        copyCountries: action.payload,
        allActivity: action.payload,
      };
      // case GET_COUNTRY_NAME:
      //   if (action.payload) {
      //     return {
      //       ...state,
      //       countries: action.payload,
      //       countrieName: action.payload,
      //       error: "", // Limpiamos el mensaje de error si la búsqueda es exitosa
      //     };
      //   } else {
      //     return {
      //       ...state,
      //       error: "No se encontró ningún país con ese nombre", // Establecemos el mensaje de error en caso de que no se encuentren resultados
      //     };
      //   }
    case GET_COUNTRY_NAME:
      return {
        ...state,
        countries: action.payload,
        countrieName: action.payload,
      
      };
    

    case GET_COUNTRY_ID:
      return {
        ...state,
        detail: action.payload,
      };
    case CREATE_ACTIVITY:
      return {
        ...state,
      };

    case SORT:
      if (action.payload === "asc") {
        let countriesAsc = state.countries.sort((a, b) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        return {
          ...state,
          countries: countriesAsc,
        };
      } else {
        let countriesDes = state.countries.sort((b, a) =>
          a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        );
        return {
          ...state,
          countries: countriesDes,
        };
      }
    case SORT_POPULATION:
      if (action.payload === "asc") {
        let countriesMaMe = state.countries.sort((a, b) =>
          a.population > b.population ? 1 : a.population < b.population ? -1 : 0
        );
        return {
          ...state,
          countries: countriesMaMe,
        };
      } else {
        let countriesMeMa = state.countries.sort((b, a) =>
          a.population > b.population ? 1 : a.population < b.population ? -1 : 0
        );
        return {
          ...state,
          countries: countriesMeMa,
        };
      }
    case SORT_CONTINENT:
      if (action.payload) {
        let continente =
          action.payload === "todos"
            ? state.copyCountries
            : state.copyCountries.filter(
                (c) => c.continents === action.payload
              );
        return {
          ...state,
          countries: continente,
        };
      }
      return {
        ...state,
      };

    case SORT_ACTIVITY:
      let mapeoCountries =
        action.payload === "todos"
          ? state.copyCountries
          : state.copyCountries.filter((c) => {
              let mapeo = c.activities?.map((d) => d.name);
              if (mapeo.includes(action.payload)) {
                return c;
              }
            });

      return {
        ...state,
        countries: mapeoCountries,
      };

    case CLEAR:
      return {
        ...state,
        detail: action.payload,
      };
      // case CLEAR_FILTERS:
      //   return {
      //     ...state,
      //     countries: state.copyCountries,
      //   };
      //   case CLEAR_CONTINENT_FILTER:
      //     return {
      //       ...state,
      //       filterByContinent: null, // Limpia el filtro por continente
      //     };
      //   case CLEAR_POPULATION_FILTER:
      //     return {
      //       ...state,
      //       filterByPopulation: null, // Limpia el filtro por población
      //     };
      //   case CLEAR_ACTIVITY_FILTER:
      //     return {
      //       ...state,
      //       filterByActivity: null, // Limpia el filtro por actividad
      //     };

    
    default:
      return { ...state };
  }
};

export default rootReducer;
