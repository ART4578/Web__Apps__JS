//It's a private, secure note-taking app where you can save notes with a password that only you can access.
class SafeNotes {
    constructor() {
        this.saveNoteBtn = document.getElementById("save__note"); 
        this.loadNoteBtn = document.getElementById("load__note");  
        this.clearNoteBtn = document.getElementById("clear__note");
        this.exportNoteBtn = document.getElementById("export__note"); 
        this.note = document.getElementById("note");
        this.password = document.getElementById("password"); 

        this.initEvents();
    };

    initEvents() {
        this.saveNoteBtn.addEventListener("click", () => this.saveNoteFunc());
        this.loadNoteBtn.addEventListener("click", () => this.loadNoteFunc());
        this.clearNoteBtn.addEventListener("click", () => this.clearNoteFunc());
        this.exportNoteBtn.addEventListener("click", () => this.exportNoteFunc());
    };

    //This method encrypts the data.
    encrypt(text, password) {
        /*The note and password are connected with ::. Then, it is encoded in Base64 format. Uses btoa() for Base64 encoding.*/
        return btoa(unescape(encodeURIComponent(text + "::" + password)));
    };

    //This reverses the operation of encrypt().
    decrypt(text, password) {
        try {
            const decoded = decodeURIComponent(escape(atob(text))); //Decodes Base64 text with atob().
            const parts = decoded.split("::");

            //If the password matches the saved one, returns the note text.
            if (parts[1] === password) {
                return parts[0];
            } else { //Otherwise, it returns null.
                return null;
            };
        } catch (e) {
            return null;
        };
    };

    //This method: Gets the note and password.
    saveNoteFunc() {
        const note = this.note.value; //gets the note:
        const password = this.password.value; //gets the password.

        //If empty, shows a warning.
        if (!note || !password) {
            return alert("Please fill in the fields.");
        } else { //Otherwise, Encrypts the note.
            const encrypted = this.encrypt(note, password);
            localStorage.setItem("secureNote", encrypted); //Saves to localStorage as "secureNote".
            alert("The note was saved successfully.");
        };
    };

    //This method: Retrieves the stored encrypted note from localStorage.
    loadNoteFunc() {
        const password = this.password.value;
        const encrypted = localStorage.getItem("secureNote"); //retrieves the stored encrypted note from localStorage.

        //If there is no note, it shows a warning.
        if (!encrypted) {
            return alert("No note found.");
        };

        //Trying to decrypt with a password.
        const note = this.decrypt(encrypted, password);

        //If true, it inserts it into the textarea.
        if (note !== null) {
            this.note.value = note;
        } else { //if not, it warns about an incorrect password.
            alert("Incorrect password.");
        };
    };

    //It is a clearing method that clears the checkbox.
    clearNoteFunc() {
        this.note.value = "";
    };

    //This method: Checks whether the note is empty or not.
    exportNoteFunc() {
        const note = this.note.value;

        if (!note) return alert("The note is empty."); //Checks whether the note is empty or not.

        const blob = new Blob([note], { type: "text/plain" }); //Creates a Blob, a text file.
        const link = document.createElement("a"); //Creates a download link (a tag).
        link.href = URL.createObjectURL(blob); //This is a built-in browser feature that creates a temporary URL to display the content.
        link.download = "my_note.txt"; //Activates the download as "my_note.txt".

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
};

//When the page is fully loaded, it creates a SafeNotes object, activating the entire system.
document.addEventListener("DOMContentLoaded", () => new SafeNotes());