export default function ThreeDObject(editorInstance) {

  // COMPONENT TYPE
  // editorInstance.DomComponents.addType("three-device", {
  //   model: {
  //     defaults: {
  //       tagName: "div",
  //       attributes: { class: "three-model-box" },
  //       components: `<div class="three-model">3D Model Viewer</div>`,
  //       droppable: false,
  //       editable: false,
  //       copyable: true,
  //       highlightable: true,
  //       resizable: true,
  //       stylable: true,
  //       traits: [
  //         {
  //           type: "text",
  //           name: "modelSrc",
  //           label: "Model URL",
  //           changeProp: true,
  //         },
  //       ],
  //     },

  //     init() {
  //       this.on("change:modelSrc", this.updateModel);
  //     },

  //     updateModel() {
  //       const url = this.get("modelSrc");
  //       const el = this.getEl();
  //       if (!el) return;

  //       if (!url) {
  //         el.innerHTML = `<div>Drop / Set 3D Model URL...</div>`;
  //         return;
  //       }

  //       el.innerHTML = `
  //         <model-viewer 
  //           src="${url}" 
  //           camera-controls 
  //           auto-rotate 
  //           style="width:100%; height:400px;">
  //         </model-viewer>
  //       `;
  //     },
  //   },

  //   view: {
  //     onRender() {
  //       const url = this.model.get("modelSrc");
  //       this.model.updateModel(url);
  //     }
  //   }
  // });

 editorInstance.DomComponents.addType("three-device", {
    model: {
      defaults: {
        tagName: "div",
        attributes: { class: "threeviewer" },
        droppable: false,
        resizable: true,
        stylable: true,
        style: {
          width: "100%",
          height: "400px",
          padding: "10px",
          border: "1px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        traits: [
          "id",
          "title",
          {
            type: "file",
            label: "Upload 3D Model (.glb/.gltf)",
            name: "model-file",
            changeProp: 1,
            accept: ".glb,.gltf",
          },
        ],
      },

      init() {
        this.listenTo(this, "change:model-file", this.handleUpload);

        // Add a <model-viewer> child component for preview
        const mv = this.components().add({
          tagName: "model-viewer",
          attributes: {
            src:
              "https://storage.googleapis.com/search-ar-edu/periodic-table/element_003_lithium/element_003_lithium.glb",
            "camera-controls": true,
            "auto-rotate": true,
            style: "width:100%;height:100%;",
          },
        });

        this.modelViewer = mv;
      },

      handleUpload() {
        const file = this.get("model-file");
        if (file && file instanceof File) {
          try {
            const url = URL.createObjectURL(file);
            if (this.modelViewer) {
              // update the model-viewer child src attribute
              this.modelViewer.addAttributes({ src: url });
            }
          } catch (e) {
            console.error("3d model upload error", e);
          }
        }
      },
    },

    view: {
      onRender() {
        // If you need to include <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
        // add it to canvas scripts on editor initialization (not here).
      },
    },
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
