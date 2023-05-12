import { useState } from "react";
import {addColumn} from "../../services/OrganizationServices"
import { EXTRA_WIDE, NUMBER, REGULAR, WIDE } from "../../helpers/constants";
 
const ColumForm = ({postSaveActions, closeForm}) => {

    const [newItem, setNewItem] = useState({name: "", isDisplay: true, fieldSize: REGULAR})
    const [formDirty, setFormDirty] = useState(false)

    const onChangeItemNameForm = (e) => {
        const valueString = e.target.value
        setNewItem(newItem => ({...newItem, "name":valueString}));
        setFormDirty(true)
    }
    const onChangeItemDisplay = (e) => {
        let displayValue;
        (e.target.value === "true") ? displayValue = true : displayValue = false
        setNewItem(newItem => ({...newItem, isDisplay: displayValue}));
    }

    const changeRadioButtons = (e) => {
        let newValue = Number(e.target.value);
        setNewItem(prevState => ({...prevState, fieldSize: newValue}))
    }

    const cancelForm = (e) => {
        setNewItem({name: "", isDisplay: true, fieldSize: REGULAR});
        setFormDirty(false)
        closeForm()
    }

    const addItem = (e) => {
        e.preventDefault();
        addColumn(newItem).then(response => {
            setNewItem({name: "", isDisplay: true, fieldSize: REGULAR});
            setFormDirty(false);
            postSaveActions();
        });
    }

    return <form className="catForm" onSubmit={addItem}>
    <label>
      <p className="formLabel">Name</p>
      <input placeholder="Column Name" value={newItem.name} onChange={(e) => onChangeItemNameForm(e)} />
    </label>
    <label><p className="formLabel">Column Display</p>
        <p className="subtext">Determines whether this field is displayed in the grid as a column.</p>
        <label className="radio-label"><input type="radio" onChange={onChangeItemDisplay} checked={newItem.isDisplay} value={true} />Column</label>
        <label className="radio-label"><input type="radio" onChange={onChangeItemDisplay} checked={!(newItem.isDisplay)} value={false} />Regular</label>
    </label>
    <label><p className="formLabel">Field Size</p>
        <p className="subtext">Determines how much space this field recieves.</p>
        <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={newItem.fieldSize===NUMBER} value={NUMBER} />Number</label>
        <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={newItem.fieldSize===REGULAR} value={REGULAR}/>Regular</label>
        <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={newItem.fieldSize===WIDE} value={WIDE} />Wide</label>
        <label className="radio-label"><input type="radio" onChange={changeRadioButtons} checked={newItem.fieldSize===EXTRA_WIDE} value={EXTRA_WIDE} />Extra Wide</label>
    </label>
    <input type="submit" className={formDirty ? "secondaryButton" : "deactivated secondaryButton"} value="Add"/>
    <button onClick={cancelForm} className="thirdButton">Cancel</button>
  </form>
}

export default ColumForm;