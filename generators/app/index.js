var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // Next, add your custom code
        this.option('coffee'); // This method adds support for a `--coffee` flag

        // This makes `appname` a required argument.
        // this.argument('appname', { type: String, required: true });
    },

    prompting: function () {
        return this.prompt([{
            type    : 'input',
            name    : 'name',
            message : 'Your project name',
            default : this.appname // Default to current folder name
        }]).then(function (answers) {
            this.answers = answers;
            this.log('app name', answers.name);
        }.bind(this));
    },

    writing: function () {
        this.fs.copyTpl(
            this.templatePath('_pom.xml'),
            this.destinationPath('pom.xml'),
            { name: this.answers.name }
        );
        this.fs.copyTpl(
            this.templatePath('src/main/resources/_log4j.properties'),
            this.destinationPath('src/main/resources/log4j.properties')
        );
        this.fs.copyTpl(
            this.templatePath('src/main/scala/com/bigster/_Driver.scala'),
            this.destinationPath('src/main/scala/com/bigster/Driver.scala')
        );
       this.fs.copyTpl(
            this.templatePath('src/main/scala/com/bigster/_Main.scala'),
            this.destinationPath('src/main/scala/com/bigster/Main.scala')
        );
    }
});
