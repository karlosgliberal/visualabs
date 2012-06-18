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
  var ancho = 100; 

  var vocabularioNodos =  [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ];

  this.init = function(nodos, tag, apuntados){
    // console.log("tamanaono: " +tamano +" tag: "+ tag);
    if(inArray(tags, tag)){
      // createCircle(apuntados);
      tagNumero[apuntados] = tag;
    }else{
      // createCircle(apuntados, tag);
      tags.push(tag);
      tagNumero[apuntados] = tag;
      console.log(tagNumero);
    }
    // console.log(tag);
    // console.log(titulo);
    // console.log(tamano);
    // createCircle(tamano, tag);
  }

  var createCircle = function(apuntados, tag){
    var oldTag = tag , oldApuntado = apuntados;
    if (typeof oldTag === "undefined") { // partial
      console.log("typeof: " + oldApuntado);
    }else{
      console.log(apuntados +":" + tag);
    }
    // full application

    // var nombreCategoria = tagFluidinfo.split("/");
    // var c = paper.circle(ancho, 100, tamano*4);
    // c.attr({fill: '#ccc', "stroke": "#dddddd", "opacity":1});
    // var infoCirulo = c.getBBox(true);
    // ancho = ancho + infoCirulo.x;
     
    // var centroX = c.attr("cx");
    // var centroY = c.attr("cy");
    // var t = paper.text(centroX, centroY, nombreCategoria[2]);
    // t.attr({fill: "#000", stroke: "#000000", opacity: 1, "font-size": 10});
    //  return c;
  }

  var inArray = function(arr,obj) {
      return (arr.indexOf(obj) != -1);
  }

  Array.prototype.remove= function(){
      var what, a= arguments, L= a.length, ax;
      while(L && this.length){
              what= a[--L];
              while((ax= this.indexOf(what))!= -1){
                          this.splice(ax, 1);
                      }
          }
      return this;
  }
}



