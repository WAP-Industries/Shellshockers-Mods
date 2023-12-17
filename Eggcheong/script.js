// ==UserScript==
// @name         Shellshockers Eggcheong mod
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

            const variables = {
                babylon: /this\.origin=new ([a-zA-Z]+)\.Vector3/.exec(code),
                players: /([^,]+)=\[\],[^,]+=\[\],[^,]+=-1,vueApp.game.respawnTime=0/.exec(code),
                myPlayer: /"fire":document.pointerLockElement&&([^&]+)&&/.exec(code),
                scene: /createMapCells\(([^,]+),/.exec(code),
                cullFunc: /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec(code)
            }

            if (Object.values(variables).filter(i=>!i).length)
                return void alert(`Script failed to inject\n\nVariables missing:\n${Object.keys(variables).filter(i=>!variables[i]).join('\n')}`)

            Object.keys(variables).forEach(i=>variables[i] = variables[i][1])
            console.log('%cScript injected', 'color: red; background: black; font-size: 2em;', variables);

            return code.replace(variables.scene + '.render()', `
                    window[ '${onUpdateFuncName}'](${variables.babylon},${variables.players},${variables.myPlayer});
                    ${variables.scene}.render()`)
                .replace(`function ${variables.cullFunc}`, `
                    function ${variables.cullFunc}() {return true;}
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
            if (!player || player===myPlayer) continue

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
    }
    catch (err) {
        console.log(err)
    }
}
