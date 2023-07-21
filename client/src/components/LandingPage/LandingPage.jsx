import React from "react";
import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

const Landing = () => {
  return (
    <div className={style.container}>
      <div>
        <h1>
          <span>Encuentra</span> tu <br />
          país <br />
          <span>favorito</span>
        </h1>
        <p>
          Puedes conocer países, <br />
          su capital, su población <br />
          y su bandera.
        </p>
        <Link to="/countries">
          <input type="submit" value="Ver países" className={style.myButton} />
        </Link>

        <h3 className={style.love}>Hecho con &hearts; para henry</h3>
      </div>


    </div>
  );
};

export default Landing;