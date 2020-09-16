const socket = io('http://localhost:5005')

const $message_form = document.getElementById('form')
const $session_confirm = document.getElementById('session_confirm')
$session_confirm.addEventListener('click', () => {
	let data = {
		session_id: socket.id,
	}
	socket.emit('session_request', data)
})

$message_form.addEventListener('submit', (e) => {
	e.preventDefault()
	const $input = document.getElementById('message_input')
	let data = {
		message: $input.value,
		sender: 'Rasa',
	}
	console.log('User: ', data.message)

	socket.emit('user_uttered', data)
})

socket.on('bot_uttered', (rasa_response) => {
	//console.log(rasa_response)
	console.log('Bot: ', rasa_response.text)
})

socket.on('connect', () => {
	console.log(`connect:${socket.id}`)
})

socket.on('session_confirm', (session_id) => {
	console.log('session_id: ', session_id)
})

socket.on('disconnect', (reason) => {
	console.log(reason)
})
