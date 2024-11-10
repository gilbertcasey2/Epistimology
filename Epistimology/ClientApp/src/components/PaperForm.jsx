import { React, useEffect, useState } from "react";
import Loading from "../img/loading.gif"

const PaperForm = ({id, isOpen, cancelHandler, onChangeForm, formPaper, expandedColumns, columns, handleSubmit, formDirty, addSelectStyle, removeSelectStyle, loading}) => {

  // const [editMode, setEditMode] = useState(false)

  const [displayColCount, setDisplayColCount] = useState(0)

  const adjustTextBoxSize = (event) => {
    event.target.parentNode.dataset.replicatedValue = event.target.value;
  }

  useEffect(() => {
    let formFields = document.getElementsByClassName('formInput');
    for (let i=0; i < formFields.length; i++) {
      formFields[i].parentNode.dataset.replicatedValue = formFields[i].value;
    }

    let colLength = 0;
    for (var i = 0; i < columns.length; i++) {
      if (columns[i].isDisplay === true) {
        colLength++;
      }
    }
    setDisplayColCount(colLength)
    
  },[columns]);

  const displayField = (expandedColumn, index) => {
    let classes = "entry";
    let valueText = "";
    (expandedColumn.fieldSize === 2) && (classes = "wide " + classes);
    (expandedColumn.fieldSize === 3) && (classes = "verywide " + classes);
    let colName = expandedColumn.name.toLowerCase();
    valueText = formPaper[colName]
    if(valueText != null) {
      return <div key={colName + index} className={classes}><label><p className="formLabel">{colName}</p><div className="grow-wrap"><textarea className="formInput" name={colName} onChange={(e) => onChangeForm(e)} onInput={adjustTextBoxSize} onFocus={addSelectStyle} onBlur={removeSelectStyle} value={valueText}></textarea> </div></label></div>
    } else {
      return <div key={"empty" + index} className={classes}><label><p className="formLabel">{colName}</p><div className="grow-wrap"><textarea className="formInput" name={colName} onChange={(e) => onChangeForm(e)} onInput={adjustTextBoxSize} onFocus={addSelectStyle} onBlur={removeSelectStyle} value="   "></textarea></div></label></div>
    }
  }

  const formFields = expandedColumns.map((expandedColumn, index) => {
   return displayField(expandedColumn, index)
  });

  const makeGridSpan = () => {
    const gridVal = `1 / span ` + (displayColCount)
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
        let boxHeight = openForms[i].offsetHeight + 40;
        parent.style.maxHeight = boxHeight + "px";
      }
    }
    
  }, [isOpen, id])

  const makeBtnGridSpan = () => {
    const buttonGridStyle = {
      gridColumn: `1 / span ` + displayColCount,
    }
    return buttonGridStyle;
  }

  return <div id={id} style={makeGridSpan()} className={isOpen ? "accordian open" : "accordian closed"}>
  <div className="openform" id="openForm">
    <form onSubmit={handleSubmit}>
      {/* {editMode && mainFormFields} */}
      {formFields}
      <div className="button-container" style={makeBtnGridSpan()}>
        <img alt="Loading" src={Loading} className={loading ? "loading-spinner" : "loading-spinner hidden"} />
        <input type="submit" className={formDirty ? "secondaryButton form-btn" : "secondaryButton form-btn hidden"} value="Save" />
        <button type="button" onClick={cancelHandler} className={formDirty ? "thirdButton form-btn" : " thirdButton form-btn hidden"}>Cancel</button>
      </div>
    </form>
  </div>
  </div>
}

export default PaperForm;