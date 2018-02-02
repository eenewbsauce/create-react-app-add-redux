#!/usr/local/bin/node
const path  = require('path');
const fs    = require('fs');
const async = require('async');

const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }));

if (!packageJson.scripts.hasOwnProperty('eject')) {
  console.error('add-redux has already been run. if you\'d like to run it again, "git reset --hard", "git clean -fd", and "npm i"')
  process.exit();
}

const SpawnHelper = require('./helpers').spawnHelper;
const FormatHelper = require('./helpers').formatHelper;

const deps = ['redux', 'react-redux', 'prop-types'];

//eject app
const eject = new SpawnHelper();

async.series({
    eject: (next) => {
        eject
            .spawn('npm', ['run', 'eject'])
            .listen({
                stdOutFn: eject.confirm,
                closeFn: next
            });
    },
    install: (next) => {
        let depsInstalled = 0;

        deps.forEach(dep => {
            new SpawnHelper()
                .spawn('npm', ['i', '--save', dep])
                .listen({
                    closeFn: () => {
                      depsInstalled++;

                      if (depsInstalled === deps.length) {
                        return next();
                      }
                    }
                });
        });
    },
    templates: (next) => {
        new SpawnHelper()
            .spawn('cp', ['-r', path.join(__dirname, 'templates/'), 'src'])
            .listen({
                closeFn: next
            });
    }
  }, () => {
    //add imports to App.js
    let appJs = fs.readFileSync('./src/App.js', { encoding: 'utf8' });
    let peopleContainerImport = "import PeopleContainer from './components/PeopleContainer'";
    let peopleContainer = '<PeopleContainer />';
    let appJsParts = appJs.split('\n');

    let appJsPartsAppended = [
        ...appJsParts.slice(0,3),
        peopleContainerImport,
        ...appJsParts.slice(3,15),
        FormatHelper.addTabs(appJsParts[14]) + peopleContainer,
        ...appJsParts.slice(15)
    ];

    fs.writeFileSync('./src/App.js', appJsPartsAppended.join('\n'));

    //add imports to index.js
    let indexJs = fs.readFileSync('./src/index.js', { encoding: 'utf8' });
    let providerImport = `import {Provider} from 'react-redux';
    import configureStore from './store/configure-store';

    const store = configureStore();`;
    let providerElement = `ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.getElementById('root')
        )
        registerServiceWorker();
    `;

    let indexJsParts = indexJs.split('\n');

    let indexJsPartsAppended = [
        ...indexJsParts.slice(0,5),
        providerImport,
        providerElement
    ];

    fs.writeFileSync('./src/index.js', indexJsPartsAppended.join('\n'));
});


