var Visualizacion = function(){
  var circles;
  var width = 940;
  var height = 600;
  var container = document.getElementById("paper");
  var paper = Raphael(container, width, height);

  this.createCircle = function(x, y, r){
    var c = paper.circle(150, 150, 40);
    c.attr({fill: "#dddddd", "stroke": "#dddddd", "opacity":1,"scale": 2.0});
     return c;
  }
}
