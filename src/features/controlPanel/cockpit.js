import { useState, useRef } from "react";
import reactDom from 'react-dom'
import { Toggle, Button } from "@carbon/react";
import { v4 as id } from 'uuid'
import { TextArea, TextInput, Select, SelectItem } from '@carbon/react';
import ModalWrapper from '../modalWrapper/modalWrapper'

const settings = {
  deleteModal: {
    "primaryButtonText": "Да",
    "secondaryButtonText": "Нет",
    "danger": true,
    "modalHeading": "Do you really want to delete the selected notes",
    "onRequestClose": "deleteModal",
  },
  addModal: {
    "primaryButtonText": "Add",
    "secondaryButtonText": "Cancel",
    "danger": false,
    "modalHeading": "Add information aboute note",
    "onRequestClose": "addModal",
  },
  errorModal: {
    "primaryButtonText": "Ok",
    "secondaryButtonText": "",
    "danger": true,
    "modalHeading": "You can't delete notes in view mode",
    "onRequestClose": "errorModal",
  }
}

const Cockpit = props => {
  const allTags = props.tags.flat().filter((item,index,arr) => arr.indexOf(item) === index);
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
      <TextInput className="cards__input--modal" id="title" placeholder="Write note title" ref={inputTitleRef} labelText="Note title" />
      <TextArea id="text" placeholder='Write note text' ref={inputTextRef} labelText="Note text" />
    </>
  )

  const changeHandler = event => {
    props.changeTagHandler(event.target.value);
  }

  return (
    <div className="cards__view">
      <Toggle id="toggle-1" labelA="Off" labelB="On" labelText="View mode" onToggle={props.checkboxHandler} className="cards__btn cards__btn--mode" />
      <Button kind='secondary' className="cards__btn cards__btn--delete" onClick={checkError.bind(this, 'deleteModal')}>Delete selected notes</Button>
      <Button kind='primary' className="cards__btn cards__btn--delete" onClick={checkError.bind(this, 'addModal')}>Add new note</Button>
      <Select labelText='Choose a tag to filter' onChange={changeHandler} id="cards__select">
        <SelectItem value={'All'} text={'All'}></SelectItem>
        {allTags.map(tag => <SelectItem key={tag} value={tag} text={tag}>{tag}</SelectItem>)}
      </Select>
      {
        reactDom.createPortal(<ModalWrapper settings={settings[activeModal]} activeModal={activeModal} toggleModal={toggleModal} toggleHandler={toggleHandler} deleteModalSubmit={deleteModalSubmit} addModalSubmit={addModalSubmit} errorModalSubmit={errorModalSubmit} addModalContent={addModalContent()} viewMode={props.viewMode}/>, document.getElementById('modal'))
      }
    </div>
  )
}

export default Cockpit