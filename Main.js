// https://ordendetrabajo.dominikcell.com
//by Dominik Mielczarek
//Simple HTML, CSS end JS.

const btnLog = document.getElementById('openModalBtn2')
const btnAllE = document.getElementById('openModalBtn3')
const btnOut = document.getElementById('logoutButton')
const GenOrdT = document.getElementById('openModalBtn')
const Res = document.getElementById('openModalregistro')
let userEmail;
let odff;
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, increment, getDocs, orderBy, query } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0-5H7Nak4Yug8q-X4EITkztLm3e9uWso",
  authDomain: "milibreriajsfb.firebaseapp.com",
  databaseURL: "https://milibreriajsfb-default-rtdb.firebaseio.com",
  projectId: "milibreriajsfb",
  storageBucket: "milibreriajsfb.appspot.com",
  messagingSenderId: "274479531648",
  appId: "1:274479531648:web:c78a0a9136042b5e834865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Login function
document.getElementById('loginButton').addEventListener('click', login);

async function login() {
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  console.log('Usuario conectando:');
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    console.log('Usuario conectado:', user);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error al iniciar sesión:', errorCode, errorMessage);
  }
}





// Definir la función de logout


function logout() {
  signOut(auth).then(() => {
    //alert('Sesión cerrada');
    console.log('Usuario desconectado');
    window.location.href = "index.html"; // Redirigir a la página de inicio de sesión, por ejemplo

  }).catch((error) => {
    console.error('Error al cerrar sesión:', error);
  });
}
document.getElementById("logoutButton").addEventListener("click", logout);

window.onload = function () {
  document.querySelector('form').onsubmit = function (event) {
    event.preventDefault();
    login();
  };
};


// Verificar el estado de autenticación al cargar la página
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    document.getElementById("closeModalBtn2").addEventListener("click", logout);
    btnLog.style.display = 'none';
    Res.style.display = 'none';
    btnAllE.style.display = '';
    btnOut.style.display = '';
    GenOrdT.style.display = '';

    userEmail = auth.currentUser.email;
    document.getElementById('userEmail2').textContent = userEmail;
    obtenerOrdenes(userEmail);
    obtenerOrdenesPorGarantiaYReparacion(userEmail);
    obtenerOrdenesPorGarantiaYReparacionOK(userEmail);
    obtenerDatosUsuario(userEmail)
    // Cerrar el modal
    closeModal();
  } else {
    // No user is signed in
    btnAllE.style.display = 'none';
    btnLog.style.display = '';
    btnOut.style.display = 'none';
    GenOrdT.style.display = 'none';
  }
});

function closeModal() {
  
  const modal = document.getElementById('myModal2'); 
  if (modal) {
    modal.style.display = 'none';  // Esto ocultará el modal
  }
}
function closeModal1() {
  
  const modal = document.getElementById('myModal'); 
  if (modal) {
    modal.style.display = 'none';  // Esto ocultará el modal
  }
}


