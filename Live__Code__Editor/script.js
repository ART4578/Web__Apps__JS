class LiveCodeEditor {
    constructor() {
        //elements
        this.editor = document.getElementById("editor");
        this.lines = document.getElementById("lines");
        this.tabs = document.querySelectorAll("#codeTabs button");
        this.output = document.getElementById("output");
        this.runBtn = document.getElementById("runBtn");
        this.downloadBtn = document.getElementById("downloadBtn");
        this.copyBtn = document.getElementById("copyBtn");
        this.clearBtn = document.getElementById("clearBtn");
        this.viewTabs = document.querySelectorAll("#viewTabs button");
        this.consoleBox = document.getElementById("console");
        this.toggleThemeBtn = document.getElementById("toggleTheme");

        //data
        this.currentLang = "html";
        this.codeStore = { html: "", css: "", js: "" };
        this.consoleLine = 0;

        //init
        this.init();
    };

    init() {
        this.bindEditorEvents();
        this.bindTabs();
        this.bindViewTabs();
        this.bindRun();
        this.bindThemeToggle();
        this.listenIframeMessages();
        this.updateLines();
        this.downloadBtn.onclick = () => this.download();
        this.copyBtn.onclick = () => this.copyCode();
        this.clearBtn.onclick = () => this.clearCode();
    };

    //copy
    copyCode() {
        const code = this.codeStore[this.currentLang];

        if (!navigator.clipboard) {
            const textarea = document.createElement("textarea");
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            this.logToConsole("Copied to clipboard!");
            return;
        };

        navigator.clipboard.writeText(code)
            .then(() => this.logToConsole("Copied to clipboard!"))
            .catch(err => this.logToConsole("Copy failed: " + err, "error"));
    };

    //clear
    clearCode() {
        this.codeStore[this.currentLang] = ""; 
        this.editor.value = "";                
        this.updateLines();                   
        this.logToConsole(this.currentLang.toUpperCase() + " code cleared.");
    };

    //line numbers
    updateLines() {
        const count = this.editor.value.split("\n").length;
        this.lines.innerHTML = "";

        for (let i = 1; i <= count; i++) {
            const div = document.createElement("div");
            div.textContent = i;
            this.lines.appendChild(div);
        };

        this.highlightActiveLine();
    };

    highlightActiveLine() {
        const lineIndex = this.editor.value.substr(0, this.editor.selectionStart).split("\n").length - 1;

        [...this.lines.children].forEach((l, i) => {
            l.classList.toggle("active", i === lineIndex);
        });
    };

    //editor events
    bindEditorEvents() {
        this.editor.addEventListener("input", () => {
            let filteredCode;

            if (this.currentLang === "html") filteredCode = this.filterHTMLOnly(this.editor.value);
            if (this.currentLang === "css") filteredCode = this.filterCSSOnly(this.editor.value);
            if (this.currentLang === "js") filteredCode = this.filterJSOnly(this.editor.value);

            this.codeStore[this.currentLang] = filteredCode;
            this.editor.value = filteredCode;
            this.updateLines();
        });

        this.editor.addEventListener("scroll", () => {
            this.lines.scrollTop = this.editor.scrollTop;
        });

        this.editor.addEventListener("click", () => this.highlightActiveLine());
        this.editor.addEventListener("keyup", () => this.highlightActiveLine());
    };

    //The user can only write code in English in HTML, CSS, and JS.
    filterCodeASCIIOnly(code) {
        const stringRegex = /(["'`])(?:\\.|(?!\1).)*\1/g; 
        const commentRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g; 

        let protectedSegments = [];
        let tempCode = code;

        tempCode = tempCode.replace(stringRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(commentRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(/[^\x00-\x7F]/g, "");
        tempCode = tempCode.replace(/___SEG(\d+)___/g, (_, index) => protectedSegments[index]);

        return tempCode;
    };

    //In HTML, only HTML code.
    filterHTMLOnly(code) {
        const stringRegex = /(["'`])(?:\\.|(?!\1).)*\1/g;
        const commentRegex = /(<!--[\s\S]*?-->)/g;

        let protectedSegments = [];
        let tempCode = code;

        tempCode = tempCode.replace(stringRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(commentRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
        tempCode = tempCode.replace(/\son\w+=(["']).*?\1/gi, "");
        tempCode = tempCode.replace(/[^\x00-\x7F<>/=\s\w"-]/g, "");
        tempCode = tempCode.replace(/___SEG(\d+)___/g, (_, i) => protectedSegments[i]);

        return tempCode;
    };

    //In CSS, only CSS code.
    filterCSSOnly(code) {
        const stringRegex = /(["'`])(?:\\.|(?!\1).)*\1/g;
        const commentRegex = /(\/\*[\s\S]*?\*\/)/g;

        let protectedSegments = [];
        let tempCode = code;

        tempCode = tempCode.replace(stringRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(commentRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(/[^\x00-\x7F{}:;.#\-\w\s,%]/g, "");
        tempCode = tempCode.replace(/___SEG(\d+)___/g, (_, i) => protectedSegments[i]);

        return tempCode;
    };

    //In JS, only JS code.
    filterJSOnly(code) {
        const stringRegex = /(["'`])(?:\\.|(?!\1).)*\1/g;
        const commentRegex = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;

        let protectedSegments = [];
        let tempCode = code;

        tempCode = tempCode.replace(stringRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(commentRegex, (m) => {
            protectedSegments.push(m);
            return `___SEG${protectedSegments.length-1}___`;
        });

        tempCode = tempCode.replace(/[^\x00-\x7F\s\w\d{}()[\];,.:<>=+\-*/%&|!?~^"'`]/g, "");

        tempCode = tempCode.replace(/___SEG(\d+)___/g, (_, i) => protectedSegments[i]);

        return tempCode;
    };

    //download
    download() {
        const zip = new JSZip();

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>My Project</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                ${this.codeStore.html}

                <script src="script.js"></script>
            </body>
            </html>
        `;

        zip.file("index.html", htmlContent);
        zip.file("style.css", this.codeStore.css);
        zip.file("script.js", this.codeStore.js);

        zip.generateAsync({ type: "blob" })
            .then((content) => {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(content);
                a.download = "project.zip";
                a.click();
                URL.revokeObjectURL(a.href);
            });
    };

    //code tabs
    bindTabs() {
        this.tabs.forEach((btn) => {
            btn.onclick = () => {
                this.tabs.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                this.codeStore[this.currentLang] = this.editor.value;
                this.currentLang = btn.dataset.lang;
                this.editor.value = this.codeStore[this.currentLang];

                this.updateLines();
            };
        });
    };

    //view tabs
    bindViewTabs() {
        this.viewTabs.forEach((btn) => {
            btn.onclick = () => {
                this.viewTabs.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");

                this.output.style.display = btn.dataset.view === "output" ? "block" : "none";
                this.consoleBox.style.display = btn.dataset.view === "console" ? "block" : "none";
            };
        });
    };

    //console
    clearConsole() {
        this.consoleBox.innerHTML = "";
        this.consoleLine = 0;
    };

    logToConsole(message, type = "log") {
        this.consoleLine++;

        const row = document.createElement("div");

        const num = document.createElement("span");
        num.className = "line-number";
        num.textContent = this.consoleLine;

        const text = document.createElement("span");
        text.textContent = message;

        if (type === "error") text.classList.add("error");

        row.appendChild(num);
        row.appendChild(text);
        this.consoleBox.appendChild(row);

        this.consoleBox.scrollTop = this.consoleBox.scrollHeight;
    };

    listenIframeMessages() {
        window.addEventListener("message", (e) => {
            if (e.data.type === "log") this.logToConsole(e.data.message);
            if (e.data.type === "error") this.logToConsole(e.data.message, "error");
        });
    };

    //validate
    validateJS() {
        try {
            new Function(this.codeStore.js);
            return true;
        } catch (e) {
            this.logToConsole(e.message, "error");
            this.highlightErrorLine(e.message);
            return false;
        };
    };

    //run
    bindRun() {
        this.runBtn.onclick = () => this.runCode();
    };

    runCode() {
        this.codeStore[this.currentLang] = this.editor.value;
        this.clearConsole();

        if (!this.validateJS()) {
            return;
        };

        const cssBlob = new Blob([this.codeStore.css], { type: "text/css" });
        const cssURL = URL.createObjectURL(cssBlob);

        const jsBlob = new Blob([this.codeStore.js], { type: "text/javascript" });
        const jsURL = URL.createObjectURL(jsBlob);

        const bridgeJS = `
            const send = (t, m) => parent.postMessage({ type: t, message: m }, "*");

            console.log = (...a) => send("log", a.join(" "));
            console.error = (...a) => send("error", "Error: " + a.join(" "));

            window.onerror = (message, source, line, col) => {
                send("error", message + " (line " + line + ")");
            };
        `;

        const bridgeBlob = new Blob([bridgeJS], { type: "text/javascript" });
        const bridgeURL = URL.createObjectURL(bridgeBlob);

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <link rel="stylesheet" href="${cssURL}">
            </head>
            <body>
                ${this.codeStore.html}

                <script src="${bridgeURL}"></script>
                <script src="${jsURL}"></script>
            </body>
            </html>
        `;

        const iframe = document.createElement("iframe");
        iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");

        this.output.innerHTML = "";
        iframe.srcdoc = htmlContent;
        this.output.appendChild(iframe);
    };

    //theme
    bindThemeToggle() {
        this.toggleThemeBtn.onclick = () => {
            document.body.classList.toggle("light");
        };
    };
};

new LiveCodeEditor();