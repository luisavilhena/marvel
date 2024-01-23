import React, {useState} from 'react';
import "./Item.css"
import Item from './Item';


function ItemDestak(props){
    const [close, setClose] = useState(false)
    const disapearDestakMobile=()=> {
        if(close){
            setClose(false)
        }
        props.onDisableDestakMobile(close)
    }
    
    return(
        <div className="item-destak">
            <span onClick={disapearDestakMobile}>X</span>
            <div className='item-destak__content'>
                <img src={`${props.SelectionAnimal.img}`} alt={props.SelectionAnimal.title}></img>
                <a href={`${props.SelectionAnimal.url}`}>{props.SelectionAnimal.url}</a>
                <h3>{props.SelectionAnimal.title}</h3>
                <p>{props.SelectionAnimal.text}</p>
            </div>
        </div>
    );
}

export default ItemDestak;