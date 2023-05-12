
const SettingsMenu = ({isOpen, openCategories,openColumns,openTags}) => {

  let classes = "settingsMenu";

  if(isOpen) {
    classes = "fullSettingsHeight " + classes;
  }

  return <div className={classes}>
    <ul>
      <li onClick={openCategories}>Manage Categories</li>
      <li onClick={openColumns}>Manage Fields</li>
      <li onClick={openTags}>Manage Tags</li>
    </ul>
  </div>
}

export default SettingsMenu;