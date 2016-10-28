var fs = require('fs');
var path = require('path');
var projectName = path.join(process.cwd(), '..').split(path.sep).pop();

var config = require('rc')(projectName, {
    projectName: path.join(process.cwd(), '..').split(path.sep).pop()
});

module.exports = function (gulp) {
    fs.readdirSync(__dirname).filter(function (file) {
        return (file.indexOf(".") !== 0) && (file.indexOf('Task') === 0);
    }).forEach(function (file) {
        var registerTask = require(path.join(__dirname, file));
        registerTask(gulp, config);
    });
};
