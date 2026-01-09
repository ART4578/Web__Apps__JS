const tabs = document.querySelectorAll(".tab");
const editors = document.querySelectorAll(".editor");
const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const output = document.getElementById("output");

const STORAGE_KEY = "live-editor-data";
const ACTIVE_TAB_KEY = "active-editor-tab";

tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        const tabName = tab.dataset.tab;

        tabs.forEach((t) => t.classList.remove("active"));
        editors.forEach((e) => e.classList.remove("active"));

        tab.classList.add("active");
        document.querySelector(`[data-editor="${tabName}"]`).classList.add("active");

        localStorage.setItem(ACTIVE_TAB_KEY, tabName);
    });
});

function restoreActiveTab() {
    const savedTab = localStorage.getItem(ACTIVE_TAB_KEY) || "html";

    document.querySelector(`[data-tab="${savedTab}"]`).click();
};

restoreActiveTab();

function saveData() {
    const data = {
        html: htmlCode.value,
        css: cssCode.value,
        js: jsCode.value
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

function loadData() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!data) return;

    htmlCode.value = data.html || "";
    cssCode.value = data.css || "";
    jsCode.value = data.js || "";
};

[htmlCode, cssCode, jsCode].forEach((el) => {
    el.addEventListener("input", saveData);
});

loadData();

runEditor();

runBtn.addEventListener("click", runEditor);

function runEditor() {
    const html = htmlCode.value;
    const css = cssCode.value;
    const js = jsCode.value;

    const fullDoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <style>
                ${css}
            </style>
        </head>
        <body>
            ${html}

            <script>
                ${js}
            <\/script>
        </body>
        </html>
    `;

    output.srcdoc = fullDoc;
};

clearBtn.addEventListener("click", () => {
    if (!confirm("Clear all code?")) return;
    htmlCode.value = cssCode.value = jsCode.value = "";
    output.srcdoc = "";
    localStorage.removeItem(STORAGE_KEY);
});

downloadBtn.addEventListener("click", () => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>${cssCode.value}</style>
        </head>
        <body>
            ${htmlCode.value}
            <script>${jsCode.value}<\/script>
        </body>
        </html>`;

    const blob = new Blob([content], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "project.html";
    a.click();
});

copyBtn.addEventListener("click", () => {
    const active = document.querySelector(".editor.active");
    navigator.clipboard.writeText(active.value);
    alert("Code copied!");
});

fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
        output.requestFullscreen();
    } else {
        document.exitFullscreen();
    };
});

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
});