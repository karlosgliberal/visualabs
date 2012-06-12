var Drupal = function(){

  datos = {};
  datos.vocabularioNodos = [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ];

  datos.objetoFluidNodos = "interzonas.elfilo.net:vocabulary:nodos";

  datos.todos;
  datos.nodos = function(){
    var tags = ["hola", "hola2"];
    return tags;
  };

  datos.inscripcion = function(){
    var inscritos = "aitor";
    var private = acceso_fluidinfo();
    var res = inscritos + private;
 
    return res; 
  };

  datos.totales = function(){
    acceso_fluidinfo(function(tt){
     datos.todos =  tt.data.tagNames;
    });
    return datos.todos;
  }

  var acceso_fluidinfo = function(cb){
    var resultados = "res";
    var session_anonima = {}
    var session = fluidinfo(session_anonima);
    var options = {
      path: "namespaces/elfilo.net/drupalblog",
      args: {
        returnDescription: true,
        returnTags: true
      },
      onSuccess: function(result) {
        cb(result)
      },
      onError: function(result) { /* handle any problems */ }
   };
   session.api.get(options);
  }

  return datos;
};


