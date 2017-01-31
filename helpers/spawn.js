function stOutFnDefault(data) {
  console.log(`stdout: ${data}`);
}

function stErrFnDefault(data) {
  console.log(`sterr: ${data}`);
}

function closeFnDefault(code) {
  console.log(`child process exited with code ${code}`);
}

class SpawnHelper {
  static process(spawnObj, stOutFn = stOutFnDefault, stErrFn = stErrFnDefault, closeFn = closeFnDefault) {
    spawnObj.stdout.on('data', stOutFn);
    spawnObj.stderr.on('data', stErrFn);
    spawnObj.on('close', closeFn);
  }
};

module.exports = SpawnHelper;
