const axios = require('axios');
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
getMetadata();
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
let  colorFunction = () => {
     // regex via http://stackoverflow.com/a/7543829/149636
     let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
     let colorList = [];
     let elements = document.getElementsByTagName('*');
     let total = elements.length;
     let elemStyles, cssName, cssValue, rgbVal;
     for(let x = 0; x < total; x++){
          elemStyles = window.getComputedStyle(elems[x]);
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
     return colorList;
}
/*
Step 4: Change each color by percent based values & threshold
	Note: Anything above 178 will drop to below 77
		 Anything below 77 will be above 178
		 Nothing between 77 and 178 will change
		 Starting at 15% darkness differential
	
	if(originalRGBValues > 178){
		newRGBValues = originalRGBValues * 0.15;
	}else if(originalRGBValues < 77){
		newRGBValues = originalRGBValues / 0.45;
	}
*//*
Step 5: Inject new colors into CSS
*/
