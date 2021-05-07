// ==UserScript==
// @name         yandexbot 3
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  yandexbot
// @author       Александр
// @match        https://yandex.ru/*
// @match        https://napli.ru/*
// @match        https://psyholog.me/*
// @match        https://xn----7sbab5aqcbiddtdj1e1g.xn--p1ai/*
// @icon         https://www.google.com/s2/favicons?domain=yandex.ru
// @grant        none
// ==/UserScript==

let sites = {
    "napli.ru":["10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress", "Вывод произвольных типов записей и полей в WordPress"],
    "psyholog.me":["центр здоровых отношений", "Услуги центра здоровых отношений", "Чекалина Елена психолог"],
    "xn----7sbab5aqcbiddtdj1e1g.xn--p1ai":['Гобой','Как звучит флейта', 'Кларнет','Саксофон','Тромбон','Валторна']
};

let site = Object.keys(sites)[getRandom(0,Object.keys(sites).length)]

let keywords = sites[site];

let button = document.getElementsByClassName('button')[0];
let links = document.querySelectorAll("a.Link");
let keyword = keywords[getRandom(0, keywords.length)];
let yandexInput = document.getElementsByName('text')[0];
let i = 0;

if(button !== undefined){
    document.cookie = `site=${site}`; // или document.cookie = "site"+site;
}else if (location.hostname == "yandex.ru") {
    site = getCookie("site");
}else{
    site = location.hostname;
}
console.log(site);


if(button !== undefined){
    document.cookie = `site=${site}`; //document.cookie = "site"+site;
    let timerId = setInterval(() => {
        yandexInput.value += keyword[i];
        i++;
        if(i == keyword.length) {
            clearInterval(timerId);
            button.click();
        }
    }, 1000);

}else if(location.hostname == site) {
    console.log(`Мы на ${location.hostname}`);
    setTimeout(()=>{
        // let index = getRandom(0,links.length);

        if(getRandom(0,101)>=70) {
            location.href = "https://yandex.ru/";
        }
        if(links[index].href.indexOf(site)!=-1)
            links[index].click();
    },getRandom(2000,3500));
}
else{
    //let nextGooglePage = true;
    for(let j=0; j<links.length; j++) {
        if(links[j].href.indexOf(site)!=-1) {
            let link = links[j];
            //nextYandexPage = false;
            console.log("Нашел фразу" + link);
            console.log(j);
            console.log(link);
            window.location.href = link;
            break;
        }
    }
    if (document.querySelector('.pager__item_current_yes').textContent == "5") {
        //nextGooglePage = false;
        location.href = "https://yandex.ru/";
    }
    if (document.querySelector('.pager__item_current_yes').textContent !== "5") {
        setTimeout(()=>{
            document.querySelector('.pager__item_kind_next').click();}
                   ,getRandom(3000,5000));
    }
}
function getRandom(min,max) {
    return Math.floor(Math.random()*(max-min)+min);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]+)"
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}
