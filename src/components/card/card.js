import React from 'react';
import { ListItem } from '@carbon/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import CardHeader from './cardHeader'
import CardBody from './cardBody'
import WithLoadingDelay from '../../features/HOC/withLoadingDelay';


const Card = (props) => {
  const [classCheck, changeClass] = useState(false);
  const [editMode, changeMode] = useState(false);
  const [title, setTitle] = useState(props.defaultData.title);
  const inputTitleRef = useRef();
  const inputTextRef = useRef();

  const checkboxHandler = () => {
    const idPos = props.activeCards.indexOf(props.id);
    props.updateActiveCards(prevData => {
      if (idPos === -1) {
        prevData.push(props.id);
        return [...prevData]
      }
      else {
        return [...prevData.filter(item => item !== props.id)];
      }
    })
    changeClass(!classCheck);
  }

  const modeHandler = () => {
    if (props.activeCards.indexOf(props.id) !== -1) {
      props.updateActiveCards(prevData => [...prevData.filter(item => item !== props.id)]);
    }
    if (classCheck) {
      changeClass(!classCheck);
    }
    changeMode(!editMode);
  }

  const btnSaveHandler = () => {
    const newTags = inputTextRef.current.innerText.trim().match(/#[a-zA-z\d]+(?= )|#[a-zA-z\d]+$/gmi); //создание массива всех новых тегов
    const newUniqTags = newTags !== null ? newTags.map(tag => tag.replace(/#/gi, '')).filter((uniqTag, index, arr) => arr.indexOf(uniqTag) === index && props.tags.indexOf(uniqTag) === -1) : [];//удадение # и затем удаление дубликатов новых тегов, с проверкой того, что их нет в уже существующих
    const newCard = {
      id: props.id,
      title: title,
      text: inputTextRef.current.innerText.replace(/#/gi, '').trim(),
      tags: [...props.tags.filter(tag => inputTextRef.current.innerText.trim().replace(/[,.!:;?\s]/g, '#').split('#').indexOf(tag) !== -1), ...newUniqTags] //итоговый массив тегов, состоящий из 2-х: массив старых тегов, отфильтрованный по их наличию в тексте и массив новых тегов
    }
    changeMode(!editMode);
    props.onChangeCard(newCard);
  }

  const btnCancelHandler = useCallback(() => {
    setTitle(props.defaultData.title);
    changeMode(false);
  }, [props.defaultData.title])

  useEffect(() => {
    if (props.viewMode) btnCancelHandler();
  }, [props.viewMode, btnCancelHandler])

  const titleHandler = event => {
    setTitle(event.target.value)
  }

  return (
    <ListItem className="cds--col cards__item">
      <div className={`cards__content ${'cards__content--' + (classCheck ? 'editOn' : 'editOff')}`}>
        <CardHeader title={title} btnCancelHandler={btnCancelHandler} btnSaveHandler={btnSaveHandler} modeHandler={modeHandler} checkboxHandler={checkboxHandler} editMode={editMode} viewMode={props.viewMode} id={props.id} inputTitleRef={inputTitleRef} titleHandler={titleHandler}></CardHeader>
        <CardBody text={props.defaultData.text} editMode={editMode} inputTextRef={inputTextRef} tags={props.tags} />
      </div>
      <p className='cards__tags'>{
        props.tags.map(element => `#${element}`)
      }</p>
    </ListItem>
  );
};

const CardWithLoading = props => WithLoadingDelay(Card, props)

export default CardWithLoading;