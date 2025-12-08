// SVG ICONS (Keep as is)
const svgText = `<svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5"/></svg>`;
const svgImage = `<svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="currentColor" d="M21 19V5C21 3.89 20.1 3 19 3H5C3.9 3 3 3.89 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19M8.5 13.5L11 16.5L14.5 12L19 18H5L8.5 13.5Z"/></svg>`;
const svgHeading = `<svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4V20H5V13H11V20H13V4H11V11H5V4H3Z"/></svg>`;
const svgColumn = `<svg style="width:18px;height:18px" viewBox="0 0 24 24"><rect x="3" y="4" width="7" height="16" fill="currentColor"/><rect x="14" y="4" width="7" height="16" fill="currentColor"/></svg>`;
const svgMap = svgImage;
const svgQuote = svgText;

const svgGraph = `<svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="currentColor" d="M21 21H3V3H5V19H21V21M17 17H15V7H17V17M13 17H11V11H13V17M7 17H9V14H7V17Z"/></svg>`;
const svgGeometry = `<svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11V3H18V5H22V7H18V9H22V11H18V13H22V15H18V17H22V19H18V21H16V13L12 17L5.5 10.5C5.1 10.9 4.6 11.1 4 11.1C3.4 11.1 2.9 10.9 2.5 10.5C1.7 9.7 1.7 8.3 2.5 7.5C2.9 7.1 3.4 6.9 4 6.9C4.6 6.9 5.1 7.1 5.5 7.5L12 14L16 10V3Z"/></svg>`;
const svgSpacing = `<svg style="width:18px;height:18px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,15H5V13H19V15M19,9H5V11H19V9M19,19H5V17H19V19M19,5H5V3H19V5Z"/></svg>`;

// Import icons (Keep as is)
import textIcon from "../assets/icons/text.svg?raw";
import tableIcon from "../assets/icons/table.svg?raw";
import pictureIcon from "../assets/icons/picture.svg?raw";
import videoIcon from "../assets/icons/video.svg?raw";
import audioIcon from "../assets/icons/audio.svg?raw";
import shapesIcon from "../assets/icons/shapes.svg?raw";
import mathIcon from "../assets/icons/math.svg?raw";
import LiveData from "../assets/icons/live.svg?raw";
import QAIcon from "../assets/icons/QA.svg?raw";
import explainIcon from "../assets/icons/explain.svg?raw";

// =============================
// FULL BLOCKS LIST
// =============================

export const fileMenuItems = [
  {
    id: "go-to",
    label: "Go to",
    category: "File",
    media: "GoToIcon",
    command: "goTo",
    hasSubMenu: true,
  },
  {
    id: "info",
    label: "Info",
    category: "File",
    media: "InfoIcon",
    command: "showInfo",
  },
  {
    id: "open",
    label: "Open",
    category: "File",
    media: "OpenIcon",
    command: "openFile",
  },
  {
    id: "auto-save",
    label: "Auto Save",
    category: "File",
    media: "AutoSaveIcon",
    command: "toggleAutoSave",
    toggle: true,
    initialState: true,
  },
  {
    id: "view",
    label: "View",
    category: "File",
    media: "ViewIcon",
    command: "showViewOptions",
  },
  {
    id: "extensions",
    label: "Extensions",
    category: "File",
    media: "ExtensionsIcon",
    command: "showExtensions",
  },
  {
    id: "library",
    label: "Library",
    category: "File",
    media: "LibraryIcon",
    command: "openLibrary",
  },
];

