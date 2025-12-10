export default function Mathtype(editorInstance) {

  // ADD MATH COMPONENT TYPE

  // Ensure katex and mathlive are loaded in page (caller should include scripts)
  // Add math-component
  editorInstance.Components.addType("equation", {
    model: {
      defaults: {
        tagName: "div",
        droppable: false,
        editable: false,
        copyable: true,
        attributes: { class: "math-wrapper" },
        latex: "\\frac{a}{b}",
        components: `<span class="math-output"></span>`,

        script: function () {
          // runs in canvas iframe context when component is rendered
          const el = this;
          const latex = el.getAttribute("data-latex") || "";
          const output = el.querySelector(".math-output");
          if (window.katex && output) {
            try {
              katex.render(latex, output, { throwOnError: false });
            } catch (err) {
              output.textContent = latex;
            }
          } else if (output) {
            output.textContent = latex;
          }
        },

        traits: [
          {
            type: "button",
            label: "Edit Math",
            name: "edit-math",
            // this command runs inside the editor context (not the canvas script)
            command: (editorInstance) => {
              const comp = editorInstance.getSelected();
              if (!comp) return;

              // build modal content
              const container = document.createElement("div");
              container.style.padding = "8px";
              container.innerHTML = `
                <div style="display:flex;flex-direction:column;gap:8px;">
                  <label style="font-size:13px;color:#333">LaTeX Expression</label>
                  <math-field id="mathEditor" style="min-height:40px;padding:8px;border:1px solid #e6e6e6;">${comp.get("latex") || ""}</math-field>
                  <div style="display:flex;gap:8px;justify-content:flex-end;">
                    <button id="cancelMath" style="padding:6px 10px;border-radius:4px;border:1px solid #ccc;background:#fff;">Cancel</button>
                    <button id="saveMath" style="padding:6px 10px;border-radius:4px;border:1px solid #444;background:#222;color:#fff;">Save</button>
                  </div>
                </div>
              `;

              editorInstance.Modal.open({
                title: "Edit Math",
                content: container,
                attributes: { class: "math-editor-modal" },
              });

              // handle cancel
              container.querySelector("#cancelMath").onclick = () => {
                editorInstance.Modal.close();
              };

              // handle save
              container.querySelector("#saveMath").onclick = () => {
                const mathField = container.querySelector("#mathEditor");
                const newLatex = (mathField && mathField.value) || "";

                comp.set("latex", newLatex);
                comp.addAttributes({ "data-latex": newLatex });

                // update canvas visible output if rendered
                try {
                  const viewEl = comp.view && comp.view.el;
                  const outputEl = viewEl ? viewEl.querySelector(".math-output") : null;
                  if (window.katex && outputEl) {
                    katex.render(newLatex, outputEl, { throwOnError: false });
                  } else if (outputEl) {
                    outputEl.textContent = newLatex;
                  }
                } catch (err) {
                  console.log("error on mathtype")
                }

                editorInstance.Modal.close();
              };
            },
          },
        ],
      },

      init() {
        this.on("change:latex", () => this.updateLatex());
      },

      updateLatex() {
        const latex = this.get("latex") || "";
        this.addAttributes({ "data-latex": latex });

        // Try to update rendered output in canvas immediately
        try {
          const output = this.view && this.view.el ? this.view.el.querySelector(".math-output") : null;
          if (window.katex && output) {
            katex.render(latex, output, { throwOnError: false });
          } else if (output) {
            output.textContent = latex;
          }
        } catch (e) {
          // ignore
        }
      },
    },

    view: {
      onRender() {
        const latex = this.model.get("latex") || "";
        const output = this.el.querySelector(".math-output");
        if (output) {
          if (window.katex) {
            try {
              katex.render(latex, output, { throwOnError: false });
            } catch (err) {
              output.textContent = latex;
            }
          } else {
            output.textContent = latex;
          }
        }
      },
    },
  });

  // add math block
  editorInstance.BlockManager.add("equation", {
    label: "Equation",
    category: "Insert",
    content: {
      type: "math-component",
      latex: "\\frac{a}{b}",
      attributes: { "data-latex": "\\frac{a}{b}" },
    },
  });
}