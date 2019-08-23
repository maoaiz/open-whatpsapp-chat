$(document).ready(function(){

    enable_form();

    var userLang = navigator.language || navigator.userLanguage;
    var code = userLang.substring(0, 2);

    if (code == "es"){
        $(".i18n-title").text("Abrir chat de Whatsapp sin agregar contacto");
        $(".i18n-msj").text("Ingresa el número incluyendo el código de país:");
        $(".i18n-button").text("Abrir chat de Whatsapp");
    }
});

function enable_form() {
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
    var phone = $("#wa").val();
    var chat = $(this).data("chat");
    if (chat == "wa"){
        url = "https://wa.me/" + phone;
    }else{
        url = "https://t.me/" + phone;
    }
    console.log(url)
    if (/^\d+$/.test(phone)){
        $("#msg").fadeOut();
        $("#wa").val("");
        window.location.href = url
    }else{
        $("#msg").text("Ingresa un número válido.").fadeIn();
        $("#wa").focus();
    }
    });
}