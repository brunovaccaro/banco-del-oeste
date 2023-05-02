// CREO LAS CLASES QUE ME SIRVAN COMO MOLDE DE LOS OBJETOS TANTO DE CLIENTES COMO DE PRODUCTOS
class Cliente {
    constructor(nombreApellido, usuario, contraseña, dni, saldoActual) {
        this.nombreApellido = nombreApellido;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.dni = dni;
        this.saldoActual = saldoActual;
    }
}

class Producto {
    constructor(nombreProducto, valorMensual) {
        this.nombreProducto = nombreProducto;
        this.valorMensual = valorMensual;
    }
}

// CREO LOS ARRAY DE OBJETOS PARA ALMACENAR LOS DATOS DE LOS CLIENTES DEL BANCO Y LOS PRODUCTOS DEL MISMO
const clientes = [
    new Cliente("Bruno Vaccaro", "Nillo", "sanlorenzo", 37036394, 1500),
    new Cliente("Patricia Cañizares", "Pato", "pipita", 14303049, 35000),
    new Cliente("Javier Vaccaro", "Javito", "holahola", 36156344, 65000),
    new Cliente("Roberto Gimenez", "Rober", "tinkiwinki", 40384551, 130000)
];

const productos = [
    new Producto("Tarjeta de crédito", 1500),
    new Producto("Cuenta Corriente", 500),
    new Producto("Caja de Ahorros", 1000),
    new Producto("Seguro de vida", 3000),
    new Producto("Seguro del Hogar", 2300)
]




// DECLARO LAS VARIABLES
let usuario = '';
let usuarioNuevo = '';
let nombreApellido = '';
let dni = 0;
let contraseña = '';
let password = '';
let saldoActual = 0;
let dniIngresado = 0;
let clienteActivo;

console.log(clientes);

