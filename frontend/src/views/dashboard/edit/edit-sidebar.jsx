import React from 'react';

function EditSidebar() {

  return (
    <>
        <aside className="editor-sidebar">
          <div className="editor-sidebar__icons">
            <div className="editor-sidebar__icons__item">
              <i class="fa-solid fa-plus"></i>
            </div>
            <div className="editor-sidebar__icons__item">
              <i class="fa-solid fa-file-fragment"></i>
            </div>
            <div className="editor-sidebar__icons__item">
              <i class="fa-solid fa-comment"></i>
            </div>
            <div className="editor-sidebar__icons__item">
              <i class="fa-solid fa-gear"></i>
            </div>
          </div>
        </aside>
    </>
  );
}

export default EditSidebar;