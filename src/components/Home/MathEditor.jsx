import React, { useEffect, useRef, useState } from "react";
import { MathfieldElement } from "mathlive";
import { useEditor } from "../../context/editorContext";
import mathData from "../../utils/math";

const MathEditor = () => {
  const { showModal, setShowModal, latex, setLatex, selectedComponent, setSelectedComponent } = useEditor();
  const mfRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState(mathData?.[0]?.category || "");

  useEffect(() => {
    const mf = new MathfieldElement();
    // mf.setOptions({
    //   virtualKeyboardMode: "off",
    //   smartMode: true,
    //   inlineShortcuts: true,
    // });

    mf.addEventListener("input", () => {
      try {
        setLatex(mf.getValue());
      } catch (e) {
        // ignore
      }
    });

    mfRef.current = mf;
    return () => {
      try {
        mfRef.current = null;
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When modal opens
  useEffect(() => {
    if (!showModal) return;
    if (!containerRef.current || !mfRef.current) return;
    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(mfRef.current);
    try {
      mfRef.current.setValue(latex || "");
    } catch (e) {}
    setTimeout(() => mfRef.current?.focus(), 20);
  }, [showModal, latex]);

  // Insert symbol/latex into mathfield
  const handleInsert = (item) => {
    if (!mfRef.current) return;
    const val = item.latex ?? item.command ?? item.insert ?? item.label ?? "";
    try {
      if (typeof mfRef.current.executeCommand === "function") {
        mfRef.current.executeCommand("insert", val);
      } else if (typeof mfRef.current.insert === "function") {
        mfRef.current.insert(val);
      } else {
        const cur = mfRef.current.getValue?.() ?? "";
        mfRef.current.setValue?.(cur + val);
      }
      setLatex(mfRef.current.getValue?.() ?? val);
      mfRef.current.focus();
    } catch (e) {
      try {
        const cur = mfRef.current.getValue?.() ?? "";
        mfRef.current.setValue?.(cur + val);
        setLatex(mfRef.current.getValue?.() ?? cur + val);
      } catch {}
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedComponent(null);
  };

  const handleSave = () => {
    const newLatex = mfRef.current?.getValue?.() ?? latex;

    if (selectedComponent && typeof selectedComponent.set === "function") {
      selectedComponent.set("attributes", {
        ...(selectedComponent.attributes || {}),
        "data-latex": newLatex,
      });

      const pretty = `<div class="equation-renderer" contenteditable="false" data-latex="${escapeHtml(
        newLatex
      )}">\\[ ${escapeHtml(newLatex)} \\]</div>`;
      selectedComponent.components(pretty);

      try {
        const em = selectedComponent.em;
        if (em && em.trigger) em.trigger("component:update", selectedComponent);
      } catch {}
    }

    setLatex(newLatex);
    setShowModal(false);
    setSelectedComponent(null);
  };

  if (!showModal) return null;

  return (
    <div
      className="modal fade show"
      style={{
        display: "block",
        background: "rgba(0,0,0,0.45)",
        zIndex: 9999,
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Math Editor</h5>
            <button className="btn-close" onClick={handleClose} />
          </div>

          <div className="modal-body">
            {/* Tabs */}
            <div className="math-tabs nav nav-tabs" role="tablist" style={{ marginBottom: 12 }}>
              {mathData.map((group) => (
                <button
                  key={group.category}
                  className={`nav-link math-tab-btn btn btn-sm me-1 ${activeTab === group.category ? "active" : "btn-outline-secondary"}`}
                  onClick={() => setActiveTab(group.category)}
                  type="button"
                >
                  {group.category}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="math-tab-content math-btn">
              {mathData.map((group) => (
                <div
                  key={group.category}
                  className={`tab-pane math-btn ${activeTab === group.category ? "d-block" : "d-none"}`}
                >
                  <div className="math-toolbar d-flex flex-wrap gap-2">
                    {group.items.map((item, i) => (
                      <button
                        key={i}
                        className={`btn btn-sm math-btn ${group.category === "History" ? "btn-outline-secondary" : "btn-outline-primary"} me-1 mb-1`}
                        onClick={() => handleInsert(item)}
                        type="button"
                        title={item.label || item.latex || item.command}
                        dangerouslySetInnerHTML={{
                          __html: item.label && item.label.length > 2 ? escapeHtml(item.label) : escapeHtml(item.label || item.latex || item.command || ""),
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

    
            <div
              ref={containerRef}
              style={{ minHeight: 120, border: "1px solid #e6e6e6", padding: 12, marginTop: 12 }}
            />

            <label className="form-label mt-3">LaTeX</label>
            <textarea
              className="form-control"
              rows={4}
              value={latex}
              onChange={(e) => {
                setLatex(e.target.value);
                try {
                  mfRef.current?.setValue(e.target.value);
                } catch {}
              }}
            />
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={handleSave}>
              Save & Insert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function escapeHtml(str = "") {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export default MathEditor;
