var Visualizacion = function(){
  var circles;
  var width = 940;
  var height = 600;
  var container = document.getElementById("paper");
  var paper = Raphael(container, width, height);
  var tags = [];
  var tagNumero = {};
  var count = 0;
  var start = 0;
  var ancho = 150; 
  var drupal = new Drupal();

  var vocabularioNodos =  [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ];
  var init = function(){
    var p = new promise.Promise();
    for (var i = 0; i < vocabularioNodos.length; i++) {
      drupal.fluidinfoGetObject(vocabularioNodos[i], function(res, clave){
        p.done(null, res);
        // createCircle(clave, res);
      });
      return p
    };
  };

  promise.join([
      function() {
          return init;
   },]).then(function(errors, values) {
      console.log(values);
   });

  
  var createCircle = function(tag, nodos){
    radioCirculo(tag, nodos, function(res){
      var nombreCategoria = tag.split("/");
      var c = paper.circle(ancho, 150, 20*res);
      c.attr({fill: '#ccc', "stroke": "#dddddd", "opacity":1});
      var infoCirulo = c.getBBox(true);
      var centroX = c.attr("cx");
      var centroY = c.attr("cy");
      ancho = ancho + infoCirulo.height;
      var t = paper.text(centroX, centroY, nombreCategoria[2]);
      t.attr({fill: "#000", stroke: "none",  opacity: 1, "font-size": 12});
    });
  };

  var radioCirculo = function(tag, nodos, cb){
    for (var i = 0; i < nodos.length; i++) {
      drupal.fluidQuery(tag, nodos[i], function(res){
        cb(res.data.length);
        console.log(i);
      });
    };
  };

  var inArray = function(arr,obj) {
      return (arr.indexOf(obj) != -1);
  };

  Array.prototype.remove= function(){
      var what, a= arguments, L= a.length, ax;
      while(L && this.length){
              what= a[--L];
              while((ax= this.indexOf(what))!= -1){
                          this.splice(ax, 1);
                      }
          }
      return this;
  };
}



