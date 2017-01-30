#!/usr/local/bin/node

const spawn = require('child_process').spawn;
const deps = ['redux', 'react-redux'];
const dirs = ['actions'];

//install dependecies
const installDeps = deps.forEach(dep => {
  spawn('npm', ['i', '--save', dep]);
});

//create directories
const createDirectories = dirs.forEach(dir => {
  spawn('mkdir', [`src/${dir}`]);
});
