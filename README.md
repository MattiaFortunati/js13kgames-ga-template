Simple Ga-Grunt game template for js13kgames competition.

It uses the Ga framework: https://github.com/kittykatattack/ga
more precisely its bouncing ball example.

The grunt process will minify and concat al js in one file, then use processhtml to include them. 
Then the html is minified too, zipped and passed through the size check from https://github.com/lucaspenney/js13k-toolkit