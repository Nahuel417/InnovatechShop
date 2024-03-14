const validacionExtension = (input) => {
    const fileExtension = input.split(".")[1];
    if (fileExtension) {
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        return acceptedExtensions.includes(fileExtension)
    } else{ 
        return true
    }
}

let timeOutID;

const inputValidations = [
    {
        inputName: "nombre",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El nombre es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 2}),
                errorMsg: "El nombre es muy corto"
            }
        ]
    },
    {
        inputName: "apellido",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El apellido es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 2}),
                errorMsg: "El apellido es muy corto"
            }
        ]
    },
    {
        inputName: "nombre",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El nombre es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 2}),
                errorMsg: "El nombre es muy corto"
            }
        ]
    },
    {
        inputName: "apellido",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El apellido es obligatorio"
            },
            {
                validator: (input) => validator.isLength(input, {min: 2}),
                errorMsg: "El apellido es muy corto"
            }
        ]
    },
    {
        inputName: "email",
        type: ["keyup", "submit"],
        validations: [
            {
                validator: (input) => !validator.isEmpty(input),
                errorMsg: "El email es obligatorio"
            },
            {
                validator: (input) => validator.isEmail(input),
                errorMsg: "El email tiene un formato incorrecto"
            },
            {
                validator: async (input) => {
                    const res = await fetch(`/users/validate/${input}`)
                    const data = await res.json()
                    return !data.existe
                },
                errorMsg: "El email ya existe"
            }
        ]
    },
    // {
    //     inputName: "contrasenia",
    //     type: ["keyup", "submit"],
    //     validations: [
    //         {
    //             validator: (input) => !validator.isEmpty(input),
    //             errorMsg: "La contraseña es obligatoria"
    //         },
    //         {
    //             validator: (input) => validator.isLength(input, {min: 8}),
    //             errorMsg: "La contraseña debe tener al menos 8 caracteres"
    //         },
    //         {
    //             validator: (input) => validator.isStrongPassword(input, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false }),
    //             errorMsg: "La contraseña debe al menos 1 mayúscula, 1 minúscula y 1 número"
    //         }
    //     ]
    // },
    // {
    //     inputName: "fecha",
    //     type: ["keyup", "submit"],
    //     validations: [
    //         {
    //             //por ejemplo poner 31/02
    //             validator: (input) => validator.isISO8601(input),
    //             errorMsg: "La fecha no tiene formato valido"
    //         },
    //         {
    //             //controla que no se pongan fechas mayores a las de hoy
    //             validator: (input) => !validator.isAfter(input),
    //             errorMsg: "La fecha no es valida"
    //         },
    //     ]
    // },
    // {
    //     inputName: "confirmarContrasenia",
    //     type: ["keyup", "submit"],
    //     validations: [
    //         {
    //             validator: (input) => !validator.isEmpty(input),
    //             errorMsg: "Debes confirmar la contraseña"
    //         },
    //     ]
    // },
    // {
    //     inputName: "avatar",
    //     type: ["submit"],
    //     validations: [
    //         {
    //             validator: (input) => validacionExtension(input),
    //             errorMsg: "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif"
    //         },
    //     ]
    // },
    // {
    //     inputName: "contrasenia",
    //     type: ["keyup", "submit"],
    //     validations: [
    //         {
    //             validator: (input) => !validator.isEmpty(input),
    //             errorMsg: "La contraseña es obligatoria"
    //         },
    //         {
    //             validator: (input) => validator.isLength(input, {min: 8}),
    //             errorMsg: "La contraseña debe tener al menos 8 caracteres"
    //         },
    //         {
    //             validator: (input) => validator.isStrongPassword(input, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false }),
    //             errorMsg: "La contraseña debe al menos 1 mayúscula, 1 minúscula y 1 número"
    //         }
    //     ]
    // },
    // {
    //     inputName: "fecha",
    //     type: ["keyup", "submit"],
    //     validations: [
    //         {
    //             //por ejemplo poner 31/02
    //             validator: (input) => validator.isISO8601(input),
    //             errorMsg: "La fecha no tiene formato valido"
    //         },
    //         {
    //             //controla que no se pongan fechas mayores a las de hoy
    //             validator: (input) => !validator.isAfter(input),
    //             errorMsg: "La fecha no es valida"
    //         },
    //     ]
    // },
    // {
    //     inputName: "confirmarContrasenia",
    //     type: ["keyup", "submit"],
    //     validations: [
    //         {
    //             validator: (input) => !validator.isEmpty(input),
    //             errorMsg: "Debes confirmar la contraseña"
    //         },
    //     ]
    // },
    // {
    //     inputName: "avatar",
    //     type: ["submit"],
    //     validations: [
    //         {
    //             validator: (input) => validacionExtension(input),
    //             errorMsg: "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif"
    //         },
    //     ]
    // },
]

