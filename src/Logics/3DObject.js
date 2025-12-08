export default function ThreeObject(editorInstance) {

  // COMPONENT TYPE
  editorInstance.DomComponents.addType("three-device", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "three-model-box" },
        components: `<div class="three-model">3D Model Viewer</div>`,
        droppable: false,
        editable: false,
        copyable: true,
        highlightable: true,
        resizable: true,
        stylable: true,
        traits: [
          {
            type: "text",
            name: "modelSrc",
            label: "Model URL",
            changeProp: true,
          },
        ],
      },

      init() {
        this.on("change:modelSrc", this.updateModel);
      },

      updateModel() {
        const url = this.get("modelSrc");
        const el = this.getEl();
        if (!el) return;

        if (!url) {
          el.innerHTML = `<div>Drop / Set 3D Model URL...</div>`;
          return;
        }

        el.innerHTML = `
          <model-viewer 
            src="${url}" 
            camera-controls 
            auto-rotate 
            style="width:100%; height:400px;">
          </model-viewer>
        `;
      },
    },

    view: {
      onRender() {
        const url = this.model.get("modelSrc");
        this.model.updateModel(url);
      }
    }
  });

  // BLOCK (MOVE IT INSIDE)
  editorInstance.BlockManager.add("three-device", {
    label: "3D Object",
    category: "Insert",
    content: {
      type: "three-device",
      created: true,
    },
  });
}
