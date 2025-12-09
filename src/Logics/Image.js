export default function MyImage(editorInstance){

editorInstance.DomComponents.addType("my-image", {
    model: {
      defaults: {
        tagName: "img",
        attributes: { src: "https://picsum.photos/300", alt: "image" },
        width: "100",
        height: "50px",
        droppable: false,
        resizable: true,
        traits: [
          "id",
          "title",
          {
            type: "file",
            label: "Upload Image",
            name: "image-file",
            changeProp: 1,
            accept: "image/*",
          },
          { type: "text", name: "alt", label: "Alt Text" },
          { type: "text", name: "width", label: "Width" },
          { type: "text", name: "height", label: "Height" },
          {
            type: "select",
            label: "Object Fit",
            name: "style-object-fit",
            options: [
              { value: "cover", name: "Cover" },
              { value: "contain", name: "Contain" },
              { value: "fill", name: "Fill" },
              { value: "none", name: "None" },
            ],
          },
        ],
      },

      init() {
        this.listenTo(this, "change:image-file", this.handleUpload);
        // sync width/height/object-fit trait changes to attributes/style
        this.listenTo(this, "change:width", () => {
          const v = this.get("width");
          if (v) this.addAttributes({ width: v });
        });
        this.listenTo(this, "change:height", () => {
          const v = this.get("height");
          if (v) this.addAttributes({ height: v });
        });
        this.listenTo(this, "change:style-object-fit", () => {
          const fit = this.get("style-object-fit");
          const el = getModelEl(this);
          if (el) el.style.objectFit = fit || "";
        });
        this.listenTo(this, "change:alt", () => {
          const alt = this.get("alt");
          if (alt !== undefined) this.addAttributes({ alt });
        });
      },

      handleUpload() {
        const file = this.get("image-file");
        if (file && file instanceof File) {
          try {
            const url = URL.createObjectURL(file);
            this.addAttributes({ src: url });
          } catch (e) {
            console.error("image upload error", e);
          }
        }
      },
    },

    view: {
      onRender() {
        // nothing else required
      },
    },
  });
}

