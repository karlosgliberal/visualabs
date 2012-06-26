var Drupal = function(){
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

  // this.init = function(vis){
  //     fluidinfoGetObject(vocabularioNodos, function(res, key){
  //       for (var i = 0; i < res.length; i++) {
  //         fluidQuery(key, res[i], function(res, maches){
  //           termNodos[maches] = [res.data.length, key];
  //           console.log(count);
  //           vis.init(maches, res.data.length, key);
  //           count++;
  //         });
  //       };
  //     });
  //  };
   
  this.fluidQuery = function(key, maches){
    var pr = new promise.Promise();
   var options = {
     select: ["elfilo.net/drupalblog/title", "elfilo.net/drupalblog/Audio_vídeo_interacción", "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", "elfilo.net/drupalblog/Dispositivos_móviles", "elfilo.net/drupalblog/Fabricación_digital", "about"],
     //select: ["elfilo.net/drupalblog/title"],
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
      about: 'interzonas.elfilo.net:vocabulary:nodos',
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

