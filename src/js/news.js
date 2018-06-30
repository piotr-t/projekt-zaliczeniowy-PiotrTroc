var dane = 0;
var date = [];
var mtitle = document.getElementsByClassName("title-n1");
var img1 = document.getElementsByClassName("img-n1");
var img2 = document.getElementsByClassName("img2-n1");
var ndata = document.getElementsByClassName("czas");
var nautor = document.getElementsByClassName("autor");
var ndescription = document.getElementsByClassName("description");
var nnnlink = document.getElementsByClassName("nlink");
var nnnlink1 = document.getElementsByClassName("nlink1");




var news = new XMLHttpRequest();
news.open("GET", "http://kitan.pl/pb/data/news.json", true);
news.send();

news.addEventListener('error', function (e) { console.log('Wystąpił błąd połączenia') });

news.addEventListener('load', function () {
    if (this.status === 200) {
        console.log('Wszystko w porządku');

        dane = JSON.parse(this.responseText);

        for (let i = 0; i < 3; i++) {
            mtitle[i].textContent = dane[i].title;
            img1[i].setAttribute('src', dane[i].image.x1);
            img2[i].setAttribute('src', dane[i].image.x2);


            date[i] = new Date(dane[i].date_timestamp * 1000);
            ndescription[i].textContent = dane[i].description.slice(0, 200);
            ndata[i].textContent = "Data:  " + date[i].toISOString().slice(0, 10);
            nautor[i].textContent = dane[i].author;
            nnnlink[i].setAttribute('href', dane[i].url);
            nnnlink1[i].setAttribute('href', dane[i].url);



        }






    }
    else { console.log('Połączenie zakończyło się statusem ' + this.status) }
});



