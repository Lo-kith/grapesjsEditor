
  // --------------------------
  // VIDEO COMPONENT TYPE
  // --------------------------
  editorInstance.DomComponents.addType("video-device", {
    model: {
      defaults: {
        tagName: "video",
        attributes: { controls: true },
        droppable: false,
        editable: false,
        resizable: true,
        traits: [
          "id",
          "title",
          {
            type: "file",
            label: "Upload Video",
            name: "video-file",
            changeProp: 1,
            accept: "video/*",
          },
          { type: "checkbox", label: "Autoplay", name: "autoplay", changeProp: 1 },
          { type: "checkbox", label: "Loop", name: "loop", changeProp: 1 },
          { type: "checkbox", label: "Muted", name: "muted", changeProp: 1 },
        ],
      },

      initialize() {
        // Listen for trait changes
        this.listenTo(this, "change:video-file", this.handleUpload);
        this.listenTo(this, "change:autoplay", this.updateVideoAttrs);
        this.listenTo(this, "change:loop", this.updateVideoAttrs);
        this.listenTo(this, "change:muted", this.updateVideoAttrs);
        // apply any initial trait values to attributes
        this.updateVideoAttrs();
      },

      handleUpload() {
        const file = this.get("video-file");
        if (file && file instanceof File) {
          try {
            const url = URL.createObjectURL(file);
            // Use set to ensure trait->attr sync
            this.addAttributes({ src: url });
          } catch (e) {
            console.error("video-device upload error", e);
          }
        }
      },

      updateVideoAttrs() {
        // Checkbox traits usually become true/false; if undefined -> false
        const autoplay = !!this.get("autoplay");
        const loop = !!this.get("loop");
        const muted = !!this.get("muted");

        const attrs = {};
        if (autoplay) attrs.autoplay = true;
        else attrs.autoplay = undefined;

        if (loop) attrs.loop = true;
        else attrs.loop = undefined;

        if (muted) attrs.muted = true;
        else attrs.muted = undefined;

        // apply attributes; using addAttributes so Grapes will reflect them
        this.addAttributes(attrs);
      },
    },

    view: {
      onRender({ model } = {}) {
        // no-op: video element will render with attributes from model
      },
    },
  });
