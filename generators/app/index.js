'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.props = {};
  },

  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the phenomenal ' + chalk.red('generator-scaffold') + ' generator!'
    ));

    var prompts = [
      {
        type: 'list',
        name: 'name',
        message: 'Please select a project:',
        choices: [
          'express-nunjucks-requirejs-gulp-webpack'
        ]
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please input project description:'
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props.name = props.name.split('-')[0];
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath(this.props.name + '/**/*'),
      this.destinationPath('./')
    );
  },

  install: function () {
    this.installDependencies({
      bower: true,
      npm: false,
      callback: function () {
        console.log('Everything is ready!');
      }
    });
  }
});
