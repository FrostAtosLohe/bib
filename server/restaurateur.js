const axios = require('axios');
const cheerio = require('cheerio');

module.exports.scrapeMaitre = async url => 
{
  const response = await axios(url);
  eval(response.data);
  var tab = []
  addressPoints.forEach(element => tab.push(element[3].entreprise.toLowerCase()));
  return tab;
}