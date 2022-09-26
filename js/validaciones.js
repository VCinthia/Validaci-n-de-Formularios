export function valida(input) {
    const tipoDeInput = input.dataset.tipo; // conecta todos los data y selecciona el data-tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    //console.log(input.parentElement);
    if (input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = ""
    } else {
        input.parentElement.classList.add('input-container--invalid')
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMissing",
    "patternMismatch",
    "customError",
];

const mensajesDeError = { //Objeto
    nombre : {
        valueMissing: "El campo nombre no puede estar vacio",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMissing: "El correo no es valido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Mínimo ocho caracteres, al menos una letra, un número y un carácter especial",
    },
    nacimiento: {
        valueMissing: "El campo naciemiento no puede estar vacio",
        customError: "Debes tener al menos 18 años",
    },
    numero: {
        valueMissing: "El campo telefono no puede estar vacio",
        patternMismatch: "El campo debe contener 10 numeros , el prefijo internacional (54),el prefijo internacional para celulares (9) , el prefijo de acceso a interurbanas (0), el prefijo local para celulares (15)"
    },
    direccion: {
        valueMissing: "El campo direccion no puede estar vacio",
        patternMismatch: "Mínimo 10 caracteres, máximo 40",
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "Mínimo 10 caracteres, máximo 40",
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "Mínimo 4 caracteres, máximo 40",
    }
}

const validadores = {
    nacimiento : (input) => validarNacimiento(input),    
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
        }
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años."
    }
    input.setCustomValidity(mensaje)
}

function mayorDeEdad (fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate())
    return (diferenciaFechas <= fechaActual);
};