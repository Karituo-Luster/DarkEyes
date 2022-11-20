const axios = require('axios');
const URL = "http://tommyh.space"
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
getMetadata()
/*
Step 1: Extract elements of a website as input in HTML format?
*/
/*
Step 2: Collect & Convert all colors into RGB values; puts them into an array
*/
	function getAllColors() {
    	// regex via http://stackoverflow.com/a/7543829/149636
    	let rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;

    	let allColors = [];

    	let elems = document.getElementsByTagName('*');
    	let total = elems.length;

    	let x,y,elemStyles,styleName,styleValue,rgbVal;

    	for(x = 0; x < total; x++) {
     	elemStyles = window.getComputedStyle(elems[x]);
		for(y = 0; y < elemStyles.length; y++) {
          	styleName = elemStyles[y];
          	styleValue = elemStyles[styleName];
            	if(!styleValue) {
          		continue;
          	}
            // convert to string to avoid match exceptions
            styleValue += "";
            rgbVal = styleValue.match(rgbRegex);
            if(!rgbVal) { // property does not contain a color
                continue;
            }

            if(allColors.indexOf(rgbVal.input) == -1) { // avoid duplicate entries
                allColors.push(rgbVal.input);
            }

        }

    }

    return allColors;
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
*/
/*
Step 5: Inject new colors into CSS
*/