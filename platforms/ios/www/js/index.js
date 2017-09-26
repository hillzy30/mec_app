$( document ).ready(function(){
                    $('#map').css("height",$(window).height()-74+"px");
                    $('#infoScreen').css("height",$(window).height()-72+"px");
                    $('#mainMenu').css("height",$(window).height()-72+"px");
                    $('#infoScreen').css("top",$(window).height()+"px");
                    $('#loading').css("height",$(window).height()+"px");
                    });

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
function loading(){
    document.getElementById('loading').style.display = "block";
}
function hideLoading(){
    document.getElementById('loading').style.display = "none";
}
function displayInfo(){
    $('#infoScreen').animate({top:"72px"});
}
function hideInfo(){
    $('#infoScreen').css('top', $(window).height()+"72px");
}
function about(){
    
    document.getElementById('infoScreen').innerHTML = "<h2>About Us</h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    displayInfo();
    
}
function credit(){
    
    document.getElementById('infoScreen').innerHTML = "Built by:<br>Joshua Soutar<br>Julian Grassi<br>Michael Hiller<br>Ryan Mcnee<br>Thomas Austine";
    displayInfo();
    
}
