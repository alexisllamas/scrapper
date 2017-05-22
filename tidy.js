const fs = require('fs');
const htmltidy = require("libtidy").compat.htmltidy;
const request = require('superagent')

const scrap = (url) => {
  request
    .get(url)
    .end((err, res) => {
      if(!err && res) {

        var opts = {
          forceOutput: true,
          output_xhtml: false,
          'word-2000': true,
          indent: true,
          'indent-spaces': 2,
          'break-before-br': true,

        };

        htmltidy.tidy(res.text, opts, function(err, htmlRes) {
            //var prettyData = html.prettyPrint(htmlRes, {indent_size: 2});
            fs.writeFile('helloworld.html', htmlRes, function (err) {
              if (err) return console.log(err);
              console.log('document > helloworld.html');
            });
        });
      }
    });
}

scrap('http://www.americangolf.co.uk/golf-products?sz=12')