import { useState } from "react";

import editIcon from '../../img/edit.svg'
import deleteIcon from '../../img/delete.svg'
import { Fragment } from "react/cjs/react.production.min";

const CategorySettingsItem = ({item, deleteItem, editItem}) => {

  const [itemFields, setitemFields] = useState(JSON.parse(JSON.stringify(item)))
  const [isEditable, setIsEditable] = useState(false)

  const onChangeExistingName = (e) => {
    const newName = e.target.value
    setitemFields(prevState => ({...prevState, "name":newName}))
  }
  const onChangeExistingDesc = (e) => {
    const newName = e.target.value
    setitemFields(prevState => ({...prevState, "description":newName}))
  }

  const setIsEditableTrue = () => {
    setIsEditable(true)
  }
  const setIsEditableFalse = () => {
    setIsEditable(false)
  }

  const updateItem = (e) => {
    e.preventDefault();
    editItem(itemFields);
    setIsEditable(false);
  }

  let popupclassName = "popup-item"
  isEditable && (popupclassName = popupclassName+" editable")
  return <div className={popupclassName}>
    <div className="popup-item-buttons">
      {!isEditable ? 
      <Fragment>
        <img name={itemFields.id} onClick={setIsEditableTrue} className="settingsimg" width={16} src={editIcon} alt="settings" /> 
        <img name={itemFields.id} onClick={deleteItem} className="settingsimg" width={16} src={deleteIcon} alt="settings" />
        </Fragment>: 
      <Fragment>
        <div onClick={updateItem} className="updateButtons cancelEdit">Save</div>
        <div onClick={setIsEditableFalse} className="updateButtons cancelEdit">Cancel</div>
      </Fragment>}
    </div>
    <input className="popup-item-name" onChange={(e) => onChangeExistingName(e)} name={itemFields.name} value={itemFields.name} />
    <input className="popup-item-description" onChange={(e) => onChangeExistingDesc(e)} name={itemFields.description} value={itemFields.description} />
  </div>
}

export default CategorySettingsItem;