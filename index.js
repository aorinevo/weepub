const { copyFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const { spawnSync } = require('child_process')

const { version, name: pkgName } = require(resolve('./package.json'))

function publish(packages) {
  let packageJSON
  packages.forEach(({name, source}) => {
    copyFileSync(
      resolve(`./${source}`),
      resolve(`./${name}/${pkgName}.js`)
    )
    packageJSON = require(resolve(`./${name}/package.json`));
    packageJSON.version = version;
    writeFileSync(
      resolve(`./${name}/package.json`),
      JSON.stringify(packageJSON)
    )

    spawnSync('npm', ['publish'], {
      cwd:  resolve(`./${name}`),
      stdio: 'inherit'
    })
  })
}

module.exports = function (options) {
  this.publish = function (){
    publish(options.packages);
  }
  return this;
}
