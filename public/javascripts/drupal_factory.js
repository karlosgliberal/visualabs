var drupal = {};
  drupal.datos ={};
  drupal.datos.self = this;
  drupal.datos.termNodos = {};
  drupal.datos.caja = [];
  drupal.datos.session_anonima = {};
  drupal.datos.count = 0;
  drupal.datos.session = fluidinfo(drupal.datos.session_anonima);

  drupal.datos.vocabularioNodos =  [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ];
  drupal.datos.objetoFluidNodos = "interzonas.elfilo.net:vocabulary:nodos";

  var fluidinfoGetObject =  function(term, callback){
    var tagValOptions = {
      about: 'interzonas.elfilo.net:vocabulary:nodos',
      select: 'elfilo.net/drupalblog/Fabricación_digital',
      onSuccess: function(res){
        for(clave in res.data){
          if(clave !== 'id'){
            if (callback && typeof(callback) === "function") {
              callback(res);
            }
          }
        }
        // console.log(res.data);
      },
      onError: function(err){
        console.log(err);
      }
    }
    drupal.datos.session.getObject(tagValOptions); 
  } 

  drupal.datos.Init = function(){
    (function () {
      fluidinfoGetObject(drupal.datos.vocabularioNodos, function(res){
        drupal.datos.caja = res.data['elfilo.net/drupalblog/Fabricación_digital'];
      })
    }());

    this.get = function (where) {
      return drupal.datos.caja;
    };
  }

  drupal.datos.factory = function (type) {
    return new drupal.datos[type];
  }
