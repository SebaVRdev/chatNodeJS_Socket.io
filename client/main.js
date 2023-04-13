//Vamos a trabajar con los socket
const socket = io.connect({ forceNew: true });

socket.on('messages', data => {
    console.log(data);
    render(data);
});

const render = (data) => {
    const div_messages =  document.getElementById('messages');   
    var html = data.map((message, index) => {
        return (`
            <div class="message">
                <strong>${message.nickName}</strong> dice:
                <p>${message.text}</p>
            </div>
        `)
    }).join(' ');

    div_messages.innerHTML = html;
    div_messages.scrollTop = div_messages.scrollHeight;
};

//
const addMessage = (ev) => {
    let name = document.getElementById("nickname");
    let textMessage = document.getElementById("text")
    let message = {
        nickName: name.value,
        text: textMessage.value
    };

    //Cuando tengamos los datos vamos a limpiar los input
    name.style.display = 'none'; //Cuando marquemos el usuario no lo deje cambiar

    //Evento del cliente al servidor
    socket.emit('add-message', message);
    textMessage.value = ''

    return false; //Para que corte la funcion 
};