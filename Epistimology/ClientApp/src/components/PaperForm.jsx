import { React, useEffect } from "react";


const PaperForm = ({id, isOpen, cancelHandler, onChangeForm, formPaper, expandedColumns, columns, handleSubmit, formDirty, addSelectStyle, removeSelectStyle}) => {

  // const [editMode, setEditMode] = useState(false)

  

  const adjustTextBoxSize = (event) => {
    event.target.parentNode.dataset.replicatedValue = event.target.value;
  }

  useEffect(() => {
    let formFields = document.getElementsByClassName('formInput');
    for (let i=0; i < formFields.length; i++) {
      formFields[i].parentNode.dataset.replicatedValue = formFields[i].value;
    }
  },[]);

  const displayField = (expandedColumn, index) => {
    let classes = "entry";
    let valueText = "";
    (expandedColumn.value === "pAbstract" || expandedColumn.value === "citation") && (classes = "wide " + classes);
    (expandedColumn.value === "notes") && (classes = "verywide " + classes);
    (typeof formPaper[expandedColumn.value] == "string") ? valueText = formPaper[expandedColumn.value] : valueText = JSON.stringify(formPaper[expandedColumn.value])
    if(formPaper[expandedColumn.value] != null) {
      return <div key={expandedColumn.value + index} className={classes}><label><p className="formLabel">{expandedColumn.display}</p><div className="grow-wrap"><textarea className="formInput" name={expandedColumn.value} onChange={(e) => onChangeForm(e)} onInput={adjustTextBoxSize} onFocus={addSelectStyle} onBlur={removeSelectStyle} value={valueText}></textarea> </div></label></div>
    } else {
      return null;
    }
  }

  const formFields = expandedColumns.map((expandedColumn, index) => {
   return displayField(expandedColumn, index)
  });

  const makeGridSpan = () => {

    const gridVal = `1 / span ` + (columns.length)
    const gridStyle = {
      gridColumn: gridVal,
    }
    return gridStyle;
  }

  useEffect(() => {
    const parent = document.getElementById(id);
    const openForms = parent.getElementsByClassName("openform")
    for (var i = 0; i < openForms.length; i++) {
      if (!isOpen) {
        parent.style.maxHeight = "0px"
      } else {
        let boxHeight = openForms[i].offsetHeight + 20;
        console.log("boxHeight is : " + boxHeight)
        parent.style.maxHeight = boxHeight + "px";
      }
    }
    
  }, [isOpen, id])

  const makeBtnGridSpan = () => {
    const buttonGridStyle = {
      gridColumn: `1 / span ` + columns.length,
    }
    return buttonGridStyle;
  }

  return <div id={id} style={makeGridSpan()} className={isOpen ? "accordian open" : "accordian closed"}>
  <div className="openform" id="openForm">
    <form onSubmit={handleSubmit}>
      {/* {editMode && mainFormFields} */}
      {formFields}
      <div className="button-container" style={makeBtnGridSpan()}>
        <input type="submit" className={formDirty ? "secondaryButton form-btn" : "secondaryButton form-btn hidden"} value="Save" />
        <button type="button" onClick={cancelHandler} className={formDirty ? "thirdButton form-btn" : " thirdButton form-btn hidden"}>Cancel</button>
      </div>
    </form>
  </div>
  </div>
}

export default PaperForm;