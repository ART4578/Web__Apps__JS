function run() {
    let htmlCode = document.getElementById("html__code").value;
    let cssCode = document.getElementById("css__code").value;
    let jsCode = document.getElementById("js__code").value;
    let output = document.getElementById("output");

    output.contentDocument.body.innerHTML = htmlCode+"<style>"+cssCode+"</style>";
    output.contentWindow.eval(jsCode);
};