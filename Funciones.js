
        //js de pdf imprimir orden
     

        function calcularSaldo() {
            var total = parseFloat(document.getElementById('total').value) || 0;
            var abono = parseFloat(document.getElementById('abono').value) || 0;
            var saldo = total - abono;
            document.getElementById('saldo').value = saldo;
        }
        // Obtén los elementos del DOM
        const repairedModal0 = document.getElementById("myRepairedModal");
        const openRepairedBtn0 = document.getElementById("openRepairedBtn");
        const closeRepairedBtn0 = document.getElementById("closeRepairedBtn");

        // Función para abrir el modal
        openRepairedBtn0.onclick = function() {
            repairedModal0.style.display = "block";
        }

        // Función para cerrar el modal
        closeRepairedBtn0.onclick = function() {
            repairedModal0.style.display = "none";
        }

        // Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == repairedModal0) {
                repairedModal0.style.display = "none";
            }
        }
        


        // equipos lsitos
        const repairedModal3 = document.getElementById("myRepairedModal3");
        const openRepairedBtn3 = document.getElementById("openRepairedBtn3");
        const closeRepairedBtn3 = document.getElementById("closeRepairedBtn3");

        // Función para abrir el modal
        openRepairedBtn3.onclick = function() {
            repairedModal3.style.display = "block";
        }

        // Función para cerrar el modal
        closeRepairedBtn3.onclick = function() {
            repairedModal3.style.display = "none";
        }

        // Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == repairedModal3) {
                repairedModal3.style.display = "none";
            }
        }


        

