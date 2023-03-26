import { Checkbox, TextInput} from '@carbon/react';
import { Edit, Save, EditOff } from '@carbon/icons-react'

const CardHeader = (props) => {
  const editModeRender = () => (
    <>
      <TextInput className="cards__input" id="title" placeholder={props.title} labelText='' value={props.title} onInput={props.titleHandler}/>
      <div className='cards__icons'>
        <Save className="cards__icon cards__icon--save" onClick={props.btnSaveHandler} />
        <EditOff className="cards__icon cards__icon--off" kind="secondary" onClick={props.btnCancelHandler} />
      </div>
    </>
  )

  const noEditModeRender = () => (
    <>
      <h1 className="cards__title">{props.title}</h1>
      <div className='cards__icons'>
        <Checkbox className="cards__check" id={props.id} onChange={props.checkboxHandler} labelText='' />
        {!props.viewMode && <Edit className="cards__icon cards__icon--edit" onClick={props.modeHandler} />}
      </div>
    </>
  )

  return (
    <div className='cards__top'>
      {props.editMode ? editModeRender() : noEditModeRender()}
    </div>
  )
}

export default CardHeader;