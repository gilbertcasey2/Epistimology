import React, { Fragment, useState, useEffect } from 'react';
import { Header } from './Header/Header.jsx';
import PaperRepo from './PaperRepo';
import { getCategories, getColumns, getTags } from '../services/OrganizationServices.js'
import OpenSettingsPopup from './Settings/OpenSettingsPopup.jsx';
import { CATEGORIES, COLUMNS, TAGS, NONE } from '../helpers/constants.jsx';


export const Layout = () => {
    
    const [manageSettings, setManageSettings] = useState(NONE);

    const [updateCategories, setUpdateCategories] = useState(true)
    const [categories, setCategories] = useState([])
    const [catsLoaded, setCatsLoaded] = useState(false)

    const [columns, setColumns] = useState([])
    const [updateColumns, setUpdateColumns] = useState(true)

    const [tags, setTags] = useState([])
    const [updateTags, setUpdateTags] = useState(true)


    /** Get Categories */
    useEffect(() => {
        if(updateCategories) {
            getCategories().then(retrievedCats => {
                setCategories(retrievedCats);
                setCatsLoaded(true)
            });
            setUpdateCategories(false);
        } 
        if(updateColumns) {
            getColumns().then(retrievedCols => {
                setColumns(retrievedCols);
            });
            setUpdateColumns(false);
        } 
        if(updateTags) {
            getTags().then(retrievedTags => {
                setTags(retrievedTags);
            });
            setUpdateTags(false);
        }
    }, [updateCategories, categories, updateColumns, columns, updateTags, tags]);

    const openSettingsPopop =  (setting) => {
        setManageSettings(setting)
    }
    const closeSettingsPopop =  () => {
        setManageSettings(NONE)
    }

    const updateItems = () => {
        setUpdateCategories(true)
        setUpdateColumns(true)
        setUpdateTags(true)
    }

    const settingsPopup = () => {
        if (manageSettings === CATEGORIES) {
            return <OpenSettingsPopup updateItems={updateItems} formType={CATEGORIES} items={categories} closePopUp={closeSettingsPopop} />
        } else if (manageSettings === COLUMNS) {
            return <OpenSettingsPopup updateItems={updateItems} formType={COLUMNS} items={columns} closePopUp={closeSettingsPopop}/>
        } else if (manageSettings === TAGS) {
            return <OpenSettingsPopup updateItems={updateItems} formType={TAGS} items={tags} closePopUp={closeSettingsPopop}/>
        } else {
            return null;
        }
    };
   
    return (
        <Fragment>
        <Header openPopup={openSettingsPopop} />
        <div className='container'>
            <PaperRepo catsLoaded={catsLoaded} categories={categories} columns={columns}/>
            {settingsPopup()}
        </div>
        </Fragment>
    );
}

export default Layout;
