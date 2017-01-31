#!/usr/local/bin/node

const spawn = require('child_process').spawn;
const spawnHelper = require('./helpers').spawn;
const deps = ['redux', 'react-redux'];
const dirs = ['actions'];

//eject app
const eject = spawnHelper.process(spawn('npm', ['run', 'eject']));

//install dependecies
const installDeps = deps.forEach(dep => {
  spawnHelper.process(spawn('npm', ['i', '--save', dep]));
});

//create directories
const createDirectories = dirs.forEach(dir => {
  spawnHelper.process(spawn('mkdir', [`src/${dir}`]));
});
