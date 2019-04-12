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