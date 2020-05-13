const add_video_content = (data_, content_column) => {

    const video_temp1 = document.createElement('div');
    video_temp1.setAttribute('class', 'game__movie');

    const video_temp2 = document.createElement('div');
    video_temp2.setAttribute('class', 'game-card-video');

    const video = document.createElement('video');
    video.setAttribute('class', 'game-card-video__video');
    video.setAttribute('playsinline', '');
    video.setAttribute('loop', '');
    video.setAttribute('src', '[vid_url]'.replace('[vid_url]', data_.clip.clips.full));
    video.autoplay = true;
    video.muted = true;

    video_temp2.appendChild(video);
    video_temp1.appendChild(video_temp2);
    content_column.appendChild(video_temp1);
}

const add_screenshot_content = (data_, carousel_container) => {

    var count = 1;

    var screenshot_request = new XMLHttpRequest();

    screenshot_request.open('GET', 'https://api.rawg.io/api/games/[game_id]/screenshots'.replace('[game_id]', data_));

    screenshot_request.onload = () => {
        var data = JSON.parse(screenshot_request.response);

        data.results.forEach(x => {
            console.log(x.image);

            var carousel_item = document.createElement('div');
            if(count == 1){
                carousel_item.setAttribute('class', 'carousel-item active');
            }
            else{
                carousel_item.setAttribute('class', 'carousel-item');
            }
        
            var screenshot_ = document.createElement('img');
            screenshot_.setAttribute('id', 'img[count]'.replace('[count]', count));
            screenshot_.setAttribute('class', 'd-block round-border');
            screenshot_.setAttribute('src', x.image);
            screenshot_.setAttribute('alt', 'Slide Image');

            carousel_item.appendChild(screenshot_);

            carousel_container.appendChild(carousel_item);
            count = count + 1;
        });
    }
    screenshot_request.send();
}

const add_store_content = (data_, stores_container) => {

    console.log(data_);

    data_.forEach(x =>{
        console.log(x.store.name, ' - ', x.url);

        const store_item = document.createElement('a');
        store_item.setAttribute('href', x.url);
        store_item.innerHTML = x.store.name.concat(' ');

        const store_logo = document.createElement('span');
        store_logo.setAttribute('class', 'iconify');

        store_logo.setAttribute('data-icon', 'mdi:'.concat(getIconName(x.store.slug)));
        store_logo.setAttribute('data-inline', 'false');
        // store_item_container.appendChild(store_item);


        const list_element = document.createElement('li');
        list_element.setAttribute('class', 'list-group-item');
        list_element.appendChild(store_item);
        list_element.appendChild(store_logo);

        stores_container.appendChild(list_element);
    });
}

var getIconName = (name) => {
    var output = name
    switch (name) {
        case "xbox360":
            output = 'xbox'
            break
        case "gog":
            output = 'gog-com'
            break
        case "playstation-store":
            output = 'playstation'
            break
        case "xbox-store":
            output = 'xbox'
            break
        case "apple-appstore":
            output = 'apple'
            break
        default:
            break
    }
    return output
}

var getRating = (id) => {
    var rating
    switch(id){
        case 1:
            rating = 'https://www.esrb.org/wp-content/uploads/2019/05/E.svg'
            break
        case 2:
            rating = 'https://www.esrb.org/wp-content/uploads/2019/05/E10plus.svg'
            break
        case 3:
            rating = 'https://www.esrb.org/wp-content/uploads/2019/05/T.svg'
            break
        case 4:
            rating = 'https://www.esrb.org/wp-content/uploads/2019/05/M.svg'
            break
        case 5:
            rating = 'https://www.esrb.org/wp-content/uploads/2019/05/AO.svg'
            break
        default:
            break
    }
    return rating
}

var stylesheet = document.createElement('link');

stylesheet.setAttribute('href', 'https://bootswatch.com/4/cyborg/bootstrap.css');
stylesheet.setAttribute('rel', 'stylesheet');
stylesheet.setAttribute('type', 'text/css');

document.head.appendChild(stylesheet);

const app = document.getElementById('game-info');

var query = window.location.search.substring(1).split('=')[1];
var request = new XMLHttpRequest();

request.open('GET', 'https://api.rawg.io/api/games/'.concat(query));

request.onload = () => {

    var data = JSON.parse(request.response);
    document.head.parentNode.setAttribute('style', "background: url('[image_url]'); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;".replace('[image_url]', data.background_image));
    const game_title = document.getElementById('game_title');
    game_title.setAttribute('class', 'card-title');
    game_title.textContent = data.name;

    const game_text = document.getElementById('game-description');
    game_text.setAttribute('class', 'card-text');
    game_text.innerHTML = data.description;

    const video_content_column = document.getElementById('game-video');
    video_content_column.setAttribute('class', 'game-content-columns');

    const screenshot_content_container = document.getElementById('carousel-inner');
    screenshot_content_container.setAttribute('class', 'carousel-inner');
    screenshot_content_container.setAttribute('role', 'listbox');

    // Rating
    const rating = document.getElementById('rating')
    rating.setAttribute('src', getRating(data.esrb_rating.id))

    var metacriticRating = document.getElementById("metacriticRating")
    metacriticRating.innerHTML = data.metacritic
    metacriticRating.setAttribute('aria-valuenow', data.metacritic)
    metacriticRating.setAttribute('style', 'width: '.concat(data.metacritic).concat('%;'))
    
    // Add Media
    add_video_content(data, video_content_column);
    add_screenshot_content(data.slug, screenshot_content_container);
    add_store_content(data.stores, document.getElementById('stores-list'));
    var disqus_config = function () {
        this.page.url = query;  // Replace PAGE_URL with your page's canonical URL variable
        this.page.identifier = query; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        };
        (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');
        s.src = 'https://gamebuddy-1.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();
};

request.send();