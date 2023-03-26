import React from "react"
import CardWithLoading from '../card/card'

const CardList = props => {
  return (
    <>
      {props.cardsData.map(item => <CardWithLoading defaultData={{ title: item.title, text: item.text }} id={item.id} key={item.id} onChangeCard={props.onChangeCard} viewMode={props.viewMode} activeCards={props.activeCards} updateActiveCards={props.updateActiveCards} tags={item.tags}/>)}
    </>)
}

export default CardList