// Definir la función asincrónica
async function confirmarEnvio() {
  const fechaHora = new Date().toLocaleString();
  const fechaHora1 = document.getElementById('currentDateTime').value;
  const imei = document.getElementById('imei').value;
  const isCelular = document.getElementById('checkbox1').checked;
  const isPortatil = document.getElementById('checkbox2').checked;
  const marca = document.getElementById('Marca').value;
  const modelo = document.getElementById('model').value;

  let tipoReparacion = document.getElementById('miCombobox1').value;
  const tipoReparacionSelectEspecificar = document.getElementById('otroTipo').value;

  if (tipoReparacion == "especificar") {
    tipoReparacion = tipoReparacionSelectEspecificar;
  }




  const aspectoFisico = document.getElementById('ASP').value;
  const bateria = document.getElementById('batt').value;
  const tipoDesbloqueo = document.getElementById('tipoDes').value;
  const pin = document.getElementById('PIN').value;
  const contrasena = document.getElementById('contrasena').value;
  const observaciones = document.getElementById('obs').value;
  const tipoDoc = document.getElementById('tipoDoc').value;
  const numDoc = document.getElementById('numDoc').value;
  const nombre = document.getElementById('nombreC').value;
  const apellido = document.getElementById('Apellidos').value;
  const numero = document.getElementById('Numero').value;
  const numeroW = document.getElementById('NumeroW').value;
  const ingresaPor = document.getElementById('miCombobox2').value;
  const total = document.getElementById('total').value;
  const abono = document.getElementById('abono').value;
  const saldo = document.getElementById('saldo').value;
  // Obtener el valor del input oculto
  const pattern = document.getElementById('patternInput').value;

  // Obtener el correo del span
  const userEmail = document.getElementById('userEmail2').textContent;

  logEvent(analytics, 'Ingresos', {
    parametro1: modelo,
    parametro2: marca,
  });

  // Generar un nuevo ID de orden de factura
  try {
    const contadorRef = doc(db, userEmail, "ordenes");
    const contadorSnap = await getDoc(contadorRef);

    let nuevoId;
    if (contadorSnap.exists()) {
      // Incrementar el contador y actualizar el documento
      const ultimoContador = contadorSnap.data().contador;
      nuevoId = `ODF${(ultimoContador + 1).toString().padStart(3, '0')}`;
      await updateDoc(contadorRef, {
        contador: increment(1)
      });
    } else {
      // Crear el documento con el contador inicial
      nuevoId = "ODF001";
      await setDoc(contadorRef, { contador: 1 });
    }

    const docRef = doc(db, userEmail, nuevoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      alert("El documento ya existe: " + nuevoId);
    } else {
      await setDoc(docRef, {
        fechaHora,
        imei,
        isCelular,
        isPortatil,
        marca,
        modelo,
        tipoReparacion,
        aspectoFisico,
        bateria,
        tipoDesbloqueo,
        pin,
        contrasena,
        observaciones,
        tipoDoc,
        numDoc,
        nombre,
        apellido,
        numero,
        numeroW,
        ingresaPor,
        pattern,
        saldo,
        abono,
        total // Añadir el patrón a los datos enviados
      });
      //alert("Formulario enviado con éxito: " + nuevoId);
      obtenerOrdenes(userEmail);

      closeModal1();
    }
  } catch (error) {
    console.error("Error al enviar formulario: ", error);
  }
  // Restablecer el formulario
  location.reload();
  //return true; // Prevenir recarga de página
}

// Asignar la función al evento 'click' del botón
document.getElementById('btnenviarorden').addEventListener('click', confirmarEnvio);


async function obtenerOrdenes(userEmail) {

  const ordenesRef = collection(db, userEmail);
  const q = query(ordenesRef, orderBy("fechaHora"));
  const ordenesSnapshot = await getDocs(q);
  const ordenesTable = document.getElementById('ordenesTable').getElementsByTagName('tbody')[0];

  ordenesSnapshot.forEach((doc) => {
    const ordenData = doc.data();
    const row = ordenesTable.insertRow();
    // Crear el botón y agregarlo a la fila
    const buttonCell = row.insertCell(0);
    const button = document.createElement('button');
    button.textContent = doc.id;
    button.setAttribute('data-doc-id', doc.id);
    button.addEventListener('click', (event) => {
      const docId = event.target.getAttribute('data-doc-id');
      console.log('ID del documento:', docId);
      odff = docId;
      obtenerOrdenPorId(userEmail, docId);
    });
    buttonCell.appendChild(button);
    row.insertCell(1).textContent = ordenData.nombre + " " + ordenData.apellido;
    row.insertCell(2).textContent = ordenData.modelo;
    row.insertCell(3).textContent = ordenData.tipoReparacion;
    var cell = row.insertCell(4);
    cell.textContent = ordenData.ingresaPor;

    if (ordenData.ingresaPor === "Reparacion") {
      cell.style.backgroundColor = "yellow";  // Cambia a rojo si el texto es "valor1"
    } else if (ordenData.ingresaPor === "Listo") {
      cell.style.backgroundColor = "green";  // Cambia a verde si el texto es "valor2"
    } else if (ordenData.ingresaPor === "Entregado") {
      cell.style.backgroundColor = "blue";  // Cambia a verde si el texto es "valor2"
    } else if (ordenData.ingresaPor === "Garantia") {
      cell.style.backgroundColor = "#FFA500";  // Cambia a verde si el texto es "valor2"
    } else {
      cell.style.backgroundColor = "red";  // Cambia a azul para cualquier otro valor
    }

  });
}


