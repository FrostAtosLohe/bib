const axios = require('axios');
const cheerio = require('cheerio');

const parse = data => 
{
  const $ = cheerio.load(data);
  var tab = [];
  //I'm gonna find all 'a' tag because the 'aria-label' part of each 'a' tag contains the restaurant's name.
  const a = $('a.link').each((i, element) => 
  {
    var temp = $(element).attr('aria-label');
    temp = temp.replace(/Open /g, '').trim().toLowerCase();
    tab.push(temp)
  });
  return tab;
};

module.exports.scrapeRestaurant = async url => 
{
  const response = await axios(url);
  const {data, status} = response;

  if (status >= 200 && status < 300) 
  {
    return parse(data);
  }
  console.error(status);

  return null;
};

module.exports.get = () => {
  return [];
};