var Drupal = function() {
  var self = this;
  var termNodos = {};
  var session_anonima = {};
  var count = 0;
  var session = fluidinfo(session_anonima);

  var vocabularioNodos =  [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ];
  var objetoFluidNodos = "interzonas.elfilo.net:vocabulary:nodos";
  
  this.nodos = function(cb){
    fluidinfoGetObject(vocabularioNodos, function(res, key){
      for (var i = 0; i < res.length; i++) {
        fluidQuery(key, res[i], function(res, maches){
         termNodos[maches] = [res.data.length, key];
           cb(termNodos);
        });
      };
    });
    return termNodos;
  };
   
  var fluidQuery = function(key, maches, cb){
   var options = {
     select: ["elfilo.net/drupalblog/title"],
     where: key + ' matches "'+maches+'"',
     onSuccess: function(resultado){
       cb(resultado, maches);
     },
     onError: function(err){
       console.log(err);
     }
   }
   session.query(options);
  };

  var fluidinfoGetObject =  function(term, cb){
    for(key in term){
      if (term.hasOwnProperty(key)) {
        var tagValOptions = {
          about: 'interzonas.elfilo.net:vocabulary:nodos',
          select: term[key],
          onSuccess: function(res){
            for(clave in res.data){
              if(clave !== 'id'){
                cb(res.data[clave], clave);
              }
            }
            // console.log(res.data);
          },
          onError: function(err){
            console.log(err);
          }
        }
        session.getObject(tagValOptions); 
      }
    }
  };

}//
