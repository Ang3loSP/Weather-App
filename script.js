/*
================================================================================
WEATHER APP - ORIGINAL STRUCTURE PRESERVED WITH 3 API METHODS
================================================================================
Original features preserved:
- Geolocation auto-detection
- 5-day forecast
- Local SVG icons with CDN fallback
- All original comments and explanations

NEW: Three API methods you can switch between:
1. Fetch API (Modern)
2. jQuery AJAX (Classic)
3. XMLHttpRequest (Legacy)
================================================================================
*/

// ================================
// 1. DOM ELEMENTS (ORIGINAL - UNCHANGED)
// ================================

const cityInput = document.querySelector('.city-input')
const searchBtn = document.querySelector('.search-btn')

const weatherInfoSection = document.querySelector('.weather-info')
const notFoundSection = document.querySelector('.not-found')
const searchCitySection = document.querySelector('.search-city')

const countryTxt = document.querySelector('.country-txt')
const tempTxt = document.querySelector('.temp-txt')
const conditionTxt = document.querySelector('.condition-txt')
const humidityValueTxt = document.querySelector('.humidity-value-txt')
const windValueTxt = document.querySelector('.wind-value-txt')
const weatherSummaryImg = document.querySelector('.weather-summary-img')
const currentDateTxt = document.querySelector('.current-date-txt')

const forecastItemsContainer = document.querySelector('.forecast-items-container')

// API key removed — all requests go through the Netlify function at /.netlify/functions/weather
const FUNCTION_URL = '/.netlify/functions/weather'

// NEW: Method selector - which API method to use
let currentMethod = 'fetch'  // Options: 'fetch', 'jquery', 'xhr'

// ================================
// 2. ORIGINAL HELPER FUNCTIONS (COMPLETELY UNCHANGED)
// ================================

function getWeatherIcon(weatherId) {
    if (weatherId >= 200 && weatherId <= 232) return 'thunderstorm.svg'
    if (weatherId >= 300 && weatherId <= 321) return 'drizzle.svg'
    if (weatherId >= 500 && weatherId <= 531) return 'rain.svg'
    if (weatherId >= 600 && weatherId <= 622) return 'snow.svg'
    if (weatherId >= 701 && weatherId <= 781) return 'atmosphere.svg'
    if (weatherId === 800) return 'clear.svg'
    if (weatherId >= 801 && weatherId <= 804) return 'clouds.svg'
    return 'clouds.svg'
}

function getWeatherIconUrl(weatherId) {
    if (weatherId >= 200 && weatherId <= 232) return 'https://openweathermap.org/img/wn/11d@2x.png'
    if (weatherId >= 300 && weatherId <= 321) return 'https://openweathermap.org/img/wn/09d@2x.png'
    if (weatherId >= 500 && weatherId <= 531) return 'https://openweathermap.org/img/wn/10d@2x.png'
    if (weatherId >= 600 && weatherId <= 622) return 'https://openweathermap.org/img/wn/13d@2x.png'
    if (weatherId >= 701 && weatherId <= 781) return 'https://openweathermap.org/img/wn/50d@2x.png'
    if (weatherId === 800) return 'https://openweathermap.org/img/wn/01d@2x.png'
    if (weatherId >= 801 && weatherId <= 804) return 'https://openweathermap.org/img/wn/04d@2x.png'
    return 'https://openweathermap.org/img/wn/04d@2x.png'
}

function getCurrentDate() {
    const currentDate = new Date()
    const options = { 
        weekday: 'short', 
        day: '2-digit', 
        month: 'short'
    }
    return currentDate.toLocaleDateString('en-US', options)
}

// ================================
// 3. API DATA FUNCTIONS - MODIFIED TO SUPPORT 3 METHODS
// ================================

/*
EXPLANATION: These functions replace the original getFetchData() and getForecastData().
Instead of only Fetch, they now support all three methods while maintaining the same
return format (Promise that resolves to weather data).
*/

// Get weather data by city name - supports all 3 methods
async function getWeatherData(city) {
    const apiUrl = FUNCTION_URL + '?type=weather&q=' + encodeURIComponent(city)
    
    if (currentMethod === 'fetch') {
        // METHOD 1: FETCH API (Modern)
        console.log('🟢 Using Fetch API for weather')
        try {
            const response = await fetch(apiUrl)
            return await response.json()
        } catch (error) {
            console.error('Fetch error:', error)
            return { cod: 500 }
        }
    } 
    else if (currentMethod === 'jquery') {
        // METHOD 2: JQUERY AJAX (Classic)
        console.log('🟡 Using jQuery AJAX for weather')
        try {
            return await $.ajax({ url: apiUrl, method: 'GET', dataType: 'json' })
        } catch (error) {
            console.error('jQuery error:', error)
            return { cod: 500 }
        }
    } 
    else {
        // METHOD 3: XMLHttpRequest (Legacy)
        console.log('🔴 Using XMLHttpRequest for weather')
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    resolve({ cod: xhr.status })
                }
            }
            xhr.onerror = () => resolve({ cod: 500 })
            xhr.open('GET', apiUrl, true)
            xhr.send()
        })
    }
}

