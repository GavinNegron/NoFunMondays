import { handleAddLink } from '@/utilities/posts/editorFunctions';
import { useEditorContext } from '@/contexts/EditorContext'
import { updatePostElement } from '@/features/posts/postAction'
import './_index.sass';


const AddLink = () => {
    const {
        selectedElement,
    } = useEditorContext();

    return (
      <div className="addLink">
            <div className="addLink__inner">
                <div className="addLink__header">
                    <span>Insert Link</span>
                </div>
                <div className="addLink__content">
                    <div className="addLink__item">
                        <span>Text to display: </span>
                        <input id='addLink-text' type="text" />
                    </div>
                    <div className="addLink__item">
                        <span>Link address: </span>
                        <input id='addLink-address' type="text" />
                    </div>
                </div>
                <div className="addLink__input">
                    <div className="addLink__input__item">
                        <button id='addLink-cancel' onClick={() => { document.querySelector('.addLink').style.display = 'none'; }}>Cancel</button>
                    </div>
                    <div className="addLink__input__item">
                        <button id='addLink-submit' onClick={() => handleAddLink(selectedElement, updatePostElement)}>Submit</button>
                    </div>
                </div>
            </div>
      </div>
    );
};
  
export default AddLink;