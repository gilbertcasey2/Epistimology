import { useState } from "react";

import editIcon from '../../img/edit.svg'
import deleteIcon from '../../img/delete.svg'
import { Fragment } from "react/cjs/react.production.min";
import { EXTRA_WIDE, NUMBER, REGULAR, WIDE } from "../../helpers/constants";


const ColumnSettingsItem = ({item, deleteItem, editItem}) => {

  const [itemFields, setitemFields] = useState(JSON.parse(JSON.stringify(item)))
  const [isEditable, setIsEditable] = useState(false)

  const onChangeExistingName = (e) => {
    const newName = e.target.value
    setitemFields(prevState => ({...prevState, "name":newName}))
  }
  const onChangeExistingIsDisplay = (e) => {
    let displayValue;
    (e.target.value === "true") ? displayValue = true : displayValue = false
    setitemFields(newItem => ({...newItem, isDisplay: displayValue}));
  }
  const changeRadioButtons = (e) => {
    let newValue = Number(e.target.value);
    setitemFields(prevState => ({...prevState, fieldSize: newValue}))
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

  const editDisplay = <Fragment>
    <label><input type="radio" className="popup-item-radio" onChange={onChangeExistingIsDisplay} name={itemFields.isDisplay} checked={itemFields.isDisplay} value={true} />Column</label>
    <label><input type="radio" className="popup-item-radio" onChange={onChangeExistingIsDisplay} name={itemFields.isDisplay} checked={!itemFields.isDisplay} value={false} />Regular</label>
  </Fragment>

  const editSizes = <Fragment>
     <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={itemFields.fieldSize===NUMBER} value={NUMBER} />Number</label>
      <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={itemFields.fieldSize===REGULAR} value={REGULAR}/>Regular</label>
      <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={itemFields.fieldSize===WIDE} value={WIDE} />Wide</label>
      <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={itemFields.fieldSize===EXTRA_WIDE} value={EXTRA_WIDE} />Extra Wide</label>
  </Fragment>

let fieldText;
if (item.fieldSize === NUMBER) {
  fieldText = "Number"
} else if (item.fieldSize === REGULAR) {
  fieldText = "Regular"
} else if (item.fieldSize === WIDE) {
  fieldText = "Wide"
} else if (item.fieldSize === EXTRA_WIDE) {
  fieldText = "Extra Wide"
}

const staticSize = <Fragment>
  <label className="radio-label">{fieldText}</label>
</Fragment>

const staticDisplay = <Fragment>
  <label className="radio-label">{itemFields.isDisplay ? "True" : "False"}</label>
</Fragment>

  let popupclassName = "popup-item"
  isEditable && (popupclassName = popupclassName+" editable")
  return <div className={popupclassName}>
    <div className="overflow_auto">
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
    </div>
    <div className="columnRadios">
      <p className="formLabel">Display column: </p>
      {isEditable ? editDisplay : staticDisplay}
    </div>
    <div className="columnRadios">
        <p className="formLabel">Field size: </p>
      {isEditable ? editSizes : staticSize}
    </div>
  </div>
}

export default ColumnSettingsItem;