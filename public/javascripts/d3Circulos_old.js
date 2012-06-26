var Visualizacion = function(){
  var drupal = new Drupal();

var width = 960,
    height = 500,
    radius = 50;

var svg = d3.select("#paper").append("svg")
    .attr("width", width)
    .attr("height", height)

 var obj = {};
 var arr = [];
 var count = 20;

 this.init = function(){
    promise.join([
        function() {
            return drupal.fluidinfoGetObject("elfilo.net/drupalblog/Audio_vídeo_interacción");
        },
        function() {
            return drupal.fluidinfoGetObject("elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy"); 
        },
        function() {
            return drupal.fluidinfoGetObject("elfilo.net/drupalblog/Dispositivos_móviles");
        },
        function() {
            return drupal.fluidinfoGetObject("elfilo.net/drupalblog/Fabricación_digital");
        }
    ]).then(
        function(err, values) {
          getFluidObj(values);
        }
    );
  };

  var getFluidObj = function(values){
    for(var i = 0; i <  values.length; i++){
      for(var j = 0; j < values[i].titulo.length; j++){
        var p = drupal.fluidQuery(values[i].clave, values[i].titulo[j]);
          p.then(function(err, val){
            var datos = {titulo: val.titulo, numero: val.objeto.data.length, llave:val.llave};
            pintar(datos);
          })
      };
    }
  };
  
  var pintar = function(datos){
    console.log(count);
    var circle = svg.append("circle")
    .data([{x: 100 + count, y: 100}])
    .attr("r", radius + datos.numero)
    .attr("cx", function(d) { return d.x; })
    .attr("cy", function(d) { return d.y; })
    count = count + 100;
    //console.log(val[0].clave.data.length +" : "+ val[0].titulo);
  }


  var createCircle = function(tag, nodos){
  };

}



