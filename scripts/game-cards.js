/************************************************/
/* Function: nextPage                           */
/*----------------------------------------------*/
/* - Clear and load next page of games          */
/************************************************/

const sortType = () => {
	const sortedby = document.getElementById('sortSelect');
	var sort = sortedby.options[sortedby.selectedIndex].text;

	if(sort == "Default") sort = 'Default';
	if(sort == "Oldest") sort = 'released';
	if(sort == "Newest") sort = '-released';
	if(sort == "Rating") sort = 'rating';
	if(sort == "Name") sort = 'name';

	return sort;
};
const filterBy = () => {
	const filteredBy = document.getElementById('filteredBy');
	var filter = this.form.get('filteredBy').innerHTML
	console.log(filter)
	var id
	switch(filter){
		case "Xbox One":
			id = 1
			break
		case "PC":
			id = 4
			break
		case "PS4":
			id = 18
			break
		case "iOS":
			id = 3
			break
		case "Android":
			id = 21
			break
		case "MacOS":
			id = 5
			break
		case "Linux":
			id = 6
			break
		case "Switch":
			id = 7
			break
		default:
			id = -1
			break
	}
	return id
}
function sortGames(){
	console.log(sortType())
	resortPage(sortType(),filterBy())
	filterPage(filterBy(),sortType())
};
const filterPage = (filter, sort) => {
	page_count.value = 1

	// Clear Page
	var del = document.getElementById('cards');

	while(del.firstChild){
		del.removeChild(del.firstChild);
		console.log('Deleting . . .');
	}
	console.log('Restoring: ' + page_count.value);

	// Load New Games
	if(id != -1){
		sendHttpRequest('GET', 'https://api.rawg.io/api/games?dates=1975-01-01,2022-12-31.1975-01-01,2022-12-31'.concat('&ordering=', sort).concat('&page=', page_count.value).concat('&platform=').concat(toString(filter)));
	}else{
		sendHttpRequest('GET', 'https://api.rawg.io/api/games?dates=1975-01-01,2022-12-31.1975-01-01,2022-12-31'.concat('&ordering=', sort).concat('&page=', page_count.value));
	}
};
const resortPage = (sort, filter) => {
	page_count.value = 1

	// Clear Page
	var del = document.getElementById('cards');

	while(del.firstChild){
		del.removeChild(del.firstChild);
		console.log('Deleting . . .');
	}
	console.log('Restoring: ' + page_count.value);

	// Load New Games
	if(id != -1){
		sendHttpRequest('GET', 'https://api.rawg.io/api/games?dates=1975-01-01,2022-12-31.1975-01-01,2022-12-31'.concat('&ordering=', sort).concat('&page=', page_count.value).concat('&platform=').concat(toString(filter)));
	}else{
		sendHttpRequest('GET', 'https://api.rawg.io/api/games?dates=1975-01-01,2022-12-31.1975-01-01,2022-12-31'.concat('&ordering=', sort).concat('&page=', page_count.value));
	}
	
};

const nextPage = () => {
	page_count.value = Number(page_count.value) + 1;

	const sortedby = document.getElementById('sortSelect');
	var sort = sortedby.options[sortedby.selectedIndex].text;

	// Clear Page
	var del = document.getElementById('cards');

	while(del.firstChild){
		del.removeChild(del.firstChild);
		console.log('Deleting . . .');
	}
	console.log('Next: ' + page_count.value);

	// Load New Games
	sendHttpRequest('GET', 'https://api.rawg.io/api/games?dates=1975-01-01,2022-12-31.1975-01-01,2022-12-31'.concat('&ordering=', sortType()).concat('&page=', page_count.value));
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

		const sortedby = document.getElementById('sortSelect');
		var sort = sortedby.options[sortedby.selectedIndex].text;

		var del = document.getElementById('cards');

		while(del.firstChild){
			del.removeChild(del.firstChild);
			console.log('Deleting . . .');
		}

		// Load New Games
		sendHttpRequest('GET', 'https://api.rawg.io/api/games?dates=1975-01-01,2022-12-31.1975-01-01,2022-12-31'.concat('&ordering=', sortType()).concat('&page=', page_count.value));
	}
	console.log('Prev: ' + page_count.value);
};

