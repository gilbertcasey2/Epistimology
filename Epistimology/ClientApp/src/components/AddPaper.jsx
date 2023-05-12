import {useState } from 'react';
import { EXTRA_WIDE, REGULAR, WIDE } from '../helpers/constants';
import { addPaper } from '../services/PaperServices';

const AddPaper = ({closeModal, expandedColumns, columns}) => {

  const [formDirty, setFormDirty] = useState(false)
  const [formPaper, setformPaper] = useState({});

  const handleSubmit = () => {
    let colValues = []
    let paper = {}
    columns.forEach = (col) => {
      if (col.name === "Title") {
        paper[col.name] = formPaper[col.name]
      } else {
        let colVal = {"name": col.name, "value": formPaper[col.name]};
        colValues.add(colVal);
      }
    };
    console.log("submitting paper!: " + paper)
    console.log("submitting values!: " + colValues)
    addPaper(paper, colValues)
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

  const formFields = expandedColumns.map((expandedColumn, index) => {
    return displayField(expandedColumn, index)
  });

  const mainFormFields = columns.map((column, index) => {
    return displayField(column, index)
  });



  return <div className="AddPaperForm">
    <h3>Add Paper</h3>
    <form onSubmit={handleSubmit}>
    <div className="addFormFields">
    {mainFormFields}
    {formFields}
  </div>
  <input type="submit" className={formDirty ? "secondaryButton form-btn" : "secondaryButton form-btn hidden"} value="Save" />
  <button type="button" onClick={closeModal} className={formDirty ? "thirdButton form-btn" : " thirdButton form-btn hidden"}>Cancel</button>
</form></div>
}

export default AddPaper;