// DECLARO LAS VARIABLES
let usuario = '';
let usuarioNuevo = '';
let password = '';
let passwordNuevo = '';
let saldoActual = 0;


// FUNCION PARA INGRESAR AL BANCO
function creacionCuenta() {
    let opcionCuenta = parseInt(prompt("Bienvenido al Banco del Oeste. Seleccione la opción deseada:\n1 - Crear cuenta nueva \n2 - Ingresar a mi cuenta \n3 - Salir"))

    // SWITCH QUE CONTIENE QUE HACER EN CADA CASO QUE EL USUARIO SELECCIONE
    switch (opcionCuenta) {
        case 1:
            usuarioNuevo = prompt("Ingrese un nombre de usuario");

            passwordNuevo = prompt("Ingrese una contraseña");

            // VALIDACION DE CUENTA DEL USUARIO
            if (usuarioNuevo == usuario) {
                alert("Lo sentimos, usuario existente")
            } else {
                alert("Usuario registrado con éxito\nVolver al menú principal");
            }
            creacionCuenta();
            break;

        case 2:
            usuario = prompt("Ingrese su usuario");

            // VALIDACION DEL INGRESO DEL CLIENTE
            if (usuario == usuarioNuevo) {
                for (let i = 0; i < 3; i++) {
                    password = prompt("Ingrese su contraseña");

                    if (password == passwordNuevo) {
                        alert("Bienvenido " + usuario + "!");
                        // ACÁ INVOCO LA FUNCIÓN SIGUIENTE, DE LAS OPCIONES DEL USUARIO DEL BANCO
                        menuBanco();
                        break;
                    } else {
                        alert("Contraseña incorrecta")
                    }
                }
            } else {
                alert("Disculpe, no hay ningún usuario registrado con ese nombre");
                creacionCuenta();
                break;
            }

            break;

        case 3:
            despedidaBanco();
            break;

        default:
            alert("Lo sentimos, la opción ingresada no existe");
            creacionCuenta();
            break;
    }

}

// ESTA FUNCIÓN ES PARA QUE EL USUARIO, UNA VEZ QUE YA INGRESÓ, SELECCIONE QUÉ DESEA REALIZAR
function menuBanco() {
    let opcionBanco = parseInt(prompt("Hola " + usuario + " Qué desea hacer?\n1 - Depositar\n2 - Retirar dinero\n3 - Consultar saldo disponible\n4 - Salir"))

    switch (opcionBanco) {
        case 1:
            let deposito = parseFloat(prompt("Ingrese la cantidad que desea depositar"));

            saldoActual = saldoActual + deposito;

            alert("Se acreditó su depósito de $" + deposito.toFixed(2) + "\nSu saldo disponible es de $" + saldoActual.toFixed(2) + "\nVolver al menú")
            menuBanco();
            break;

        case 2:
            let retiro = parseFloat(prompt("Ingrese la cantidad que desea retirar\n(Tenga en cuenta que cada retiro tiene una comisión del 1%)"));

            if (retiro > saldoActual) {
                alert("No tiene fondos suficientes");
            } else {
                saldoActual = saldoActual - (retiro * 1.01).toFixed(2);

                alert("Se realizó exitosamente el retiro de $" + (retiro * 1.01).toFixed(2) + "\nSu saldo disponible es de $" + saldoActual.toFixed(2) + "\nVolver al menú");
            }
            menuBanco();
            break;

        case 3:
            alert("Tu saldo disponble es de $" + saldoActual.toFixed(2));
            menuBanco();
            break;

        case 4:
            despedidaBanco();
            break;

        default:
            alert("Lo sentimos, la opción ingresada no existe");
            break;
    }
}

// CARTEL DE BIENVENIDA
alert("Primer pre-entrega de JavaScript, por Bruno Vaccaro");

// INVOCACIÓN DE LA FUNCIÓN DE INGRESO AL BANCO
creacionCuenta();

// FUNCIÓN QUE ARROJA EL CARTEL DE DESPEDIDA
function despedidaBanco() {
    alert("Banco del Oeste le agradece su visita, hasta luego!");
}