const request = require('superagent');
const cheerio = require('cheerio');
const { addProduct } = require('./api');
// const scrapp = (url) => {
//   request
//     .get(url)
//     .end((err, res) => {
//       const $ = cheerio.load(res.text);
//       const links = $('a').toArray();
//       console.log(links.length);
//       links.filter(el => el.attribs.href && el.attribs.href.startsWith(url)).forEach((el) => {
//         request
//           .get(el.attribs.href)
//           .end((err, res) => {
//             if(res.text) {
//               const $ = cheerio.load(res.text);
//               const products = $('li.grid-tile');
//               products.each(function() {
//                 const product = $(this);
//                 const name = product.find('.product-name').text();
//                 if (name) {
//                   console.log(name);
//                 }
//               });
//             }
//           });
//       })
//     });
// };

const scrap = (url) => {
  request
    .get(url)
    .end((err, res) => {
      if(!err && res) {
        const $ = cheerio.load(res.text);
        const products = $('li.grid-tile');
        products.each(function() {
          const product = $(this);
          const productObject = {
            name: product.find('.product-name').text(),
            image: product.find('.product-image img').attr('src'),
            stars: product.find('.pr_stars .stars-inner').html() ? product.find('.pr_stars .stars-inner').css('width') : '',
            mrrp: product.find('.product-pricing .mrrp').text(),
            price: product.find('.product-pricing .product-sales-price').text(),
            colors: product.find('.product-colorswatches-list .swatch.productlink').toArray().map(el => el.attribs.title),
            greatValue: product.find('.badge.badge-pricebuster').length > 0,
            productPromo: product.find('.product-promo').text(),

          };
          console.log(productObject);
          addProduct(productObject);
        });
      }
    });
}

scrap('http://www.americangolf.co.uk/golf-products?sz=12')
