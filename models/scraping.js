

const axios = require('axios')
const cheerio = require("cheerio");


const fetchPrice = async (item) => {
   try {
        const response = await axios.get(`https://www.trolley.co.uk/search/?from=search&q=${item}`);
        const html = response.data;

        const $ = cheerio.load(html);
        const prices = [];

      $('div._info').each((_idx, el) => {

           const shelf = $(el)
           const price = shelf.find('div._price').text()
           prices.push(price)
       });



       return prices;
   } catch (error) {
       throw error;
   }
};

module.exports = fetchPrice;