//* validacion keyup
window.addEventListener("load", function () {
    const form = document.querySelector("form.contenedor-registro");

    inputValidations.forEach((inputToValidate) => {
        if(inputToValidate.type.includes("keyup")) {
            const input = form[inputToValidate.inputName];
    
            const inputContainer = input.parentElement;
            
            input.addEventListener("keyup", function (e) {
                for (const validation of inputToValidate.validations) {
    
                    const isValid = validation.validator(e.target.value);
    
                    if (!isValid) {
                        inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                        break
                    } else {
                        inputContainer.querySelector(".error").innerHTML = "";
                    }
                }
            })
        }
    });

    //* valida que confirmar contraseña es igual a la contraseña
    const inputConfirm = form["confirmarContrasenia"];
    const inputConfirmContainer = inputConfirm.parentElement;
    const inputPass = form["contrasenia"];

    inputConfirm.addEventListener("keyup", function(e) {
        if (inputPass.value != inputConfirm.value) {
            inputConfirmContainer.querySelector(".error").innerHTML = "No coincide con la contraseña";
        }
    })

    //* validacion de archivo onchange
    const inputAvatar = form["avatar"];
    const inputAvatarContainer = inputAvatar.parentElement;

    inputAvatar.addEventListener("change", function(e) {
        if (!validacionExtension(inputAvatar.value)) {
            inputAvatarContainer.querySelector(".error").innerHTML = "Las extensiones de archivo permitidas son .jpg, .jpeg, .png, .gif";
        }
    })

    //* VALIDACION EN SUBMIT
    form.addEventListener("submit", function (e) {
        //no se envia formulario
        e.preventDefault();

        //array de errores
        const errores = [];

        //por cada objeto de inputValidations
        inputValidations.forEach((inputToValidate) => {
            if(inputToValidate.type.includes("submit")) {
                //se obtiene input html
                const input = form[inputToValidate.inputName];
    
                //se obtiene padre de input - en este caso seria el div
                const inputContainer = input.parentElement;
    
                //por cada objeto de inputValidations, se cicla sobre el array de validaciones
                for (const validation of inputToValidate.validations) {
                    //se aplica el validador sobre el valor actual del input
                    const isValid = validation.validator(input.value);
                    console.log(isValid)
    
                    //si es invalido -> muestra error + guarda en array
                    if (!isValid) {
                        errores.push(validation.errorMsg);
                        inputContainer.querySelector(".error").innerHTML = validation.errorMsg;
                        return;
                    }
                }
    
                inputContainer.querySelector(".error").innerHTML = "";
            }
        });

        //si no hay errores, envia el form. Si hay errores, muestra mensaje
        //console.log(errores)
        //console.log(errores.length)
        if (errores.length === 0) {
            form.submit();
        } else {
            const spanErrorSubmit = document.querySelector("span.errorSubmit");
            spanErrorSubmit.innerHTML = "Completa correctamente todos los campos"
            spanErrorSubmit.classList.add("error-submit")
        }
    })
});
