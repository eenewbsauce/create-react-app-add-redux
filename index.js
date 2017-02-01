#!/usr/local/bin/node
const path  = require('path');
const fs    = require('fs');

const SpawnHelper = require('./helpers').spawnHelper;
const FormatHelper = require('./helpers').formatHelper;

const deps = ['redux', 'react-redux'];
const dirs = ['actions'];

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

//create directories
dirs.forEach(dir => {
  new SpawnHelper()
    .spawn('mkdir', ['-p', `src/${dir}`])
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
let parts = appJs.split('\n');

let partsAppended = [
  ...parts.slice(0,3),
  peopleContainerImport,
  ...parts.slice(3,15),
  FormatHelper.addTabs(parts[14]) + peopleContainer,
  ...parts.slice(15)
];

fs.writeFileSync('./src/App.js', partsAppended.join('\n'));