// Get weather data by coordinates - supports all 3 methods (for geolocation)
async function getWeatherDataByCoords(lat, lon) {
    const apiUrl = FUNCTION_URL + '?type=weather&lat=' + lat + '&lon=' + lon
    
    if (currentMethod === 'fetch') {
        console.log('🟢 Using Fetch API for geolocation weather')
        try {
            const response = await fetch(apiUrl)
            return await response.json()
        } catch (error) {
            return { cod: 500 }
        }
    } 
    else if (currentMethod === 'jquery') {
        console.log('🟡 Using jQuery AJAX for geolocation weather')
        try {
            return await $.ajax({ url: apiUrl, method: 'GET', dataType: 'json' })
        } catch (error) {
            return { cod: 500 }
        }
    } 
    else {
        console.log('🔴 Using XMLHttpRequest for geolocation weather')
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    resolve({ cod: xhr.status })
                }
            }
            xhr.onerror = () => resolve({ cod: 500 })
            xhr.open('GET', apiUrl, true)
            xhr.send()
        })
    }
}

// Get forecast data by city name - supports all 3 methods
async function getForecastData(city) {
    const apiUrl = FUNCTION_URL + '?type=forecast&q=' + encodeURIComponent(city)
    
    if (currentMethod === 'fetch') {
        console.log('🟢 Using Fetch API for forecast')
        try {
            const response = await fetch(apiUrl)
            return await response.json()
        } catch (error) {
            return { cod: 500 }
        }
    } 
    else if (currentMethod === 'jquery') {
        console.log('🟡 Using jQuery AJAX for forecast')
        try {
            return await $.ajax({ url: apiUrl, method: 'GET', dataType: 'json' })
        } catch (error) {
            return { cod: 500 }
        }
    } 
    else {
        console.log('🔴 Using XMLHttpRequest for forecast')
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    resolve({ cod: xhr.status })
                }
            }
            xhr.onerror = () => resolve({ cod: 500 })
            xhr.open('GET', apiUrl, true)
            xhr.send()
        })
    }
}

// Get forecast data by coordinates - supports all 3 methods
async function getForecastDataByCoords(lat, lon) {
    const apiUrl = FUNCTION_URL + '?type=forecast&lat=' + lat + '&lon=' + lon
    
    if (currentMethod === 'fetch') {
        console.log('🟢 Using Fetch API for forecast by coords')
        try {
            const response = await fetch(apiUrl)
            return await response.json()
        } catch (error) {
            return { cod: 500 }
        }
    } 
    else if (currentMethod === 'jquery') {
        console.log('🟡 Using jQuery AJAX for forecast by coords')
        try {
            return await $.ajax({ url: apiUrl, method: 'GET', dataType: 'json' })
        } catch (error) {
            return { cod: 500 }
        }
    } 
    else {
        console.log('🔴 Using XMLHttpRequest for forecast by coords')
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    resolve({ cod: xhr.status })
                }
            }
            xhr.onerror = () => resolve({ cod: 500 })
            xhr.open('GET', apiUrl, true)
            xhr.send()
        })
    }
}

// ================================
// 4. UPDATE WEATHER FUNCTIONS (ORIGINAL STRUCTURE PRESERVED)
// ================================

