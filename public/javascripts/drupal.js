var Drupal = function(){

  datos = {};
  datos.vocabularioNodos = [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ];

  datos.objetoFluidNodos = "interzonas.elfilo.net:vocabulary:nodos";

  datos.todos = {};

  datos.inscripcion = function(){
    var inscritos = "aitor";
    var private = acceso_fluidinfo();
    var res = inscritos + private;
    return res; 
  };

  datos.nodos = function(){
    var term = datos.vocabularioNodos;
    var resultado_nodos = new Array();
    fluidinfoGetObject(term, function(res, key){
      // console.log("De la catagoria: "+ key + " Tenemos estos valores: " + res.length);
      datos.todos[key] = res;
    });
  }

  var fluidinfoGetObject = function(term, cb){
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
  }

  return datos;
};


