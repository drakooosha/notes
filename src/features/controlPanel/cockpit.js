import { useState, useRef } from "react";
import reactDom from 'react-dom'
import { Toggle, Button } from "@carbon/react";
import { v4 as id } from 'uuid'
import { TextArea, TextInput } from '@carbon/react';
import ModalWrapper from '../modalWrapper/modalWrapper'

const settings = {
  deleteModal: {
    "primaryButtonText": "Да",
    "secondaryButtonText": "Нет",
    "danger": true,
    "modalHeading": "Вы действительно хотите удалить выбранные заметки?",
    "onRequestClose": "deleteModal",
  },
  addModal: {
    "primaryButtonText": "Добавить",
    "secondaryButtonText": "Отменить",
    "danger": false,
    "modalHeading": "Заполните новую заметку",
    "onRequestClose": "addModal",
  },
  errorModal: {
    "primaryButtonText": "Ok",
    "secondaryButtonText": "",
    "danger": true,
    "modalHeading": "В режиме просмотра нельзя удалять или добавлять заметки!",
    "onRequestClose": "errorModal",
  }
}

const Cockpit = props => {
  const [activeModal, setActiveModal] = useState('');
  const [toggleModal, setToggleModal] = useState({
    deleteModal: false,
    addModal: false,
    errorModal: false
  });
  const inputTitleRef = useRef();
  const inputTextRef = useRef();

  const toggleHandler = modalName => {
    setActiveModal(modalName);
    setToggleModal(prevData => { return { ...prevData, [modalName]: !prevData[modalName] } });
  }

  const errorModalSubmit = () => {
    toggleHandler('errorModal');
  }

  const deleteModalSubmit = () => {
    props.deleteCardsHandler();
    toggleHandler('deleteModal');
  }

  const addModalSubmit = () => {
    const newTags = inputTextRef.current.value.match(/#[a-zA-z]+(?= )|#[a-zA-z]+$/gmi);
    const newUniqTags = newTags !== null ? newTags.map(tag => tag.replace(/#/gi,'')).filter((uniqTag,index,arr) => arr.indexOf(uniqTag) === index) : [];
    const newCard = {
      id: id(),
      title: inputTitleRef.current.value,
      text: inputTextRef.current.value.replace(/#/gi,''),
      tags: newUniqTags
    }
    props.addCardHandler(newCard);
    toggleHandler('addModal');
    inputTitleRef.current.value = '';
    inputTextRef.current.value = '';
  }

  const checkError = modalName => {
      toggleHandler(props.viewMode ? 'errorModal' : modalName) 
  }

  const addModalContent = () => (
    <>
      <TextInput className="cards__input--modal" id="title" placeholder="Введите имя заметки" ref={inputTitleRef} labelText="Имя заметки" />
      <TextArea id="text" placeholder='Введите текст заметки' ref={inputTextRef} labelText="Текст заметки" />
    </>
  )

  return (
    <div className="cards__view">
      <Toggle id="toggle-1" labelA="Off" labelB="On" labelText="Только просмотр" onToggle={props.checkboxHandler} className="cards__btn cards__btn--mode" />
      <Button kind='secondary' className="cards__btn cards__btn--delete" onClick={checkError.bind(this, 'deleteModal')}>Удалить выбранные заметки</Button>
      <Button kind='primary' className="cards__btn cards__btn--delete" onClick={checkError.bind(this, 'addModal')}>Добавить новую заметку</Button>
      {
        reactDom.createPortal(<ModalWrapper settings={settings[activeModal]} activeModal={activeModal} toggleModal={toggleModal} toggleHandler={toggleHandler} deleteModalSubmit={deleteModalSubmit} addModalSubmit={addModalSubmit} errorModalSubmit={errorModalSubmit} addModalContent={addModalContent()} viewMode={props.viewMode}/>, document.getElementById('modal'))
      }
    </div>
  )
}

export default Cockpit