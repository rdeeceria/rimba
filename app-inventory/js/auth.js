class Auth {
    constructor() {
        const auth = localStorage.getItem("auth");
        this.validateAuth(auth);
        this.author(auth);
    }

    validateAuth(auth) {
        let self = this

        if (auth == "") {
            window.location.replace("index.html");
        }
    }

    author(auth) {
        document.querySelector('#avatarname').innerHTML = auth
    }

    logOut() {
        localStorage.removeItem("auth");
        window.location.replace("index.html");
    }
}

const auth = new Auth()
document.querySelector('#logout').addEventListener("click", (e) => {
    auth.logOut();
});