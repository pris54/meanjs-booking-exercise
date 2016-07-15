var grunt = require('grunt');
var shell = require('shelljs');

grunt.registerTask('MongoDB', "Start MongoDB server", function() {
    shell.exec('mongod --dbpath ./data');
});

grunt.registerTask('NodeJS', "Start node server", function() {
    shell.exec('node server.js');
});

grunt.registerTask('default', 'default task description', function(){
    grunt.task.run('MongoDB');
    grunt.task.run('NodeJS');
    console.log('Running MongoDB and NodeJS server');
});
