import React, { useState } from 'react';
import * as feather from 'feather-icons';
import './App.css';
const IconPicker = ({
  rowsInOnePage,
  columnsInOnePage,
  iconHeight,
  iconWidth,
  pickerHeight = '500px',
  pickerWidth = '500px',
  onSelect,
  onCancel,
  onDone,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const icons = Object.keys(feather.icons);
  const iconsPerPage = rowsInOnePage * columnsInOnePage;
  const totalPages = Math.ceil(icons.length / iconsPerPage);
  const [selectedIcon, setSelectedIcon] = useState(null);


  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    onSelect(iconName);
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleDone = () => {
    onDone();
  };



  const navigateToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="icon-picker" style={{ height: pickerHeight, width: pickerWidth }}>
      <div className="header">
        <h2>Select App Icon</h2>
        <button className="close-button" onClick={handleCancel}>×</button>
      </div>
      <div className="icons-grid" style={{
        gridTemplateRows: `repeat(${rowsInOnePage}, ${iconHeight}px)`,
        gridTemplateColumns: `repeat(${columnsInOnePage}, ${iconWidth}px)`,
      }}>
        {icons.slice(currentPage * iconsPerPage, (currentPage + 1) * iconsPerPage).map(iconName => (
          <div
            key={iconName}
            onClick={() => handleIconClick(iconName)}
            style={{ background: selectedIcon === iconName ? '#e0f7fa' : 'transparent' }}
            className="icon-container"
            role="button"
            tabIndex="0"
            aria-label={`Select ${iconName} icon`}
          >
            <div dangerouslySetInnerHTML={{ __html: feather.icons[iconName].toSvg({ height: iconHeight, width: iconWidth }) }} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => navigateToPage(currentPage - 1)} disabled={currentPage === 0}>Previous</button>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <button onClick={() => navigateToPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>Next</button>
      </div>
      <div className="footer">
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
        <button onClick={handleDone}>Done</button>
      </div>
    </div>
  );
};

const App = () => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleSelectIcon = (iconName) => {
    setSelectedIcon(iconName);
  };

  const handleCancel = () => {
    setPickerVisible(false);
  };

  const handleDone = () => {
    setPickerVisible(false);
  };

  return (
    <div>
      <div
        className="icon-trigger"
        style={{ width: '100px', height: '100px', border: '1px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
        onClick={() => setPickerVisible(true)}
      >
        {selectedIcon ? <div dangerouslySetInnerHTML={{ __html: feather.icons[selectedIcon].toSvg({ height: 50, width: 50 }) }} /> : 'Pick an Icon'}
      </div>
      {isPickerVisible && (
        <div className="modal">
          <IconPicker
            rowsInOnePage={5}
            columnsInOnePage={8}
            iconHeight={50}
            iconWidth={50}
            pickerHeight="600px"
            pickerWidth="600px"
            onSelect={handleSelectIcon}
            onCancel={handleCancel}
            onDone={handleDone}
          />
        </div>
      )}
    </div>
  );
};


export default App;