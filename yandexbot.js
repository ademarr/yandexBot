// ==UserScript==
// @name         yandexbot 2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  yandexbot
// @author       Александр
// @match        https://yandex.ru/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon
// @grant        none
// ==/UserScript==

let keywords = ["гобой", "саксофон", "как звучит флейта", "барабан"];
let button = document.getElementsByClassName('button')[0];
let links = document.querySelectorAll("a.Link");
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementsByName('text')[0];
let i = 0;


if(button !== undefined){
    let timerId = setInterval(() => {
        yandexInput.value += keyword[i];
        i++;
        if(i == keyword.length) {
            clearInterval(timerId);
            button.click();
        }
    }, 1000);
}else if(location.hostname == "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai") {
    console.log("Мы на Музыкалка-онлайн.рф");
    setTimeout(()=>{
        let index = getRandom(0,links.length);

        if(getRandom(0,101)>=70) {
            location.href = "https://yandex.ru/";
        }
        if(links[index].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1) {
            links[index].click();
        }
    }, getRandom(2000,3500));
}
else{
    if(document.querySelector('.pager__item_current_yes').textContent == "5") {
        console.log("мы сюда зашли");
        location.href = "https://yandex.ru/";
        // nextYandexPage = false;

    }
    //
    if(document.querySelector('.pager__item_current_yes').textContent !== "5") {
        setTimeout(()=>{
            document.querySelector('.pager__item_kind_next').click();
        } ,getRandom(3000,5000));
    }
    let nextYandexPage = true;
    for(let i=0; i<links.length; i++) {
        if(links[i].href.indexOf('xn----7sbab5aqcbiddtdj1e1g.xn--p1ai')!=-1) {
            let link = links[i];
            nextYandexPage = false;
            console.log("Нашел фразу" + link);
            window.location.href = link;
            break;
        }
    }


}


function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}

