### Requirements  
1. Chrome as default browser
2. [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) chrome extension
---
  
### Run Instructions  
1. Download and extract this repository
2. Create a new Tampermonkey userscript
3. Copy paste the contents of `script.js` into the userscript
4. Enable Tampermonkey and run the userscript
5. When you open [Shell Shockers](https://shellshock.io/), the script should automatically run
---

### Notes
- Code troubleshooting
  - If you don't see any changes after running the script, reload the page
  - To check if the script is running correctly, open the JavaScript console and check if `mod is running` is being outputted
- Personal modding
  - If you want to mod Shellshockers as well (don't), the `modding` directory contains stuff that will ease the process.
  - `mod-template.js` is boilerplate code for your project
  - `shellshockers-source-code.js` contains the game's source code for reference
---

### Credits
https://greasyfork.org/en/scripts/436330-shellshock-io-aimbot-esp
