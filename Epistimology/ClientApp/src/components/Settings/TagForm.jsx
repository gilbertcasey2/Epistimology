import { useState } from "react";
import {addTag} from "../../services/OrganizationServices"
 
const TagForm = ({postSaveActions, closeForm}) => {

    const [newItem, setNewItem] = useState({"name": ""})
    const [formDirty, setFormDirty] = useState(false)

    const onChangeItemNameForm = (e) => {
        const valueString = e.target.value
        setNewItem(newItem => ({...newItem, "name":valueString}));
        setFormDirty(true)
    }

    const cancelForm = (e) => {
        setNewItem({"name": ""});
        setFormDirty(false)
        closeForm()
    }

    const addItem = (e) => {
        e.preventDefault();
        addTag(newItem).then(response => {
            setNewItem({"name": ""});
            setFormDirty(false);
            postSaveActions();
        });
    }

    return <form className="catForm" onSubmit={addItem}>
    <label>
      <p className="formLabel">Name</p>
      <input placeholder="Tag Name" value={newItem.name} onChange={(e) => onChangeItemNameForm(e)} />
    </label>
    <input type="submit" className={formDirty ? "secondaryButton" : "deactivated secondaryButton"} value="Add"/>
    <button onClick={cancelForm} className="thirdButton">Cancel</button>
  </form>
}

export default TagForm;