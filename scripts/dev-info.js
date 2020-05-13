var stylesheet = document.createElement('link');
stylesheet.setAttribute('href', 'https://bootswatch.com/4/cyborg/bootstrap.css');
stylesheet.setAttribute('rel', 'stylesheet');
stylesheet.setAttribute('type', 'text/css');
document.head.appendChild(stylesheet);

const app = document.getElementById('game-info');
const logospace = document.getElementById("logoSpace")
var query = window.location.search.substring(1).split('=')[1];
var request = new XMLHttpRequest();
request.open('GET', 'https://api.rawg.io/api/publishers/'.concat(query));

request.onload = () => {

    var data = JSON.parse(request.response);

    document.head.parentNode.setAttribute('style', "background: url('[image_url]'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;".replace('[image_url]', data.image_background));
    const dev_title = document.getElementById('dev-title');
    dev_title.setAttribute('class', 'card-title');
    dev_title.textContent = data.name;

    const dev_description = document.getElementById('dev-description');
    dev_description.setAttribute('class', 'card-text');
    dev_description.innerHTML = data.description;
    logoReq(data.name)
    
    
};

request.send();
function logoReq(name){
    var request3 = new XMLHttpRequest();
    request3.open('GET', "https://autocomplete.clearbit.com/v1/companies/suggest?query=".concat(name));
    request3.onload = () => {
    
        var data = JSON.parse(request3.response);
        logospace.setAttribute('class', 'logo')
        logospace.setAttribute('src', "https://logo.clearbit.com/".concat(data[0].logo).concat("?size=80&greyscale=true"))
    };
    request3.send()
}





const app2 = document.getElementById('game-card-list');

const container = document.createElement('div');
container.setAttribute('class', 'container-2');
container.setAttribute('id', 'cards');



var request2 = new XMLHttpRequest();
request2.open('GET', 'https://api.rawg.io/api/games?publishers='.concat(query));

request2.onload = () => {

    var data = JSON.parse(request2.response);
	
		data.results.forEach(game => {
			const game_card = document.createElement('div');
			// game_card.setAttribute('class', 'card border-secondary mb-3');
			game_card.className = 'card-2 border-secondary mb-3';
	
			// Get Game Image
			const game_img = document.createElement('img');
			game_img.className = 'background-2';
			game_img.src = game.background_image;

			// Get Platforms
			// const platforms_list = document.createElement('div');
			// platforms_list.className = 'platforms';
			// getPlatformsList(game, games_count);

			// Get Game Name
			const game_title = document.createElement('div');
			// game_title.setAttribute('class', 'card-header')
			game_title.className = 'heading-2 heading_42';
			game_title.textContent = game.name;
			game_card.title = game.slug;

			 //Set onClick Function
			game_card.onclick = function(){
			 	window.location.href = './game.html?title='.concat(game.slug);
			};
			
			game_card.appendChild(game_img);
			// game_card.appendChild(platforms_list);
			game_card.appendChild(game_title);

			container.appendChild(game_card);
		});

};
request2.send();
 app2.appendChild(container);