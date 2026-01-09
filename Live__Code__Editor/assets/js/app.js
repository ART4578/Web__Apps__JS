const htmlCode = document.getElementById("htmlCode");
const cssCode = document.getElementById("cssCode");
const jsCode = document.getElementById("jsCode");
const runBtn = document.getElementById("runBtn");
const clearBtn = document.getElementById("clearBtn");
const downloadBtn = document.getElementById("downloadBtn");
const copyBtn = document.getElementById("copyBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const output = document.getElementById("output");

const STORAGE_KEY = "live-editor-data";

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

runBtn.addEventListener("click", runEditor);

function runEditor() {
    const html = htmlCode.value;
    const css = `<style>${cssCode.value}</style>`;
    const js = `<script>${jsCode.value}<\/script>`;
    output.srcdoc = html + css + js;
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