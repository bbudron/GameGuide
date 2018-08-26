const axios = require("axios");
require('dotenv').config();
var keys = require("./keys");
var backupData = require("./backupData");

module.exports = function () {
	const router = require('express').Router();

	router.post("/games", function (req, res) {
		// search term
		let {game} = req.body;

		// sends a request to igdb api for game search
		axios.get(`https://api-endpoint.igdb.com/games/?search=${game}&fields=*`, {headers: {"user-key": keys.igdb.key, Accept: "application/json"}})
		.then(response => {

			// clean up the response.data array
			let games = response.data.map(curGame => {
				let {rating, cover, first_release_date, id, name, summary, url, videos, websites} = curGame;

				// if cover is not given then change to undefined
				if(typeof cover === "undefined" || typeof cover === undefined ) cover = 'undefined';
				// if cover is given then replace it from a thumbnail to a high quality image
				else cover = cover.url.replace(/thumb/g, "logo_med_2x");

				// if release date is given then convert from seconds to "Month Day Year" format
				if(first_release_date  !== "undefined" && first_release_date  !== undefined) {
					first_release_date = new Date(first_release_date * 1000);
					first_release_date = String(first_release_date);
					first_release_date = first_release_date.split(" ", 3);
				}

				// converted rating from being x/100 to x/5
				rating = Math.round((rating / 10)/2) - 1;

				// return game with updated data
				let updatedGame = {rating, cover, first_release_date, id, name, summary, url, videos, websites}
				return (updatedGame)
			})

			// games array sent to client
			res.json(games)
		})
		.catch(e => {
			// if error occurs then sample data will be given to user
			let games = backupData.games.map(curGame => {
				let {rating, cover, first_release_date, id, name, summary, url, videos, websites} = curGame;
				let updatedGame = {rating, cover, first_release_date, id, name, summary, url, videos, websites}
				return (updatedGame)
			})

			// games array sent to client
			res.json(games)
			console.log("error", e);
		});
		
	});
	
	router.get("/news", function (req, res) {
		// dimensions to be used with news images
		const dimensions = [
			{ width: 2, height: 1.2 },
			{ width: 2, height: 2 },
			{ width: 2, height: 2 },
			{ width: 2, height: 1.2 },
			{ width: 2, height: 1.2 },
			{ width: 2, height: 2 },
			{ width: 2, height: 2 },
			{ width: 2, height: 1.2 },
			{ width: 2, height: 1.2 },
			{ width: 2, height: 2 }
		];

		// sends a request to ign api for news
		axios.get(`https://newsapi.org/v2/top-headlines?sources=ign&apiKey=${keys.ign.key}`)
		.then(result => {
			// clean up the response.data array
			let cleanedArticles = result.data.articles.map((article, i) => {
				// check if image is placeholder
				let ans = article.urlToImage.includes("contentplaceholderpng");
				// if image is a placeholder then replace it with a different image
				// assign dimensions to each image
				if(ans) {
					article.urlToImage = "https://www.mcvuk.com/.image/t_share/MTUzMDY4NzA2MTQ3MzQ2MDQw/ignjpg.jpg";
					article.photo = {
						key: i,
						src: article.urlToImage,
						width: dimensions[i].width,
						height: dimensions[i].height
					};
				} else {
					article.photo = {
						key: i,
						src: article.urlToImage,
						width: dimensions[i].width,
						height: dimensions[i].height
					};
				}
				// return article with updated data
				return article
			})
			// articles array sent to client
			res.json(cleanedArticles)
		})
		.catch(e => {
			// if error occurs then sample data will be given to user
			let articles = backupData.news;

			// assign dimensions to each image
			let cleanedArticles = articles.map((article, i) => {
				article.photo = {
					key: i,
					src: article.urlToImage,
					width: dimensions[i].width,
					height: dimensions[i].height
				};
				// return article with updated data
				return article
			})
			// articles array sent to client
			res.json(cleanedArticles)
			console.log("/news", e);
		});;
		
	});
	
	return router;
};