const blocks = [
  // Yjs Collaboration (Keep as is)

  // Standard Blocks (Keep as is)
  {
    id: "text",
    label: "Text",
    category: "Insert",
    media: textIcon,
    editalbe: true,
    dragable: true,
    content: { type: "text", content: "Insert your text" },
  },
  {
    id: "table",
    label: "Table",
    category: "Insert",
    media: tableIcon,
    editalbe: true,
    dragable: true,
    content: `
          <table class="table">
            <tr><th>Head 1</th><th>Head 2</th></tr>
            <tr><td>Cell 1</td><td>Cell 2</td></tr>
          </table>
        `,
  },
  {
    id: "heading",
    label: "Heading",
    category: "Insert",
    editalbe: true,
    dragable: true,
    media: svgHeading,
    content: "<h1>Heading Text</h1>",
  },
  {
    id: "shape-triangle",
    label: "Shape",
    category: "Insert",
    media: shapesIcon,
    editalbe: true,
    dragable: true,
    content: `<div style="width:0;height:0;border-left:60px solid transparent;border-right:60px solid transparent;border-bottom:100px solid #f1c40f;"></div>`,
  },
  {
    id: "image",
    label: "Picture",
    category: "Insert",
    media: pictureIcon,
    editalbe: true,
    dragable: true,
    content: { type: "image" },
  },
  {
    id: "audio",
    label: "Audio",
    category: "Insert",
    editalbe: true,
    dragable: true,
    media: audioIcon,
    content: `<audio controls><source src="audio-file.mp3" type="audio/mpeg">Your browser does not support the audio element.</audio>`,
  },
  {
    id: "video-device",
    content: { type: "video-device" },
    category: "Insert",
    media: videoIcon,
    editalbe: true,
    dragable: true,
    content: {
      type: "video",
      src: "https://www.youtube.com/embed/VIDEO_ID",
    },
  },
  // {
  //   id: "live-data",
  //   label: "Live Data",
  //   category: "Insert",
  //   media: LiveData,
  //   editalbe: true,
  //   dragable: true,

  //   content: `<div class="live-data-stock" style="padding: 10px; border: 1px solid #ccc; background: #f9f9f9; text-align: center;">
  //           <p style="margin-bottom: 5px; font-weight: bold;">Ticker: FAKE</p>
  //           <h2 class="stock-price" style="margin: 0; color: #16a085;">$150.45</h2>
  //           <small class="stock-change" style="color: green;">+2.15 (1.45%)</small>
  //           <p style="margin-top: 5px; font-size: 10px;">(API integration required for real-time data)</p>
  //       </div>`
  //   ,
  // },

  {
    id: "Live-data",
    label: "Live-data",
    category: "Insert",
    media: LiveData,
    editalbe: true,
    dragable: true,
    content: {
      type: "Live-data",   // FIXED
      created: true
    }
  },



  // Equation Block (For LaTeX)
  {
    id: "equation-block",
    label: "Equation",
    category: "Insert",
    media: mathIcon,
    editalbe: true,
    dragable: true,
    content: {
      type: "equation",
      // placeholder content — the actual latex will be added via modal
      components: `<div class="math-placeholder" contenteditable="false">Double-click or drop to edit equation</div>`,
    },
  },

  {
    id: "qa-block",
    label: "Q & A",
    category: "Insert",
    editalbe: true,
    dragable: true,
    media: QAIcon,
    content: `
        <div class="qa-block" style="padding: 15px; border: 1px dashed #9b59b6; background: #f5eef8;">
            <div class="question" style="font-weight: bold; margin-bottom: 10px;">
                Q: Your question here?
            </div>
            <div class="answer" style="margin-left: 10px;">
                A: Your answer here...
            </div>
            <p style="font-size: 10px; margin-top: 10px; color: #999;">(Double-click to edit question or answer)</p>
        </div>
    `,
  },

  // --- NEW: Explanation Block ---
  {
    id: "explanation-block",
    label: "Explanation",
    category: "Insert",
    media: explainIcon,
    editalbe: true,
    dragable: true,
    content: `
        <div class="explanation-block" style="padding: 15px; border: 1px dashed #e67e22; background: #fff4e6;">
            <p style="font-weight: bold; margin-bottom: 10px;">Explanation:</p>
            <p style="margin-left: 10px;">Provide a detailed explanation or description here...</p>
            <p style="font-size: 10px; margin-top: 10px; color: #999;">(Double-click to edit content)</p>
        </div>
    `,
  },

  // TYPOGRAPHY
  {
    id: "quote",
    label: "Quote",
    category: "Insert",
    editalbe: true,
    dragable: true,
    media: svgQuote,
    content: "<blockquote>Quote text here</blockquote>",
  },

  // LAYOUT - *** CORRECTED SECTION ***
  {
    id: "1column",
    label: "1 Column",
    category: "Insert",
    media: svgColumn,
    editalbe: true,
    dragable: true,
    content: {
      type: "div",
      classes: ["row"],
      components: [
        {
          type: "div",
          classes: ["col"],
          droppable: true,
          components: [{ type: "text", content: "1 Column Content" }],
        },
      ],
    },
  },
  {
    id: "two-column",
    content: { type: "two-column" },
    category: "Insert",
    media: svgColumn,
    editalbe: true,
    dragable: true,
    content: {
      type: "div",
      classes: ["row"],
      components: [
        {
          type: "div",
          classes: ["col-6"],
          droppable: true,
          components: [{ type: "text", content: "Left" }],
        },
        {
          type: "div",
          classes: ["col-6"],
          droppable: true,
          components: [{ type: "text", content: "Right" }],
        },
      ],
    },
  },
  {
    id: "3column",
    label: "3 Columns",
    category: "Insert",
    media: svgColumn,
    editalbe: true,
    dragable: true,
    content: {
      type: "div",
      classes: ["row"],
      components: [
        {
          type: "div",
          classes: ["col-4"],
          droppable: true,
          components: [{ type: "text", content: "Col 1" }],
        },
        {
          type: "div",
          classes: ["col-4"],
          droppable: true,
          components: [{ type: "text", content: "Col 2" }],
        },
        {
          type: "div",
          classes: ["col-4"],
          droppable: true,
          components: [{ type: "text", content: "Col 3" }],
        },
      ],
    },
  },
  // --- NEW: Spacing Block ---


  // MEDIA (Keep as is)
  {
    id: "map",
    label: "Map",
    category: "Insert",
    media: svgMap,
    content: `<iframe width="100%" height="250" src="https://maps.google.com/maps?q=Coimbatore&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>`,
  },

  // --- CUSTOM BLOCKS ---

  // --- NEW: Graph Block ---
  {
    id: "graph-block",
    label: "Graph",
    category: "Insert",
    media: svgGraph,
    content: `
            <div class="chart-container" style="width: 100%; height: 300px; padding: 10px; border: 1px dashed #e74c3c;">
                <canvas class="my-chart" style="background: #ecf0f1;"></canvas>
                <p style="text-align: center; font-size: 10px;">(Chart library initialization required)</p>
            </div>
        `,
  },

  // --- NEW: Geometry Block ---
  {
    id: "geometry-block",
    label: "Geometry",
    category: "Insert",
    editalbe: true,
    dragable: true,
    media: svgGeometry,
    content: `
            <div class="geometry-viewer" style="width: 100%; height: 300px; padding: 10px; border: 1px dashed #3498db; background: #f0f4f7; text-align: center;">
                <p style="padding-top: 100px;">Interactive 3D/2D Geometry Placeholder</p>
                <p style="font-size: 10px;">(3D/2D rendering library required)</p>
            </div>
        `,
  },

  {
    id: "yjs-collab",
    label: "Yjs Collaboration",
    category: "Insert",
    media: `<svg style="width:18px;height:18px" viewBox="0 0 24 24">
               <path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Z"/>
             </svg>`,
    content: {
      type: "yjs-collab",
    },
  },


  {
    id: "3d-object",
    label: "3d Object",
    category: "Insert",
    editalbe: true,
    dragable: true,
    media: svgGeometry,
    content: {
      type: "three-device",
      attributes: {
        src: "https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Duck/glTF-Binary/Duck.glb"
      },
    }
  },




];

export default blocks;

