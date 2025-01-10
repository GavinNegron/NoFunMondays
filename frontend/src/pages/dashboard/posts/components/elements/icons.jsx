// React
import { useEditorContext } from '../../../../../contexts/EditorContext'
import { handleBoldChange, handleItalicChange, handleUnderlineChange, handleColorChange, handleAlignChange } from '../../../../../utilities/posts/editor/styleUtils';
import Tooltip from '../../../../../utilities/tooltip';
import { BlockPicker } from 'react-color';

const Icons = () => {
  const {
    style,
    setStyle,
    toggleColorPicker,
    showColorPicker,
    colorPickerRef,
    selectedElement,
    handleStyleChange
  } = useEditorContext();

  return (
    <>
    <div className="edit-styles__icons">
        <i onClick={() => handleBoldChange(selectedElement, setStyle, handleStyleChange)} data-tooltip-id="tip-bold" className="fa-solid fa-bold"></i>
        <i onClick={() => handleItalicChange(selectedElement, handleStyleChange)} data-tooltip-id="tip-italic" className="fa-solid fa-italic"></i>
        <i onClick={() => handleUnderlineChange(selectedElement, handleStyleChange)} data-tooltip-id="tip-underline" className="fa-solid fa-underline"></i>
        <i data-tooltip-id="tip-color" onClick={toggleColorPicker} className="fa-solid fa-palette"></i>
        <Tooltip id="tip-bold" header="Bold" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-italic" header="Italic" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-underline" header="Underline" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-color" header="Color" place="top" background="#242529" fontWeight="600" />
        {showColorPicker && (
        <div className="edit-styles__color-picker-container" ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2, top: '115px', left: '103px' }}>
            <BlockPicker color={style.color} onChange={(color) => handleColorChange(color, setStyle, handleStyleChange)} />
        </div>
        )}
    </div>
    <div className="edit-styles__icons">
      <i onClick={() => handleAlignChange('left', selectedElement)} data-tooltip-id="tip-left" className="fa-solid fa-align-left"></i>
      <i onClick={() => handleAlignChange('center', selectedElement)} data-tooltip-id="tip-center" className="fa-solid fa-align-center"></i>
      <i onClick={() => handleAlignChange('right', selectedElement)} data-tooltip-id="tip-right" className="fa-solid fa-align-right"></i>
      <Tooltip id="tip-left" header="Align Left" place="top" background="#242529" fontWeight="600" />
      <Tooltip id="tip-center" header="Align Center" place="top" background="#242529" fontWeight="600" />
      <Tooltip id="tip-right" header="Align Right" place="top" background="#242529" fontWeight="600" />
    </div>
    </>
  )
}

export default Icons