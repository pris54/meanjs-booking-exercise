var grunt = require('grunt');
var shell = require('shelljs');

grunt.registerTask('mongodb', "Start MongoDB server", function() {
    shell.exec('mongod --dbpath data');
});

grunt.registerTask('nodemon', "Start node server via nodemon", function() {
    shell.exec('nodemon server.js');
});

grunt.initConfig({
    concurrent: {
        target: {
            tasks: ['mongodb', 'nodemon']
        },
        options: {
            logConcurrentOutput: true
        }
    }
});

grunt.loadNpmTasks('grunt-concurrent');
grunt.registerTask('default', ['concurrent:target']);
