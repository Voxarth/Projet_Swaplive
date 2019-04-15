function loadUser(idUser){
  // charger les données utilisateur
  $.ajax({
    url : '/users/'+idUser,
    method : 'GET'
  }).done(function(res){
    // charger la liste des conversations
    $.ajax({
      url : '/tchat/?idUser='+idUser,
      method : 'GET'
    }).done(function(res){
      // afficher la liste des conversations
      $('.page').hide() ;
      $('#conversations').show() ;
      // pour chaque conversation dans res
      // => ajouter le html dans le #conversations
    })
  })
}

$('#createAccount').on('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault() ;
  var data = {} ;
  $(this).serializeArray().map(function(x){data[x.name] = x.value;});
  console.log(data) ;
  
  $.ajax({
    url : $(this).attr('action'),
    method : $(this).attr('method'),
    data : data
  }).done(function(res){
    console.log(res) ;
    // recuperation cpt utilisateur
    loadUser(res.id)
  })
})

function afficheMsg(message) {
  $('#messages').append('<aside><span class="message">'+
  message.msg+'</span><span class="user">'+
  message.user.pseudo+'</span></aside>') ;
}
 
//////////////////*ajouter un message dans la conversation*///////////////
// ajout msg/discu POST     /tchat/$idTchat
$('#newMsg').on('submit', function(evt){
  evt.stopPropagation();
  evt.preventDefault();
  var text = $('#newMsg [name=msg]').val();
  var user = { };
  $.ajax({
    url :'/tchat/'+idtchat,
    methode : 'POST',
    data : {msg:text, user:user}
  }).done(function(res){
    console.log(res) ;
   afficheMsg(res)
    // $('.page').hide() ;
    // $('#conversations').show() ;
  })
})
///////////////////////*bannir un utilisateur*////////////////////////
// bann user       DELETE      /tchat/$idTchat/$idUser

$.ajax({
  url : $(this).attr('action'),
  method : $(this).attr('method'),
  data : data
}).done(function(res){
  console.log(res) ;
// recuperer utilisateur
  loadUser(res.id)
})
$.ajax({
  url :'/tchat/?idUsers='+idUser,
  methode : 'delete'
}).done(function(res){
  console.log(res) ;
  $('.page').hide() ;
      $('#conversations').show() ;
})