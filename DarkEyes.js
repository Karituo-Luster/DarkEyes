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
function toRGB(){
     // regex via http://stackoverflow.com/a/7543829/149636
     let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
     let colorList = [], colorArr = [], pureValArr = [], changedColor = [];
     let elemStyles, cssName, cssValue, rgbVal;
     let elements = document.getElementsByTagName('*');
     let total = elements.length;
     let darknessDifferential = 0.15, darkReversal = 3;
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
               if(colorList.indexOf(rgbVal.input) == -1)    //Avoids multiple entries
                    colorList.push(rgbVal.input);           //If there are multiple elements using the same color,
          }                                                 //It would be unneccessary to have multiple elements in a list
     }
     //This gets pure values
     for(i in colorList){
          let rgb = colorList[i];
          colorArr = rgb
                    .slice(rgb.indexOf("(") + 1, rgb.indexOf(")"))
                    .split(", ");
          pureValArr.push(colorArr);
     }
/*     for(let i = 0; i < pureValArr.length; i++){
          let f = pureValArr[i];
          let r = changedColor[i];
          if(parseInt(f[0])>= 178 || parseInt(f[1])>= 178 || parseInt(f[2]) >= 178){
               parseInt(r[0])*darknessDifferential;
               parseInt(r[1])*darknessDifferential;
               parseInt(r[2])*darknessDifferential;
          }else if((pureValArr[i][0] || pureValArr[i][1] || pureValArr[i][2]) <= 78){
               (changedColor[i][0], changedColor[i][1], changedColor[i][2]) * darkReversal;
          }
          if(pureValArr[i][0] === '0' && pureValArr[i][1] === '0' && pureValArr[i][2] === '0'){
               changedColor[i][0] = changedColor[i][1] = changedColor[i][2] = '255';
          } else if((pureValArr[i][0] && pureValArr[i][1] && pureValArr[i][2])=== '255'){
               changedColor[i][0] = changedColor[i][1] = changedColor[i][2] = '25';
          }
     }
     */
     console.log(pureValArr);
}
/*
Step 3: TRANSFER ALL VALUES OF RGB INTO A LIST
	Note: Anything above 178 will drop to below 77
		 Anything below 77 will be above 178
		 Nothing between 77 and 178 will change
		 Starting at 15% darkness differential
/*
Step 4: Convert all list instances of rgb and rgba values 

THIS IS PSEUDOCODE TO WHAT VALUES WILL BE CHANGED
NOTE: DARKNESS DIFFERENTIAL WILL BE SUBJECT TO CHANGE
*/
/*
Step 5: Inject new colors into CSS

THIS IS BROKEN CODE THAT IS USED TO INJECT CSS INTO A WEBSITE

function setCssStyle(el, style, value){
     let result = el.style.cssText.match(new RegExp("(?:[;\\s]|^)(" +
          style.replace("-", "\\-") + "\\s*:(.*?)(;|$))")),
          idx;
     if(result){
          idx = result.index + result[0].indexOf(result[1]);
          el.style.cssText = el.style.cssText.substring(0, idx) +
          style + ": " + value + ";" +
          el.style.cssText.substring(idx + result[1].length);
     } else{
          el.style.cssText += " " + style + ": " + value + ";";
     }
}
   var element = document.getElementById("wallIframe");
   setCssStyle(element, "display","none !important");
*/
