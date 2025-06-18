const socket = io();
const form = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

form.addEventListener('submit', function (event) {
    console.log('asd');

    event.preventDefault();
    const message = messageInput.value;
    socket.emit('message', 'hola');
    if (message) {
        socket.emit('message', message);
        messageInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {

    socket.on('nuevaNotificacion', data => {
        const container = document.getElementById('notificacionesContainer');
        const nueva = `
      <div class="alert alert-info p-2 mb-2">
        <strong>${data.titulo}</strong><br>
        <small>${data.mensaje}</small>
      </div>
    `;
        container.insertAdjacentHTML('afterbegin', nueva);
        actualizarContador(+1);
    });

    async function cargarNotificaciones() {
        try {
            const res = await fetch('/notifications');
            const data = await res.json();
            const container = document.getElementById('notificacionesContainer');
            if (data.length === 0) {
                container.innerHTML = '<p class="text-muted">Sin notificaciones nuevas.</p>';
            } else {
                container.innerHTML = data.map(n => `
          <div class="alert alert-info p-2 mb-2">
            <strong>${n.titulo}</strong><br>
            <small>${n.mensaje}</small>
          </div>
        `).join('');
            }
            document.getElementById('contadorNotif').textContent = data.length;
        } catch (err) {
            console.error(err);
        }
    }

    function actualizarContador(delta) {
        const el = document.getElementById('contadorNotif');
        el.textContent = parseInt(el.textContent || '0') + delta;
    }

    const panel = document.getElementById('panelNotificaciones');
    panel.addEventListener('show.bs.offcanvas', cargarNotificaciones);
});