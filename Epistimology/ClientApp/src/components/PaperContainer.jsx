
import Paper from "./Paper";
import { PAPERS_LOADED, PAPERS_ERROR, PAPERS_EMPTY, PAPERS_LOADING } from '../helpers/constants';


const PaperContainer = ({filteredIndexes, papers, columns, expandedColumns, paperStatus, colsLoaded}) => {

  const columnDivs = columns.map((column, index) => {
      let classes = "column label";
      if (column.isDisplay === false) {
        classes = "hiddenCol " + classes;
      }
      if (column.fieldSize === 0) { // A number column
        classes = "number " + classes;
      } else if (column.fieldSize === 2) {
        classes = "wide " + classes;
      } else if (column.fieldSize === 3) {
        classes = "extrawide " + classes;
      }
      
      return <p key={column.name + index} className={classes}>{column.name}</p>;
  });

  const paperDivs = papers.map((paper, index) => {
      let isVisible = false;
      (filteredIndexes.includes(index)) && (isVisible = true)
      for (let i=0; i < columns.length; i++) {
        let column_name = columns[i].name.toLowerCase()
        if (paper.values[i]) {
          paper[column_name] = paper.values[i].value
        } else {
          paper[column_name] = ""
        }
      }
      return <Paper isVisible={isVisible} expandedColumns={expandedColumns} paperNumber={index} columns={columns} reactKey={"paper"+index} key={"paper"+index} paper={paper} />
    
  });
  const makeGridValues = () => {
    let gridColValues = `minmax(0, 2fr)`;

    for (let i = 1; i < columns.length; i++) {
      if (columns[i].isDisplay) {
        let colValue = ` minmax(0, 1fr)`;
        (columns[i].fieldSize === 0) && (colValue = ` auto`);
        (columns[i].fieldSize === 2 || columns[i].fieldSize === 3) && (colValue = ` minmax(0, 3fr)`);
        gridColValues = gridColValues + colValue;
      }
      
    }
    const gridStyle = {
      gridTemplateColumns: gridColValues,
    };
    return gridStyle;
  }

  const handleLoading = () => {
    if(paperStatus === PAPERS_LOADING) {
      return <h3>Papers loading!</h3>
    } else if (paperStatus === PAPERS_EMPTY) {
      return <h3>There are no papers. Add some!</h3>
    } else if (paperStatus === PAPERS_ERROR) {
      return <h3>There has been an error retrieving the papers.</h3>
    } else {
      return <h3>There has been an unknown error.</h3>
    }
  }
  const noPapers = handleLoading();

  return <div className="paperBlue">
      <div className="paperSection" style={makeGridValues()}>
      {(paperStatus === PAPERS_LOADED & colsLoaded) && columnDivs}
      {paperStatus === PAPERS_LOADED ? paperDivs : noPapers}
      </div>
    </div>
}
export default PaperContainer;