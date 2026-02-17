import { buscarId, eliminar, guardar, listar, modificar } from "./connection.js"
const formulario = document.getElementById('formFutbol')
let id
let estadoGuardar = false

formulario.addEventListener('submit', async (e) => {
let buena = ''
    if(document.getElementById('Derecho').checked)
        buena = 'Derecho'
    else if(document.getElementById('Izquierdo').checked)
        buena = 'Izquierdo'

let actual = ''
    if(document.getElementById('Activo').checked)
        actual = 'Activo'
    else if(document.getElementById('Inactivo').checked)
        actual = 'Inactivo'
  
    e.preventDefault()
    document.getElementById('nombre').readOnly = false
    const nombre = document.getElementById('nombre').value.trim()
    const equipo = document.getElementById('equipo').value.trim()
    const pais = document.getElementById('pais').value
    const edad = document.getElementById('edad').value.trim()
    const fecha = document.getElementById('fecha').value.trim()
    const posicion = document.getElementById('posicion').value.trim()
    const pie = buena
    const estado = actual

    if (nombre === '' || equipo === '' || pais === '' || edad === '' || fecha === '' || posicion === '' || pie === '' || estado === '') {
      
      Swal.fire({
        title: 'Error, Debe completar todos los campos',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return;
    }
    
    const fechaActual = new Date();
    const fechaIngresada = new Date(fecha);
    if (fechaIngresada > fechaActual) {
      Swal.fire({
        title: 'Error, La fecha ingresada es mayor a la fehca actual',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return;
    }

    if (edad <= 0) {
      Swal.fire({
        title: 'Error, Ingrse una edad válida',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
      return;
    }

    

    else if (!estadoGuardar){
        const save = await guardar(nombre, equipo, pais, edad, fecha, posicion, pie, estado)
        if (save !== '')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado Con Exito',
          showConfirmButton: false,
          timer: 1500
        })
    }
    
    else {
        const registro = {
            nombre,
            equipo,
            pais,
            edad,
            fecha,
            posicion,
            pie,
            estado
        }
        await modificar(id, registro)
         Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Editado Con Exito',
          showConfirmButton: false,
          timer: 1500
        })
    }
    id = ''
    estadoGuardar = false
    formulario.reset() 
})

window.addEventListener('DOMContentLoaded',async() =>{
    listar(datos =>{
        let tabla = ''        
        datos.forEach(registro => {
            const j = registro.data()
            let img = ''
            let color = ''
            switch (j.posicion) {
                case 'Delantero':
                  img = 'delantero.png';
                  color = 'bg-danger '
                  break;
                case 'Mediocampista':
                  img = 'medio.png';
                  color = 'bg-warning'
                  break;
                case 'Defensor':
                  img = 'defensa.png';
                  color = 'bg-primary'
                  break;
                case 'Portero':
                  img = 'portero.png';
                  color = 'bg-secondary'
                  break;
                default:
                  img = '';
              }
            tabla += ` 
            <div class="card mb-2 ${color} me-3" style="max-width: 420px;">
            <div class="row g-0">
              <div class="col-md-3">
                <img src="${img}" class="img-fluid rounded-start imagen" style="width: 300px; height: 250px; margin-top:60px ">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${j.nombre}</h5>
                  <ul class="list-group list-group-flush borde">
                    <li class="list-group-item">Equipo: ${j.equipo}</li>
                    <li class="list-group-item">Pais: ${j.pais}</li>
                    <li class="list-group-item">Edad: ${j.edad}</li>
                    <li class="list-group-item">Debut: ${j.fecha}</li>
                    <li class="list-group-item">Posición: ${j.posicion}</li>
                    <li class="list-group-item">Pie habil: ${j.pie}</li>
                    <li class="list-group-item">Estado: ${j.estado}</li>         
                  </ul>
                    <div class="text-end mt-1">
                      <button class="btn btn-outline-light" name="editar" id="${registro.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                      <button class="btn btn-outline-dark" name="eliminar "id="${registro.id}"><i class="fa-solid fa-trash-can"></i>    </button>    
                    </div> 
                </div>
              </div>
            </div>
            </div>`
        })
        document.getElementById('listar').innerHTML = tabla
        
        document.querySelectorAll('.btn-outline-dark').forEach(btn => {
          btn.addEventListener('click', () => {
            Swal.fire({
              title: '¿Estás seguro que deseas eliminar este registo?',
              text: 'Luego NO podrás recuperar sus datos',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Sí, estoy seguro'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  '¡Eliminado!',
                  'El jugador ha sido eliminado.',
                  'success'
                );
                eliminar(btn.id);
                
              }
            });
          });
        })

        document.querySelectorAll('.btn-outline-light').forEach(btn =>{
            btn.addEventListener('click', async (e) => {
                const registro = await buscarId(e.currentTarget.id)
                const j = registro.data()
                document.getElementById('nombre').readOnly = true
                document.getElementById('nombre').value = j.nombre
                document.getElementById('equipo').value = j.equipo
                document.getElementById('pais').value = j.pais
                document.getElementById('edad').value = j.edad
                document.getElementById('fecha').value = j.fecha
                document.getElementById('posicion').value = j.posicion
                document.getElementById('Derecho').checked = j.pie == 'Derecho'
                document.getElementById('Izquierdo').checked = j.pie == 'Izquierdo'
                document.getElementById('Activo').checked = j.estado == 'Activo'
                document.getElementById('Inactivo').checked = j.estado == 'Inactivo'
                id = registro.id
                estadoGuardar = true  
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'});  
                  
            })
        })
    })
})

const campos = document.querySelectorAll('.campo');

campos.forEach(campo => {
  campo.addEventListener('blur', (e) => {
    const valor = e.target.value.trim();

    if (valor === '') {
      Swal.fire({
        title: 'Error, el campo no puede estar vacío',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    }
  });
});

const limpiar = document.getElementById('limpiar');
limpiar.addEventListener('click', (e) => {
  e.preventDefault() 
  id = ''
  estadoGuardar = false
  formulario.reset() 
  document.getElementById('nombre').readOnly = false
 
});

window.addEventListener('scroll', function() {
  const volver = document.getElementById('volver');
  if (window.scrollY > 300) {
    volver.style.display = 'block';
  } else {
    volver.style.display = 'none';
  }
});

document.getElementById('volver').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
