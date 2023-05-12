import { useEffect, useState } from "react";
import { CATEGORIES, COLUMNS, TAGS } from "../../helpers/constants";
import {deleteCategory, deleteColumn, deleteTag, editCategory, editColumn, editTag} from "../../services/OrganizationServices"
import CategorySettingsItem from "./CategorySettingsItem";
import CancelButton from "../../img/cancel.svg"
import CategoryForm from "./CategoryForm";
import ColumForm from "./ColumnForm";
import ColumnSettingsItem from "./ColumnSettingsItem";
import TagForm from "./TagForm";
import TagSettingsItem from "./TagSettingsItem";


const OpenSettingsPopup = ({updateItems, formType, items, closePopUp}) => {

  
  const [showForm, setShowForm] = useState(false);
  const [formFields, setFormFields] = useState(JSON.parse(JSON.stringify(items)))

  const editItem = (item) => {
    const item_id = item.id;
    const new_name = item.name;
    if(formType === CATEGORIES) {
      const new_description = item.description
      editCategory({id:item_id, name: new_name, description: new_description})
      .then(response => {
        updateItems();
      });
    } else if (formType === COLUMNS) {
      const new_display = item.isDisplay;
      const new_size = item.fieldSize;
      editColumn({id:item_id, name: new_name, isDisplay: new_display, fieldSize: new_size})
      .then(response => {
        updateItems();
      });
    }
    else if (formType === TAGS) {
      editTag({id:item_id, name: new_name })
      .then(response => {
        updateItems();
      });
    }
  }

  useEffect(() => {
    setFormFields(JSON.parse(JSON.stringify(items)))
  }, [items])

  const deleteItem = (e) => {
    e.preventDefault();
    const item_id = e.target.name
    if(formType === CATEGORIES) {
      deleteCategory(item_id)
      .then(response => {
        updateItems();
      });
    }
    else if (formType === COLUMNS) {
      deleteColumn(item_id)
      .then(response => {
        updateItems();
      });
    }
    else if (formType === TAGS) {
      deleteTag(item_id)
      .then(response => {
        updateItems();
      });
    }
  }

  const closeForm = () => {
    setShowForm(false)
  }
  
  const postSaveActions = () => {
    setShowForm(false);
    updateItems();
  }
 
  let displayItems;
  if (formFields && formType === CATEGORIES) {
    displayItems = formFields.map((field, index) => {
      return <CategorySettingsItem key={field.name + index} item={field} deleteItem={deleteItem} editItem={editItem} />
    });
  } else if (formFields && formType === COLUMNS) {
    displayItems = formFields.map((field, index) => {
      return <ColumnSettingsItem key={field.name + index} item={field} deleteItem={deleteItem} editItem={editItem} />
    });
  }  else if (formFields && formType === TAGS) {
    displayItems = formFields.map((field, index) => {
      return <TagSettingsItem key={field.name + index} item={field} deleteItem={deleteItem} editItem={editItem} />
    });
  }
  

  const openForm = () => {
    setShowForm(true)
  }

  let addForm;

  if (formType === CATEGORIES) {
    addForm = <CategoryForm postSaveActions={postSaveActions} closeForm={closeForm} />
  } else if (formType === COLUMNS) {
    addForm = <ColumForm postSaveActions={postSaveActions} closeForm={closeForm} />
  }
  else if (formType === TAGS) {
    addForm = <TagForm postSaveActions={postSaveActions} closeForm={closeForm} />
  }
  

  return <div className="popup">
      <div className="popup-header"><h3>Manage {formType}</h3>
        <img onClick={closePopUp} alt="Close" src={CancelButton} className="close-popup" />
      </div>
      <div className="popup-items">
        {displayItems}
      </div>
      {!showForm && <button onClick={openForm} className="primaryButton">Add {formType}</button>}
      {showForm && addForm}
    </div>
}

export default OpenSettingsPopup;