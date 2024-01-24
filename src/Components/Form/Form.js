import React, {useState} from 'react';
import "./Form.css"
import search from "../../assets/busca/Lupa/Shape.png"
import logo from "../../assets/logo/Group.png"



function Form(props) {

    const [valueType, setValueType] = useState("")
    const [enteredSearch, setEnteredSearch] = useState(false);
    const [clickButton, setClickButton] = useState(false)
    const [pageGreen, setPageGreen] = useState(false)


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
        // setClickButton(true)
        //Child to parent component, Form to Page
        props.onInputForm(valueType);
        if(enteredSearch){
            setPageGreen(true)
            setClickButton(true)
        }else{
            setPageGreen(false)
            setClickButton(false)
        }
        // props.onSearchWithoutClick(false)
        // if(pageGreen){
        //     setPageGreen(false)
        // }else{
            // setPageGreen(true)
        // }
    }
    const startHomePage = e => {
        e.preventDefault();
        if(setClickButton){
            setClickButton(false)
        }else{
            setClickButton(true)
        }
        setValueType('')
        props.onInputForm('');
        setClickButton(false)
        setPageGreen(false)
    }
    //corrigir setclickbutton
    // if(props.onCharacterClick){
    //     setClickButton(true)
    // }



    return (
        <div className= {`${clickButton ? "header-search" : "midle-search"}${pageGreen ? " page-green" : ""}`}>
            <div className='structure'>
                <div>
                    <img onClick={startHomePage} className='logo' alt="Marvel" src={logo}></img>
                    <h2>EXPLORE O UNIVERSO</h2>
                    <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve</p>
                </div>
                <form>
                    <div>
                        <img src={search} alt="search" onClick={startClickHandler}></img>
                        <input onChange={searchChangeHandler} type='text' value={valueType} placeholder={`Procure por heróis`}/>
                    </div>
                    <button onClick={startClickHandler} value={valueType} type="submit">Buscar</button>
                </form>
            </div>
        </div>
    );
}

export default Form;