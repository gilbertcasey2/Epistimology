import React, { useState } from 'react';
import settings from '../../img/settings.svg'
import SettingsMenu from './SettingsMenu';
import { CATEGORIES, COLUMNS, TAGS } from '../../helpers/constants';

export const Header = ({openPopup}) => {

    const [settingsMenu, setSettingsMenu] = useState(false);

    const toggleSettingsMenu = () => {
        setSettingsMenu(prevState => (!prevState));
    }

    const handleCategories = () => {
        openPopup(CATEGORIES);
        setSettingsMenu(false)
    }
    const handleColumns = () => {
        openPopup(COLUMNS);
        setSettingsMenu(false)
    }
    const handleTags = () => {
        openPopup(TAGS);
        setSettingsMenu(false)
    }

    return (
        <header className='header'>
            <h1 className='logo'>Epistimology</h1>
            <div className="rightSide">
                <button className={(settingsMenu) ? "selected" : ""} onClick={toggleSettingsMenu}><img className="settingsimg" width={16} src={settings} alt="settings" />Settings</button>
                <SettingsMenu openCategories={handleCategories} openColumns={handleColumns} openTags={handleTags} isOpen={settingsMenu}/>
            </div>
        </header>
    )
}
