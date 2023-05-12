import { React, useState, Fragment, useEffect} from "react";
import PaperForm from "./PaperForm";
import Tag from "./Tag";
import { savePaper} from '../services/PaperServices'


const Paper = ({isVisible, paper, reactKey, columns, paperNumber, expandedColumns}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formDirty, setFormDirty] = useState(false)
  const [formPaper, setformPaper] = useState(JSON.parse(JSON.stringify(paper)));


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

  const paperColumnDivs = columns.map((column, index) => {
    let classes = "column paperItem paperRow" + paperNumber;
    if (!isVisible) {
      classes = "invisibleRow " + classes
    }
    isHovered && (classes = classes + " hoverDarken");
    isOpen && (classes = classes + " selected");
    (index === 0) && (classes = classes + " start");
    (index === columns.length-1) && (classes = classes + " end");
    if(column.value === 'title') {
      classes = "column_title " + classes;
    }
    else {
      let datatype = typeof paper[column.value];
      (datatype === 'number') && (classes = 'numberCol ' + classes);
    }
    if(!isOpen || column.value === 'tags') {
      return <div key={"paperItem"+index} className={classes} onMouseOut={unhoverDarken} onMouseOver={hoverDarken} onClick={toggleForm}>{column.value === 'tags' ? getTagData() : <p className="paperValue">{formPaper[column.value]}</p>}</div>;
    } else {
      return <div key={"paperItem"+index} className={classes} onClick={toggleForm}><div className="grow-wrap"><input className={"formHeaderInput"} name={column.value} onChange={(e) => onChangeForm(e)} onClick={noToggleForm} onFocus={addSelectStyle} onBlur={removeSelectStyle} value={formPaper[column.value]} /> </div></div>
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
    <PaperForm id={reactKey} paper={paper} isOpen={isOpen} removeSelectStyle={removeSelectStyle} addSelectStyle={addSelectStyle} cancelHandler={cancelHandler} onChangeForm={onChangeForm} formPaper={formPaper} formDirty={formDirty} handleSubmit={handleSubmit} expandedColumns={expandedColumns} columns={columns}/>
    </Fragment>
}

export default Paper;