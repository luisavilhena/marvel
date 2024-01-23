import React, {useState} from 'react';
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';
import "./Form.css"
import search from "../../assets/busca/Lupa/Shape.png"
import logo from "../../assets/logo/Group.png"



function Form(props) {

    const [valueType, setValueType] = useState("")
    const [enteredSearch, setEnteredSearch] = useState(false);
    const [clickButton, setClickButton] = useState(false)

    const searchChangeHandler = event => {
        setValueType(event.target.value);
        if(event.target.value.trim().length > 0){
            setEnteredSearch(true)
        }else {
            setEnteredSearch(false)
        }
    };
    const startClickHandler = e => {
        e.preventDefault();
        setClickButton(true)
        //Child to parent component, Form to Page
        props.onInputForm(valueType);
        props.onSearchWithoutClick(false)
    }

    return (
        <div className= {`${clickButton ? "header-search" : "midle-search"}`}>
            <div>
                <img className='logo' alt="Marvel" src={logo}></img>
                <h2>EXPLORE O UNIVERSO</h2>
                <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve</p>
            </div>
            <form>
                <div>
                    <img src={search} alt="search" onClick={startClickHandler}></img>
                    <input onChange={searchChangeHandler} type='text' placeholder='Procure por heróis'/>
                </div>
                <button className= {`${enteredSearch ? "onButton" : "offButton"}`} onClick={startClickHandler} value={valueType} type="submit">Buscar</button>
            </form>
        </div>
    );
}

export default Form;