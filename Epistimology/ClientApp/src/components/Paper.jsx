import { React, useState, Fragment, useEffect} from "react";
import PaperForm from "./PaperForm";
import Tag from "./Tag";
import { savePaper} from '../services/PaperServices'


const Paper = ({isVisible, paper, reactKey, columns, paperNumber}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formDirty, setFormDirty] = useState(false)
  const [formPaper, setformPaper] = useState(JSON.parse(JSON.stringify(paper)));
  const [isLoading, setIsLoading] = useState(false)

  const toggleForm = (e) => {
    setIsOpen(prevState => !prevState)
  }
  const noToggleForm = (e) => {
    e.stopPropagation();
  }

  const hoverDarken = ()  => {
    setIsHovered(true);
  }
  const unhoverDarken = ()  => {
    setIsHovered(false);
  }

  const getTagData = () => {
    let tagSpans = [];
    tagSpans.push(paper['tags'].map((tag, index) => {
       return <Tag key={"tag " + index} className="tag" tag={tag} />;
    }));
    return tagSpans;
  }

  useEffect(() => {
    if(!isVisible && isOpen) {
      setIsOpen(false)
    }
  }, [isOpen, isVisible] )

  const expandedColumns = () => {
    let colList = []
    columns.forEach(col => {
      colList.push(col)
    });
    return colList
  }

  const paperColumnDivs = columns.map((column, index) => {
    const columnName = column.name.toLowerCase();
    let classes = "column paperItem paperRow" + paperNumber;
    if (!isVisible) {
      classes = "invisibleRow " + classes
    }
    isHovered && (classes = classes + " hoverDarken");
    isOpen && (classes = classes + " selected");
    (index === 0) && (classes = classes + " start");
    (index === columns.length-1) && (classes = classes + " end");
    if(columnName === 'title') {
      classes = "column_title " + classes;
    }
    else {
      (column.fieldSize === 0) && (classes = 'numberCol ' + classes);
      (!column.isDisplay) && (classes = 'hiddenCol ' + classes)
    }
    
    if(!isOpen || columnName === 'tags') {
      return <div key={"paperItem"+index} className={classes} onMouseOut={unhoverDarken} onMouseOver={hoverDarken} onClick={toggleForm}>{columnName === 'tags' ? getTagData() : <p className="paperValue">{formPaper[columnName]}</p>}</div>;
    } else {
      return <div key={"paperItem"+index} className={classes} onClick={toggleForm}><div className="grow-wrap"><input className={"formHeaderInput"} name={columnName} onChange={(e) => onChangeForm(e)} onClick={noToggleForm} onFocus={addSelectStyle} onBlur={removeSelectStyle} value={(formPaper[columnName] !== null) ? formPaper[columnName] : ""} /> </div></div>
    }
  });

  useEffect(() => {
    let headFields = document.getElementsByClassName('formHeaderInput');
    let paperValues = document.getElementsByClassName('paperValue');
    for (let i=0; i < headFields.length; i++) {
      headFields[i].style.width = (headFields[i].value.length + 3) + "ch";
    }
    for (let i=0; i < paperValues.length; i++) {
      paperValues[i].style.width = (paperValues[i].innerText.length + 3) + "ch";
    }
  }, [isOpen, formPaper])

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    formPaper.values = []
    for (let i = 0; i < columns.length; i++) {
      let colName = columns[i].name.toLowerCase();
      formPaper.values.push({"name":colName, "value": formPaper[colName]});
    }
    savePaper({ ...paper, ...formPaper})
        .then(response => {
            onPaperUpdate(response);
        });
  }

  function addSelectStyle(event) {
    event.target.classList.add('selectedField');
  }

  function removeSelectStyle(event) {
    event.target.classList.remove('selectedField');
  }

  const onPaperUpdate = (response) => {
    setFormDirty(false)
    setIsOpen(false)
    setIsLoading(false)
  }

  const onChangeForm = (e) => {
    const keyString = e.target.name
    const valueString = e.target.value
    setformPaper(prevState => ({...prevState, [keyString] : valueString}));
    setFormDirty(true)
  } 

  const cancelHandler = (e) => {
    setformPaper({...paper });
    setFormDirty(false)
  }
  
  return <Fragment>
    {paperColumnDivs}
    <PaperForm id={reactKey} paper={paper} isOpen={isOpen} removeSelectStyle={removeSelectStyle} addSelectStyle={addSelectStyle} cancelHandler={cancelHandler} onChangeForm={onChangeForm} formPaper={formPaper} formDirty={formDirty} handleSubmit={handleSubmit} expandedColumns={expandedColumns()} columns={columns} loading={isLoading}/>
    </Fragment>
}

export default Paper;