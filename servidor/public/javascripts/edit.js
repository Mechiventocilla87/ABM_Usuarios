//editar usuario
//----------------------------------------
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("id");

console.log(myParam);

$.ajax('/api/users/'+ myParam)

.done(function (data){

    console.log(data);

    $('.form_edit').append(`
    
        <p>Nombre</p>
        <input  id="nombre" type="text" value="${data.nombre}">
        <div class="error_name hidden"><p>El nombre introducido no es válido</p></div>
        <p>Apellido</p>
        <input  id="apellido" type="text" value="${data.apellido}">
        <div class="error_surname hidden"><p>El nombre introducido no es válido</p></div>
        <p>Telefono</p>
        <input  id="telefono" type="number" value="${data.telefono}">
        <div class="error_phone hidden"><p>El nombre introducido no es válido</p></div>
        <p>Email</p>
        <input id="email" type="text" value="${data.email}">
        <div class="error_email hidden"><p>El nombre introducido no es válido</p></div>
        <button id="put" type="button">Editar</button>          

    `)
    
})


$(document).on("click","#put", function () {
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

    

    $.ajax('/api/users/'+ myParam,{

        method:"PUT",

        data: {
            nombre:nombre,
            apellido: apellido,
            telefono: telefono,
            email: email
        },

        success: function(data){
            //  alert('usuario creado');
            $('#box_message').removeClass('hidden');
            $('.modal').removeClass('hidden');
            setTimeout(function () {
            $('#box_message').addClass('hidden');
            $('.modal').addClass('hidden');

            },3000);

            $('#button_volver').on('click', function(){
                location.href= '/users'; 
    
            });

        },
        
        

    })

    

})

