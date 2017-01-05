const nodeOptions = require('node-options');

export const options =  {
  port    : 8080,
  verbose : false
};

// Remove the first two arguments, which are the 'node' binary and the name of your script.
const parsedOptions = nodeOptions.parse(process.argv.slice(2), options);

// If an argument was passed on the command line, but was not defined in the "options" object, lets print the USAGE.
if (parsedOptions.errors) {
  if (options.verbose)
    console.log('Unknown argument(s): "' + parsedOptions.errors.join('", "') + '"');
  console.log('USAGE: [--port=3000] [--verbose]');
  process.exit(-1);
}
