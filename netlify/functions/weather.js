exports.handler = async function(event) {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY
    const params = event.queryStringParameters
    const baseUrl = 'https://api.openweathermap.org/data/2.5/'

    let endpoint = ''

    if (params.type === 'weather' && params.q) {
        endpoint = 'weather?q=' + params.q + '&appid=' + apiKey + '&units=metric'
    } else if (params.type === 'weather' && params.lat) {
        endpoint = 'weather?lat=' + params.lat + '&lon=' + params.lon + '&appid=' + apiKey + '&units=metric'
    } else if (params.type === 'forecast' && params.q) {
        endpoint = 'forecast?q=' + params.q + '&appid=' + apiKey + '&units=metric'
    } else if (params.type === 'forecast' && params.lat) {
        endpoint = 'forecast?lat=' + params.lat + '&lon=' + params.lon + '&appid=' + apiKey + '&units=metric'
    } else {
        return { statusCode: 400, body: 'Bad request' }
    }

    try {
        const response = await fetch(baseUrl + endpoint)
        const data = await response.json()
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    } catch (err) {
        return { statusCode: 500, body: 'Server error' }
    }
}