async function obtenerOrdenesPorGarantiaYReparacion(userEmail) {
  const ordenesRef = collection(db, userEmail);
  const q = query(ordenesRef, orderBy("fechaHora"));
  const ordenesSnapshot = await getDocs(q);
  const ordenesTable = document.getElementById('ordenesPorRepararTable').getElementsByTagName('tbody')[0];

  ordenesSnapshot.forEach((doc) => {
    const ordenData = doc.data();

    // Filtrar por garantía y reparación
    if (ordenData.ingresaPor === "Garantia" || ordenData.ingresaPor === "Reparacion") {
      const row = ordenesTable.insertRow();

      // Crear el botón y agregarlo a la fila
      const buttonCell = row.insertCell(0);
      const button = document.createElement('button');
      button.textContent = doc.id;
      button.setAttribute('data-doc-id', doc.id);
      button.addEventListener('click', (event) => {
        const docId = event.target.getAttribute('data-doc-id');
        console.log('ID del documento:', docId);
        odff = docId;
        obtenerOrdenPorId(userEmail, docId);
      });
      buttonCell.appendChild(button);
      row.insertCell(1).textContent = ordenData.fechaHora;
      row.insertCell(2).textContent = ordenData.nombre + " " + ordenData.apellido;
      row.insertCell(3).textContent = ordenData.modelo;
      row.insertCell(4).textContent = ordenData.tipoReparacion;
      var cell = row.insertCell(5);
      cell.textContent = ordenData.ingresaPor;

      if (ordenData.ingresaPor === "Reparacion") {
        cell.style.backgroundColor = "yellow";  // Color para "Reparacion"
      } else if (ordenData.ingresaPor === "Garantia") {
        cell.style.backgroundColor = "#FFA500";  // Color para "Garantia"
      }
    }
  });
}

async function obtenerOrdenesPorGarantiaYReparacionOK(userEmail) {
  const ordenesRef = collection(db, userEmail);
  const q = query(ordenesRef, orderBy("fechaHora"));
  const ordenesSnapshot = await getDocs(q);
  const ordenesTable = document.getElementById('ordenesPorRepararOkTable').getElementsByTagName('tbody')[0];

  ordenesSnapshot.forEach((doc) => {
    const ordenData = doc.data();

    // Filtrar por garantía y reparación
    if (ordenData.ingresaPor === "Listo") {
      const row = ordenesTable.insertRow();

      // Crear el botón y agregarlo a la fila
      const buttonCell = row.insertCell(0);
      const button = document.createElement('button');
      button.textContent = doc.id;
      button.setAttribute('data-doc-id', doc.id);
      button.addEventListener('click', (event) => {
        const docId = event.target.getAttribute('data-doc-id');
        console.log('ID del documento:', docId);
        odff = docId;
        obtenerOrdenPorId(userEmail, docId);
      });
      buttonCell.appendChild(button);
      row.insertCell(1).textContent = ordenData.nombre + " " + ordenData.apellido;
      row.insertCell(2).textContent = ordenData.modelo;
      row.insertCell(3).textContent = ordenData.tipoReparacion;
      var cell = row.insertCell(4);
      cell.textContent = ordenData.ingresaPor;

      if (ordenData.ingresaPor === "Listo") {
        cell.style.backgroundColor = "green";  // Color para "Reparacion"
      } else if (ordenData.ingresaPor === "Garantia") {
        cell.style.backgroundColor = "#FFA500";  // Color para "Garantia"
      }
    }
  });
}




