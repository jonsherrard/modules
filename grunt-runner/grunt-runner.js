(function() {
  var Grunt, StringDecoder, decoder, spawn;

  spawn = require("child_process").spawn;

  StringDecoder = require("string_decoder").StringDecoder;

  decoder = new StringDecoder('utf-8');

  Grunt = (function() {
    function Grunt() {}

    Grunt.prototype.runGrunt = function(projectFolder, args, callback) {
      var err, grunt, oldProcessDirectory;
      console.log("Running Grunt");
      oldProcessDirectory = process.cwd();
      try {
        process.chdir(projectFolder);
      } catch (_error) {
        err = _error;
        console.log(err);
        throw err;
      }
      grunt = spawn("grunt", args);
      grunt.stdout.on("data", function(data) {
        return console.log(decoder.write(data));
      });
      grunt.stderr.on("data", function(data) {
        return console.log(decoder.write(data));
      });
      return grunt.on("exit", function() {
        process.chdir(oldProcessDirectory);
        return callback(projectFolder);
      });
    };

    return Grunt;

  })();

  module.exports = new Grunt;

}).call(this);
