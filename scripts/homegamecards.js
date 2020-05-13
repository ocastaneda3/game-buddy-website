/************************************************/
/* Function: sendHttpRequest                    */
/*----------------------------------------------*/
/* - Send XMLHttpRequest to get data          */
/************************************************/
const gamerow12 = document.getElementById('gamerow1')
gamerow12.setAttribute('class','row')
const gamerow22 = document.getElementById('gamerow2')
gamerow22.setAttribute('class','row')
const gamerow32 = document.getElementById('gamerow3')
gamerow32.setAttribute('class','row')
var numCards = 0

const sendHttpRequest = (method, url) => {
	var request = new XMLHttpRequest();
	request.open(method, url);
	request.onload = () => {
		var data = JSON.parse(request.response);
		data.results.forEach(game => {
			const column = document.createElement('div')
			column.setAttribute('class', 'col-game')
			const card = document.createElement('div')
			card.setAttribute('class', 'card border-secondary mb-3')
			card.setAttribute('style', 'max-width: 20rem;')
			const cardheader = document.createElement('div')
			cardheader.setAttribute('class', 'card-header-game body-game-card')
			cardheader.textContent = game.name
			const game_img = document.createElement('img');
			game_img.className = 'background';
			game_img.src = game.background_image;
			if(numCards < 5){
				gamerow12.appendChild(column)
			}else if(numCards < 10){
				gamerow22.appendChild(column)
			}else{
				gamerow32.appendChild(column)
			}
			column.appendChild(card)
			card.appendChild(cardheader)
			// cardbody.appendChild(cardtitle)
			card.appendChild(game_img)
			numCards++
		});
	};
	
	request.send();
};
var url = 'https://api.rawg.io/api/games?ordering=+rating&page_size=15&page=1'
sendHttpRequest('GET', url);

function doQuery(){
	var search = document.getElementById('search')
	console.log(search.text)
}