import React, {useState} from 'react';
import Item from "../Item/Item";
import ItemDestak from '../Item/ItemDestak';
import "./ContentResult.css"
import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';


function ContentResult (props){
    const [contentItem, setContentItem] = useState({})
    // const [newSearch, setNewSearch] = useState()
     //Child to parent component, Item to ContentResult and  after ContentResult to Item Destak
    const SelectionAnimal= (e) => {
        const animalChoose = e
        setContentItem(animalChoose)
    }
    const searchWithoutClick= (e) => {
        props.onDisableDestakStep(e)
    }
    const deleteDestakMobile=(e) => {
        props.onDisableDestakMobileStep(e)
    }

    return (
        <div className='content-result'>
            <ul className='content-result__list'>
                {props.DATA.map((e, index) => (
                    <Item
                    onDisableDestak={searchWithoutClick}
                    onSelectElement={SelectionAnimal}
                    key={index}
                    title={e.title}
                    text={e.text}
                    img={e.img}
                    alt={e.alt}
                    url={e.url}/>
                ))}
            </ul>
            <section className='content-result__destak'>
                <ItemDestak key={1} SelectionAnimal={contentItem} onDisableDestakMobile={deleteDestakMobile}/>
            </section>
        </div>
    )
}

export default ContentResult;