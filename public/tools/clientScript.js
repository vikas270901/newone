const socket = io();
socket.on("counter", (count)=>{
    console.log("Total: "+count);
    // console.log("counting...")
})
socket.on("left", (count)=>{
    console.log("1 left")
})

var mssg = $("#allmsg").innerHTML;
socket.on("message", (message)=>{
    // console.log(mssg);
    // var dat = Mustache.render(mssg, {message: message})
    // // console.log(data+"hs");
    // dat.insertAdjacentHTML('beforeend', dat);
})
jQuery(
function clicked(){
    let link="";
    $('#locate').on('click', ()=>{
        navigator.geolocation.getCurrentPosition((data)=>{
            link = `https://google.com/maps?q=${data.coords.latitude},${data.coords.longitude}`;
            socket.emit("coordinates", link);
        }); 

    })
    socket.on("link", (link)=>{
        $("#thedata").html(`<a href="${link}" target="_blank" >Go to location</a>`); 
    })
    $("#message").on('submit', (data, callback)=>{
        data.preventDefault();
        var msg = $("#input").val();
        socket.emit("message", msg);
        // console.log("callback");
        $("#input").val("");
        $("#input").focus();

    })
})
var old = "";
    socket.on("sendMessage", (data, e)=>{
        // data.preventDefault();
        old = old +"<br/>"+ data;
        $("#showMessage").html(old);
        console.log(`Message: ${data}`)
    })

// var docs = document.querySelector('#locate');
// docs.addEventListener('click', function(){
//     console.log("added2...");
// });

