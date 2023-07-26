import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { countryByName, countryById } from "../../Redux/actions";
import style from "./Search.module.css";
import useWindowDimensions from "../Hook/useWindowsDimensions";
import Lupa from "./lupa.png";


function Search({ setInput, setPag }) {
  const { width } = useWindowDimensions();
  const movil = 460;
  const [name, setName] = useState("");
  //const [error, setError] = useState(""); //  sacar si no
  const dispatch = useDispatch();
 

  function handleChange(e) {
    setName(e.target.value);
  }


  
  function handleSumit(e) {
    e.preventDefault();
    const formattedName = name.trim().toLowerCase();
    dispatch(countryByName(formattedName))
      .then((response) => {
        if (response === null) {
          setError("Hubo un error al realizar la búsqueda");
        } else if (response.error) {
          setError("No se encontró ningún país con ese nombre");
        } else {
          setError(""); // Limpiamos el mensaje de error si la búsqueda es exitosa
        }
      })
      .catch((error) => {
        setError("Hubo un error al realizar la búsqueda");
      });


  // function handleSumit(e) {
  //   e.preventDefault();
  //   if(name.length <= 3) {
  //     dispatch(countryById(name));
  //   } else {
  //     dispatch(countryByName(name));
  //   }

  
  
  // function handleSumit(e) {
  //   e.preventDefault();
  //   const formattedName = name.trim().toLowerCase(); // Convertir a minúsculas y eliminar espacios en blanco al principio y al final
  //   dispatch(countryByName(formattedName))//dispatch(countryByName(formattedName)); cambiar por esto  
  //   .then((response) => {  //eliminar de aqui hasta 
  //     if (response.error) {
  //       setError("No se encontró ningún país con ese nombre");
  //     } else {
  //       setError(""); // Limpiamos el mensaje de error si la búsqueda es exitosa
  //     }
  //   })
  //   .catch((error) => {
  //     setError("Hubo un error al realizar la búsqueda");
  //   });//aca
    setName("");
    setInput(1);
    setPag(1);
  }

  
  if (width > movil) {
    return (
      <div className={style.contenedor}>
        <input
          className={style.input}
          type="search"
          name="search"
          value={name}
          onChange={(e) => handleChange(e)}
          placeholder="Search country"
          
        />
        <button
          className={style.button}
          onClick={(e) => handleSumit(e)}
        ></button>
        
      </div>
      
    );
  } else {
    return (
      
      <div className={style.contenedor_movil}>
        
        <input
          className={style.input_movil}
          type="search"
          name="search"
          value={name}
          onChange={(e) => handleChange(e)}
          placeholder="Search Country"
        />
        <button className={style.button_movil} onClick={(e) => handleSumit(e)}>
          <img
            src={Lupa}
            className={style.button_movil_img}
            alt="img_button_search"
          />
        </button>
        {error && <p>{error}</p>} 
      </div>
    );
  }
}

export default Search;
















// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { countryByName } from "../../Redux/actions";
// import style from "./Search.module.css";
// import useWindowDimensions from "../Hook/useWindowsDimensions";
// import Lupa from "./lupa.png";


// function Search({ setInput, setPag }) {
//   const { width } = useWindowDimensions();
//   const movil = 460;
//   const [name, setName] = useState("");
//   const dispatch = useDispatch();

//   function handleChange(e) {
//     setName(e.target.value);
//   }

//   function handleSumit(e) {
//     e.preventDefault();
//     dispatch(countryByName(name));
//     setName("");
//     setInput(1);
//     setPag(1);
//   }
//   if (width > movil) {
//     return (
//       <div className={style.contenedor}>
//         <input
//           className={style.input}
//           type="search"
//           name="search"
//           value={name}
//           onChange={(e) => handleChange(e)}
//           placeholder="Search country"
//         />
//         <button
//           className={style.button}
//           onClick={(e) => handleSumit(e)}
//         ></button>
//       </div>
//     );
//   } else {
//     return (
//       <div className={style.contenedor_movil}>
//         <input
//           className={style.input_movil}
//           type="search"
//           name="search"
//           value={name}
//           onChange={(e) => handleChange(e)}
//           placeholder="Search Country"
//         />
//         <button className={style.button_movil} onClick={(e) => handleSumit(e)}>
//           <img
//             src={Lupa}
//             className={style.button_movil_img}
//             alt="img_button_search"
//           />
//         </button>
//       </div>
//     );
//   }
// }

// export default Search;