// FUNCION PARA INGRESAR AL BANCO
function ingresoBanco() {

    let opcionCuenta = parseInt(prompt("Bienvenido al Banco del Oeste. Seleccione la opción deseada:\n1 - Crear cuenta nueva \n2 - Ingresar a mi cuenta\n3 - Salir"))

    // SWITCH QUE CONTIENE QUE HACER EN CADA CASO QUE EL USUARIO SELECCIONE
    switch (opcionCuenta) {
        case 1:
            usuarioNuevo = prompt("Ingrese un nombre de usuario");

            // VALIDACION DE CUENTA DEL USUARIO
            let usuarioExistente = clientes.find(cliente => cliente.usuario === usuarioNuevo);
            if (usuarioExistente) {
                alert("Lo sentimos, usuario existente")
            } else {
                usuario = usuarioNuevo;
                nombreApellido = "";
                contraseña = "";
                dni = 0;
                while (!nombreApellido) {
                    nombreApellido = prompt("Ingrese su nombre y apellido");
                } while (!contraseña) {
                    contraseña = prompt("Ingrese una contraseña");
                } while (!dni) {
                    dni = parseInt(prompt("Ingrese su DNI"));
                }
                // AÑADO EL NUEVO USUARIO A LA CLASE CLIENTE
                clientes.push(new Cliente(nombreApellido, usuario, contraseña, dni, saldoActual));
                alert("Usuario registrado con éxito\nVolver al menú principal");
                console.log(clientes);
            }
            ingresoBanco();
            break;

        case 2:
            usuario = prompt("Ingrese su usuario");

            // VALIDACION DEL INGRESO DEL CLIENTE
            clienteActivo = clientes.find(cliente => cliente.usuario === usuario);

            if (clienteActivo) {
                for (let i = 0; i < 3; i++) {
                    contraseña = clienteActivo.contraseña;
                    password = prompt("Ingrese su contraseña");

                    if (password == contraseña) {
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
                ingresoBanco();
                break;
            }
            break;

        case 3:
            despedidaBanco();
            break;

        default:
            alert("Lo sentimos, la opción ingresada no existe");
            ingresoBanco();
            break;
    }

}

// ESTA FUNCIÓN ES PARA QUE EL USUARIO, UNA VEZ QUE YA INGRESÓ, SELECCIONE QUÉ DESEA REALIZAR
function menuBanco() {
    let opcionBanco = parseInt(prompt("Hola " + usuario + ", qué desea hacer?\n1 - Buscar clientes por DNI\n2 - Depositar\n3 - Retirar dinero\n4 - Consultar saldo disponible\n5 - Ver productos del Banco \n6 - Salir"))

    switch (opcionBanco) {
        case 1:
            dniIngresado = parseInt(prompt("Ingrese el DNI del cliente que desea buscar:"));
            buscarPorDni(dniIngresado);
            break;

        case 2:
            let deposito = parseFloat(prompt("Ingrese la cantidad que desea depositar"));
            if (isNaN(deposito)) {
                alert("Debe ingresar un valor numérico");
                menuBanco;
            } else {
                clienteActivo.saldoActual += deposito;
                alert("Se acreditó su depósito de $" + deposito.toFixed(2) + "\nSu saldo disponible es de $" + clienteActivo.saldoActual.toFixed(2) + "\nVolver al menú")
            }
            menuBanco();
            break;

        case 3:
            let retiro = parseFloat(prompt("Ingrese la cantidad que desea retirar\n(Tenga en cuenta que cada retiro tiene una comisión del 1%)"));
            if (isNaN(retiro)) {
                alert("Debe ingresar un valor numérico");
                menuBanco();
            } else if ((retiro * 1.01) > clienteActivo.saldoActual) {
                alert("No tiene fondos suficientes");
            } else {
                clienteActivo.saldoActual -= (retiro * 1.01).toFixed(2);
                alert("Se debitaron $" + (retiro * 1.01).toFixed(2) + "\nSu saldo disponible es de $" + clienteActivo.saldoActual.toFixed(2) + "\nVolver al menú");
            }
            menuBanco();
            break;

        case 4:
            alert("Tu saldo disponble es de $" + clienteActivo.saldoActual.toFixed(2));
            menuBanco();
            break;

        case 5:
            adquirirProductos();
            break;

        case 6:
            despedidaBanco();
            break;

        default:
            alert("Lo sentimos, la opción ingresada no existe");
            menuBanco();
            break;
    }
}

function adquirirProductos() {
    let montoMaximo = parseInt(prompt("Ingrese el monto máximo que está dispuesto a pagar:"));
    if (isNaN(montoMaximo) || montoMaximo < 0) {
        alert("El monto ingresado no es válido");
        adquirirProductos();
    } else {
        let productosFiltrados = productos.filter(producto => producto.valorMensual <= montoMaximo && producto.valorMensual >= 0);
        if (productosFiltrados.length === 0) {
            alert("Lo siento, no tenemos productos por ese valor");
            adquirirProductos();
        } else {
            let nombresProductos = productosFiltrados.map(producto => producto.nombreProducto);
            alert("Estos son los productos a los que puedes acceder con ese monto: " + nombresProductos.join(", "));
            console.log(usuario + ", estos son los productos a los que puedes acceder con ese monto: " + nombresProductos.join(" - "));
        }
    }
    let mensaje = "Estos son los productos del banco:\n";
    for (let i = 0; i < productos.length; i++) {
        mensaje += (i + 1) + ". " + productos[i].nombreProducto + " - Valor mensual: $" + productos[i].valorMensual.toFixed(2) + "\n";
    }
    alert(mensaje);
    let contratar = confirm("¿Desea contratar algún producto?");
    if (contratar) {
        let productoElegido = parseInt(prompt("Ingrese el número del producto que desea contratar"));
        if (productoElegido < 1 || productoElegido > productos.length) {
            alert("La opción ingresada no es válida");
        } else {
            let productoSeleccionado = productos[productoElegido - 1];
            let confirmacion = confirm("Usted ha seleccionado " + productoSeleccionado.nombreProducto + " por un valor mensual de $" + productoSeleccionado.valorMensual.toFixed(2) + ". ¿Desea confirmar la contratación?");
            if (confirmacion) {
                if (clienteActivo.saldoActual < productoSeleccionado.valorMensual) {
                    alert("No cuenta con dinero suficiente para la adquisición")
                }
                else {
                    alert("La contratación del producto " + productoSeleccionado.nombreProducto + " ha sido confirmada. Muchas gracias por elegir nuestros servicios.");
                    clienteActivo.saldoActual -= productoSeleccionado.valorMensual.toFixed(2);
                    alert("Su saldo actual es de: " + clienteActivo.saldoActual.toFixed(2));
                }
            } else {
                alert("La contratación del producto ha sido cancelada.");
            }
        }
        menuBanco();
    }
}


function buscarPorDni(dniIngresado) {
    let clienteEncontrado = clientes.find(cliente => cliente.dni === dniIngresado);
    if (clienteEncontrado) {
        console.log("Cliente encontrado: " + clienteEncontrado.nombreApellido);
        alert("Cliente encontrado: " + clienteEncontrado.nombreApellido);
        menuBanco();
    } else {
        console.log("No se encontró ningún cliente con ese DNI.");
        alert("No se encontró ningún cliente con ese DNI.");
        menuBanco();
    }
}

// CARTEL DE BIENVENIDA
alert("Segunda pre-entrega de JavaScript, por Bruno Vaccaro");

// INVOCACIÓN DE LA FUNCIÓN DE INGRESO AL BANCO
ingresoBanco();

// FUNCIÓN QUE ARROJA EL CARTEL DE DESPEDIDA
function despedidaBanco() {
    alert("Banco del Oeste le agradece su visita, hasta luego!");
}