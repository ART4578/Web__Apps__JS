//Անձնական անվտանգ նշումների հավելված է, որտեղ կարող ես գաղտնաբառով պահպանել նշումներ՝ միայն քեզ հասանելի ձևով։
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

    //Այս մեթոդը տվյալները գաղտնագրում է։
    encrypt(text, password) {
        /*Նշումը և գաղտնաբառը միացնում է ::-ով։
        Այնուհետև՝ կոդավորում է Base64 ֆորմատով։ 
        Օգտագործվում է btoa()՝ Base64 կոդավորման համար։*/
        return btoa(unescape(encodeURIComponent(text + "::" + password)));
    };

    //Սա հակադարձում է encrypt()-ի գործողությունը։
    decrypt(text, password) {
        try {
            const decoded = decodeURIComponent(escape(atob(text))); //Base64 տեքստը վերծանում է atob()-ով։
            const parts = decoded.split("::");

            //Եթե գաղտնաբառը համընկնում է պահպանվածի հետ, վերադարձնում է նշման տեքստը։
            if (parts[1] === password) {
                return parts[0];
            } else { //Հակառակ դեպքում՝ վերադարձնում է null:
                return null;
            };
        } catch (e) {
            return null;
        };
    };

    //Այս մեթոդը՝ Ստանում է նշումը և գաղտնաբառը։
    saveNoteFunc() {
        const note = this.note.value; //ստանում է նշումը:
        const password = this.password.value; //ստանում է գաղտնաբառը։

        //Եթե դատարկ են՝ ցույց է տալիս զգուշացում։
        if (!note || !password) {
            return alert("Խնդրում ենք լրացնել դաշտերը");
        } else { //Հակառակ դեպքում՝ Գաղտնագրում է նշումը։
            const encrypted = this.encrypt(note, password);
            localStorage.setItem("secureNote", encrypted); //Պահպանում է localStorage-ում որպես "secureNote"։
            alert("Նշումը հաջողությամբ պահպանվեց։");
        };
    };

    //Այս մեթոդը՝ Վերցնում է պահված գաղտնագրված նշումը localStorage-ից։
    loadNoteFunc() {
        const password = this.password.value;
        const encrypted = localStorage.getItem("secureNote"); //վերցնում է պահված գաղտնագրված նշումը localStorage-ից

        //Եթե նշում չկա՝ ցույց է տալիս զգուշացում։
        if (!encrypted) {
            return alert("Նշում չի գտնվել։");
        };

        //Փորձում է վերծանել գաղտնաբառով։
        const note = this.decrypt(encrypted, password);

        //Եթե ճիշտ է՝ տեղադրում է textarea-ի մեջ:
        if (note !== null) {
            this.note.value = note;
        } else { //եթե ոչ՝ զգուշացնում է սխալ գաղտնաբառի մասին։
            alert("Սխալ գաղտնաբառ։");
        };
    };

    //Մաքրման մեթոդ է՝ նշման դաշտը մաքրում է։
    clearNoteFunc() {
        this.note.value = "";
    };

    //Այս մեթոդը՝ Ստուգում է՝ նշումը դատարկ է թե ոչ։
    exportNoteFunc() {
        const note = this.note.value;

        //Ստուգում է՝ նշումը դատարկ է թե ոչ:
        if (!note) {
            return alert("Նշումը դատարկ է։");
        };

        //Ստեղծում է Blob՝ տեքստային ֆայլ։
        const blob = new Blob([note], { type: "text/plain" });
        //Ստեղծում է ներբեռնման հղում (a tag)։
        const link = document.createElement("a");
        //Սա բրաուզերի ներկառուցված ֆունկցիա է, որը ստեղծում է ժամանակավոր URL՝ տվյալ բովանդակությունը ներկայացնելու համար։
        link.href = URL.createObjectURL(blob);
        //Ակտիվացնում է ներբեռնումը՝ որպես "my_note.txt"։
        link.download = "my_note.txt";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
};

//Երբ էջը լիովին բեռնվում է՝ ստեղծում է SafeNotes օբյեկտ՝ ակտիվացնելով ամբողջ համակարգը։
document.addEventListener("DOMContentLoaded", () => {
    new SafeNotes();
});