async function obtenerOrdenPorId0(userEmail, docId) {
  const docRef = doc(db, userEmail, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ordenData = docSnap.data();
    // Llenar el formulario dentro del modal con los datos obtenidos

    document.getElementById('currentDateTime6').value = ordenData.fechaHora;
    document.getElementById('imei6').value = ordenData.imei;
    document.getElementById('Marca6').value = ordenData.marca;
    document.getElementById('model6').value = ordenData.modelo;
    document.getElementById('miCombobox16').value = ordenData.tipoReparacion;
    document.getElementById('ASP6').value = ordenData.aspectoFisico;
    document.getElementById('batt6').value = ordenData.bateria;
    document.getElementById('tipoDes6').value = ordenData.tipoDesbloqueo;

    document.getElementById('PIN6').value = ordenData.pin;
    document.getElementById('contrasena6').value = ordenData.contrasena;
    document.getElementById('pattern6').value = ordenData.pattern;



    document.getElementById('obs6').value = ordenData.observaciones;
    document.getElementById('tipoDoc6').value = ordenData.tipoDoc;
    document.getElementById('numDoc6').value = ordenData.numDoc;
    document.getElementById('nombreC6').value = ordenData.nombre;
    document.getElementById('Apellidos6').value = ordenData.apellido;
    document.getElementById('Numero6').value = ordenData.numero;
    document.getElementById('NumeroW6').value = ordenData.numeroW;
    document.getElementById('miCombobox26').value = ordenData.ingresaPor;

    //saldos
    document.getElementById('saldo2').value = ordenData.saldo;
    document.getElementById('abono2').value = ordenData.abono;
    document.getElementById('total2').value = ordenData.total;


    const chatButton = document.getElementById('chatButton');
    const email = auth.currentUser.email; // Asegúrate de obtener el email del usuario autenticado
    const datosUsuario = await obtenerDatosUsuario(email);

    const codePais = datosUsuario.pais;

    // Actualiza el enlace del botón de chat con el número de WhatsApp
    //chatButton.href = `https://wa.me/${codePais}${ordenData.numeroW.replace('+', '')}`;
    if (codePais === '1') {
      chatButton.href = `https://wa.me/${codePais}${ordenData.numeroW.replace('+', '')}?text=Mr.%20${ordenData.nombre}%20Your%20${ordenData.marca}%20${ordenData.modelo}%20device%20for%20${ordenData.tipoReparacion}%20is%20in%20status:%20${ordenData.ingresaPor}%20Order:%20${docId}`;
  } else {
      chatButton.href = `https://wa.me/${codePais}${ordenData.numeroW.replace('+', '')}?text=Sr.%20${ordenData.nombre}%20Su%20Equipo%20${ordenData.marca}%20${ordenData.modelo}%20Orden:%20${docId}%20por%20${ordenData.tipoReparacion}%20esta%20en%20estado:%20${ordenData.ingresaPor}`;
  }

    triggerModalButton();
    odff = docId;
  } else {
    alert('No existe el documento:', docId);
  }
}

async function obtenerOrdenPorId(userEmail, docId) {
  const docRef = doc(db, userEmail, docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const ordenData = docSnap.data();

    // Llenar el formulario dentro del modal con los datos obtenidos
    document.getElementById('currentDateTime6').value = ordenData.fechaHora;
    document.getElementById('imei6').value = ordenData.imei;
    document.getElementById('Marca6').value = ordenData.marca;
    document.getElementById('model6').value = ordenData.modelo;
    document.getElementById('miCombobox16').value = ordenData.tipoReparacion;
    document.getElementById('ASP6').value = ordenData.aspectoFisico;
    document.getElementById('batt6').value = ordenData.bateria;
    document.getElementById('tipoDes6').value = ordenData.tipoDesbloqueo;
    document.getElementById('PIN6').value = ordenData.pin;
    document.getElementById('contrasena6').value = ordenData.contrasena;
    document.getElementById('pattern6').value = ordenData.pattern;
    document.getElementById('obs6').value = ordenData.observaciones;
    document.getElementById('tipoDoc6').value = ordenData.tipoDoc;
    document.getElementById('numDoc6').value = ordenData.numDoc;
    document.getElementById('nombreC6').value = ordenData.nombre;
    document.getElementById('Apellidos6').value = ordenData.apellido;
    document.getElementById('Numero6').value = ordenData.numero;
    document.getElementById('NumeroW6').value = ordenData.numeroW;
    document.getElementById('miCombobox26').value = ordenData.ingresaPor;
    document.getElementById('saldo2').value = ordenData.saldo;
    document.getElementById('abono2').value = ordenData.abono;
    document.getElementById('total2').value = ordenData.total;

    // Botón de WhatsApp
    const chatButton = document.getElementById('chatButton');
    const email = auth.currentUser.email;
    const datosUsuario = await obtenerDatosUsuario(email);
    const codePais = datosUsuario.pais;

    if (codePais === '1') {
      chatButton.href = `https://wa.me/${codePais}${ordenData.numeroW.replace('+', '')}?text=Mr.%20${ordenData.nombre}%20Your%20${ordenData.marca}%20${ordenData.modelo}%20device%20for%20${ordenData.tipoReparacion}%20is%20in%20status:%20${ordenData.ingresaPor}%20Order:%20${docId}`;
    } else {
      chatButton.href = `https://wa.me/${codePais}${ordenData.numeroW.replace('+', '')}?text=Sr.%20${ordenData.nombre}%20Su%20Equipo%20${ordenData.marca}%20${ordenData.modelo}%20Orden:%20${docId}%20por%20${ordenData.tipoReparacion}%20esta%20en%20estado:%20${ordenData.ingresaPor}`;
    }

    // Botón de QR
    const qrButton = document.getElementById('QRButton');
    qrButton.addEventListener('click', () => generarQRyPDF(ordenData, docId));

    triggerModalButton();
    odff = docId;
    // Simular un clic en el botón
stopButton.click();
  } else {
    // Simular un clic en el botón
    stopButton.click();
    alert('No existe el documento:', docId);
  }
}

