



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allCountries, createActivity } from "../../Redux/actions";
import styles from "./Create.module.css";
import useWindowDimensions from "../Hook/useWindowsDimensions";
 import Navbar from '../NavBar/Navbar'
import { Link } from "react-router-dom";
import flecha from "./flecha_atras.png";
import Footer from "../Footer/Footer";
import logo from "../Details/logoHome.png";

function CreateActivity() {
  const { width } = useWindowDimensions();
  const movil = 460;
  //const [error, setError] = useState(""); volver si no funca el de abajo
  const [errors, setErrors] = useState({
    name: "",
    duration: "",
    // Agrega más campos aquí si es necesario para la validación.
  });
  const [mostrarError, setMostrarError] = useState(false);
  const [state, setState] = useState({
    name: "",
    difficulty: 0,
    duration: "",
    season: "",
    countries: [],
  });
  const { countries } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navegate = useNavigate();
  useEffect(() => {
    dispatch(allCountries());
  }, [dispatch]);


  

  function handleSelect(e) {
    if (state.countries.includes(e.target.value)) {
      console.log("You can not repeat the same country");
    } else {
      setState({
        ...state,
        countries: [...state.countries, e.target.value],
      });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target; //eliminar si no funca solo esta linea
    setState({
      ...state, // copia de datos para no eliminar lo que ya escribimos
      [e.target.name]: e.target.value,
    });
    switch (name) { //eliminar si no
      case "name":
        if (!value.trim() || !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(value) || value.length < 3) {
          setErrors((prevState) => ({ ...prevState, name: "The name must not contain special characters and must be larger than two" }));
        } else {
          setErrors((prevState) => ({ ...prevState, name: "" }));
        }
        break;
  
      case "duration":
        if (!value || isNaN(value) || value < 1 || value > 24) {
          setErrors((prevState) => ({ ...prevState, duration: "Duration must be a number between 1 and 24" }));
        } else {
          setErrors((prevState) => ({ ...prevState, duration: "" }));
        }
        break;
      
      default:
        break;
    }
  }




  function handleChoose(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }
  function handleRemove(e) {
    setState({
      ...state,
      countries: state.countries.filter(
        (country) => country !== e.target.value
      ),
    });
  }
  function handleSumit(e) {
    e.preventDefault();
    const { name, difficulty, season, countries } = state;
    if (
      !name.trim() ||
      !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name) ||
      name.length <= 3
    ){
      setError(
        "The name must not contain special characters and must be larger than two"
      );
      setMostrarError(true);
      return;
    }
    if (!name){
      setError("Compleat this sector whit a name");
      setMostrarError(true);
      return;
    }

    if (!difficulty) {
      setError("You must select a Difficulty level");
      setMostrarError(true);
      return;
    }
    if (!season.trim()) {
      setError("You must select some season of the year");
      setMostrarError(true);
      return;
    }
    if (countries.length < 1) {
      setError("You must select at least one country");
      setMostrarError(true);
      return;
    }
    dispatch(createActivity(state));
    setState({
      name: "",
      difficulty: 0,
      duration: "",
      season: "",
      countries: [],
    });
    alert("Your activity was successfully created");
    //navegate("/countries");
  }


  function areFieldsValid() {
    const { name, difficulty, season, countries } = state;
  
    if (
      !name.trim() ||
      !/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]*$/.test(name) ||
      name.length <= 3
    ) {
      return false;
    }
  
    if (!difficulty) {
      return false;
    }
  
    if (!season.trim()) {
      return false;
    }
  
    if (countries.length < 1) {
      return false;
    }
  
    return true;
  }
  const PintarError = () => (
    <div className={styles.error}>All required fields</div>
  );

  return (
    <>
      <Navbar/> 
      <header className={styles.header}>
        <Link to="/countries">
          {width > movil ? (
            <button className={styles.volver}>HOME</button>
          ) : (
            <button className={styles.volver}>
              <img
                src={flecha}
                className={styles.button_movil_atras}
                alt="atras"
              />
            </button>
          )}
          <img className={styles.logo} src={logo} alt="logo" />
        </Link>
   
      </header>
      <section className={styles.contenedorFormulario}>
        <div className={styles.formulario}>
          <form onSubmit={handleSumit}>
            {mostrarError && <p className={styles.error}>{error}</p>}
            <>
              <label className={styles.label} htmlFor="nombre">
                Name
              </label>
              <input
                className={styles.name}
                placeholder="Activity Name"
                type="text"
                id="name"
                name="name"
                value={state.name}
                onChange={(e) => {
                  handleChange(e);
                }}
                
              />
              {errors.name && <p className={styles.error}>{errors.name}</p>} 
            </>

            <>
              <label className={styles.label} htmlFor="nombre">
                Duration
              </label>
              <input
                className={styles.duration}
                name="duration"
                value={state.duration}
                type="number"
                min="1"
                max="24"
                onChange={(e) => {
                  handleChange(e);
                }}
                required
              />
              {errors.duration && <p className={styles.error}>{errors.duration}</p>}
            </>
            <label className={styles.label}>Difficulty</label>
            <div className={styles.contenedor}>
              <label className={styles.label}>1</label>
              <input
                className={styles.input}
                type="radio"
                id="1"
                value="1"
                name="difficulty"
                onChange={(e) => handleChoose(e)}
              />
              <label className={styles.label}>2</label>
              <input
                className={styles.input}
                type="radio"
                id="2"
                value="2"
                name="difficulty"
                onChange={(e) => handleChoose(e)}
              />
              <label className={styles.label}>3</label>
              <input
                className={styles.input}
                type="radio"
                id="3"
                value="3"
                name="difficulty"
                onChange={(e) => handleChoose(e)}
              />
              <label className={styles.label}>4</label>
              <input
                className={styles.input}
                type="radio"
                id="4"
                value="4"
                name="difficulty"
                onChange={(e) => handleChoose(e)}
              />
              <label className={styles.label}>5</label>
              <input
                className={styles.input}
                type="radio"
                id="5"
                value="5"
                name="difficulty"
                onChange={(e) => handleChoose(e)}
              />
            </div>
            <label className={styles.label}>Season</label>
            <div className={styles.contenedor}>
              <label className={styles.label}>Summer </label>
              <input
                className={styles.input}
                type="radio"
                id="Summer"
                value="Summer"
                name="season"
                onChange={(e) => handleChoose(e)}
              />
              <label className={styles.label}>Autumn </label>
              <input
                className={styles.input}
                type="radio"
                id="Autumn"
                value="Autumn"
                name="season"
                onChange={(e) => handleChoose(e)}
              />
              <label className={styles.label}>Winter </label>
              <input
                className={styles.input}
                type="radio"
                id="Winter"
                value="Winter"
                name="season"
                onChange={(e) => handleChoose(e)}
              />
              <label className={styles.label}>Spring</label>
              <input
                className={styles.input}
                type="radio"
                id="Spring"
                value="Spring"
                name="season"
                onChange={(e) => handleChoose(e)}
              />
            </div>
            <label className={styles.label}>Country</label>
            <select
              className={styles.country}
              placeholder="Selecciona el o los paises"
              name="countries"
              onChange={(e) => handleSelect(e)}
              required
            >
              <option className={styles.label}>Choose the countries</option>
              {countries?.map((element) => {
                return (
                  <option value={element.id} key={element.id}>
                    {element.name}
                  </option>
                );
              })}
            </select>
            <button
              className={`${styles.button} ${areFieldsValid() ? "" : styles.buttonDisabled}`}
              type="submit"
              disabled={!areFieldsValid()}
            >
              CREATE
            </button>
            <div className={styles.contenedorC}>
              {state.countries?.map((country) => {
                return (
                  <div key={Math.random()}>
                    <div className={styles.contenedorCountry}>
                      <button
                        className={styles.buttonClose}
                        value={country}
                        type="button"
                        onClick={(e) => handleRemove(e)}
                      >
                        X
                      </button>
                      <p className={styles.parrafo}>
                        {countries.find((c) => c.id === country).name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </section>
    <Footer/>
    </>
    
  );
}

export default CreateActivity;