// Obtén los elementos del DOM
const configModal = document.getElementById("myConfigModal");
        const openConfigBtn = document.getElementById("openConfigBtn");
        const closeConfigBtn = document.getElementById("closeConfigBtn");

        // Función para abrir el modal
        openConfigBtn.onclick = function() {
            configModal.style.display = "block";
        }

        // Función para cerrar el modal
        closeConfigBtn.onclick = function() {
            configModal.style.display = "none";
        }

        // Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == configModal) {
                configModal.style.display = "none";
            }
        }


        /// inicio de sesion
        const modal6 = document.getElementById("myModal6");
        const openModalBtn6 = document.getElementById("openModalBtn6");
        const closeModalBtn6 = document.getElementById("closeModalBtn6");

        // Función para abrir el modal
        openModalBtn6.onclick = function() {
            modal6.style.display = "block";
        }

        // Función para cerrar el modal
        closeModalBtn6.onclick = function() {
            modal6.style.display = "none";
        }

        // Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal6.style.display = "none";
            }
        }
        // Obtén los elementos del DOM todos los equipos
        const modal3 = document.getElementById("myModal3");
        const openModalBtn3 = document.getElementById("openModalBtn3");
        const closeModalBtn3 = document.getElementById("closeModalBtn3");

        // Función para abrir el modal
        openModalBtn3.onclick = function() {
            modal3.style.display = "block";
        }

        // Función para cerrar el modal
        closeModalBtn3.onclick = function() {
            modal3.style.display = "none";
        }

        // Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == modal3) {
                modal3.style.display = "none";
            }
        }
        //modal orden de trabajo
        //elementos del modal 2 inicio de sesion
        // Obtén los elementos del DOM
        const modal2 = document.getElementById("myModal2");
        const openModalBtn2 = document.getElementById("openModalBtn2");
        const closeModalBtn2 = document.getElementById("closeModalBtn2");

        // Función para abrir el modal
        openModalBtn2.onclick = function() {
            modal2.style.display = "block";
        }

        // Función para cerrar el modal
        closeModalBtn2.onclick = function() {
            modal2.style.display = "none";
        }

        // Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal2.style.display = "none";
            }
        }


        // Obtén los elementos del modal 1 orden de trabajo
        const modal = document.getElementById("myModal");
        const openModalBtn = document.getElementById("openModalBtn");
        const closeModalBtn = document.getElementById("closeModalBtn");

        // Función para abrir el modal
        openModalBtn.onclick = function() {
            modal.style.display = "block";
        }

        // Función para cerrar el modal
        closeModalBtn.onclick = function() {
            modal.style.display = "none";
        }

        // Cerrar el modal cuando el usuario hace clic fuera del contenido del modal
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

      //btn de tipo de desbloqueo
      document.getElementById("tipoDes").addEventListener("change", function() {
            var value = this.value;
            document.getElementById("Contraseña").style.display = value === "contrasena" ? "block" : "none";
            document.getElementById("Patron").style.display = value === "patron" ? "block" : "none";
            document.getElementById("PINi").style.display = value === "PIN" ? "block" : "none";
        });


        //btn form send
        function confirmarEnvio2() {
            return confirm("¿Estás seguro de que deseas enviar el formulario?");
        }


        //codigo para la fecha
        const currentDateTimeInput = document.getElementById('currentDateTime'); 
        const now = new Date(); now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); 
        currentDateTimeInput.value = now.toISOString().slice(0, 16); 

        //codigo para los checkbox
        function toggleCheckbox(clickedCheckboxId, otherCheckboxId) {
                var clickedCheckbox = document.getElementById(clickedCheckboxId);
                var otherCheckbox = document.getElementById(otherCheckboxId);
                if (clickedCheckbox.checked) {
                    otherCheckbox.checked = false;
                }
            }
            // desbloqeu

        const unlockPatternCanvas = document.getElementById('unlockPattern');
        const unlockPatternCtx = unlockPatternCanvas.getContext('2d');
        const patternSize = 3;
        const nodeRadius = 15;
        const nodes = [];
        let path = [];
        let isDrawing = false;

        function createNodes() {
            const spacing = unlockPatternCanvas.width / (patternSize + 1);
            for (let row = 1; row <= patternSize; row++) {
                for (let col = 1; col <= patternSize; col++) {
                    const x = col * spacing;
                    const y = row * spacing;
                    nodes.push({ x, y });
                }
            }
        }

        function drawNodes() {
            unlockPatternCtx.clearRect(0, 0, unlockPatternCanvas.width, unlockPatternCanvas.height);
            nodes.forEach(node => {
                unlockPatternCtx.beginPath();
                unlockPatternCtx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
                unlockPatternCtx.stroke();
            });
        }

        function drawPath() {
            if (path.length < 2) return;
            unlockPatternCtx.beginPath();
            unlockPatternCtx.moveTo(nodes[path[0]].x, nodes[path[0]].y);
            unlockPatternCtx.strokeStyle = 'green';
            for (let i = 1; i < path.length - 1; i++) {
                unlockPatternCtx.lineTo(nodes[path[i]].x, nodes[path[i]].y);
                unlockPatternCtx.strokeStyle = 'black';
            }
            unlockPatternCtx.lineTo(nodes[path[path.length - 1]].x, nodes[path[path.length - 1]].y);
            unlockPatternCtx.strokeStyle = 'green';
            unlockPatternCtx.stroke();
        }

        function getNodeIndex(x, y) {
            return nodes.findIndex(node => Math.hypot(node.x - x, node.y - y) <= nodeRadius);
        }

        function startDrawing(e) {
            e.preventDefault();
            isDrawing = true;
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            const canvasRect = unlockPatternCanvas.getBoundingClientRect();
            const index = getNodeIndex(clientX - canvasRect.left, clientY - canvasRect.top);
            if (index !== -1 && !path.includes(index)) path.push(index);
        }

        function continueDrawing(e) {
            e.preventDefault();
            if (!isDrawing) return;
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            const canvasRect = unlockPatternCanvas.getBoundingClientRect();
            const index = getNodeIndex(clientX - canvasRect.left, clientY - canvasRect.top);
            if (index !== -1 && !path.includes(index)) {
                path.push(index);
                drawNodes();
                drawPath();
            }
        }

        function stopDrawing(e) {
            e.preventDefault();
            isDrawing = false;
            drawNodes();
            drawPath();
            console.log('Pattern:', path);
            endPattern();
            
            path = [];
        }
        



        function endPattern() {
        console.log('Pattern:', path);

        // Convertir el array en una cadena JSON
        const patternString = JSON.stringify(path);

        // Establecer el valor del input oculto
        document.getElementById('patternInput').value = patternString;

        // Reiniciar el array
        path = [];
        }


        unlockPatternCanvas.addEventListener('mousedown', startDrawing);
        unlockPatternCanvas.addEventListener('mousemove', continueDrawing);
        unlockPatternCanvas.addEventListener('mouseup', stopDrawing);

        unlockPatternCanvas.addEventListener('touchstart', startDrawing);
        unlockPatternCanvas.addEventListener('touchmove', continueDrawing);
        unlockPatternCanvas.addEventListener('touchend', stopDrawing);

        // Prevenir comportamiento de arrastre predeterminado
        unlockPatternCanvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
        
        createNodes();
        drawNodes();



        function validateLength(input) 
    { if (input.value.length > 15) { input.value = input.value.slice(0, 15); } }




