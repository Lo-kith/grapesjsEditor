  // --------------------------
  // TEXT COMPONENT TYPE
  // --------------------------
  editorInstance.DomComponents.addType("text", {
    model: {
      defaults: {
        tagName: "div",
        draggable: true,
        droppable: false,
        editable: true,
        components: "Edit text",
        style: { fontSize: "16px", color: "#000" },
        traits: [
          "id",
          "title",
          {
            type: "select",
            label: "Font Size",
            name: "style-font-size",
            options: [
              { value: "12px", name: "Small" },
              { value: "16px", name: "Normal" },
              { value: "20px", name: "Medium" },
              { value: "24px", name: "Large" },
              { value: "32px", name: "Extra Large" },
            ],
          },
        ],
      },

      init() {
        // Listen to 'component:toggled' to attach Tab handler only when editing
        this.on("component:toggled", () => {
          const textEl = getModelEl(this);
          if (!textEl) return;
          try {
            // contentEditable property may be "true" or true
            if (textEl.contentEditable === "true" || textEl.isContentEditable) {
              // add if not already added
              if (!textEl.__tabHandlerAdded) {
                textEl.addEventListener("keydown", handleTabKey);
                textEl.__tabHandlerAdded = true;
              }
            } else {
              // remove if present
              if (textEl.__tabHandlerAdded) {
                textEl.removeEventListener("keydown", handleTabKey);
                textEl.__tabHandlerAdded = false;
              }
            }
          } catch (e) {
            // ignore
          }
        });

        // Cleanup when removed
        this.on("destroy", () => {
          const el = getModelEl(this);
          if (el && el.__tabHandlerAdded) {
            el.removeEventListener("keydown", handleTabKey);
            el.__tabHandlerAdded = false;
          }
        });
      },
    },

    view: {
      // Keep default rendering behavior
    },
  });