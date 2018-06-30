
var dane1 = 0;
var ce = [];
var images = document.getElementsByClassName("h-images");

var icons = new XMLHttpRequest();
icons.open("GET", "http://kitan.pl/pb/data/logos.json", true);
icons.send();

icons.addEventListener('error', function (e) { console.log('Wystąpił błąd połączenia') });

icons.addEventListener('load', function () {
    if (this.status === 200) {
        console.log('Wszystko w porządku');

        dane1 = JSON.parse(this.responseText);
        console.log(dane1.logos);

        for (a = 0; a < dane1.logos.length; a++) {
            ce[a] = document.createElement('img');
            ce[a].setAttribute('src', dane1.logos[a].src.x1);
            ce[a].setAttribute('alt', dane1.logos[a].alt);
            ce[a].setAttribute('class', "dodane-img");
            images[0].appendChild(ce[a]);
        }
    }
    else { console.log('Połączenie zakończyło się statusem ' + this.status) }
});
