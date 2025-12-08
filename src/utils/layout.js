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

import registerWeatherComponent from '../Logics/LiveData'

let editorInstance = null;

const initEditor = () => {
  if (editorInstance) return editorInstance;

  editorInstance = grapesjs.init({
    container: ".layout-body",
    noticeOnUnload: false,
    fromElement: false,
    storageManager: false,
    width: "100%",
    canvas: {
      styles: [
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
      ],
    },

    plugins: [
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
  
 
  ThreeDObject(editorInstance);
  registerWeatherComponent(editorInstance);

  
  // Enable YJS collaboration
  setTimeout(() => {
    enableYjsLocalSave(editorInstance);
  }, 100); // Add YJS Collaboration Block

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

  // Calculation Mathtype
  editorInstance.Components.addType("equation", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "equation-block" },
        droppable: false,
        selectable: true,
        editable: false,
        copyable: true,
        highlightable: true,
        components: `<div class="math-placeholder" contenteditable="false">Double-click or drop to edit equation</div>`,
      },
    },
    view: {
      onRender({ el, model }) {
        // Render existing data-latex if set
        const attr = model.getAttributes() || {};
        if (attr["data-latex"]) {
          el.innerHTML = `<div class="equation-renderer" data-latex="${attr["data-latex"]}">\\[ ${attr["data-latex"]} \\]</div>`;
        }
      },
    },
  });

  // When a new component is added (block dropped), open modal if it's equation type
  editorInstance.on("component:add", (component) => {
    const type = component.get("type");
    if (
      type === "equation" ||
      component.attributes?.attributes?.["data-block-id"] === "equation-block"
    ) {
      const existing =
        (component.getAttributes && component.getAttributes()["data-latex"]) ||
        "";
      if (
        window.__EDITOR_CTX__ &&
        typeof window.__EDITOR_CTX__.openModal === "function"
      ) {
        window.__EDITOR_CTX__.openModal(component, existing);
      } else {
        component.set("attributes", {
          ...(component.attributes || {}),
          "data-latex": existing || "",
        });
      }
    }
  });

  // Also open modal when user double-clicks component in canvas (optional)
  editorInstance.on("component:dblclick", (component) => {
    const type = component.get("type");
    if (type === "equation") {
      const existing =
        (component.getAttributes && component.getAttributes()["data-latex"]) ||
        "";
      if (
        window.__EDITOR_CTX__ &&
        typeof window.__EDITOR_CTX__.openModal === "function"
      ) {
        window.__EDITOR_CTX__.openModal(component, existing);
      }
    }
  });

  const pn = editorInstance.Panels;
  const panelViews = pn.addPanel({ id: "options" });

  panelViews.get("buttons").add([
//     {
//       id: "ruler-visibility",
//       active: 1,
//       attributes: { title: "Toggle Rulers" },
//       context: "toggle-rulers",
//       command: "ruler-visibility",
//       label: `
//         <svg width="18" viewBox="0 0 16 16">
//           <path d="M0 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5A.5.5 0 0 1 0 8z"/>
//         </svg>
//       `,
//     },
  


  {
    id: "save-project",
    attributes: { title: "Save Project" },
    command: "save-project",
    label: `
      💾
    `,
  },
  {
    id: "export-project",
    attributes: { title: "Export Project" },
    command: "export-project",
    label: `
      📤
    `,
  },
  {
    id: "import-project",
    attributes: { title: "Import Project" },
    command: "import-project",
    label: `
      📥
    `,
  }
    
  ]);

  editorInstance.DomComponents.getType('weather')
  // other
  editorInstance.Commands.add("save-project", {
  run() {
    const data = editorInstance.getProjectData();
    localStorage.setItem("MyPage", JSON.stringify(data));
    alert("Saved Successfully!");
  }
});

editorInstance.Commands.add("export-project", {
  run() {
    const data = editorInstance.getProjectData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "full-design.json";
    a.click();
  }
});

editorInstance.Commands.add("import-project", {
  run() {
    document.getElementById("jsonInput").click();
  }
});



  return editorInstance;
};

export default initEditor;
