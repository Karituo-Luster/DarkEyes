//Grab and convert to revised RGB
function collectData(){
     // regex via http://stackoverflow.com/a/7543829/149636
     let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
     let passValues = [], ogValues = [], ogBGValues = [], concatVals = [];
     let elemStyles, cssName, cssValue, rgbVal;
     let elements = document.getElementsByTagName('*');
     let total = elements.length;
     //Go through all elements and push values into og/BG/Values 
     for(let x = 0; x < total; x++){
          elemStyles = window.getComputedStyle(elements[x]);
          for(let y = 0; y < elemStyles.length; y++){
               cssName = elemStyles[y];
               cssValue = elemStyles[cssName];
               if(!cssValue)
                    continue;
               cssValue += "";
               rgbVal = cssValue.match(rgbRegex);
               if(!rgbVal)
                    continue;
               if(cssName === "background-color" && ogBGValues.indexOf(rgbVal.input) == -1){
                    ogBGValues.push(rgbVal.input);
               }
               if(cssName === "color" && ogValues.indexOf(rgbVal.input) == -1){
                    ogValues.push(rgbVal.input);
               }
          }
     }
     //add all values of BG to og
     concatVals = ogValues.concat(ogBGValues);
     console.log(concatVals);
     for(i in concatVals){
          let rgb = concatVals[i];
          //valueArr grabs pure numerical values
          valueArr = rgb.slice(rgb.indexOf("(") + 1, rgb.indexOf(")")).split(", ");
          //Darkness Differential Factor; an integer
          //Still needs adjustments
          let DDF = parseInt(valueArr[0]) + parseInt(valueArr[1]) + parseInt(valueArr[2]);
          //Threshold Section
          if(DDF < 255){     //Make light
               passValues.push(toRGB(0.8, rgb)); 
          } else if(DDF >= 255){   //Make dark
               passValues.push(toRGB(-0.8, rgb));
          }
     }
     console.log(passValues);
     for(let x = 0; x < total; x++){
          elemStyles = window.getComputedStyle(elements[x]);
          for(let y = 0; y < elemStyles.length; y++){
               cssName = elemStyles[y];
               cssValue = elemStyles[cssName];
               if(!cssValue)
                    continue;
               cssValue += "";
               if(cssName == "background-color" && ogBGValues[y]){
                    //document color = passval[y];
               }
               else if(cssName == "color" && ogValues[y]){
                    //document color = passval[y + ogBGValues.length];
               }
          }
     }
}
//Refreshes with new colors, records execution time
window.addEventListener("load",function() { let start = window.performance.now();
     collectData();
     let end = window.performance.now();
     let timer = end-start;
     console.log("Execution time: " + timer + "ms");
});
//This is what changes the color
const toRGB = (p,c0,c1) => {
	let r, g, b, P, f, t, h, i=parseInt, m=Math.round, a=typeof(c1)=="string";
	if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))
          return null;
	if(!this.toRGBr)this.toRGBr=(d)=>{
		let n = d.length;
          x={};
		if(n>9){
			[r,g,b,a] = d = d.split(",");
               n=d.length;
			if(n<3||n>4)
                    return null;
			x.r = i(r[3]=="a"?r.slice(5):r.slice(4));
               x.g = i(g);
               x.b = i(b);
               x.a = a?parseFloat(a):-1
		}
          return x;
     };
	h = c0.length>9;
     h = a?c1.length>9?true:c1=="c"?!h:false:h;
     f = toRGBr(c0);
     P = p<0;
     t = c1&&c1!="c"?toRGBr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1};
     p = P?p*-1:p;
     P=1-p;
     r = m(P*f.r+p*t.r);
     g = m(P*f.g+p*t.g);
     b = m(P*f.b+p*t.b);
	a = f.a;
     t = t.a;
     f = a>=0||t>=0;
     a = f?a<0?t:t<0?a:a*P+t*p:0;
	if(h)
          return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
}