// Update weather info using city name (ORIGINAL FUNCTION - only changed what it calls)
async function updateWeatherInfo(city) {
    const weatherData = await getWeatherData(city)

    if (weatherData.cod != 200) {
        showDisplaySection(notFoundSection)
        return
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + ' °C'
    conditionTxt.textContent = main
    humidityValueTxt.textContent = humidity + '%'
    windValueTxt.textContent = Math.round(speed) + ' km/h'
    currentDateTxt.textContent = getCurrentDate()
    
    const iconFileName = getWeatherIcon(id)
    weatherSummaryImg.src = `Assets/weather/${iconFileName}`
    weatherSummaryImg.alt = main
    
    weatherSummaryImg.onerror = function() {
        this.src = getWeatherIconUrl(id)
        this.onerror = null
    }

    await updateForecastsInfo(city)
    showDisplaySection(weatherInfoSection)
}

// Update weather info using coordinates (ORIGINAL FUNCTION - for geolocation)
async function updateWeatherInfoByCoords(lat, lon) {
    const weatherData = await getWeatherDataByCoords(lat, lon)

    if (weatherData.cod != 200) {
        updateWeatherInfo('Springs')
        return
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData

    countryTxt.textContent = country
    tempTxt.textContent = Math.round(temp) + ' °C'
    conditionTxt.textContent = main
    humidityValueTxt.textContent = humidity + '%'
    windValueTxt.textContent = Math.round(speed) + ' km/h'
    currentDateTxt.textContent = getCurrentDate()
    
    const iconFileName = getWeatherIcon(id)
    weatherSummaryImg.src = `Assets/weather/${iconFileName}`
    weatherSummaryImg.alt = main
    
    weatherSummaryImg.onerror = function() {
        this.src = getWeatherIconUrl(id)
        this.onerror = null
    }

    await updateForecastsInfoByCoords(lat, lon)
    showDisplaySection(weatherInfoSection)
}

// ================================
// 5. FORECAST FUNCTIONS (ORIGINAL STRUCTURE PRESERVED)
// ================================

async function updateForecastsInfo(city) {
    const forecastsData = await getForecastData(city)
    
    if (forecastsData.cod != 200 || !forecastsData.list) {
        console.warn('Forecast data unavailable')
        forecastItemsContainer.innerHTML = '<div class="forecast-item"><h5>Forecast unavailable</h5></div>'
        return
    }
    
    forecastItemsContainer.innerHTML = ''
    const todayDate = new Date().toISOString().split('T')[0]
    const addedDates = new Set()
    
    for (const forecast of forecastsData.list) {
        const forecastDate = forecast.dt_txt.split(' ')[0]
        
        if (forecastDate === todayDate) continue
        
        if (!addedDates.has(forecastDate)) {
            addedDates.add(forecastDate)
            
            let bestForecast = forecast
            for (const item of forecastsData.list) {
                const itemDate = item.dt_txt.split(' ')[0]
                const itemTime = item.dt_txt.split(' ')[1]
                if (itemDate === forecastDate && itemTime >= '12:00:00' && itemTime < '15:00:00') {
                    bestForecast = item
                    break
                }
            }
            
            updateForecastsItems(bestForecast)
            
            if (addedDates.size >= 5) break
        }
    }
    
    if (forecastItemsContainer.children.length === 0) {
        forecastItemsContainer.innerHTML = '<div class="forecast-item"><h5>No forecast data</h5></div>'
    }
}

async function updateForecastsInfoByCoords(lat, lon) {
    const forecastsData = await getForecastDataByCoords(lat, lon)
    
    if (forecastsData.cod != 200 || !forecastsData.list) {
        console.warn('Forecast data unavailable')
        forecastItemsContainer.innerHTML = '<div class="forecast-item"><h5>Forecast unavailable</h5></div>'
        return
    }
    
    forecastItemsContainer.innerHTML = ''
    const todayDate = new Date().toISOString().split('T')[0]
    const addedDates = new Set()
    
    for (const forecast of forecastsData.list) {
        const forecastDate = forecast.dt_txt.split(' ')[0]
        
        if (forecastDate === todayDate) continue
        
        if (!addedDates.has(forecastDate)) {
            addedDates.add(forecastDate)
            
            let bestForecast = forecast
            for (const item of forecastsData.list) {
                const itemDate = item.dt_txt.split(' ')[0]
                const itemTime = item.dt_txt.split(' ')[1]
                if (itemDate === forecastDate && itemTime >= '12:00:00' && itemTime < '15:00:00') {
                    bestForecast = item
                    break
                }
            }
            
            updateForecastsItems(bestForecast)
            
            if (addedDates.size >= 5) break
        }
    }
    
    if (forecastItemsContainer.children.length === 0) {
        forecastItemsContainer.innerHTML = '<div class="forecast-item"><h5>No forecast data</h5></div>'
    }
}

function updateForecastsItems(weatherData) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = weatherData

    const dateTaken = new Date(date)
    const dateOption = {
        day: '2-digit',
        month: 'short'
    }
    const dateResult = dateTaken.toLocaleDateString('en-US', dateOption)

    const iconFileName = getWeatherIcon(id)
    const iconUrl = `Assets/weather/${iconFileName}`
    
    const forecastDiv = document.createElement('div')
    forecastDiv.className = 'forecast-item'
    
    const dateElem = document.createElement('h5')
    dateElem.className = 'forecast-item-date regular-txt'
    dateElem.textContent = dateResult
    
    const imgElem = document.createElement('img')
    imgElem.className = 'forecast-item-img'
    imgElem.src = iconUrl
    imgElem.alt = 'forecast icon'
    imgElem.onerror = function() {
        this.src = getWeatherIconUrl(id)
        this.onerror = null
    }
    
    const tempElem = document.createElement('h5')
    tempElem.className = 'forecast-item-temp'
    tempElem.textContent = Math.round(temp) + ' °C'
    
    forecastDiv.appendChild(dateElem)
    forecastDiv.appendChild(imgElem)
    forecastDiv.appendChild(tempElem)
    
    forecastItemsContainer.appendChild(forecastDiv)
}

// ================================
// 6. UI FUNCTIONS (ORIGINAL - UNCHANGED)
// ================================

function showDisplaySection(section) {
    weatherInfoSection.style.display = 'none'
    searchCitySection.style.display = 'none'
    notFoundSection.style.display = 'none'
    section.style.display = 'flex'
}

// ================================
// 7. NEW: METHOD SELECTOR UI (ADDED, DOESN'T AFFECT ORIGINAL)
// ================================

function createMethodSelector() {
    const selectorContainer = document.getElementById('methodSelector')
    if (!selectorContainer) return
    
    selectorContainer.innerHTML = ''
    selectorContainer.style.cssText = `
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
        justify-content: center;
        flex-wrap: wrap;
    `
    
    const methods = [
        { name: '🌐 Fetch API', value: 'fetch', color: '#4CAF50' },
        { name: '📦 jQuery AJAX', value: 'jquery', color: '#FF9800' },
        { name: '⚡ XMLHttpRequest', value: 'xhr', color: '#F44336' }
    ]
    
    methods.forEach(method => {
        const btn = document.createElement('button')
        btn.textContent = method.name
        btn.style.cssText = `
            padding: 8px 16px;
            background: ${currentMethod === method.value ? method.color : 'rgba(255,255,255,0.15)'};
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 30px;
            color: white;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            transition: all 0.2s ease;
        `
        
        btn.onclick = () => {
            currentMethod = method.value
            document.querySelectorAll('.method-btn').forEach(b => {
                b.style.background = 'rgba(255,255,255,0.15)'
            })
            btn.style.background = method.color
            console.log(`\n🔄 METHOD CHANGED TO: ${method.name.toUpperCase()}`)
            
            // Show toast notification
            const toast = document.createElement('div')
            toast.textContent = `Now using: ${method.name}`
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: ${method.color};
                color: white;
                padding: 10px 20px;
                border-radius: 30px;
                font-size: 13px;
                z-index: 1000;
                animation: fadeOut 2s ease forwards;
            `
            document.body.appendChild(toast)
            setTimeout(() => toast.remove(), 2000)
            
            // Refresh current weather with new method
            if (countryTxt.textContent !== 'City' && countryTxt.textContent !== '--') {
                updateWeatherInfo(countryTxt.textContent)
            }
        }
        
        btn.classList.add('method-btn')
        selectorContainer.appendChild(btn)
    })
}

// Add animation CSS
const style = document.createElement('style')
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translateX(-50%) translateY(0); }
        70% { opacity: 1; }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; }
    }
`
document.head.appendChild(style)

// ================================
// 8. EVENT LISTENERS (ORIGINAL - UNCHANGED)
// ================================

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value.trim())
        cityInput.value = ''
        cityInput.blur()
    }
})

cityInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && cityInput.value.trim() != '') {
        updateWeatherInfo(cityInput.value.trim())
        cityInput.value = ''
        cityInput.blur()
    }
})

