let valueSearch = document.getElementById('valueSearch');
let city = document.getElementById('city');
let temperature = document.getElementById('temperature');
let description = document.querySelector('.description');
let clouds = document.getElementById('clouds');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let form = document.querySelector('form');
let main = document.querySelector('main');
let body = document.body;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (valueSearch.value != '') {
        searchWeather();
    }
});

let id = 'bfa56303389abde6e8a95992d3f7e5d4';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

const searchWeather = () => {
    fetch(url + '&q=' + valueSearch.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.cod == 200) {
                city.querySelector('figcaption').innerText = data.name;
                city.querySelector('img').src = 'https://flagsapi.com/' + data.sys.country + '/shiny/32.png';

                temperature.querySelector('img').src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@4x.png';
                temperature.querySelector('figcaption span').innerText = Math.round(data.main.temp);
                description.innerText = data.weather.description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                clouds.innerText = data.clouds.all;
                humidity.innerText = data.main.humidity;
                pressure.innerText = data.main.pressure;
            } else {
                main.classList.add('error');
                setTimeout(() => {
                    main.classList.remove('error');
                }, 1000);
            }
            valueSearch.value = '';
        });
};



const initApp = () => {
    valueSearch.value = 'Surulere';
    searchWeather();
    toggleDarkMode();
};

const toggleDarkMode = () => {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerText = 'D';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '10px';
    darkModeToggle.style.right = '10px';
    darkModeToggle.style.padding = '5px';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.borderRadius = '5px';
    darkModeToggle.style.backgroundColor = '#333';
    darkModeToggle.style.color = '#fff';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.setAttribute('aria-label', 'Dark Mode');
    darkModeToggle.setAttribute('title', 'Dark Mode');

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });

    body.appendChild(darkModeToggle);
};

initApp();