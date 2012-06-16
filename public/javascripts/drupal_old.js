var Drupal =  {
  datos: {},
  termNodos:  {},
  vocabularioNodos: [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ],

  objetoFluidNodos: "interzonas.elfilo.net:vocabulary:nodos",

  inscripcion: function(datos){
    // console.log(datos.termNodos["elfilo.net/drupalblog/Audio_vídeo_interacción"]);
  },

  fluidQuery: function(){
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
  },
  
  nodos: function(){
    var term = this.vocabularioNodos;
    var that = this;
    this.fluidinfoGetObject(term, function(res, key){
      // console.log("De la catagoria: "+ key + " Tenemos estos valores: " + res.length);
      // var termNodos[key] = [res];
    });
  },

  fluidinfoGetObject:  function(term, cb){
    var session_anonima = {}
    var session = fluidinfo(session_anonima);
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
  },

  // Object.size = function(obj) {
  //   var size = 0, key;
  //   for (key in obj) {
  //       if (obj.hasOwnProperty(key)) size++;
  //   }
  //   return size;
  // };

  // return datos;
};


