let today = new Date()
let output = document.querySelector('.output')
let msg = document.querySelector('.message')
let text = ''
var modbg = document.querySelector('.modal-bg')
var mod = document.querySelector('.modal')
var modhd = document.querySelector('.modal-head')
var modbod = document.querySelector('.modal-body')
var modacts = document.querySelector('.modal-actions')
let progress = document.querySelector('*')

function fetchData() {
  var savedData = JSON.parse(sessionStorage.getItem('token'))
    document.querySelector('.actions').style.display = 'flex'
    let t = setInterval(function() {
      let now = new Date().getTime()
      let dist = savedData.end - now
      let days = Math.floor(dist / (1000 * 60 * 60 * 24))
      let hours = Math.floor(dist % (1000 * 60 * 60 *24) / (1000 * 60 * 60))
      let mins = Math.floor(dist % (1000 * 60 * 60) / (1000 * 60))
      let secs = Math.floor(dist % (1000 * 60) / 1000)
      document.querySelector('#days').innerHTML = days + ' DAYS'
      document.querySelector('#hours').innerHTML = hours + ' HOURS'
      document.querySelector('#mins').innerHTML = mins + ' MINUTES'
      document.querySelector('#secs').innerHTML = secs + ' SECONDS'
      msg.innerHTML = 'Count down in progress...'
      checkTime(t)
      let x = savedData.end - new Date(savedData.start).getTime()
      let y = Date.now() - new Date(savedData.start).getTime()
      
      let coeff = ((y/x) * 360)
      console.log(coeff)
    }, 1000) 
    setInfo()
}

function setInfo() {
  let savedData = JSON.parse(sessionStorage.getItem('token'))
  document.querySelector('h1').innerHTML = `Countdown to ${savedData.name}`
  document.querySelector('.info').innerHTML = `
  <h2 style='text-align: center'>Count down info</h2> 
  <ul>
    <li>The count down started ${new Date(savedData.start).toDateString()}</li>
    <li>The count down will end on ${new Date(savedData.end).toDateString()}</li>
  </ul>
  <p style='text-align: center'>Time left till ${savedData.name}:</p>
  `
}

document.querySelector('#clear').onclick = function() {
  let cds = JSON.parse(localStorage.getItem('count_downs'))
  let i = JSON.parse(sessionStorage.getItem('i'))
  var confirm_user_action = confirm(`You are about to clear the current count down (${cds[i].name})\nThis action cannot be undone, do you wish to continue`)
  if (confirm_user_action === true) {
    cds.splice(cds.indexOf(cds[i]),1)
    localStorage.setItem('count_downs',JSON.stringify(cds))
    history.go(-1)
  } else {
    return false
  }
}

document.querySelector('#edit').onclick = function() {
  let savedData = JSON.parse(sessionStorage.getItem('token'))
  let _cds = JSON.parse(localStorage.getItem('count_downs'))
  let i = sessionStorage.getItem('i')
  modbg.style.display = 'block'
  modhd.innerHTML = `<h3 style='text-align: center; margin: 0'>Edit timer</h3>`
  modbod.innerHTML = `
  <form id='newinfo' align='center'>
   <input type='text' id='newevent' placeholder='what is the new event' minlength='4' required>
   Select a new date
   <input type='date' id='newdate' required>
   <button type='submit'>Save Changes</button>
  </form>
  `
  document.querySelector('#newinfo').addEventListener('submit', function() {
    if (new Date(document.querySelector('#newdate').value).getTime() - Date.now() < 0) {
      alert('Invalid date!')
      return false
    }
    event.preventDefault()
    var confirm_user_action = confirm(`You are about to edit the current count down (${savedData.name}) \nThis action cannot be undone, do you wish to continue`)
    if (confirm_user_action === true) {
      _cds[i].name = document.querySelector('#newevent').value
      _cds[i].end = new Date(document.querySelector('#newdate').value).getTime()
      savedData.name = document.querySelector('#newevent').value
      savedData.end = new Date(document.querySelector('#newdate').value).getTime()
      sessionStorage.setItem('token',JSON.stringify(savedData))
      localStorage.setItem('count_downs', JSON.stringify(_cds))
      history.go(0)
    } else {
      return false
    }
  })
}

window.onclick = function() {
  if (event.target === modbg) {
    modbg.style.display = 'none'
  }
}

function checkTime(int) {
  let savedData = JSON.parse(sessionStorage.getItem('token'))
  if (savedData.end - Date.now() < 0) {
    clearInterval(int)
    msg.innerHTML = 'Countdown expired!'
    modbg.style.display = 'block'
    modbod.innerHTML = 'Countdown expired!'
    modhd.innerHTML = '<h3>Alert!</h3>'
    output.innerHTML = '<p style="color: black; text-align: center">Countdown has expired! You can create a new countdown by clicking the Edit timer button below</p>'
    output.style.display ='block'
  }
  return false
}

let c = document.querySelector('canvas')
let ctx = c.getContext('2d')

ctx.beginPath()
ctx.arc(50,50,25,0,2*Math.PI)
ctx.fillStyle = 'green'
ctx.closePath()
ctx.