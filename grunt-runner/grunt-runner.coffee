{spawn} = require "child_process"
{StringDecoder} = require "string_decoder"
decoder = new StringDecoder 'utf-8'

class Grunt
  runGrunt: (projectFolder, args, callback) ->
    console.log "Running Grunt"
    
    # cache current process
    oldProcessDirectory = process.cwd()

    try
      process.chdir projectFolder
    catch err
      console.log err
      throw err

    grunt = spawn("grunt", args)

    grunt.stdout.on "data", (data) ->
      console.log decoder.write data

    grunt.stderr.on "data", (data) ->
      console.log decoder.write data

    grunt.on "exit", ->
      process.chdir oldProcessDirectory
      callback projectFolder

module.exports = new Grunt
