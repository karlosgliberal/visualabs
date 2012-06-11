$(document).ready(function(){
 		
    var columns = 6, rows = 4;
 		var columnWidth, rowHeight;
 		var circles = [];
 		var translateX = 100, translateY = 100;
 		var width =940;
 		var height = 600;
 		var container = document.getElementById("notepad");
		
		var notepad = Raphael(container,width,height);
		
		
		 columnWidth = width / (columns-1);
		 rowHeight = height / (rows-1);
		 
     var circle = notepad.circle(255, 255, 6)
      .attr({fill: "#dddddd", "stroke": "#dddddd", "opacity":1,"scale": 24.0})
      .click(function(e){
        console.log("i");
     });
     var text = notepad.text(255, 255, "10");
     var circle2 = notepad.circle(325, 355, 4)
      .attr({fill: "#ccc", "stroke": "#dddddd", "opacity":1,"scale": 24.0})
      .click(function(e){
        console.log("i");
     });
    console.log(circle2.id);  
		   		   
		   
		document.addEventListener("mousemove",function(event)
		{
			// updateFor(event.pageX,event.pageY);
		},false);
		

		function updateFor(activeX,activeY)
		{

			var x = activeX - container.offsetLeft;
			var y = activeY - container.offsetTop;
			
			var l = circles.length;
			for(var i=0;i<l;i++)
			{
				var circle = circles[i];
				var box = circle.getBBox();
				var dx = x - box.x;
				var dy = y - box.y;
				var distance = Math.sqrt((dx * dx) + (dy * dy));
				var color = toxi.color.TColor.newHSV(distance/width,0.5,1.0);

				var rgba = "rgba("+(color.red()*255)+","+(color.green()*255)+","+(color.blue()*255)+","+color.alpha()+")";
				circle.attr({"fill": rgba, "scale":distance*0.25});
			}

		
		}

});
