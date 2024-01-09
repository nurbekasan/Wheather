document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');
    const cityHide = document.querySelector('.city-hide');

    search.addEventListener('click', () => {
        const APIKey = '90ee690b6a17c12c06cb0111943791b7';
        const cityInput = document.querySelector('.search-box input');
        const city = cityInput.value.trim();

        if (city === '') {
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404') {
                    cityHide.textContent = city;
                    container.style.height = '400px';
                    weatherBox.classList.remove('active');
                    weatherDetails.classList.remove('active');
                    error404.classList.add('active');
                } else {
                    const image = document.querySelector('.weather-box img');
                    const temperature = document.querySelector('.weather-box .temperature');
                    const description = document.querySelector('.weather-box .description');
                    const humidity = document.querySelector('.weather-details .humidity span');
                    const wind = document.querySelector('.weather-details .wind span');

                    if (cityHide.textContent == city) {
                        return;
                    } else {
                        cityHide.textContent = city;

                        container.style.height = '555px';
                        container.classList.add('active');
                        weatherBox.classList.add('active');
                        weatherDetails.classList.add('active');
                        error404.classList.remove('active');

                        setTimeout(() => {
                            container.classList.remove('active');
                        }, 2500);

                        switch (json.weather[0].main) {
                            // ... your existing code for setting weather images

                        }

                        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                        description.innerHTML = `${json.weather[0].description}`;
                        humidity.innerHTML = `Humidity: ${json.main.humidity}%`;
                        wind.innerHTML = `Wind Speed: ${parseInt(json.wind.speed)} Km/h`;

                        const infoWeather = document.querySelector('.info-weather');
                        const infoHumidity = document.querySelector('.info-humidity');
                        const infoWind = document.querySelector('.info-wind');

                        const elCloneInfoWeather = infoWeather.cloneNode(true);
                        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
                        const elCloneInfoWind = infoWind.cloneNode(true);

                        elCloneInfoWeather.classList.add('active-clone');
                        elCloneInfoHumidity.classList.add('active-clone');
                        elCloneInfoWind.classList.add('active-clone');

                        setTimeout(() => {
                            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
                        }, 2200);

                        const cloneInfoWeather = document.querySelector('.info-weather.active-clone');
                        const cloneInfoHumidity = document.querySelector('.info-humidity.active-clone');
                        const cloneInfoWind = document.querySelector('.info-wind.active-clone');

                        if (cloneInfoWeather) {
                            setTimeout(() => {
                                cloneInfoWeather.classList.remove('active-clone');
                                cloneInfoHumidity.classList.remove('active-clone');
                                cloneInfoWind.classList.remove('active-clone');
                            }, 2200);
                        }
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
});
