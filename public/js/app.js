const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const msg3 = document.querySelector('#msg3')
const msg4 = document.querySelector('#msg4')
const msg5 = document.querySelector('#msg5')
const msg6 = document.querySelector('#msg6')
const msg7 = document.querySelector('#msg7')

msg1.textContent = ''
msg2.textContent = ''
msg3.textContent = ''
msg4.textContent = ''
msg5.textContent = ''
msg6.textContent = ''
msg7.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchEl.value;
    searchEl.value = ''
    msg1.textContent = 'Go make a coffee....'
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
                return console.log(data.error);
            }
            msg1.textContent = `The weather for ${data.address_searched} is currently ${data.current}`
            msg2.textContent = `The temperature is ${data.temperature}°C and it feels like ${data.feels_like}°C`
            msg3.textContent = `Rain Level: ${data.rain}mm`
            msg4.textContent = `Wind Speed: ${data.wind_speed}KM/h`
            msg5.textContent = `Wind Direction: ${data.wind_direction}`
            msg6.textContent = `Cloud Cover: ${data.cloud_cover}%`
            msg7.textContent = `Visibility: ${data.visibility}KM`

            console.log(data);
        })
    })


})

//fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     })
// })

// fetch('https://swapi.dev/api/people/4/').then((res) => {
//     res.json().then((data) => {
//         if (data.error) {
//           return  console.log(data.error);
//         }
//         console.log(data);

//     })
// })
