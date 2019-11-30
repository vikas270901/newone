const socket = io();
socket.on("counter", (count)=>{
    console.log(count);
    console.log("counting...")
})
socket.on("left", (count)=>{
    console.log("A person left, Total = "+count)
})

socket.on("message", (data)=>{
    console.log(data);
})
jQuery(function clicked(){
    $('#locate').on('click', ()=>{
        console.log(navigator.geolocation.getCurrentPosition((data)=>{
            console.log(`https://google.com/maps?q=${data.coords.latitude},${data.coords.longitude}`);
        }));
    })
    $("#message").on('submit', (data)=>{
        data.preventDefault();
        var mesg = document.querySelector('input').value; 
        // console.log(mesg);
        socket.emit("message", mesg);
    })

    socket.on("sendMessage", (data)=>{
        console.log(`Data came from socket , data is : ${data}`)
    })

    })

// var docs = document.querySelector('#locate');
// docs.addEventListener('click', function(){
//     console.log("added2...");
// });

