import initEditor from '../../utils/layout';
import { useEffect } from 'react';

const Layout = () => {

   useEffect(() => {
    const editor = initEditor();
    window.handleImportFile = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const jsonData = JSON.parse(ev.target.result);
        editor.loadProjectData(jsonData);
        alert("Full design loaded successfully!");
      };
      reader.readAsText(file);
    };
  }, []);

    return (
        <div className="container-fluid" >
            <div className="row">
                <div className="col-2 col-md-2">
                    {/* Blocks */}
                    <div className="sidebar">
                        <div id="blocks" className="dropdown-area open"></div>
                    </div>
                </div>
                <div className="col-10 col-md-10" >
                    <div className='layout-body'>

                    </div>
                </div>
                {/* ✨ HIDDEN INPUT HERE */}
                <input
                    type="file"
                    id="jsonInput"
                    accept="application/json"
                    style={{ display: "none" }}
                    onChange={(e) => window.handleImportFile(e)}
                />
            </div>
        </div>
    );
};

export default Layout;
