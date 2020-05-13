/************************************************/
/* Function: nextPage                           */
/*----------------------------------------------*/
/* - Clear and load next page of games          */
/************************************************/
const nextPage = () => {
	page_count.value = Number(page_count.value) + 1;

	// Clear Page
	var del = document.getElementById('cards');

	while(del.firstChild){
		del.removeChild(del.firstChild);
		console.log('Deleting . . .');
	}
	console.log('Next: ' + page_count.value);

	// Load New Games
	sendHttpRequest('GET', 'https://api.rawg.io/api/publishers'.concat('?page=',page_count.value));
};

/************************************************/
/* Function: prevPage                           */
/*----------------------------------------------*/
/* - Clear and load prev page of games          */
/************************************************/
const prevPage = () => {
	if(Number(page_count.value) > 1){
		// Clear Page
		page_count.value = Number(page_count.value) - 1;

		var del = document.getElementById('cards');

		while(del.firstChild){
			del.removeChild(del.firstChild);
			console.log('Deleting . . .');
		}

		// Load New Games
		sendHttpRequest('GET', 'https://api.rawg.io/api/publishers'.concat('?page=',page_count.value));
	}
	console.log('Prev: ' + page_count.value);
};

/************************************************/
/* Function: getPlatformsList                   */
/*----------------------------------------------*/
/* - Get the platforms that each game is on     */
/************************************************/

/************************************************/
/* Function: sendHttpRequest                    */
/*----------------------------------------------*/
/* - Send XMLHttpRequest to get data          */
/************************************************/
const sendHttpRequest2 = (method, url) => {
	var request = new XMLHttpRequest();

	request.open(method, url);
	
	request.onload = () => {
		var data = JSON.parse(request.response);
	
		data.results.forEach(game => {
			const game_card = document.createElement('div');
			// game_card.setAttribute('class', 'card border-secondary mb-3');
			game_card.className = 'card border-secondary mb-3';
	
			// Get Game Image
			const game_img = document.createElement('img');
			game_img.className = 'background';
			game_img.src = game.image_background;

			// Get Platforms
			// const platforms_list = document.createElement('div');
			// platforms_list.className = 'platforms';
			// getPlatformsList(game, games_count);

			// Get Game Name
			const game_title = document.createElement('div');
			// game_title.setAttribute('class', 'card-header')
			game_title.className = 'heading heading_4';
			game_title.textContent = game.name;
			game_card.title = game.slug;

			 //Set onClick Function
			game_card.onclick = function(){
			 	window.location.href = './devinfo.html?title='.concat(game.slug);
			};
			
			game_card.appendChild(game_img);
			// game_card.appendChild(platforms_list);
			game_card.appendChild(game_title);

			container.appendChild(game_card);
		});
	};
	request.send();
};
const sendHttpRequest = (method, url) => {
	var request = new XMLHttpRequest();

	request.open(method, url);
	
	request.onload = () => {
		var data = JSON.parse(request.response);
	
		data.results.forEach(game => {
			const game_card = document.createElement('div');
			// game_card.setAttribute('class', 'card border-secondary mb-3');
			game_card.className = 'card border-secondary mb-3';
	
			// Get Game Image
			const game_img = document.createElement('img');
			game_img.className = 'background';
			game_img.src = game.image_background;

			// Get Platforms
			// const platforms_list = document.createElement('div');
			// platforms_list.className = 'platforms';
			// getPlatformsList(game, games_count);

			// Get Game Name
			const game_title = document.createElement('div');
			// game_title.setAttribute('class', 'card-header')
			game_title.className = 'heading heading_4';
			game_title.textContent = game.name;
			game_card.title = game.slug;

			 //Set onClick Function
			game_card.onclick = function(){
			 	window.location.href = './devinfo.html?title='.concat(game.slug);
			};
			
			game_card.appendChild(game_img);
			// game_card.appendChild(platforms_list);
			game_card.appendChild(game_title);

			container.appendChild(game_card);
		});
	};
	request.send();
	
};

const app = document.getElementById('game-card-list');

const container = document.createElement('div');
container.setAttribute('class', 'container');
container.setAttribute('id', 'cards');

const navCenter = document.createElement('div');

navCenter.setAttribute('class', 'section');

const nextBtn = document.createElement('button');
const prevBtn = document.createElement('button');

nextBtn.setAttribute('class', 'btn btn-secondary');
prevBtn.setAttribute('class', 'btn btn-secondary');

nextBtn.innerHTML = 'Next';
prevBtn.innerHTML = 'Prev';

navCenter.appendChild(prevBtn);
navCenter.appendChild(nextBtn);

const page_count = document.createElement('input');

page_count.type = 'hidden';
page_count.value = 1;

app.appendChild(container);
app.appendChild(navCenter);
app.appendChild(page_count);

/************************************************/
/* Initialize Data                              */
/************************************************/
sendHttpRequest('GET', 'https://api.rawg.io/api/publishers');

nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);