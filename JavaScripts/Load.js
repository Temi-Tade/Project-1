let progress = document.querySelector('progress')
let val = progress.value

document.querySelector('#loadcon').style.display = 'flex'
document.querySelector('#container').style.display = 'none'

let t = setInterval(() => {
	if (progress.value === 100) {
		clearInterval(t)
		document.querySelector('#loadcon').style.display = 'none'
		document.querySelector('#container').style.display = 'block'
		document.onreadystatechange = () => {
			if (document.readyState !== 'complete') {
				document.querySelector('#container').style.display = 'none'
			} else {
				document.querySelector('#container').style.display = 'block'
			}
		}
	} else {
		val += 1
		progress.value = val
	}
}, 30)