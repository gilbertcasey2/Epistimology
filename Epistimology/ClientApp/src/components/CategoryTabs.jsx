import {Fragment, useEffect, useState} from "react";
import { PAPERS_LOADED } from "../helpers/constants";
import { addCategory } from "../services/OrganizationServices";

const CategoryTabs = ({updateTabPapers, paperStatus, paperCount,categories, catsLoaded}) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [addingCat, setAddingCat] = useState(false)
  const [catList, setCatList] = useState([])
  const [addingCategory, setAddingCategory] = useState("")

  const [loadCats, setLoadCats] = useState(true);

  useEffect(() => {
    if(catsLoaded && loadCats) {
      setCatList([]);
      categories.forEach(element => {
        setCatList(prevState => [...prevState, element])
      });
      setLoadCats(false)
    }
  }, [categories, catList, loadCats, catsLoaded])

  useEffect(() => {
    setLoadCats(true)
  }, [categories])

  const setSelected = (index) => {
    setSelectedTab(index)
    updateTabPapers(catList[index]["name"])
  }

  const openCatForm = () => {
    setAddingCat(true)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    let newCat = {"name": addingCategory}
    addCategory(newCat)
        .then(response => {
            setAddingCat(false)
            setAddingCategory("")
            setCatList(prevState => [...prevState, newCat])
        });
  }

  const listCats = catList.map((category, index) => {
      let classlist = "category";
      (index === selectedTab && (classlist = "selected " + classlist)) 
      return <div key={"category"+index} onClick={() => setSelected(index)} className={classlist}>{category["name"]}</div>
    });

  const onChangeForm = (e) => {
    setAddingCategory(e.target.value)
  }

  const cancelForm = (e) => {
    e.preventDefault();
    setAddingCategory([]);
    setAddingCat(false);
  }

  const addCatForm = 
    <div className="popup"><form className="catForm" onSubmit={handleSubmit}><label><p className="formLabel">Name</p><input placeholder="Category Name" value={addingCategory} onChange={(e) => onChangeForm(e)} /></label><label><p className="formLabel">Description</p><textarea placeholder="What will you store with this category?"></textarea></label><input type="submit" className="secondaryButton" value="Add"/><button onClick={cancelForm} className="thirdButton">Cancel</button></form></div>

  return<Fragment>
    {addingCat &&  addCatForm}
    <div className="tabContainer">
      <div className="categories">
        {listCats}
        {!addingCat && <button onClick={openCatForm}>+</button>}
      </div>
      {paperStatus === PAPERS_LOADED && <p className="paperCount">{paperCount} total papers</p>}
    </div>
  </Fragment>
}
export default CategoryTabs;