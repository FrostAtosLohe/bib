/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const axios = require('./axios');
const restaurateur = require('./restaurateur');

async function sandbox()
{
  try 
  {
    console.log(`Work in progress...`);

    var restaurant = await michelin.scrapeRestaurant('https://guide.michelin.com/fr/fr/restaurants/bib-gourmand');
    for(var i = 2; i<=15; i++)
    {
      var temp = await michelin.scrapeRestaurant('https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/'+i);
      temp.forEach(item => restaurant.push(item));
    }
    console.log(restaurant)
    
    var maitre = await restaurateur.scrapeMaitre('https://www.maitresrestaurateurs.fr/module/annuaire/ajax/load-maps-data');
    console.log(maitre)

    var results = listComparison(restaurant, maitre)
    console.log(results);
    console.log(results.length);
  } 

  catch (e) 
  {
    console.error(e);
    process.exit(1);
  }
}

function listComparison(restaurant, maitre)
{
  var results = [];
  for (var i = 0; i<restaurant.length; i++)
  {
    for (var j = 0; j<maitre.length; j++)
    {
      if (restaurant[i] == maitre[j])
      {
        results.push(restaurant[i]);
        j = maitre.length;
      }
    }
  }
  WriteFile(results)
  return results;
}

function ReadFile()
{
	var fs = require('fs');
	fs.readFile('./results.txt', 'utf-8', function(err, data){
		console.log(data)
	})
}

function WriteFile(results)
{
	const fs = require('fs')  
	fs.writeFile('results.txt', "", (err) => {
		if (err) throw err;
	});
	for (var i = 0; i<results.length; i++)
	{
		let data = results[i] + "\r\n";
		fs.appendFile('results.txt', data, (err) => 
		{
			if (err) throw err;
		});
	}
}


sandbox();