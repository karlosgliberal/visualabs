var Visualizacion = function(){
  var drupal = new Drupal();
  var arr = [];
  var dat = {};
  var trans=[0,0];
  var scale=1;
   
    
   this.init = function(){
      promise.join([
          function() {
              return drupal.fluidinfoGetObject("elfilo.net/summeroflabs/Audio_vídeo_interacción");
          },
          function() {
              return drupal.fluidinfoGetObject("elfilo.net/summeroflabs/Cacharreo_Aprendizaje_Hacking_Diy"); 
          },
          function() {
              return drupal.fluidinfoGetObject("elfilo.net/summeroflabs/Fabricación_digital");
          }
      ]).then(
          function(err, values) {
            getFluidObj(values);
          }
      );
    };


  var getFluidObj = function(values){
    var supercontador = contador(values);
      for(var i = 0; i <  values.length; i++){
        for(var j = 0; j < values[i].titulo.length; j++){
          var p = drupal.fluidQuery(values[i].clave, values[i].titulo[j]);
           p.then(function(err, val){
              var llave = val.llave.split("/");
              arr.push({name: val.titulo, size: val.objeto.data.length, llave:llave[2], objeto:val.objeto.data});
              if(supercontador !== 1 ){
                supercontador--;
              }else{
                construir(arr);
              }
           })
        };
      };
    };

  var contador = function(values){
    var contarFluid = 0;
    for(var i = 0; i <  values.length; i++){
      for(var j = 0; j < values[i].titulo.length; j++){
        contarFluid++ 
      };
    };
    return contarFluid;
  }

  var construir = function(datos){
    var nest = d3.nest()
      .key(function(d) { return d.llave; })
      .key(function(d) { return d.name; })
      .entries(datos);
      for (i = 0; i < nest.length; i++) {
          nest[i].name = nest[i]['key'];
          nest[i].children = nest[i]['values'];
          delete nest[i].key;
          delete nest[i].values;
          for (var j = 0; j < nest[i]["children"].length; j++) {
            nest[i]["children"][j].name = nest[i]["children"][j]['key'];
            nest[i]["children"][j].children = nest[i]["children"][j]['values'];
            delete nest[i]["children"][j].key;
            delete nest[i]["children"][j].values;
          };
      }
    dat["name"] = "Intereses inscritos SummerOfLabs Eu";
    dat["children"] = nest;
    pintar(dat);
  };

  var w = 960,
      h = 800,
      r = 620,
      x = d3.scale.linear().range([0, r]),
      y = d3.scale.linear().range([0, r]),
      node,
      root;
  // var fill = d3.scale.category20c();
  var pack = d3.layout.pack()
      .size([r, r])
      .value(function(d) { return d.size; })

  var vis = d3.select("body").insert("svg:svg", "#paper")
      .attr("width", w)
      .attr("height", h)
    .append("svg:g")
      .attr("transform", "translate(" + (w - r) / 4 + "," + (h - r) / 3 + ")");

  var pintar = function(datos){
    $('#cargando').hide();
    node = root = datos;
    var nodes = pack.nodes(root);

    vis.selectAll("circle")
        .data(nodes)
      .enter().append("svg:circle")
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })
        // .style("fill", function(d) { return fill((d.children ? d : d.parent).name)})
        .on("click", function(d) {  return zoom(node == d ? root : d); })
        .on ("mouseover", mover)
        .on ("mouseout", mout);

    vis.selectAll("text")
        .data(nodes)
      .enter().append("svg:text")
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        // .style("font-size", function(d){ return d.children ? "16px" : "12px"})
        .style("opacity", function(d) { return d.r > 20 ? 1 : 0; })
        // .text(function(d) { return console.log(d);});
        .text(function(d) { return d.name.substring(0, d.r / 4) });

    d3.select(window).on("click", function() { zoom(root); });
    }

  function zoom(d, i) {
    var k = r / d.r / 2;
    x.domain([d.x - d.r, d.x + d.r]);
    y.domain([d.y - d.r, d.y + d.r]);

    var t = vis.transition()
        .duration(d3.event.altKey ? 7500 : 350);

    t.selectAll("circle")
        .attr("cx", function(d) { return x(d.x); })
        .attr("cy", function(d) { return y(d.y); })
        .attr("r", function(d) { return k * d.r; });


    t.selectAll("text")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return y(d.y); })
        .attr("dy", ".35em")
        .text(function(d) { return d3.round(k) == 1 ? d.name.substring(0, d.r / 4) : d.name})
        .style("opacity", function(d) { return k * d.r > 20 ? 1 : 0; });

    node = d;
    d3.event.stopPropagation();
  }
    function mover(d) {
      if(d.depth == 2){
        var lista = d["children"][0]["objeto"];
        var link = d.name.replace(/\s+/g, '-').toLowerCase();;

        $("#pop-up").fadeOut(200,function () {
            $("#pop-up-title").html(lista.length+" inscritos");
            $("#pop-up-content").html("");
            // Popup content
            $.each(lista, function(i, value){
              var usuarios = value["elfilo.net/summeroflabs/title"];
              $("#pop-up-content").append(usuarios+'</br>');
            })
            $("#pop-desc").html("<a href=http://summeroflabs.eu/es/nodos/"+link+">"+d.name+"</a>");

            // Popup position
            var popLeft = (d.x+d.r+100);//lE.cL[0] + 20;
            var popTop = (d.y+d.r);//lE.cL[1] + 70;
            $("#pop-up").css({"left":popLeft,"top":popTop});
            $("#pop-up").fadeIn(300);
        });
      
      }

    }

    function mout(d) {
        $("#pop-up").fadeOut(400);
        d3.select(this).attr("fill","url(#ten1)");
    }
}

