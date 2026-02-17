function foco(id){
    const input = document.getElementById(id).value
  
    const div = document.getElementById('e'+id)
    if(input.trim() == ''){
      div.innerHTML = '<span class="badge bg-danger">Debe ingresar el campo <i class="fa-solid fa-circle-exclamation"></i></span>'
      
    }
    else{
      div.innerHTML = ''
  }
}

function validarEdad(input) {
  input.value = input.value.replace(/\D/g, '');
}

