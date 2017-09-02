## Using the Source Files

After cloning the repo take a look at the `gulpfile.js` and check out the tasks available:
* `gulp` The default task will compile the LESS and JS into the `dist` directory and minify the output, and it will copy all vendor libraries from `bower_components` into the `vendor` directory
* `gulp dev` The dev task will serve up a local version of the template and will watch the LESS, JS, and HTML files for changes and reload the browser windo automatically

To update dependencies, run `bower update` and then run `gulp copy` to copy the updated dependencies into the `vendor` directory

Here's a quick list of commands to be entered in the terminal:
* `git clone https://bitbucket.org/nludemo/nludemo`
* `sudo apt get install npm`
* `npm install -g gulp bower`
* `cd nludemo `
* `npm install`
* `bower install`	
* `gulp dev`
