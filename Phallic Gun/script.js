// ==UserScript==
// @name         Dildo Gun Mod
// @author       WAP Industries
// @namespace    http://tampermonkey.net/
// @match        *://shellshock.io/*
// @match        *://algebra.best/*
// @match        *://algebra.vip/*
// @match        *://biologyclass.club/*
// @match        *://deadlyegg.com/*
// @match        *://deathegg.world/*
// @match        *://eggcombat.com/*
// @match        *://egg.dance/*
// @match        *://eggfacts.fun/*
// @match        *://egghead.institute/*
// @match        *://eggisthenewblack.com/*
// @match        *://eggsarecool.com/*
// @match        *://geometry.best/*
// @match        *://geometry.monster/*
// @match        *://geometry.pw/*
// @match        *://geometry.report/*
// @match        *://hardboiled.life/*
// @match        *://hardshell.life/*
// @match        *://humanorganising.org/*
// @match        *://mathdrills.info/*
// @match        *://mathfun.rocks/*
// @match        *://mathgames.world/*
// @match        *://math.international/*
// @match        *://mathlete.fun/*
// @match        *://mathlete.pro/*
// @match        *://overeasy.club/*
// @match        *://scrambled.best/*
// @match        *://scrambled.tech/*
// @match        *://scrambled.today/*
// @match        *://scrambled.us/*
// @match        *://scrambled.world/*
// @match        *://shellshockers.club/*
// @match        *://shellshockers.site/*
// @match        *://shellshockers.us/*
// @match        *://shellshockers.world/*
// @match        *://softboiled.club/*
// @match        *://violentegg.club/*
// @match        *://violentegg.fun/*
// @match        *://yolk.best/*
// @match        *://yolk.life/*
// @match        *://yolk.rocks/*
// @match        *://yolk.tech/*
// @match        *://zygote.cafe/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

window.XMLHttpRequest = class extends window.XMLHttpRequest {
    open(method, url) {
        if (url.indexOf('shellshock.js') > - 1) 
            this.isScript = true;
        return super.open(...arguments);
    }

    get response(){
        if (this.isScript){
            const code = super.response

            let babylonVarName,
                playersVarName,
                myPlayerVarName,
                sceneVarName,
                cullFuncName;
            
            try {
                babylonVarName = /this\.origin=new ([a-zA-Z]+)\.Vector3/.exec(code)[1];
                playersVarName = /([^,]+)=\[\],[^,]+=\[\],{}/.exec(code)[1];
                myPlayerVarName = /"fire":document.pointerLockElement&&([^&]+)&&/.exec(code)[1];
                sceneVarName = /createMapCells\(([^,]+),/.exec(code)[1];
                cullFuncName = /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec(code)[1];
            } 
            catch (error) {
                alert('Script failed to inject');
                return code;
            }

            function getVars(){
                return {
                    babylonVarName,
                    playersVarName,
                    myPlayerVarName,
                    playersVarName,
                    sceneVarName,
                    cullFuncName
                };
            }
            console.log('%cInjecting code...', 'color: red; background: black; font-size: 2em;', getVars());

            return code.replace(sceneVarName + '.render()', `
                    window[ '${onUpdateFuncName}'](${babylonVarName},${playersVarName},${myPlayerVarName}); 
                    ${sceneVarName}.render()`)
                .replace(`function ${cullFuncName}`, `
                    function ${cullFuncName}() {return true;}
                    function someFunctionWhichWillNeverBeUsedNow`);
        }

        return super.response
    }
}


const onUpdateFuncName = btoa(Math.random().toString(32));

const model = 

window[onUpdateFuncName] = function (BABYLON, players, myPlayer) {
    try{
        myPlayer.weapons[0].actor.gunMesh.setEnabled(false)

        console.log("mod is running")
    }
    catch (error){
        console.log(error)
    }
}