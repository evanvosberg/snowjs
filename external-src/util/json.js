/*import("external/JSON-js/json2.js")*/
	
/*global JSON:true*/
define("util/json", [], function () {

    return {
        // Encode javascript object into json string
        stringify: JSON.stringify,
        
        // Decode json string into javascript object
        parse: JSON.parse,
        
        // Encode javascript object into json string
        encode: JSON.stringify,
        
        // Decode json string into javascript object
        decode: JSON.parse
    };

});