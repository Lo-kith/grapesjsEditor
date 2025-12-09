import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-rulers/dist/grapesjs-rulers.min.css";

import presetWebpage from "grapesjs-preset-webpage";
import scriptEditor from "grapesjs-script-editor";
import blocks from "./blocks";
import { fileMenuItems } from "./blocks";
import rulerConfig from "./ruler";
import { enableYjsLocalSave } from "./yjs-local";
import rulers from "grapesjs-rulers";
import '../Logics/LiveData'
import ThreeDObject from "../Logics/3DObject";
import Mathtype from "../Logics/Mathtype";
import registerWeatherComponent from '../Logics/LiveData'
import MyImage from "../Logics/Image";

let editorInstance = null;

const initEditor = () => {
  if (editorInstance) return editorInstance;

  editorInstance = grapesjs.init({
    container: ".layout-body",
    noticeOnUnload: false,
    fromElement: false,
    // storageManager: false,
    width: "100%",
    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      ],
      // If you need model-viewer for 3D previews:
      scripts: ["https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"],
    },

    plugins: [
      // MyImage can be a plugin function; if it expects to be passed as plugin, keep here.
      MyImage,
      presetWebpage,
      scriptEditor,
      (editor) => rulers(editor, rulerConfig.options),
    ],

    pluginsOpts: {
      "gjs-rulers": rulerConfig.options,
      "grapesjs-preset-webpage": {
        skip: ["text-section", "link-block", "basic-blocks"],
      },
    },

    blockManager: {
      appendTo: "#blocks",
      fileMenuItems,
      blocks,
    },

    panels: { defaults: [] },
  });

  // Register Mathtype (math-component + math-block)
  Mathtype(editorInstance);


  // Register image plugin manually if your MyImage export expects direct call
  // If MyImage is already included as a plugin (above), you can skip this call.
  // Uncomment the following line only if MyImage is NOT already registered via plugins.
  // MyImage(editorInstance);

  // 3D block
  if (typeof ThreeDObject === "function") ThreeDObject(editorInstance);

  // weather Block registration
  if (typeof registerWeatherComponent === "function") registerWeatherComponent(editorInstance);

  // Enable YJS collaboration (optional)
  setTimeout(() => {
    try {
      enableYjsLocalSave(editorInstance);
    } catch (e) {
      // ignore if YJS not configured
      // console.warn("YJS local save failed:", e);
    }
  }, 100);

  // Add yjs-collab component for UI notice
  editorInstance.Components.addType("yjs-collab", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "yjs-wrapper" },
        droppable: false,
        editable: false,
        copyable: false,
        highlightable: false,
        removable: false,
        components: `
          <div style="padding:15px; border:2px dashed #673ab7; background:#f3eefe;">
            <h4 style="margin:0;">🔗 Yjs Collaboration Enabled</h4>
            <p style="margin:0;">Multiple users can edit this GrapesJS editor in real-time.</p>
          </div>
        `,
      },
    },
  });

  // Panels buttons
  const pn = editorInstance.Panels;
  const panelViews = pn.addPanel({ id: "options" });
  panelViews.get("buttons").add([
    {
      id: "save-project",
      attributes: { title: "Save Project" },
      command: "save-project",
      label: `💾`,
    },
    {
      id: "export-project",
      attributes: { title: "Export Project" },
      command: "export-project",
      label: `📤`,
    },
    {
      id: "import-project",
      attributes: { title: "Import Project" },
      command: "import-project",
      label: `📥`,
    },
  ]);

  // Commands
  editorInstance.Commands.add("save-project", {
    run() {
      try {
        const data = editorInstance.getProjectData();
        localStorage.setItem("MyPage", JSON.stringify(data));
        alert("Saved Successfully!");
      } catch (e) {
        console.error("Save failed:", e);
      }
    },
  });

  editorInstance.Commands.add("export-project", {
    run() {
      try {
        const data = editorInstance.getProjectData();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "full-design.json";
        a.click();
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error("Export failed:", e);
      }
    },
  });

  editorInstance.Commands.add("import-project", {
    run() {
      const input = document.getElementById("jsonInput");
      if (input) input.click();
      else console.warn("jsonInput element not found for import.");
    },
  });

  // Clean up any remaining references to old 'equation' handlers: do NOT add any 'component:add' or dblclick handlers for 'equation'

  return editorInstance;
};
export default initEditor;
