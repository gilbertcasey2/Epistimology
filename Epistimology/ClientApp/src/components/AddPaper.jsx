import {useState } from 'react';
import { EXTRA_WIDE, REGULAR, WIDE } from '../helpers/constants';
import { addPaper } from '../services/PaperServices';

const AddPaper = ({closeModal, columns}) => {

  const [formDirty, setFormDirty] = useState(false)
  const [formPaper, setformPaper] = useState({"":""});

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitting paper!: " + JSON.stringify(formPaper))
   
    let paper = {}
    paper["values"] = [];
    for (var i = 0; i < columns.length; i++) {
      console.log("col: " + JSON.stringify(columns[i]))
      if (columns[i].name === "Title") {
        paper[columns[i].name] = formPaper[columns[i].name]
      } else {
        let colVal = {"name": columns[i].name, "value": formPaper[columns[i].name]};
        paper["values"].push(colVal);
      }
    }
    console.log("submitting paper!: " + JSON.stringify(paper))
    addPaper(paper)
  }

  function addSelectStyle(event) {
    event.target.classList.add('selectedField');
  }

  function removeSelectStyle(event) {
    event.target.classList.remove('selectedField');
  }

  const onChangeForm = (e) => {
    const keyString = e.target.name
    const valueString = e.target.value
    setformPaper(prevState => ({...prevState, [keyString] : valueString}));
    setFormDirty(true)
  }
  const adjustTextBoxSize = (event) => {
    event.target.parentNode.dataset.replicatedValue = event.target.value;
  }
  const displayField = (column, index) => {
    let classes = "entry";
    let valueText = formPaper[column.name];
    if(column.fieldSize === REGULAR) {
      return <div key={column.name + index} className={classes}><label><p className="formLabel">{column.name}</p><div className="grow-wrap"><input className="formInput" name={column.name} onChange={(e) => onChangeForm(e)} onFocus={addSelectStyle} onBlur={removeSelectStyle} value={valueText} /></div></label></div>
    } else {
      column.fieldSize === WIDE && (classes = "wide " + classes);
      column.fieldSize === EXTRA_WIDE && (classes = "verywide " + classes);
      //(typeof formPaper[expandedColumn.value] == "string") ? valueText = formPaper[expandedColumn.value] : valueText = JSON.stringify(formPaper[expandedColumn.value])
      return <div key={column.name + index} className={classes}><label><p className="formLabel">{column.name}</p><div className="grow-wrap"><textarea className="formInput" name={column.name} onChange={(e) => onChangeForm(e)} onInput={adjustTextBoxSize} onFocus={addSelectStyle} onBlur={removeSelectStyle} value={valueText}></textarea> </div></label></div>
    }
  }

  const mainFormFields = columns.map((column, index) => {
    return displayField(column, index)
  });

  return <div className="AddPaperForm">
    <h3>Add Paper</h3>
    <form onSubmit={handleSubmit}>
    <div className="addFormFields">
    {mainFormFields}
  </div>
  <input type="submit" className={formDirty ? "secondaryButton form-btn" : "secondaryButton form-btn hidden"} value="Save" />
  <button type="button" onClick={closeModal} className={formDirty ? "thirdButton form-btn" : " thirdButton form-btn hidden"}>Cancel</button>
</form></div>
}

export default AddPaper;