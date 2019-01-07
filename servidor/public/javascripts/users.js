//lista de usuarios
//---------------------------------------
$.ajax('/api/users')

.done(function (data){
    
    for (let i = 0; i < data.length; i++) {
    $('.body_table').append(`
    <tr class="row_body" id="${data[i].id}">       
        <td class="user_row">${data[i].nombre} </td>
        <td class="user_row">${data[i].apellido}</td>
        <td class="user_row">${data[i].telefono}</td>
        <td class="user_row">${data[i].email}</td>
        <td class="user_edit">
        <a href="/users/edit?id=${data[i].id}"><i class="fas fa-pencil-alt"></i></a>
        </td>
        <td class="user_edit">
        <i class="fas fa-trash-alt" id="remove_user"></i>
        </td>
    </tr>`)
    }

})


$(document).on('click', '#remove_user', function(){
    $('#box_message').removeClass('hidden');
    $('.modal').removeClass('hidden');
}) 


$('.button_remove').on('click', function(){
    $.ajax('/api/users/'+ id,{
        method: "DELETE",
        success: function () {
            $('#' + id).remove();
        }
    })
})

$('.button_cancel').on('click', function(){
        location.href= '/users'; 
     
})

//eliminar(${data[i].id})
// function eliminar(id) {
//     $.ajax('/api/users/'+ id,{
//         method: "DELETE",
//         success: function () {
//             $('#' + id).remove();
//         }
//     })
// }


//filtrar búsqueda
//------------------------------------
$('#form_filter button').on('click', function () {
    const filtro = $('#form_filter input').val();
    $.ajax('/api/users?search=' + filtro)
    .done( function (data) { 
        $('.row_body').remove();
        for (var i = 0; i < data.length; i++){
            $('.body_table').append(`
            <tr class="row_body" id="${data[i].id}">       
                <td class="user_row">${data[i].nombre} </td>
                <td class="user_row">${data[i].apellido}</td>
                <td class="user_row">${data[i].telefono}</td>
                <td class="user_row">${data[i].email}</td>
                <td class="user_edit">
                <a href="/users/edit?id=${data[i].id}"><i class="fas fa-pencil-alt"></i></a>
                </td>
                <td class="user_edit">
                <i class="fas fa-trash-alt"onclick="eliminar(${data[i].id})"></i>
                </td>
            </tr>  
         `);  
        }         
    })   
})


//agregar usuario
//------------------------------------

$('#new').on('click', function() {
    const match_only_letters = /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]/;
    const test_telephone = /^\d{10}$/;
    const test_email = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{13}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    
    let nombre= $('#nombre').val();
    let apellido = $('#apellido').val();
    let telefono = $('#telefono').val();
    let email = $('#email').val();
    
    if (nombre.length === 0 || nombre.length >= 30 || !match_only_letters.test(nombre) ) {
        $('.error_name').removeClass('hidden');
        setTimeout(function () {
            $('.error_name').addClass('hidden');

        },3000);
    }
    
    if(apellido.length === 0 || apellido.length >= 30 || !match_only_letters.test(apellido) ) {
        $('.error_surname').removeClass('hidden');
        setTimeout(function () {
            $('.error_surname').addClass('hidden');

        },3000);
    } 
      
    if( !test_telephone.test(telefono) ) {
        $('.error_phone').removeClass('hidden');
        setTimeout(function () {
            $('.error_phone').addClass('hidden');

        },3000);
    } 
    
    if( !test_email.test(email) ){
        $('.error_email').removeClass('hidden');
        setTimeout(function () {
            $('.error_email').addClass('hidden');

        },3000);
    }

  var newUser = {
    nombre : nombre,
    apellido : apellido,
    telefono : telefono,
    email: email
  } 

  $.ajax('/api/users', {
      method: 'POST',
      data: newUser,

      success: function(){
        // alert('usuario creado');
        $('#box_message').removeClass('hidden');
            $('.modal').removeClass('hidden');
            setTimeout(function () {
            $('#box_message').addClass('hidden');
            $('.modal').addClass('hidden');

        },3000);
        
        location.href= '/users'; 
    }

  })




})


