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
import "../Logics/LiveData";
import ThreeDObject from "../Logics/3DObject";
import Mathtype from "../Logics/Mathtype";
import registerWeatherComponent from "../Logics/LiveData";
import MyImage from "../Logics/Image";

let editorInstance = null;

const initEditor = () => {
  if (editorInstance) return editorInstance;

  editorInstance = grapesjs.init({
    container: ".layout-body",
    noticeOnUnload: false,
    fromElement: false,
    width: "100%",
    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      ],
      scripts: ["https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"],
    },

    plugins: [
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

  // Register MathType
  Mathtype(editorInstance);

  // 3D Object plugin
  if (typeof ThreeDObject === "function") ThreeDObject(editorInstance);

  // Weather plugin
  if (typeof registerWeatherComponent === "function")
    registerWeatherComponent(editorInstance);

  // Enable YJS save
  setTimeout(() => {
    try {
      enableYjsLocalSave(editorInstance);
    } catch (e) {}
  }, 100);

  // YJS notice block
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

  // Panels
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

  // -------------------------------------------------
  // 🚀 FIX ADDED: Auto-open Math Keyboard on Drag
  // -------------------------------------------------
  editorInstance.on("component:add", (comp) => {
    if (comp.get("type") === "math-component") {
      setTimeout(() => {
        const editTrait = comp.getTraits().find((t) => t.name === "edit-math");
        if (editTrait && editTrait.command) {
          editTrait.command(editorInstance);
        }
      }, 150);
    }
  });

  return editorInstance;
};

export default initEditor;
