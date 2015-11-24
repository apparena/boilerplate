var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
//var _ = require('lodash');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
    // The name `constructor` is important here
    constructor: function () {
        // Calling the super constructor is important so our generator is correctly set up
        generators.Base.apply(this, arguments);

        // Make options available

        this.option('skip-welcome-message', {
            desc: 'Skips the welcome message',
            type: Boolean
        });

        this.option('skip-install-message', {
            desc: 'Skips the message after the installation of dependencies',
            type: Boolean
        });

        this.config.save();
    },

    initializing: function () {
        if (!this.options['skip-welcome-message']) {
            //this.log(require('yeoman-welcome'));
            this.log(yosay('Hello, and welcome to my '+chalk.blue.bold('fantastic')+' generator full of whimsy and bubble gum!'));
            this.log(chalk.yellow.bold('Out of the box I include the Apparena-PHP-SDK.\n'));
        }
    },
    prompting: function () {
        var done = this.async();

        this.prompt([
            {
                type: 'input',
                name: 'appName',
                message: 'Your app name',
                default: this.appName, // Default to current folder name
                store: true
            },
            {
                type: 'input',
                name: 'publicPath',
                message: 'Your path to the public folder (where your Apache document-root should be)',
                default: '/public/',
                store: true
            },
            {
                type: 'input',
                name: 'cachePath',
                message: 'Cache folder (where the php-sdk will populate the app-data)',
                default: '/var/cache/',
                store: true
            },
            {
                type: 'input',
                name: 'modelId',
                message: 'The modelId of your new App',
                store: true
            },
            {
                type: 'input',
                name: 'appVersion',
                message: 'The version of your App',
                default: '0.0.0',
                store: true
            }
        ], function (answers) {
            this.appName = answers.appName;
            this.publicPath = answers.publicPath.replace(/^\/|\/$/g, ''); //remove first- and last-char when slash
            this.cachePath = answers.cachePath.replace(/^\/|\/$/g, ''); //remove first- and last-char when slash
            this.modelId = answers.modelId;
            this.appVersion = answers.appVersion;

            // Set needed keys into config
            this.config.set('appPath', this.appPath);
            this.config.set('cachePath', this.cachePath);
            this.config.set('appName', this.appName);
            this.config.set('modelId', this.modelId);
            this.config.set('publicPath', this.publicPath);
            this.config.set('appVersion', this.appVersion);
            this.config.save();
            done();
        }.bind(this));
    },
    writing: function () {
        this.log(chalk.blue.bold('\nmake folders...'));
        mkdirp.sync(this.config.get('publicPath'));
        mkdirp.sync(this.config.get('cachePath'));

        this.log(chalk.blue.bold('\ncopy templates...'));
        this.fs.copyTpl(
            this.templatePath('public/index.php'),
            this.destinationPath(this.config.get('publicPath') + '/index.php'),
            {
                appName: this.config.get('appName'),
                modelId: this.config.get('modelId'),
                appNameSlug: _s.slugify(this.config.get('appName')),
                cachePath: this.config.get('cachePath')
            }
        );
        this.fs.copyTpl(
            this.templatePath('_composer.json'),
            this.destinationPath('composer.json')
        );
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            {
                appNameSlug: _s.slugify(this.config.get('appName')),
                appVersion: this.config.get('appVersion')
            }
        );
        this.fs.copyTpl(
            this.templatePath('_bower.json'),
            this.destinationPath('bower.json'),
            {
                appNameSlug: _s.slugify(this.config.get('appName')),
                appVersion: this.config.get('appVersion')
            }
        );
    },
    install: function () {
        this.log(chalk.blue.bold('\ninstalling npm & bower dependencies...'));
        //this.npmInstall(['composer'], {'saveDev': true});
        //this.npmInstall();
        //this.spawnCommand('npm', ['install']);
        this.installDependencies({npm:true, bower: true, skipMessage: false})
        this.log(chalk.blue.bold('\ncomposer install...'));
        this.spawnCommand('composer', ['install']);
    }
});