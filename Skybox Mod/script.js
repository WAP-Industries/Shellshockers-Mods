// ==UserScript==
// @name         Skybox Mod
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

            const variables = {
                babylon: /this\.origin=new ([a-zA-Z]+)\.Vector3/.exec(code)?.[1],
                scene: /createMapCells\(([^,]+),/.exec(code)?.[1],
                cullFunc: /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec(code)?.[1]
            }

            if (Object.values(variables).some(i=>!i))
                return void alert(`Script failed to inject\n\nVariables missing:\n${Object.keys(variables).filter(i=>!variables[i]).join('\n')}`)

            console.log('%cScript injected', 'color: red; background: black; font-size: 2em;', variables);

            return code.replace(variables.scene + '.render()', `
                    window['${onUpdateFuncName}'](${variables.babylon},${variables.scene}); 
                    ${variables.scene}.render()`)
                .replace(`function ${variables.cullFunc}`, `
                    function ${variables.cullFunc}() {return true;}
                    function someFunctionWhichWillNeverBeUsedNow`);
        }

        return super.response
    }
}

const onUpdateFuncName = btoa(Math.random().toString(32));

window[onUpdateFuncName] = function(BABYLON, scene){
    try{
        const mesh = scene.getMeshByID("skyBox")

        if (!scene.modded){
            mesh.material.diffuseTexture = new BABYLON.Texture(
                "https://raw.githubusercontent.com/WAP-Industries/Shellshockers-Mods/main/Skybox%20Mod/texture.png", 
                scene
            )
            mesh.material.diffuseTexture.hasAlpha = true
            mesh.material.useAlphaFromDiffuseTexture = true
            mesh.material.emissiveColor = new BABYLON.Color3.White()
            mesh.material.reflectionTexture.level = 0

            const uvs = mesh.getVerticesData(BABYLON.VertexBuffer.UVKind)
            const faces = [
                [0.0, 0.2],
                [0.4, 0.6],
                [0.6, 0.8],
                [0.6, 0.8],
                [0.8, 1.0],
                [0.8, 1.0],
            ]

            for (let i=0;i<48;i+=8){
                uvs[i+2] = uvs[i+4] = faces[i/8][0]
                uvs[i] = uvs[i+6] = faces[i/8][1]
                
                uvs[i+1] = uvs[i+3] = 0
                uvs[i+5] = uvs[i+7] = 1
            }
            mesh.setVerticesData(BABYLON.VertexBuffer.UVKind, uvs);
            
            scene.modded = true
        }
    }
    catch(err){
        console.log(err)
    }
}
