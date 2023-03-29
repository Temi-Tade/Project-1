let progress = document.querySelector('progress')
let val = progress.value

document.querySelector('#loadcon').style.display = 'flex'
document.querySelector('.container').style.opacity = '0'

let t = setInterval(() => {
	if (progress.value === 100) {
		clearInterval(t)
		document.querySelector('#loadcon').style.display = 'none'
		document.querySelector('.container').style.opacity = '1'
		document.onreadystatechange = () => {
			if (document.readyState !== 'complete') {
				document.querySelector('.container').style.opacity = '0'
			} else {
				document.querySelector('.container').style.opacity = '1'
			}
		}
	} else {
		val += 1
		progress.value = val
	}
}, 30)