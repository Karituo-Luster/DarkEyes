/*
CANNOT USE A SERVER IF NEEDING TO USE DOCUMENT OR WINDOW FUNCTIONS

const axios = require('axios');
const { ConsoleMessage } = require('puppeteer');
const URL = "http://tommyh.space";
const getMetadata = () => {
	axios
		.get(URL)
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.error(error);
		});
};
getMetadata();*/
/*
	Step 1: Extract elements of a website as input in HTML format?
*//*
	Step 2: Collect & Convert all colors into RGB values; puts them into an array
*//*
     This function will search throughout 
     all inline CSS and embedded stylesheets 
     to search for all added colors and prints
     out the list in RGB format
*/
//DO NOT TOUCH, THIS WORKS ALREADY
//Note: requires web address 
function toRGB(){
     // regex via http://stackoverflow.com/a/7543829/149636
     let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
     let originalValues = [], valueArr = [], passValues = [];
     let elemStyles, cssName, cssValue, rgbVal;
     let elements = document.getElementsByTagName('*');
     let total = elements.length;
     for(let x = 0; x < total; x++){
          elemStyles = window.getComputedStyle(elements[x]);
          for(let y = 0; y < elemStyles.length; y++){
               cssName = elemStyles[y];
               cssValue = elemStyles[cssName];
               if(!cssValue)
                    continue;
               cssValue += "";                              // convert to string to avoid match exceptions
               rgbVal = cssValue.match(rgbRegex);
               if(!rgbVal)                                  //If no color exists
                    continue;                               //move onto the next element
               if(originalValues.indexOf(rgbVal.input) == -1)    //Avoids multiple entries
                    originalValues.push(rgbVal.input);           //If there are multiple elements using the same color,
          }                                                 //It would be unneccessary to have multiple elements in a list
     }
     for(i in originalValues){
          let rgb = originalValues[i];
          //valueArr grabs pure numerical values
          valueArr = rgb
                    .slice(rgb.indexOf("(") + 1, rgb.indexOf(")"))
                    .split(", ");
          //Darkness Differential Factor; an integer
          let DDF = parseInt(valueArr[0]) + parseInt(valueArr[1]) + parseInt(valueArr[2]);
          if(DDF < 255){     //Make light
               passValues.push(pSBC(0.7, rgb)); 
          } else if(DDF >= 255){   //Make dark
               passValues.push(pSBC(-0.7, rgb));
          }
     }
     return {
          originalValues,
          passValues,
     };
}
function insertNewValues(){
     let newValues = toRGB().passValues,
          checkVals = toRGB().originalValues;
     let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
     let elemStyles, cssName, cssValue, rgbVal;
     let elements = document.getElementsByTagName('*');
     let total = elements.length;
     let orig = [];
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
               if(orig.indexOf(rgbVal.input) == -1)    //Avoids multiple entries
                    orig.push(rgbVal.input);
          }
     }
}
//This is what changes the color
//THIS WORKS; DO NOT TOUCH
const pSBC = (p,c0,c1) => {
	let r, g, b, P, f, t, h, i=parseInt, m=Math.round, a=typeof(c1)=="string";
	if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))
          return null;
	if(!this.pSBCr)this.pSBCr=(d)=>{
		let n = d.length;
          x={};
		if(n>9){
			[r,g,b,a]=d=d.split(",");
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
     f = pSBCr(c0);
     P = p<0;
     t = c1&&c1!="c"?pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1};
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


/*
Step 4: Convert all list instances of rgb and rgba values - complete
Step 5: Inject new colors into CSS
*/
