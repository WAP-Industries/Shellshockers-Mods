// ==UserScript==
// @name         Christmas ShellShockers!
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  It's ShellShockers but Christmas Themed!
// @icon         https://cdn.discordapp.com/attachments/1145628256368865341/1173865657448808530/stsmall507x507-pad600x600f8f8f8.png?ex=65658296&is=65530d96&hm=95c70daf0c6278bcc66c44b4b1b11f18374f39d03bccbebc3aa443c7a5b2d9fa&
// @author       Lei
// @match        https://shellshock.io/*
// @match        https://staging.shellshock.io/*
// @match        https://dev.shellshock.io/*
// @match        https://algebra.best/*
// @match        https://algebra.vip/*
// @match        https://biologyclass.club/*
// @match        https://deadlyegg.com/*
// @match        https://deathegg.world/*
// @match        https://egg.dance/*
// @match        https://eggboy.club/*
// @match        https://eggboy.xyz/*
// @match        https://eggcombat.com/*
// @match        https://eggfacts.fun/*
// @match        https://egghead.institute/*
// @match        https://eggisthenewblack.com/*
// @match        https://eggsarecool.com/*
// @match        https://eggshooter.best/*
// @match        https://geometry.best/*
// @match        https://geometry.monster/*
// @match        https://geometry.pw/*
// @match        https://geometry.report/*
// @match        https://hardboiled.life/*
// @match        https://hardshell.life/*
// @match        https://humanorganising.org/*
// @match        https://mathactivity.xyz/*
// @match        https://mathdrills.info/*
// @match        https://mathdrills.life/*
// @match        https://mathfun.rocks/*
// @match        https://mathgames.world/*
// @match        https://math.international/*
// @match        https://mathlete.fun/*
// @match        https://mathlete.pro/*
// @match        https://new.shellshock.io/*
// @match        https://overeasy.club/*
// @match        https://scrambled.best/*
// @match        https://scrambled.tech/*
// @match        https://scrambled.today/*
// @match        https://scrambled.us/*
// @match        https://scrambled.world/*
// @match        https://shellsocks.com/*
// @match        https://shellshockers.club/*
// @match        https://shellshockers.site/*
// @match        https://shellshockers.us/*
// @match        https://shellshockers.world/*
// @match        https://shellshockers.xyz/*
// @match        https://softboiled.club/*
// @match        https://urbanegger.com/*
// @match        https://violentegg.club/*
// @match        https://violentegg.fun/*
// @match        https://yolk.best/*
// @match        https://yolk.life/*
// @match        https://yolk.quest/*
// @match        https://yolk.rocks/*
// @match        https://yolk.tech/*
// @match        https://yolk.today/*
// @match        https://zygote.cafe/*
// @grant        none
// @downloadURL https://update.greasyfork.org/scripts/481198/Christmas%20ShellShockers%21.user.js
// @updateURL https://update.greasyfork.org/scripts/481198/Christmas%20ShellShockers%21.meta.js
// ==/UserScript==

function changeTheme(){
    const css = `
        * {
            --ss-lightoverlay: url(https://fc.sinaimg.cn/large/008clOHAgy1gn02td27vdj30ku0vagpc.jpg);
            background-size: 100% 100%;
        }

        :root{
            --ss-lightoverlay: url(https://fc.sinaimg.cn/large/008clOHAgy1gn02td27vdj30ku0vagpc.jpg);
            background-size: 100% 100%;
        }
    `
    document.head.innerHTML+=`<style>${css}</style>`
}

(()=>(document.body ? changeTheme() : document.addEventListener("DOMContentLoaded", e=>changeTheme())))()