const { copyFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const { spawnSync } = require('child_process')

const { version, name: pkgName } = require('../package.json')

function publish(packages) {
  let packageJSON
  packages.forEach(({name, source}) => {
    copyFileSync(
      resolve(__dirname, `../${source}`),
      resolve(__dirname, `./${name}/${pkgName}.js`)
    )

    packageJSON = require(`./${name}/package.json`)
    packageJSON.version = version
    writeFileSync(
      resolve(__dirname, `./${name}/package.json`),
      JSON.stringify(packageJSON)
    )

    spawnSync('npm', ['publish'], {
      cwd: resolve(__dirname, name),
      stdio: 'inherit'
    })
  })
}

export default function (options) {
  this.publish = function (){
    publish(options.packages);
  }
}
