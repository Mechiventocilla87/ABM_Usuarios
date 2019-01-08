const express = require('express');
var path = require('path'); 
const fs = require('fs');

const router = express.Router();

const users = fs.readFileSync('users.json');

//fs.writeFileSync('users.json', JSON.stringify(users));

/* GET home page. */
router.get('/ping', function(req, res, next) {
  res.send('- ¡Pong! -');
});

router.get('/users', function(req, res, next) {
   
  res.sendFile(path.join(__dirname, "..","public","html", "index.html") );
  
});

router.get('/users/new', function(req, res, next) {
   
  res.sendFile(path.join(__dirname, "..","public","html", "new.html") );
  
});

router.get('/users/edit', function(req, res, next) {
   
  res.sendFile(path.join(__dirname, "..","public","html", "edit.html") );
  
});

//-------------------------------------------------------------------

router.get('/api/users', function(req, res, next) {

  let contenidoDeMiUsers = users;
  contenidoDeMiUsers = JSON.parse(contenidoDeMiUsers);

  const busqueda = req.query.search;

  if(busqueda && busqueda.length > 0){
    
    contenidoDeMiUsers = contenidoDeMiUsers.filter(function (u) {
      return u.nombre.toLowerCase().indexOf(busqueda.toLowerCase())>=0||
      u.apellido.toLowerCase().indexOf(busqueda.toLowerCase()) >= 0 ||
      u.telefono.toLowerCase().indexOf(busqueda.toLowerCase()) >= 0 ||
      u.email.toLowerCase().indexOf(busqueda.toLowerCase()) >= 0 
    }); 

  }

  res.json(contenidoDeMiUsers);
  
  console.log(contenidoDeMiUsers);

});

//-------------------------------------------------------------------

router.post('/api/users', function(req, res, next) {

  let contenidoDeMiUsers = users;
  contenidoDeMiUsers = JSON.parse(contenidoDeMiUsers);
  
  const user = req.body;

  const match_only_letters = /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]/;
  const test_telephone = /^\d{10}$/;
  const test_email = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{13}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;


  if (user.nombre.length === 0 || user.nombre.length >= 30 || !match_only_letters.test(user.nombre) ) {
      return res.status(400).end('el nombre que queres agregar, es incorrecto');    
  }

  if(user.apellido.length === 0 || user.apellido.length >= 30 || !match_only_letters.test(user.apellido) ) {
      return res.status(400).end('el apellido que queres agregar, es incorrecto');
  } 
    
  if( !test_telephone.test(user.telefono) ) {
      return res.status(400).end('el telefono que queres agregar, es incorrecto');
  } 
  
  if( !test_email.test(user.email) ){
      return res.status(400).end('el mail que queres agregar, es incorrecto');
  }
  

  const newId = contenidoDeMiUsers.length === 0 ? (1) : (contenidoDeMiUsers[contenidoDeMiUsers.length - 1].id + 1);
  
  user.id = newId
  
  contenidoDeMiUsers.push(user);

  fs.writeFileSync('users.json', JSON.stringify(contenidoDeMiUsers));
  
  res.json(contenidoDeMiUsers)

  console.log(contenidoDeMiUsers);
   
});

//-------------------------------------------------------------------

router.get('/api/users/:id', function(req, res) {

  let contenidoDeMiUsers = users;
  contenidoDeMiUsers = JSON.parse(contenidoDeMiUsers);

  const id = req.params.id;

  for (let i = 0; i < contenidoDeMiUsers.length; i++) {
    if (contenidoDeMiUsers[i].id == id) {
      return res.json(contenidoDeMiUsers[i]);
    }
  }
});

//-------------------------------------------------------------------

router.put('/api/users/:id', function(req, res, next) {

  let contenidoDeMiUsers = users;
  contenidoDeMiUsers = JSON.parse(contenidoDeMiUsers);

  console.log(contenidoDeMiUsers);
  
  const id = req.params.id;

  const body = req.body;

  const match_only_letters = /^[a-zA-Z áéíóúÁÉÍÓÚñÑ]/;
  const test_telephone = /^\d{10}$/;
  const test_email = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{13}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;


  if (body.nombre.length === 0 || body.nombre.length >= 30 || !match_only_letters.test(body.nombre) ) {
      return res.status(400).end('el nombre que queres agregar, es incorrecto');    
  }

  if(body.apellido.length === 0 || body.apellido.length >= 30 || !match_only_letters.test(body.apellido) ) {
      return res.status(400).end('el apellido que queres agregar, es incorrecto');
  } 
    
  if( !test_telephone.test(body.telefono) ) {
      return res.status(400).end('el telefono que queres agregar, es incorrecto');
  } 
  
  if( !test_email.test(body.email) ){
      return res.status(400).end('el mail que queres agregar, es incorrecto');
  }
  


  for (var i = 0; i < contenidoDeMiUsers.length; i++) {
    if (contenidoDeMiUsers[i].id == id) {
      contenidoDeMiUsers[i].nombre = body.nombre;
      contenidoDeMiUsers[i].apellido = body.apellido;
      contenidoDeMiUsers[i].telefono = body.telefono;
      contenidoDeMiUsers[i].email = body.email;

    }
  }


  fs.writeFileSync('users.json', JSON.stringify(contenidoDeMiUsers));

  res.json(contenidoDeMiUsers);

  console.log(contenidoDeMiUsers);
  

});

//-------------------------------------------------------------------

router.delete('/api/users/:id', function(req, res, next) {

  let contenidoDeMiUsers = users;
  contenidoDeMiUsers = JSON.parse(contenidoDeMiUsers);

  const id = req.params.id 

  for (var i = 0; i < contenidoDeMiUsers.length; i++) {
     if (contenidoDeMiUsers[i].id == id){
      contenidoDeMiUsers.splice(i, 1)
    }

    console.log(contenidoDeMiUsers);

  } 
  
  fs.writeFileSync('users.json', JSON.stringify(contenidoDeMiUsers));

  res.send('todo bien')

});

module.exports = router;
 