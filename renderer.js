const os = require('os')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const path = require('path')
const carbone = require('carbone')

let factories = process.env.FACTORIES || 1

carbone.set({
    factoryMemoryThreshold: 20,
    templatePath: os.tmpdir(),
    factories: factories,
    startFactory: true
})
console.log(`Report renderer app created ${factories} LibreOffice factories`)

var files = fs.readdirSync('./plugins/').filter(file => file.match(/.*\.js/ig))
files.forEach(file => {
  let name = path.parse(file).name
  try
  {
    let plugin = require('./plugins/' + file)
    if (!plugin.load)
      console.log(`[ Plugin ${name} ] Wrong format: load function is undefined`)
    else {
      plugin.load(carbone)
      console.log(`[ Plugin ${name} ] Loaded`)
    }
  } catch (error) {
    console.log(`[ Plugin ${name} ] Loading failed: ${error}`)
  }
})

exports.store_template = function (buffer) {
  let template = Buffer.from(buffer, 'base64')

  let name = os.tmpdir() + '/' + uuidv4() + '.tpl'

  fs.writeFileSync(name, template)

  return name
}

exports.render = function (template, data) {
  return new Promise( (resolve, reject) => {
    carbone.render(template, data, { convertTo: 'pdf' }, function(err, result){
      fs.rmSync(template)

      if (err) reject(err)
      else resolve(result)
    })
  })
}