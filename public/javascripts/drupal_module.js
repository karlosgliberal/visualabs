var Drupal = (function () {

  var counter = 0;
  var self = this;
  var termNodos = {};
  var tamanos = [];
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
          },
          onError: function(err){
            console.log(err);
          }
        }
        session.getObject(tagValOptions); 
      }
    }
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

  return {
    init: function (callback) {
      fluidinfoGetObject(vocabularioNodos, function(res, key){
        for (var i = 0; i < res.length; i++) {
          fluidQuery(key, res[i], function(res, maches){
           tamanos = [res.data.length];
           termNodos[maches] = [res.data.length, key];
           callback(termNodos, key);
          });
        };
      });
    },

    getValue: function (cb) {
      for(key in termNodos){
        console.log(key);
        return key
      }
      // return termNddodos;
    }
  };

})();
