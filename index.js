#!/usr/local/bin/node
const path  = require('path');
const fs    = require('fs');

const packageJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }));

if (!packageJson.scripts.hasOwnProperty('eject')) {
  console.error('add-redux has already been run. if you\'d like to run it again, "git reset --hard", "git clean -fd", and "npm i"')
  process.exit();
}

const SpawnHelper = require('./helpers').spawnHelper;
const FormatHelper = require('./helpers').formatHelper;

const deps = ['redux', 'react-redux'];

//eject app
const eject = new SpawnHelper();
eject
  .spawn('npm', ['run', 'eject'])
  .listen({
    stdOutFn: eject.confirm
  });

//install dependecies
deps.forEach(dep => {
  new SpawnHelper()
    .spawn('npm', ['i', '--save', dep])
    .listen();
});

//move templates
new SpawnHelper()
  .spawn('cp', ['-r', path.join(__dirname, 'templates/'), 'src'])
  .listen()

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
let providerElement = `<Provider store={store}>
  <App />
</Provider>,`;
let indexJsParts = indexJs.split('\n');

let indexJsPartsAppended = [
  ...indexJsParts.slice(0,4),
  providerImport,
  ...indexJsParts.slice(4,6),
  providerElement,
  ...indexJsParts.slice(7,9)
];

fs.writeFileSync('./src/index.js', indexJsPartsAppended.join('\n'));