function generarQRyPDF() {
  // Obtener los valores de los campos del formulario
  const docId = odff; // Asumo que `odff` es una variable global que almacena el ID del documento
  const nombre = document.getElementById('nombreC6').value;
  const apellido = document.getElementById('Apellidos6').value;
  const numeroW = document.getElementById('NumeroW6').value;
  const marca = document.getElementById('Marca6').value;
  const modelo = document.getElementById('model6').value;
  const tipoReparacion = document.getElementById('miCombobox16').value;
  const estado = document.getElementById('miCombobox26').value;
  

  // Crear el contenido del QR
  const qrContent = `
    
    Orden: ${docId}
    Nombre: ${nombre} ${apellido}
    Teléfono: ${numeroW}
    Marca: ${marca}
    Modelo: ${modelo}
    Reparación: ${tipoReparacion}
    Estado: ${estado}
  `;

  // Crear un canvas oculto para generar el QR
  const canvas = document.createElement('canvas');
  canvas.style.display = 'none'; // Ocultar el canvas
  document.body.appendChild(canvas);

  // Generar el código QR en el canvas
  QRCode.toCanvas(canvas, qrContent, {
    width: 200,
    margin: 2,
    color: {
      dark: '#000000', // Color oscuro
      light: '#ffffff' // Color claro
    }
  }, (error) => {
    if (error) {
      console.error('Error al generar el QR:', error);
      return;
    }

    // Convertir el canvas a una imagen en formato PNG
    const imgData = canvas.toDataURL('image/png');

    // Crear el PDF con jsPDF
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    // Añadir el QR al PDF
    pdf.addImage(imgData, 'PNG', 10, 10, 50, 50);

    // Añadir texto al PDF
    pdf.setFontSize(12);
    pdf.text(`Orden: ${docId}`, 60, 20);
    pdf.text(`Nombre: ${nombre} ${apellido}`, 60, 24);
    pdf.text(`Teléfono: ${numeroW}`, 60, 28);
    pdf.text(`Marca: ${marca}`, 60, 32);
    pdf.text(`Modelo: ${modelo}`, 60, 36);
    pdf.text(`Reparación: ${tipoReparacion}`, 60, 40);
    pdf.text(`Estado: ${estado}`, 60, 44);

    // Guardar el PDF
    pdf.autoPrint(); // Activa la impresión automática
    pdf.save(`Orden_${docId}.pdf`);

    // Eliminar el canvas oculto
    canvas.remove();
  });
}
//hasta qr creator

function triggerModalButton() {
  const openModalBtn = document.getElementById('openModalBtn6');
  openModalBtn.click();
}




// Función para actualizar el valor de ingresaPor
async function actualizarIngresaPor(duserEmail, docId, nuevoValor) {
  const docRef = doc(db, duserEmail, docId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        ingresaPor: nuevoValor
      });
      console.log("Documento actualizado con éxito: " + docId);
      location.reload();
    } else {
      console.error("No se encontró el documento: " + docId);
    }
  } catch (error) {
    console.error("Error al actualizar el documento: ", error);
  }
}
// Asigna una función al botón para que actualice el valor de ingresaPor
document.getElementById('actualizarBtn').addEventListener('click', function () {
  const duserEmail = auth.currentUser.email; // Reemplaza con el correo del usuario
  //const docId = event.target.getAttribute('data-doc-id');
  const docId = odff; // Reemplaza con el ID del documento específico
  const nuevoValor = 'Listo';

  actualizarIngresaPor(duserEmail, docId, nuevoValor);

});

