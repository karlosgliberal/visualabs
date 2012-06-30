var Drupal = function(){
  var self = this;
  var termNodos = {};
  var session_anonima = {};
  var count = 0;
  var session = fluidinfo(session_anonima);

  var vocabularioNodos =  [
    "elfilo.net/summeroflabs/Audio_vídeo_interacción", 
    "elfilo.net/summeroflabs/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/summeroflabs/Dispositivos_móviles", 
    "elfilo.net/summeroflabs/Fabricación_digital"
  ];

   
  this.fluidQuery = function(key, maches){
    var pr = new promise.Promise();
   var options = {
     // select: ["elfilo.net/summeroflabs/title", "elfilo.net/summeroflabs/Audio_vídeo_interacción", "elfilo.net/summeroflabs/Cacharreo_Aprendizaje_Hacking_Diy", "elfilo.net/summeroflabs/Dispositivos_móviles", "elfilo.net/summeroflabs/Fabricación_digital", "about"],
     select: ["elfilo.net/summeroflabs/title"],
     where: key + ' matches "'+maches+'"',
     onSuccess: function(resultado){
       var fluidObjQuery = {objeto: resultado, titulo: maches, llave:key};
       pr.done(null, fluidObjQuery);
     },
     onError: function(err){
       console.log(err);
     }
   }
   session.query(options);
   return pr;
  };

  this.fluidinfoGetObject =  function(term){
    var p = new promise.Promise();
    var tagValOptions = {
      about: 'summeroflabs.eu:vocabulary:nodos',
      select: term,
      onSuccess: function(res){
        for(clave in res.data){
          if(clave !== 'id'){
            var fluidObj = {clave: clave, titulo: res.data[clave]};
            p.done(null, fluidObj);
          }
        }
      },
      onError: function(err){
        console.log(err);
      }
    }
    session.getObject(tagValOptions);
    return p;
  }


}; 

