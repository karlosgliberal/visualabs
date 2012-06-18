var Visualizacion = function(){
  var circles;
  var width = 940;
  var height = 600;
  var container = document.getElementById("paper");
  var paper = Raphael(container, width, height);
  var tags = [];
  var count = 0;
  var vocabularioNodos =  [
    "elfilo.net/drupalblog/Audio_vídeo_interacción", 
    "elfilo.net/drupalblog/Cacharreo_Aprendizaje_Hacking_Diy", 
    "elfilo.net/drupalblog/Dispositivos_móviles", 
    "elfilo.net/drupalblog/Fabricación_digital"
  ];

  this.createCircle = function(titulo, tamano, tag){
    console.log("movida");
    var c = paper.circle(150, 150, (tamano*2)+10);
    c.attr({fill: '#ccc', "stroke": "#dddddd", "opacity":1,"scale": 2.0});
     return c;
  }
}



