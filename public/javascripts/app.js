$(document).ready(function(){
  var vi = new Visualizacion();
  var h = vi.createCircle();
  var drupal  = new Drupal();
  var totales;
  var nodos = drupal.nodos(function(res){
    // totales = res;
    // console.log(totales);
    // if(totales === res){
    //   
    // }
    for(key in res){
      console.log(res[key]);
      // totales[key] = res[key];
    }
    console.log(totales);
  });
});
