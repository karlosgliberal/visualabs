var Drupal = function(){

  datos = {}; 
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
    console.log(this.nodos());
    var total = {"clave": "valor"};
    return total;
  }

  var acceso_fluidinfo = function(){
    var resultados = "res";
    var nodos = [];
    var session_anonima = {}
    var session = fluidinfo(session_anonima);
    var options = {
      path: "namespaces/elfilo.net/drupalblog",
      args: {
        returnDescription: true,
        returnTags: true
      },
      onSuccess: function(result) {console.log(result);},
      onError: function(result) { /* handle any problems */ }
   };
   console.log(session.api.get(options));

    this.nodos = function(){
      return "nodos";
    }

    return resultados;
  }

  return datos;
};


