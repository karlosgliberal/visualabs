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

 var init = function(currSequence){
   console.log("movida");
    fluidinfoGetObject(vocabularioNodos, function(res, key){
      for (var i = 0; i < res.length; i++) {
        fluidQuery(key, res[i], function(res, maches){
         termNodos[maches] = [res.data.length, key];
         currSequence.next();
        });
      };
    });
  };
  
 var getResultados = function(currSequence){
    for(key in termNodos){
      currSequence.next();
      console.log(key);
    }
  }
   
  var fluidQuery = function(key, maches, cb){
   var options = {
     select: ["elfilo.net/drupalblog/title"],
     where: key + ' matches "'+maches+'"',
     onSuccess: function(resultado){
       cb(resultado, maches);
     },
     onError: function(err){
       console.log(err);
     }
   }
   session.query(options);
  };

  var fluidinfoGetObject =  function(term, cb){
    for(key in term){
      if (term.hasOwnProperty(key)) {
        var tagValOptions = {
          about: 'interzonas.elfilo.net:vocabulary:nodos',
          select: term[key],
          onSuccess: function(res){
            for(clave in res.data){
              if(clave !== 'id'){
                // console.log(res.data[clave]);
                cb(res.data[clave], clave);
              }
            }
            // console.log(res.data);
          },
          onError: function(err){
            console.log(err);
          }
        }
        session.getObject(tagValOptions); 
      }
    }
  };
  console.log("movida");
// Devign.Sequence class
if (typeof(Devign)=="undefined") var Devign={};

Devign.Sequence=function () {
    // private fields
    this.list=[]; // a list of functions
    this.index=-1;
    this.aborted=false;

    // public fields
    this.finished=false;
};

// public methods
Devign.Sequence.prototype={
    // adds a new function
    add:function (sequenceFunction) {
        this.list.push(sequenceFunction);
    },
    // starts the sequence from the first function
    // fires 'onStart' if exists
    start:function () {
       console.log('star');
        this.index=-1;
        this.aborted=false;
        this.next();
        if (typeof(this.onStart)=="function") this.onStart();
    },
    // ends the sequence
    // fires 'onEnd' if exists
    end:function () {
        if (typeof(this.onEnd)=="function") this.onEnd();
        this.finished=true;
    },
    // proceeds the sequence
    // if the sequence has finished calls 'end'
    next:function () {
        // if sequence was aborted - ignore next statements
        if (this.aborted) return;

        this.index++;

        if (this.index==this.list.length) return this.end();
        
        var currFunction=this.list[this.index];
        // calls the function with the sequence as an argument
        if (currFunction) currFunction(this);
    },
    // aborts the sequence by setting the index to 'not started' and the flag aborted to true
    abort:function () {
        this.index=-1;
        this.aborted=true;
    }
};


var sequence=new Devign.Sequence();
sequence.add(init);
sequence.add(getResultados);

window.addEventListener("load",function () {
    sequence.start();
},false);

} 
