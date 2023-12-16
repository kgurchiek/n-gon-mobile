# n-gon Mobile Controls
Allows you to play [n-gon](https://landgreen.github.io/sidescroller) on a mobile device

## Usage
Create a website bookmark in your browser and paste this script as the url. Then open [n-gon](https://landgreen.github.io/sidescroller) and click on the bookmark, and gamepad controls will be enabled.
`javascript: (async () => { const scriptText = await (await fetch('https://raw.githubusercontent.com/kgurchiek/n-gon-mobile/main/main.js')).text(); var script = document.createElement('script'); script.type = 'text/javascript'; script.textContent = scriptText; document.head.appendChild(script); })();`

## Controls
| Function | Input |
| - | - |
| move, jump, crouch | left joystick
| shoot | large right joystick |
| field | small right joystick |
| manual aim | press screen |
| cycle weapon | tap weapons list |
| pause | top button |
