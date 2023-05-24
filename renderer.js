const os = require('os');
const fs = require('fs')
const carbone = require('carbone')

let factories = process.env.FACTORIES || 1

carbone.set({
    templatePath: os.tmpdir(),
    factories: factories,
    startFactory: true
});
console.log(`Report renderer app created ${factories} LibreOffice factories`)

carbone.addFormatters({
  func : function (msg) {
    return msg + "thing"
  }
})

exports.store_template = function (buffer) {
  let template = Buffer.from(buffer, 'base64')

  let name = os.tmpdir() + '\\' + new Date().getTime() + '.tpl'

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