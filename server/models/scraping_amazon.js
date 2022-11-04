const axios = require('axios')
const cheerio = require("cheerio");


// axios
// 	.get('https://www.amazon.co.uk/s?k=absolut+vodka&i=amazonfresh')
// 	.then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html)
//     const shelves = [];
// 	})
// 	.catch((error) => {
// 		console.error(error)
// 	});

const fetchPrice = async (item) => {
   try {
       const response = await axios.get(`https://www.amazon.co.uk/s?k=${item}&i=amazonfresh`);

       const html = response.data;

       const $ = cheerio.load(html);
       const shelves = [];

      $('div.a-row.a-size-base.a-color-base').each((_idx, el) => {

           const shelf = $(el)
           const price = shelf.find('span.a-size-base.a-color-secondary').text()
           shelves.push(price)
       });

       return shelves;
   } catch (error) {
       throw error;
   }
};

module.exports = fetchPrice;


fetchPrice('rum').then((shelves) => console.log(shelves));