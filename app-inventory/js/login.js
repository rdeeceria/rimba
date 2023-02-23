class Login {
    constructor() {
        this.form = document.querySelector('form')
        this.fields = ['username', 'password']
        this.validateOnSubmit()
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector(".invalid-feedback");

        if (status == 'success') {
            if (errorMessage) {
                field.classList.remove('is-invalid')
                errorMessage.innerText = ''
            }
        }

        if (status == 'error') {
            field.classList.add('is-invalid')
            errorMessage.innerText = message
        }
    }

    validateOnSubmit() {
        let self = this

        this.form.addEventListener("submit", (e) => {
            e.preventDefault()
            var error = 0

            self.fields.forEach((field) => {
                const input = document.querySelector(`#${field}`)

                if (self.validateFields(input) == false) {
                    error++;
                }
            });

            if (error == 0) {
                const username = document.querySelector(`#username`)

                localStorage.setItem("auth", username.value)
                this.form.submit()
                //window.location.reload()
            }
        });
    }

    validateFields(field) {
        if (field.value.trim() === "") {
            this.setStatus(
                field,
                'Tidak boleh kosong',
                'error'
            );

            return false;
        } else {
            if (field.type == "password") {
                if (field.value.length < 6) {
                    this.setStatus(
                        field,
                        'Minimal terdiri dari 6 karakter',
                        'error'
                    );

                    return false;
                } else {
                    this.setStatus(field, null, "success");
                    return true;
                }
            } else {
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }
}