document.getElementById('actualizarBtn2').addEventListener('click', function () {
  const duserEmail = auth.currentUser.email; // Reemplaza con el correo del usuario
  //const docId = event.target.getAttribute('data-doc-id');
  const docId = odff; // Reemplaza con el ID del documento específico
  const nuevoValor = 'Rechazado';

  actualizarIngresaPor(duserEmail, docId, nuevoValor);

});
document.getElementById('actualizarBtn3').addEventListener('click', function () {
  const duserEmail = auth.currentUser.email; // Reemplaza con el correo del usuario
  //const docId = event.target.getAttribute('data-doc-id');
  const docId = odff; // Reemplaza con el ID del documento específico
  const nuevoValor = 'Entregado';

  actualizarIngresaPor(duserEmail, docId, nuevoValor);

});

document.getElementById("imprimirBtn").addEventListener("click", async function () {
  try {
    const email = auth.currentUser.email; // Asegúrate de obtener el email del usuario autenticado
    const datosUsuario = await obtenerDatosUsuario(email);

    if (datosUsuario) {
      console.log("Nombre del usuario: ", datosUsuario.nombre);
      console.log("WhatsApp del usuario: ", datosUsuario.whatsapp);
      console.log("Dirección del usuario: ", datosUsuario.direccion);
      console.log("pais: ", datosUsuario.pais);
      console.log("Redes sociales del usuario: ", datosUsuario.redesSociales);
    } else {
      console.log("No se encontraron datos para el usuario con email: ", email);
    }

    const OuserEmail = auth.currentUser.email; // Reemplaza con el correo del usuario
    const OdocId = odff; // Reemplaza con el ID del documento

    const ordenFactura = OdocId;
    const fechaImpresion = new Date().toLocaleString();
    const telefono = datosUsuario.whatsapp;
    const nombreL = datosUsuario.nombre
    const correo = OuserEmail;
    const paisL = datosUsuario.pais
    const direccion = datosUsuario.direccion;
    // Supongamos que este es el valor completo del documento
    const numDoc = document.getElementById("numDoc6").value;
    // Obtén los últimos 4 dígitos del valor
    const ultimosDigitos = numDoc.slice(-4);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: [80, 260] });

    doc.setFontSize(10);

    // Encabezado centrado
    doc.text("Orden de Factura: " + ordenFactura, 40, 7, { align: "center" });
    doc.text("Fecha de Impresión: " + fechaImpresion, 40, 11, { align: "center" });
    doc.text("Teléfono: " + paisL + telefono, 40, 15, { align: "center" });
    doc.text("Direccion: " + direccion, 40, 19, { align: "center" });
    doc.text("Correo: " + correo, 40, 23, { align: "center" });
    doc.setFontSize(15);
    doc.text("" + nombreL, 40, 31, { align: "center" });

    doc.line(10, 35, 70, 35); // (x1, y1, x2, y2)
    // Contenido del formulario
    doc.setFontSize(12);
    doc.text("Datos del Dispositivo", 18, 40);
    doc.setFontSize(10);
    doc.text("Fecha Ingreso: " + document.getElementById("currentDateTime6").value, 10, 45);
    doc.text("IMEI: " + document.getElementById("imei6").value, 10, 50);
    doc.text("Marca: " + document.getElementById("Marca6").value, 10, 55);
    doc.text("Modelo: " + document.getElementById("model6").value, 10, 60);
    doc.text("Tipo de Reparación: " + document.getElementById("miCombobox16").value, 10, 65);
    doc.text("Aspecto Físico: " + document.getElementById("ASP6").value, 10, 70);
    doc.text("Batería: " + document.getElementById("batt6").value, 10, 75);
    doc.setFontSize(12);
    doc.text("Datos del Usuario", 18, 85);
    doc.setFontSize(10);
    doc.text("Tipo de Documento: " + document.getElementById("tipoDoc6").value, 10, 90);
    doc.text("Documento: ****" + ultimosDigitos, 10, 95);//
    doc.text("Nombre: " + document.getElementById("nombreC6").value, 10, 100);
    doc.text("Apellidos: " + document.getElementById("Apellidos6").value, 10, 105);
    doc.text("Número: " + document.getElementById("Numero6").value, 10, 110);
    doc.text("WhatsApp: " + document.getElementById("NumeroW6").value, 10, 115);
    doc.text("Estado: " + document.getElementById("miCombobox26").value, 10, 120);
    doc.text("Total: " + document.getElementById("total2").value, 10, 125);
    doc.text("Abono: " + document.getElementById("abono2").value, 10, 130);
    doc.text("Saldo: " + document.getElementById("saldo2").value, 10, 135);

    // Dibujar una línea horizontal 
    doc.line(10, 140, 70, 140); // (x1, y1, x2, y2)
    doc.setFontSize(7);
    // Añadir contenido adicional
    doc.text("Se recibe de buena fe el equipo, presumiendo su", 10, 145);
    doc.text("buena procedencia y con previa verificación de su", 10, 149);
    doc.text("IMEI al día de hoy.", 10, 153);
    doc.line(15, 157, 45, 157); // (x1, y1, x2, y2)

    doc.text("Términos & Condiciones", 15, 161);
    doc.text("Descargo de Responsabilidad por Pérdida de Datos y", 10, 165);
    doc.text("Otros. No nos hacemos responsables por la pérdida de", 10, 169);
    doc.text("datos, ya que los dispositivos móviles son sensibles.", 10, 173);
    doc.text("Esto incluye también la pérdida de SIM card o microSD.", 10, 177);
    doc.text("Garantías de 90 Días. No aplican para teléfonos", 10, 181);
    doc.text("mojados, golpeados, pisados, doblados o con sellos de", 10, 185);
    doc.text("humedad activados.", 10, 189);
    doc.text("Es obligatorio registrar y verificar el IMEI de los", 10, 193);
    doc.text("equipos terminales móviles para evitar su uso indebido", 10, 197);


    doc.autoPrint(); // Activa la impresión automática
    doc.save("Orden: " + ordenFactura);
    doc.output("dataurlnewwindow"); // Abre el PDF en una nueva ventana del navegador

  } catch (error) {
    console.error("Error al imprimir los datos: ", error);
  }
});





