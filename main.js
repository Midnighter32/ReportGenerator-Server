const express = require('express')
var bodyParser = require('body-parser');
const app = express()
const port = 80

const renderer = require('./renderer.js')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/render_template', (req, res) => {
    if (!req.body.template || !req.body.data) {
        res.status(400).send("Not enough arguments!")
        return;
    }

    let id = (new Date()).getTime()
    
    console.time('render-' + id);

    let template = renderer.store_template(req.body.template)

    let data = renderer.render(template, req.body.data)
        .then(function(buf) { 
            res.contentType("application/pdf").send(buf)
        }, function(reason) {
            res.status(400).send(reason)
        })
        .finally(function() {
            console.timeEnd('render-' + id);
        })
})

app.listen(port, () => {
    console.log(`Report renderer app listening on port ${port}`)
})