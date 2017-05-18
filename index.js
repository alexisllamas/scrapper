const request = require('superagent');
const cheerio = require('cheerio');

const scrapp = (url) => {
  request
    .get(url)
    .end((err, res) => {
      const $ = cheerio.load(res.text);
      const links = $('a').toArray();
      console.log(links.length);
      links.filter(el => el.attribs.href && el.attribs.href.startsWith(url)).forEach((el) => {
        request
          .get(el.attribs.href)
          .end((err, res) => {
            const $ = cheerio.load(res.text);
            const products = $('li.grid-tile').toArray();
            products.forEach((li) => {
              console.log(li)
            })
          });
      })
    });
};

scrapp('http://www.americangolf.co.uk/')
