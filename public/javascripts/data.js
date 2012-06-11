$(document).ready(function(){
  var tag_taxo = 'elfilo.net/drupalblog/Audio_vídeo_interacción'; 
  var resultado;
  var count = 0;
  var options = {
      username: 'username', // your fluidinfo username
      password: 'password',
      instance: 'main'
    };
  var anonimo = {};

   var session = fluidinfo(anonimo);

   var tagValOptions = {
     about: 'interzonas.elfilo.net:vocabulary:nodos',
     select: 'elfilo.net/drupalblog/Audio_vídeo_interacción',
     onSuccess: function(res){
       taxos(res);
       return res
    },
     onError: function(err){
      console.log(err);
     }
   }
   session.getObject(tagValOptions); 

   var taxos = function(res){
     var terminos = res.data[tag_taxo];
     for (var i = 0; i < terminos.length; i++) {
       recoger(terminos[i]);
     };
   }
   var paquete = [];
   var recoger = function(res){
     var options = {
       select: ["elfilo.net/drupalblog/title"],
       where: 'elfilo.net/drupalblog/Audio_vídeo_interacción matches "'+res+'"',
       onSuccess: function(resultado){
         // console.log(res+': '+resultado.data.length);
         console.log(res);
       },
       onError: function(err){
         console.log(err);
       }
     }
     session.query(options);
    }

  var datos = function(data){
    resultado = data;
    console.log(data);

  }
});
