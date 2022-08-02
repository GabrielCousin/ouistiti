# Ouistiti 🙈

A PhotoBooth running from the browser! This is more a packaged version of great ideas grabbed on the Internet. Those are listed below 👇.


## Sources
* https://tutorialzine.com/2016/07/take-a-selfie-with-js
* https://stackoverflow.com/a/16245768
* https://stackoverflow.com/a/40141662


## About
* Server running with Node.js + Express
* Based on MediaDevices Web API and Canvas
* Webcam is needed
* Can either be use on touch screens or with a Bluetooth remote
* Printer is optional


## Notes
| # | action               | browser | server | notes |
|---|----------------------|---------|--------|-------|
| 1 | capture photo        | ✔       |        | [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) |
| 2 | validate or retry    | ✔       |        |       |
| 3 | send photo to server | ✔       |        | [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) + [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) |
| 4 | photo saved          |         | ✔      | [Watching files](https://linux.die.net/man/1/inotifywait)
| 5 | photo printed        |         | ✔      | [CUPS](https://www.cups.org/)


## Running
```bash
# Run in parallel
# Start express
$ yarn serve
# Watch new photos and print them
$ yarn print
```


## Installation
```bash
$ yarn
$ yarn start
```


## Development
```bash
# Run in parallel
$ yarn start:dev
$ yarn serve:dev
$ yarn print
```


## Customization
Add following files in /public:
* watermark.png
* favicon.ico