// ================================
// 9. INITIALIZATION WITH GEOLOCATION (ORIGINAL - PRESERVED)
// ================================

window.addEventListener('load', () => {
    // Create method selector buttons (NEW - doesn't break original)
    createMethodSelector()
    
    // ORIGINAL GEOLOCATION CODE - COMPLETELY UNCHANGED
    if (navigator.geolocation) {
        const searchMessageTitle = document.querySelector('.search-city h1')
        const originalTitle = searchMessageTitle.textContent
        searchMessageTitle.textContent = 'Detecting your location...'
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords
                updateWeatherInfoByCoords(latitude, longitude)
                searchMessageTitle.textContent = originalTitle
            },
            (error) => {
                console.warn('Geolocation error:', error.message)
                searchMessageTitle.textContent = originalTitle
                
                let fallbackCity = 'Springs'
                
                const searchMessageSubtitle = document.querySelector('.search-city h4')
                const originalSubtitle = searchMessageSubtitle.textContent
                searchMessageSubtitle.textContent = 'Using Springs as default (location access denied)'
                
                updateWeatherInfo(fallbackCity)
                
                setTimeout(() => {
                    if (searchMessageSubtitle) {
                        searchMessageSubtitle.textContent = originalSubtitle
                    }
                }, 3000)
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        )
    } else {
        console.warn('Geolocation not supported by browser')
        updateWeatherInfo('Springs')
    }
})