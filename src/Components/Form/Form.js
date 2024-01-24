import React, { useEffect, useState } from "react";
import "./Form.css";
import search from "../../assets/busca/Lupa/Shape.png";
import logo from "../../assets/logo/Group.png";

function Form(props) {
  const [valueType, setValueType] = useState("");
  const [enteredSearch, setEnteredSearch] = useState(false);
  const [clickButton, setClickButton] = useState(false);


  const searchChangeHandler = (event) => {
    setValueType(event.target.value);
    if (event.target.value.trim().length > 0) {
      setEnteredSearch(true);
    } else {
      setEnteredSearch(false);
    }
  };
  const startClickHandler = (e) => {
    e.preventDefault();
    props.onInputForm(valueType);
  };
  const startHomePage = (e) => {
    e.preventDefault();
    setValueType("");
    props.onInputForm("");
    setClickButton(false);
  };

  useEffect(() => {
    if (props.onCharacterClick === true) {
      setClickButton(true);
    } else {
      setClickButton(false);
    }
  });

  return (
    <div
      className={`${clickButton ? "header-search" : "midle-search"}`}
    >
      <div className="structure">
        <div>
          <img
            onClick={startHomePage}
            className="logo"
            alt="Marvel"
            src={logo}
          ></img>
          <h2>EXPLORE O UNIVERSO</h2>
          <p>
            Mergulhe no domínio deslumbrante de todos os personagens clássicos
            que você ama - e aqueles que você descobrirá em breve
          </p>
        </div>
        <form>
          <div>
            <img src={search} alt="search" onClick={startClickHandler}></img>
            <input
              onChange={searchChangeHandler}
              type="text"
              value={valueType}
              placeholder={`Procure por heróis`}
            />
          </div>
          <button onClick={startClickHandler} value={valueType} type="submit">
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
