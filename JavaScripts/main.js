var menubtn = document.querySelector('.ham')
var menu = document.querySelector('nav')
var modbg = document.querySelector('.modal-bg')
var mod = document.querySelector('.modal')
var modhd = document.querySelector('.modal-head')
var modbod = document.querySelector('.modal-body')
var datetime = new Date(Date.now()).toDateString()
var list = document.querySelector('.count_down_list').querySelector('ul')

document.onreadystatechange = () =>{
	if (document.readyState !== 'complete') {
		document.body.style.visibility = 'hidden'
		
	} else {
		document.body.style.visibility = 'visible'
	}
}

window.addEventListener('click',function(){
  if (event.target === modbg) {
    modbg.style.display = 'none'
  } 
  else {
    return false
  }
})

menubtn.addEventListener('click',function(){
  menu.style.transform = 'translateY(0)'
  menu.style.opacity = '1'
  menu.style.maxHeight = '500px'
})

function menuClose(x){
  x.style.transform = 'translateY(-200px)'
  x.style.opacity = '0'
  x.style.maxHeight = '0'
}

document.querySelector('#addcdown').addEventListener('click',function(){
  createModal(`
  <h3 style='text-align: center; margin: 7px 0px'>Add New Count down</h3>`,
  `<form id='create_cd_form' align='center' autocomplete='off'>
    <input type='text' id='cdname' placeholder='Enter countdown name' minlength='4' maxlength='16' required autocomplete='off'>
    
    <label for='date' style='text-align: left; width: 100%; display: block'>Select date:</label>
    <input type='date' id='date' required>
    <button type='submit' id='formbtn'>Start Countdown</button>
  </form>
  `)
  document.querySelector('#create_cd_form').addEventListener('submit', function() {
    event.preventDefault()
    saveData(this)
  })
})

function createCountdown(name,date_created,last_mod,start,end){
  this.name = name
  this.date_created = date_created
  this.last_mod = last_mod
  this.start = start
  this.end = end
}

function createModal(head,body){
  modbg.style.display = 'block'
  mod.style.display = 'block'
  document.querySelector('#loadcon').style.display = 'none'
  modhd.innerHTML = head
  modbod.innerHTML = body
}

function loadData(){
  if (localStorage.getItem('count_downs') === null) {//
    return false
  } else {
    var _cds = JSON.parse(localStorage.getItem('count_downs'))
    for (var i = 0; i < _cds.length; i++) { 
      list.innerHTML += `
      <li onclick='sessionStorage.setItem("i",${i})'><a href='./timer/timer.html' class='cd' onclick='sessionStorage.setItem("token",JSON.stringify(JSON.parse(localStorage.getItem("count_downs"))[${i}]))'>${_cds[i].name}</a></li>
      `
    }
  }
}

function saveData(e){
  let countD = new Date(document.querySelector('#date').value).getTime()
  let now = new Date().getTime()
  let dist = countD - now
  if (Math.sign(dist) === -1) {
    alert('Invalid Date!')
    return false
  }else{
  var countDown = new createCountdown(document.querySelector('#cdname').value.trim(), datetime, datetime, new Date(Date.now()).toDateString(),new Date(document.querySelector('#date').value).getTime())
  if (localStorage.getItem('count_downs') === null) {
    let cdArr = []
    cdArr.push(countDown)
    localStorage.setItem('count_downs',JSON.stringify(cdArr))
    e.reset()
    history.go(0)
  } else {
    let cdArr = JSON.parse(localStorage.getItem('count_downs'))
    cdArr.push(countDown)
    localStorage.setItem('count_downs',JSON.stringify(cdArr))
    e.reset()
    history.go(0)
    }
  }
}

document.querySelector('#abt').onclick = function(){
  menuClose(menu)
    modbg.style.display = 'block'
    modbg.style.fontWeight = '300'
    createModal(`
      <h3 style='text-align: center'>About</h3>`,
      `<p>NXGn Countdown timer is a web-based countdown timer used to keep track of events</p>
      <p>Developer Credit: Temiloluwa Akintade</p>
      <p>Developer Contact: <a href='mailto: codinglabz20@gmail.com' style='color: rgba(156,75,224)'>codinglabz20@gmail.com</a></p>
      <small style='display: block;text-align: center'>All rights reserved &copy; 2022</small>
    `)
} 

document.querySelector('#privacy').onclick = function() {
  menuClose(menu)
  modbg.style.display = 'block'
  modbg.style.fontWeight = '300'
  createModal(`
      <h3 style='text-align: center'>Privacy policy</h3>`,
    `<p>By using this app, you agree to the terms and conditions of use</p>
    <ul style='padding: 10px'>
    <li>That we would take your private plans in form of events and dates and process them for your tracking</li>
    <li>That we would have access to your device's browser storage</li>
    </ul>
      <small style='display: block;text-align: center'>All rights reserved &copy; 2022</small>
    `)
}

document.querySelector('#rate-app').onclick = function() {
  menuClose(menu)
  modbg.style.display = 'block'
  modbg.style.fontWeight = '300'
  createModal(`
    <h3 style='text-align: center'>Rate App</h3>`,
   `<p>Tell the developers waht you think about the app. Your ratings mean a lot to them!</p>
    <div id='likes' style='width: 100%; height: 100px; display: flex; justify-content: center; align-items: center; text-align: center; font-size: 2.5rem; letter-spacing: 1.2px'></div>
    <div style='display: flex; justify-content: space-between; margin-top: 10px'>
      <button style='background: red; display: inline-block; width: 50px; height: 50px; font-size: 2rem' onclick='dislike()'>👎</button>
      <button style='background: rgba(5,200,5,0.75); display: inline-block; width: 50px; height: 50px; font-size: 2rem' onclick='like()'>👍</button>
    </div>
    <button style='background: #3C4CFF; color: #fff; font-weight: 300; font-size: 1rem; display: block; width: 100%; height: 50px; border-radius: 26px; margin-top: 16px' onclick='send()' disabled id='sendbtn'>SEND RATINGS</button>
      <small style='display: block;text-align: center'>All rights reserved &copy; 2022</small>
    `)
    sendbtn.style.background = '#777'
}

function like() {
  var likes = document.querySelector('#likes')
  var sendbtn = document.querySelector('#sendbtn')
  if (likes.innerHTML.length >= 5) {
    return false
    sendbtn.disabled = false
    sendbtn.style.background = '#3C4CFF'
  } else {
    likes.innerHTML += '⭐'
    sendbtn.disabled = false
    sendbtn.style.background = '#3C4CFF'
  }
}

function dislike() {
  var likes = document.querySelector('#likes')
  if (likes.innerHTML.length <= 5) {
    likes.innerHTML = likes.innerHTML.slice(0,likes.innerHTML.length-1)
    if (likes.innerHTML.length == 0) {
      sendbtn.disabled = true
      sendbtn.style.background = '#777'
    }
    } else {
    return false
  }
}

function send(){
  createModal(`<h3>Ratings sent!</h3>`,
  `<p>Your ratings have been sent! Thanks for the feedback!</p>`
  )
}

