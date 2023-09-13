
import Paper from "./Paper";
import { PAPERS_LOADED, PAPERS_ERROR, PAPERS_EMPTY, PAPERS_LOADING } from '../helpers/constants';


const PaperContainer = ({filteredIndexes, papers, columns, expandedColumns, paperStatus, colsLoaded}) => {

  const columnDivs = columns.map((column, index) => {
      let classes = "column label";
      if (papers.length > 0) {
        if(typeof papers[0][column.name] == "number") {
          classes = "number " + classes;
        }
        return <p key={column.name + index} className={classes}>{column.name}</p>
      }
      return <p key={column.name + index} className={classes}>{column.name}</p>;
  });

  const paperDivs = papers.map((paper, index) => {
      let isVisible = false;
      (filteredIndexes.includes(index)) && (isVisible = true)
      return <Paper isVisible={isVisible} expandedColumns={expandedColumns} paperNumber={index} columns={columns} reactKey={"paper"+index} key={"paper"+index} paper={paper} />
    
  });
  const makeGridValues = () => {
    let gridColValues = `minmax(0, 3fr) minmax(0, 1.5fr)`;

    for (let i = 2; i < columns.length; i++) {
      let colValue = ` minmax(0, 1fr)`;
      (columns[i].display === 'Year' || columns[i].display === 'Interest') && (colValue = ` auto`);
      
      gridColValues = gridColValues + colValue;
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
  console.log("colsloaded: " + colsLoaded)
  const noPapers = handleLoading();

  return <div className="paperBlue">
      <div className="paperSection" style={makeGridValues()}>
      {(paperStatus === PAPERS_LOADED & colsLoaded) && columnDivs}
      {paperStatus === PAPERS_LOADED ? paperDivs : noPapers}
      </div>
    </div>
}
export default PaperContainer;