$(document).ready(function(){

    var userLang = navigator.language || navigator.userLanguage;
    var code = userLang.substring(0, 2);

    if (code == "es"){
        $(".i18n-title").text("Abrir chat en Whatsapp sin agregar contacto");
        $(".i18n-msj").text("Ingresa el número incluyendo el código de país:");
        $(".i18n-button").text("Abrir chat en Whatsapp");
    }

    var input = document.querySelector("#wa");
    var iti = window.intlTelInput(input, {
      initialCountry: "auto",
      geoIpLookup: function(callback) {
        $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
          var countryCode = (resp && resp.country) ? resp.country : "";
          callback(countryCode);
        });
      },
      utilsScript: "node_modules/intl-tel-input/build/js/utils.js?1562189064761" // just for formatting/placeholders etc
    });

    enable_form(iti);
});

function enable_form(iti) {

    setTimeout(function(){
        $("#wa").focus();
    }, 1000);

    $("#form").on("submit", function(e){
        e.preventDefault();
        $("#btn-wa").click();
    });

    $("#form button").on("click", function(e){
    e.preventDefault();

    var url = "";
    var phone = iti.getNumber();
    var chat = $(this).data("chat");
    if (chat == "wa"){
        url = "https://wa.me/" + phone;
    }else{
        url = "https://t.me/" + phone;
    }

    if (/^\+\d+$/.test(phone)){
        $("#msg").fadeOut();
        $("#wa").val("");
        window.location.href = url
    }else{
        $("#msg").text("Invalid number.").fadeIn();
        $("#wa").focus();
    }
    });
}