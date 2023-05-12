
import Paper from "./Paper";
import { PAPERS_LOADED, PAPERS_ERROR, PAPERS_EMPTY, PAPERS_LOADING } from '../helpers/constants';


const PaperContainer = ({filteredIndexes, papers, columns, expandedColumns, paperStatus}) => {

  const columnDivs = columns.map((column, index) => {
      let classes = "column label";
      if (paperStatus && papers.length > 0) {
        
        if(typeof papers[0][column.value] == "number") {
          classes = "number " + classes;
        }
        return <p key={column.display + index} className={classes}>{column.display}</p>
      }
      return <p key={column.display + index} className={classes}>{column.display}</p>;
  });

  const paperDivs = papers.map((paper, index) => {
      console.log("filtered indexes in paper container: " + filteredIndexes.toString())
      console.log("current index: " + index + " of paper " + paper["title"])
      let isVisible = false;
      if(filteredIndexes.includes(index)) {
        console.log("index: " + index + " is included.")
      } else {
        console.log("index: " + index + " is not included.")
      }
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

  const noPapers = handleLoading();

  return <div className="paperSection" style={makeGridValues()}>
    {paperStatus ===  columnDivs}
    {paperStatus === PAPERS_LOADED ? paperDivs : noPapers}
    </div>
}
export default PaperContainer;