// Función para registrar al usuario y almacenar datos adicionales
// Maneja el envío del formulario de registro
//

// Maneja el envío del formulario de registro
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("registerUser").addEventListener("click", async function (event) {
    event.preventDefault();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const nombre = document.getElementById("registerNombre").value;
    const whatsapp = document.getElementById("registerWhatsapp").value;
    const direccion = document.getElementById("registerDireccion").value;
    const redesSociales = document.getElementById("registerRedesSociales").value;
    const PaisCode = document.getElementById('pais').value;
    try {
      // Registra al usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Almacena datos adicionales en Firestore
      await setDoc(doc(db, "users", user.email), {
        nombre: nombre,
        whatsapp: whatsapp,
        direccion: direccion,
        redesSociales: redesSociales,
        pais: PaisCode,
        createdAt: new Date()
      });

      console.log("Usuario registrado y datos adicionales guardados correctamente");
      // Cierra el modal después de registrar al usuario
      closeModalRegistro();
    } catch (error) {
      // Simular un clic en el botón
      stopButton.click();
      alert("Error al registrar al usuario: ", error);

    }
  });

  // Añade un evento para el botón para abrir el modal
  document.getElementById("openModalregistro").addEventListener("click", function () {
    openModalRegistro();
  });
  document.getElementById("openModalregistroClose").addEventListener("click", function () {
    closeModalRegistro();
  });
});



