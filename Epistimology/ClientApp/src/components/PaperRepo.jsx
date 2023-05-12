
import {useState, useEffect } from 'react';
import CategoryTabs from "./CategoryTabs";
import PaperContainer from "./PaperContainer";
import { getPapers } from '../services/PaperServices'
import { PAPERS_LOADED, PAPERS_ERROR, PAPERS_EMPTY, PAPERS_LOADING } from '../helpers/constants';
import AddPaper from './AddPaper';
import addBut from '../img/add.svg'


const PaperRepo = ({catsLoaded, categories, columns}) => {

  const [papers, setPapers] = useState([])
  const [updatePapers, setupdatePapers] = useState(true)
  const [paperStatus, setPaperStatus] = useState(PAPERS_LOADING)

  const [filteredIndexes, setfilteredIndexes] = useState([]);

  const [addPaperModal, setAddPaperModal] = useState(false)

  /** Get Papers */
  useEffect(() => {
    if(updatePapers) {
      getPapers().then(retrievedPapers => {
        console.log("The retrieved papers: " + retrievedPapers);
        setTimeout(function() {
          if(retrievedPapers == null) {
            setPaperStatus(PAPERS_ERROR)
          } else if (retrievedPapers.length < 1) {
            setPaperStatus(PAPERS_EMPTY)
          } else {
            setPapers(retrievedPapers);
            retrievedPapers.forEach((paper, index) => {
              setfilteredIndexes(prevState => ([...prevState, index]));
            });
            setPaperStatus(PAPERS_LOADED)
          }  
        }, 1000);
      });
      setupdatePapers(false);
    }
  }, [updatePapers, papers]);


  const expandedColumns = [{name:'Abstract'},
  {name:'Notes'},
  {name:'Citation'},
  { name:'Key Concepts'},
  {name:'Interesting Authors'}, 
  { name:'Key Words'}]

  const updateTabPapers = (catName) => {
    setfilteredIndexes([])
      let indexToset = [];
      if(catName === "All") {
        papers.forEach((paper, index) => {
          indexToset.push(index)
        });
      } else {
        papers.forEach((paper, index) => {
          if(paper["category"]["name"] === catName) {
            indexToset.push(index)
          }
        });
      }
      setfilteredIndexes(indexToset)
  }

  const toggleAddModal = () => {
    setAddPaperModal(prevState => (!prevState))
  }

    return<section className="paperRepo">
        <button className="primaryButton addPaper" onClick={toggleAddModal}><img className="addIcon" width={16} src={addBut} alt="add" />Add Paper</button>
        <CategoryTabs updateTabPapers={updateTabPapers} paperStatus={paperStatus} catsLoaded={catsLoaded} paperCount={papers.length} categories={categories}></CategoryTabs>
        <PaperContainer paperStatus={paperStatus} filteredIndexes={filteredIndexes} papers={papers} expandedColumns={expandedColumns}columns={columns}></PaperContainer>
        { addPaperModal && <AddPaper expandedColumns={expandedColumns} columns={columns} closeModal={toggleAddModal} /> }
      </section>
}

export default PaperRepo;