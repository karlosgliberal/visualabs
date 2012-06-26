var Visualizacion = function(){
var drupal = new Drupal();

 var objFace = 
{
    "name": "datos",
    "children": [
        {
            "name": "elfilo.net/drupalblog/Fabricación_digital",
            "children": [
                {
                    "name": "Sierra laser para gobernar el mundo",
                    "size": 5
                },
                {
                    "name": "mundo",
                    "size": 2
                }
            ]
        },
        {
            "name": "elfilo.net/drupalblog/moviles",
            "children": [
                {
                    "name": "Siear el mundo",
                    "size": 2
                },
                {
                    "name": "mundo",
                    "size": 2
                }
            ]
        },
        {
            "name": "elfilo.net/drupalblog/movidas",
            "children": [
                {
                    "name": "lejos",
                    "size": 5
                },
                {
                    "name": "mundo",
                    "size": 2
                },
                {
                    "name": "mdundo",
                    "size": 4
                }
            ]
        }
    ]
}
 var obj = {};
 var arr = [];
 var count = 0;
 var sumar = 1;
 
var w = 1280,
    h = 800,
    r = 720,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node,
    root;

var pack = d3.layout.pack()
    .size([r, r])
    .value(function(d) { return d.size; })

var vis = d3.select("body").insert("svg:svg", "#paper")
    .attr("width", w)
    .attr("height", h)
  .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");
 
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
    var contarFluid = 0;
    for(var i = 0; i <  values.length; i++){
      for(var j = 0; j < values[i].titulo.length; j++){
        contarFluid++ 
      };
    };
    var supercontador = contarFluid;
    for(var i = 0; i <  values.length; i++){
      for(var j = 0; j < values[i].titulo.length; j++){
        var p = drupal.fluidQuery(values[i].clave, values[i].titulo[j]);
            p.then(function(err, val){
              arr.push({titulo: val.titulo, numero: val.objeto.data.length, llave:val.llave});
            if(supercontador !== 1 ){
              supercontador--;
            }else{
              construir(arr);
            }
          })
      };
    };
  };


var categorias = [];
var giltzak = [];
var construir = function(datos){
  for (var i = 0; i < datos.length; i++) {
    var llave = datos[i].llave.split("/");
    // console.log(esta(giltzak, llave[2]));
    if(esta(giltzak, llave[2])){
      console.log("true: " + llave[2]);
    }else{
      giltzak.push(llave[2]);
      console.log("fale: " + llave[2]);
    }
    // console.log(giltzak);
    var jer = {name:"h", children: [{name:datos[i].titulo, size:datos[i].numero}]};
  categorias.push(jer);
  };
  var dat = {};
  dat["children"] = categorias;
  dat["name"] = "movida";
  console.log(dat);
  pintar(dat);
}

function esta(arr,obj) {
    return (arr.indexOf(obj) != -1);
}
// d3.json("javascripts/datos.json", function(data){
// }); 

 var pintar = function(datos){

  node = root = datos;
  
  var nodes = pack.nodes(root);

  vis.selectAll("circle")
      .data(nodes)
    .enter().append("svg:circle")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })
      .attr("r", function(d) { return d.r; })
      .on("click", function(d) { return zoom(node == d ? root : d); });

  vis.selectAll("text")
      .data(nodes)
    .enter().append("svg:text")
      .attr("class", function(d) { return d.children ? "parent" : "child"; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
      .text(function(d) { return d.name; });

  d3.select(window).on("click", function() { zoom(root); });
  //  console.log(datos);
  // console.log(d3.keys(datos[0]));
  // var circle = svg.append("circle")
  //   .data([{x: width / 2, y: height / 2}])
  //   .attr("r", radius)
  //   .attr("cx", function(d) { return d.x; })
  //   .attr("cy", function(d) { return d.y; })
    // console.log(val[0].clave.data.length +" : "+ val[0].titulo);
  }

function zoom(d, i) {
  var k = r / d.r / 2;
  x.domain([d.x - d.r, d.x + d.r]);
  y.domain([d.y - d.r, d.y + d.r]);

  var t = vis.transition()
      .duration(d3.event.altKey ? 7500 : 750);

  t.selectAll("circle")
      .attr("cx", function(d) { return x(d.x); })
      .attr("cy", function(d) { return y(d.y); })
      .attr("r", function(d) { return k * d.r; });

  t.selectAll("text")
      .attr("x", function(d) { return x(d.x); })
      .attr("y", function(d) { return y(d.y); })
      .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

  node = d;
  d3.event.stopPropagation();
}

  var createCircle = function(tag, nodos){
  };

}