/************************************************/
/* Function: getPlatformsList                   */
/*----------------------------------------------*/
/* - Get the platforms that each game is on     */
/************************************************/
const getPlatformsList = (game, platforms_list) => {
	const arr = document.createElement('div');
	arr.className = 'platforms game-card-medium__platforms'
	if(game.platforms != null){
		game.parent_platforms.forEach(x => {
			const new_platform = document.createElement('div');

			// Switch-Statement to Assign Platforms
			switch (x.platform.name) {
				case 'PC':
					new_platform.className = 'platforms__platform platform__pc';
					new_platform.style.backgroundImage = 'url(./images/platform_pc_white_logo.svg';
					break;
				case 'PlayStation':
					new_platform.className = 'platforms__platform platform__playstation';
					new_platform.style.backgroundImage = 'url(./images/platform_playstation_white_logo.svg';
					break;
				case 'Xbox':
					new_platform.className = 'platforms__platform platform__xbox';
					new_platform.style.backgroundImage = 'url(./images/platform_xbox_white_logo.svg';
					break;
				case 'Apple Macintosh':
					new_platform.className = 'platforms__platform platform__mac';
					new_platform.style.backgroundImage = 'url(./images/platform_mac_white_logo.svg';
					break;
				case 'Linux':
					new_platform.className = 'platforms__platform platform__linux';
					new_platform.style.backgroundImage = 'url(./images/platform_linux_white_logo.svg';
					break;
				case 'Nintendo':
					new_platform.className = 'platforms__platform platform__nintendo';
					new_platform.style.backgroundImage = 'url(./images/platform_nintendo_white_logo.svg';
					break;
				case 'iOS':
					new_platform.className = 'platforms__platform platform__ios';
					new_platform.style.backgroundImage = 'url(./images/platform_ios_white_logo.svg';
					break;
				case 'Android':
					new_platform.className = 'platforms__platform platform__android';
					new_platform.style.backgroundImage = 'url(./images/platform_android_white_logo.svg';
					break;
				default:
					console.log('Need Logo '.concat(x.platform.name));
					break;
			}
			// Append new platform to list
			arr.appendChild(new_platform);
		});
	}
	else{
		console.log('No Platforms');
	}
	platforms_list.appendChild(arr);
};

/************************************************/
/* Function: sendHttpRequest                    */
/*----------------------------------------------*/
/* - Send XMLHttpRequest to get data          */
/************************************************/
const sendHttpRequest = (method, url) => {

	console.log(url);
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
			game_img.src = game.background_image;

			// Get Platforms
			const platforms_list = document.createElement('div');
			platforms_list.className = 'game-card-medium__meta';
			getPlatformsList(game, platforms_list);

			// Get Game Name
			const game_title = document.createElement('div');
			// game_title.setAttribute('class', 'card-header')
			game_title.className = 'heading heading_4';
			game_title.textContent = game.name;
			game_card.title = game.slug;

			// Set onClick Function
			game_card.onclick = function(){
				window.location.href = './game.html?title='.concat(this.title);
			};
			
			game_card.appendChild(game_img);
			game_card.appendChild(platforms_list);
			game_card.appendChild(game_title);

			container.appendChild(game_card);

			// console.log(game.slug);
			// console.log(game.name);
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
sendHttpRequest('GET', 'https://api.rawg.io/api/games?dates=1975-01-01,2022-12-31.1975-01-01,2022-12-31&ordering=Default&page=1');

nextBtn.addEventListener('click', nextPage);
prevBtn.addEventListener('click', prevPage);