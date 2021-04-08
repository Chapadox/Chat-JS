let socket = io('http://localhost:3000')
alert('salve meu cria')
function renderMessage(message) {
    $('.messages').append('<div class="message"><strong>' + message.author + '</strong>:' + message.message + '</div>')
}

socket.on('receiveMessage', (message) => {
    renderMessage(message)
})

socket.on('previousMessage', (messages) => {
    for (message of messages) {
        renderMessage(message)
    }

})

$('#limparChat').submit((event) => {
    event.preventDefault()
    $('.messages').empty()
})


$('#chat').submit((event) => {
    event.preventDefault()


    let author = $('input[name=username]').val()
    let message = $('input[name=message]').val()

    if (author.length && message.length) {
        let messageObject = {
            author: author,
            message: message,
        }
        socket.emit('sendMessage', messageObject)
        renderMessage(messageObject)
        document.getElementById('message').value = ''
    }
})