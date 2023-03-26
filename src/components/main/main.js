import { Content, OrderedList } from "@carbon/react";
import { useState } from "react";
import Cockpit from "../../features/controlPanel/cockpit";
import CardList from "../card/cardList";

const CARDS_DATA = [
  {
    id: 'checkbox-1',
    title: 'Note1',
    text: 'Go to shop, go to school',
    tags: ['shop', 'school']
  },
  {
    id: 'checkbox-2',
    title: 'Note2',
    text: 'Feed the animal',
    tags: ['animal']
  },
  {
    id: 'checkbox-3',
    title: 'Note3',
    text: 'nature is beautiful',
    tags: ['nature']
  },
  {
    id: 'checkbox-4',
    title: 'Note4',
    text: 'films that i need to see',
    tags: ['films','school']
  }
]

const Main = () => {
  const [cardsData, setCardsData] = useState(CARDS_DATA);
  const [viewMode, setViewMode] = useState(false);
  const [activeCards, updateActiveCards] = useState([]);
  const [activeTag, setActiveTag] = useState('All')

  console.log(cardsData);

  const cardHandler = newData => {
    setCardsData(prevData => {
      const dataPos = prevData.indexOf(...prevData.filter(item => item.id === newData.id));
      prevData[dataPos] = newData;
      return [...prevData];
    });
  }

  const addCardHandler = newData => {
    setCardsData(prevData => [...prevData,newData]);
  } 

  const checkboxHandler = () => {
    setViewMode(!viewMode);
  }
  
  const deleteCardsHandler = () => {
    setCardsData(prevData => {
      return [...prevData.filter(item => activeCards.indexOf(item.id) === -1)]
    });
    updateActiveCards([]);
  }
  const changeTagHandler = tag => setActiveTag(tag)
  return (
    <Content id="main-content">
      <section className="cards" id="cards">
        <div className="cds--grid">
          <Cockpit checkboxHandler={checkboxHandler} deleteCardsHandler={deleteCardsHandler} addCardHandler={addCardHandler} viewMode={viewMode} tags={[...cardsData.map(element => element.tags)]} changeTagHandler={changeTagHandler}/>
          <OrderedList className="cds--row cards__items">
            <CardList cardsData={activeTag === "All" ? cardsData : cardsData.filter(element => element.tags.indexOf(activeTag) !== -1) } onChangeCard={cardHandler} viewMode={viewMode} activeCards={activeCards} updateActiveCards={updateActiveCards}/>
          </OrderedList>
        </div>
      </section>
    </Content>
  );
};

export default Main;
