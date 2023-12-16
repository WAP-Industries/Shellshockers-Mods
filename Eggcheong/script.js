// ==UserScript==
// @name         Shellshockers Eggcheong mod
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  the shell do be shocking
// @author       WAP Industries
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
// @icon         https://raw.githubusercontent.com/WAP-Industries/Shellshockers-Mods/main/Eggcheong/logo.png
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
                playersVarName = /([^,]+)=\[\],[^,]+=\[\],[^,]+=-1,vueApp.game.respawnTime=0/.exec(code)[1];
                myPlayerVarName = /"fire":document.pointerLockElement&&([^&]+)&&/.exec(code)[1];
                sceneVarName = /createMapCells\(([^,]+),/.exec(code)[1];
                cullFuncName = /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec(code)[1];
            } 
            catch (error) {
                alert('Script failed to inject. Report the issue to the script developer.\n' + JSON.stringify(getVars(), undefined, 2));
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

const materials = {}

const onUpdateFuncName = btoa(Math.random().toString(32));

window[onUpdateFuncName] = function (BABYLON, players, myPlayer) {
    try {
        for (const player of players) {
            if (!player || player === myPlayer) continue
            
            if (!player.modded) {
                player.actor.bodyMesh.setEnabled(false)
                
                function create_plane(image) {
                    if (!materials[image]){
                        materials[image] = function(){
                            const m = new BABYLON.StandardMaterial("", player.actor.scene)
                            m.emissiveColor = new BABYLON.Color3.White()
                            m.specularColor = new BABYLON.Color3(0, 0, 0);
                            m.diffuseTexture = new BABYLON.Texture(image, player.actor.scene)
                            m.diffuseTexture.hasAlpha = true
                            m.useAlphaFromDiffuseTexture = true
                            return m 
                        }()
                    }
                    
                    const plane = BABYLON.MeshBuilder.CreatePlane("", {	
                        width: 0.5,
                        height: 0.75,
                        sideOrientation: BABYLON.Mesh.DOUBLESIDE
                    })
                    plane.material = materials[image]
                    plane.position.y = 0.4
                    plane.parent = player.actor.mesh
                    return plane
                }
                
                const p1 = create_plane("https://raw.githubusercontent.com/WAP-Industries/Shellshockers-Mods/main/Eggcheong/front.png")
                const p2 = create_plane("https://raw.githubusercontent.com/WAP-Industries/Shellshockers-Mods/main/Eggcheong/back.png")
                p2.position.z = -0.01
                
                player.modded = true
            }
        }
        
        // if this doesnt print to the console something fucked up somewhere
        console.log("mod is running")
    }
    catch (err) {
        console.log(err)
    }
}

delete localStorage[ 'lastVersionPlayed' ];