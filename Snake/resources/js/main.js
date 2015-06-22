requirejs(["js/game"], function(snake) {
    //This function is called when resources/js/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "js/util".
});