// Función para abrir el modal
function openModalRegistro() {
  document.getElementById("registroModal").style.display = "block";
  closeModal();
}
// Función para cerrar el modal
function closeModalRegistro() {
  document.getElementById("registroModal").style.display = "none";

}
async function obtenerDatosUsuario(userEmail) {
  try {
    const userDoc = await getDoc(doc(db, "users", userEmail));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log("Datos del usuario: ", userData);
      return userData;
    } else {
      console.log("No se encontró un documento para el usuario con email: ", email);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario: ", error);
  }
}


  

  let stream; // Variable para almacenar la transmisión de video
  let scanning = false; // Variable para controlar si se está escaneando

  // Acceder a la cámara
  startButton.addEventListener('click', () => {
    if (scanning) return; // Si ya se está escaneando, no hacer nada

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        stream = s;
        video.srcObject = stream;
        video.play();
        scanning = true;
        scanQRCode(); // Iniciar el escaneo
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
      });
  });

  // Detener la búsqueda
  stopButton.addEventListener('click', () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // Detener todas las pistas de video
      video.srcObject = null; // Limpiar el elemento de video
      scanning = false; // Detener el escaneo
      console.log("Búsqueda detenida.");
    }
  });

  // Función para escanear el código QR
  function scanQRCode() {
    if (!scanning) return; // Si no se está escaneando, salir

    const canvasElement = document.getElementById('canvas');
    const canvasContext = canvasElement.getContext('2d');

    // Capturar el frame actual del video
    canvasContext.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
    const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);

    // Usar jsQR para decodificar el código QR
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: "dontInvert",
    });

    if (code) {
      console.log("Código QR encontrado:", code.data);
      buscarOrdenPorIdQR(code.data); // Llamar a la función para buscar la orden
      scanning = false; // Detener el escaneo después de encontrar un código QR
      if (stream) {
        stream.getTracks().forEach((track) => track.stop()); // Detener la cámara
        video.srcObject = null;
      }
    } else {
      // Continuar escaneando si no se encontró un código QR
      requestAnimationFrame(scanQRCode);
    }
  }

  async function buscarOrdenPorIdQR(textoQR) {
    // Extraer el ID de la orden del texto del código QR
    const docId = extraerOrdenId(textoQR);
  
    if (!docId) {
      console.log("No se pudo extraer el ID de la orden del código QR.");
      return;
    }
  
    const userEmail = auth.currentUser.email; // Reemplaza con el email del usuario actual
    const ordenData = await obtenerOrdenPorId(userEmail, docId);
  
    if (ordenData) {
      // Mostrar los datos de la orden en la interfaz
      mostrarDatosOrden(ordenData);
      console.log("Se encontró la orden con ID:", docId);
    } else {
      console.log("No se encontró la orden con ID:", docId);
    }
  
    // Limpiar el canvas después de mostrar los datos
    const canvas = document.getElementById('canvas');
    const canvasContext = canvas.getContext('2d');
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  
    console.log("Canvas restablecido.");
  }

  

 


  
  // Función para iniciar el escaneo
  startButton.addEventListener('click', () => {
    // Mostrar el video y el botón "Detener búsqueda"
    video.style.display = 'block';
    stopButton.style.display = 'block';
  
    // Ocultar el botón "Escanear QR"
    startButton.style.display = 'none';
  
    // Acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        stream = s;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
      });
  });
  
  // Función para detener la búsqueda
  stopButton.addEventListener('click', () => {
    // Ocultar el video y el botón "Detener búsqueda"
    video.style.display = 'none';
    stopButton.style.display = 'none';
  
    // Mostrar el botón "Escanear QR"
    startButton.style.display = 'block';
  
    // Detener la transmisión de video
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      video.srcObject = null;
    }
  });





  function extraerOrdenId(textoQR) {
    // Expresión regular para extraer el valor de "Orden: "
    const regex = /Orden:\s*(\w+)/;
    const match = textoQR.match(regex);
  
    // Si se encuentra el valor, retornarlo
    if (match && match[1]) {
      return match[1]; // Retorna el ID de la orden (por ejemplo, "ODF047")
    }
  
    // Si no se encuentra, retornar null
    return null;
  }


const busquedaManualInput = document.getElementById('busquedaManual');
const buscarManualButton = document.getElementById('buscarManualButton');

// Función para buscar manualmente
async function buscarOrdenManual() {
  const docId = busquedaManualInput.value.trim(); // Obtener el valor del input y eliminar espacios en blanco

  if (!docId) {
    alert("Por favor, ingrese un ID de orden válido.");
    stopButton.click();
    return;
  }

  const userEmail = auth.currentUser.email; // Reemplaza con el email del usuario actual
  const ordenData = await obtenerOrdenPorId(userEmail, docId);

  //if (ordenData) {
    // Mostrar los datos de la orden en la interfaz
    
 //  // console.log("Se encontró la orden con ID:", docId);
  //} else {
 //   console.log("No se encontró la orden con ID:", docId);
 //   alert("1No se encontró la orden con ID: " + docId);
 /// }
}




// Buscar manualmente al hacer clic en el botón
buscarManualButton.addEventListener('click', buscarOrdenManual);

// Buscar manualmente al presionar "Enter" en el input
busquedaManualInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    buscarOrdenManual();
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var input = document.getElementById("busquedaManual");
  input.addEventListener("input", function() {
      this.value = this.value.toUpperCase();
  });
});