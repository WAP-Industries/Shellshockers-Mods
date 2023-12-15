// ==UserScript==
// @name         idk yet
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
// @icon         https://www.google.com/s2/favicons?domain=shellshock.io
// @grant        none
// @run-at       document-start
// ==/UserScript==

window.XMLHttpRequest = class extends window.XMLHttpRequest {

	open( method, url ) {

		if ( url.indexOf( 'shellshock.js' ) > - 1 ) {

			this.isScript = true;

		}

		return super.open( ...arguments );

	}

	get response() {

		if ( this.isScript ) {

			const code = super.response;

			let babylonVarName,
				playersVarName,
				myPlayerVarName,
				sceneVarName,
				cullFuncName;

			try {

				babylonVarName = /this\.origin=new ([a-zA-Z]+)\.Vector3/.exec( code )[ 1 ];
				playersVarName = /([^,]+)=\[\],[^,]+=\[\],{}/.exec( code )[ 1 ];
				myPlayerVarName = /"fire":document.pointerLockElement&&([^&]+)&&/.exec( code )[ 1 ];
				sceneVarName = /createMapCells\(([^,]+),/.exec( code )[ 1 ];
				cullFuncName = /=([a-zA-Z_$]+)\(this\.mesh,\.[0-9]+\)/.exec( code )[ 1 ];

			} catch ( error ) {

				alert( 'Script failed to inject. Report the issue to the script developer.\n' + JSON.stringify( getVars(), undefined, 2 ) );

				return code;

			}

			function getVars() {

				return {
					babylonVarName,
					playersVarName,
					myPlayerVarName,
					playersVarName,
					sceneVarName,
					cullFuncName
				};

			}

			console.log( '%cInjecting code...', 'color: red; background: black; font-size: 2em;', getVars() );

			return code.replace( sceneVarName + '.render()', `

					window[ '${onUpdateFuncName}' ]( 
						${babylonVarName}, 
						${playersVarName}, 
						${myPlayerVarName}
					);

				${sceneVarName}.render()` )
				.replace( `function ${cullFuncName}`, `

					function ${cullFuncName}() {

						return true;

					}

				function someFunctionWhichWillNeverBeUsedNow` );

		}

		return super.response;

	}

};

const onUpdateFuncName = btoa(Math.random().toString(32));

window[onUpdateFuncName] = function (BABYLON, players, myPlayer) {
	if (!myPlayer) return

	try{
		for (let i=0;i<players.length;i++) {
			const player = players[i]
			if (!player || player===myPlayer) continue
			
            if (!player.modded){
				player.actor.bodyMesh.setEnabled(false)

				function createplane(image){
					const material = new BABYLON.StandardMaterial("", player.actor.scene)
					material.emissiveColor = new BABYLON.Color3.White()
					material.specularColor = new BABYLON.Color3(0, 0, 0);
					material.diffuseTexture = new BABYLON.Texture(image, player.actor.scene)
					material.diffuseTexture.hasAlpha = true
					material.useAlphaFromDiffuseTexture = true
				
					const plane = BABYLON.MeshBuilder.CreatePlane("", {
						width: 0.5, 
						height: 0.75,
						sideOrientation: BABYLON.Mesh.DOUBLESIDE
					})
					plane.material = material
					plane.position.y = 0.4
					plane.parent = player.actor.mesh
					return plane 
				}

				const p1 = createplane("https://i.ibb.co/vkmzKdk/eggcheong-front.png")
				const p2 = createplane("https://i.ibb.co/bmYRmrr/eggcheong-back.png")
				p2.position.z = -0.01

				player.modded = true
            }
		}

        // if this doesnt print to the console something fucked up somewhere
		console.log("success")
	}
	catch (err){
		console.log(err)
	}

}
