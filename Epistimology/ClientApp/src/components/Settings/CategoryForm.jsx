import { useState } from "react";
import {addCategory} from "../../services/OrganizationServices"
 
const CategoryForm = ({postSaveActions, closeForm}) => {

    const [newItem, setNewItem] = useState({"name": "", "description":""})
    const [formDirty, setFormDirty] = useState(false)

    const onChangeItemNameForm = (e) => {
        const valueString = e.target.value
        setNewItem(newItem => ({...newItem, "name":valueString}));
        setFormDirty(true)
    }
    const onChangeItemDescForm = (e) => {
        const valueString = e.target.value
        setNewItem(newItem => ({...newItem, "description":valueString}));
    }
    const cancelForm = (e) => {
        setNewItem({"name": "", "description":""});
        setFormDirty(false)
        closeForm()
    }

    const addItem = (e) => {
        e.preventDefault();
        addCategory(newItem).then(response => {
            setNewItem({"name": "", "description": ""});
            setFormDirty(false);
            postSaveActions();
        });
    }

    return <form className="catForm" onSubmit={addItem}>
    <label>
      <p className="formLabel">Name</p>
      <input placeholder="Category Name" value={newItem.name} onChange={(e) => onChangeItemNameForm(e)} />
    </label>
    <label><p className="formLabel">Description</p>
      <textarea onChange={(e) => onChangeItemDescForm(e)} value={newItem.description} placeholder="What will you store with this category?"></textarea>
    </label>
    <input type="submit" className={formDirty ? "secondaryButton" : "deactivated secondaryButton"} value="Add"/>
    <button onClick={cancelForm} className="thirdButton">Cancel</button>
  </form>
}

export default CategoryForm;