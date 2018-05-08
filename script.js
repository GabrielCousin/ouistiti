const printBtn = document.querySelector('[data-name=print_btn]')
const triggerBtn = document.querySelector('[data-name=trigger_btn]')
const sendBtn = document.querySelector('[data-name=send_btn]')
const resetBtn = document.querySelector('[data-name=reset_btn]')
const hiddenCanvas = document.querySelector('[data-name=canvas]')
const nav = document.querySelector('[data-name=nav]')
const video = document.querySelector('[data-name=stream]')
const watermark = document.querySelector('[data-name=watermark]')

const targetAspectRatio = 1.5
const watermarkRatio = .2

let blob
let videoWidth
let videoHeight
let watermarkDiameter
let videoOffsetX
let watermarkOffsetX
let watermarkOffsetY

feather.replace()

function initBooth() {
  video.play()
  videoWidth = video.videoWidth
  videoHeight = video.videoHeight
  watermarkDiameter = videoHeight * .2

  hiddenCanvas.height = videoHeight
  hiddenCanvas.width = videoHeight * targetAspectRatio

  videoOffsetX = (hiddenCanvas.width - videoWidth) / 2
  watermarkOffsetX = hiddenCanvas.width - watermarkDiameter - 50
  watermarkOffsetY = hiddenCanvas.height - watermarkDiameter - 50
}

function startCountdown() {
  nav.setAttribute('data-status', 'countdown')
  window.setTimeout(takeSnapshot, 3000)
}

function takeSnapshot() {
  video.pause()

  const context = hiddenCanvas.getContext('2d')

  context.imageSmoothingQuality = "high"
  context.drawImage(video, videoOffsetX, 0, videoWidth, videoHeight)
  context.drawImage(watermark, watermarkOffsetX, watermarkOffsetY, watermarkDiameter, watermarkDiameter)

  const imageDataURL = hiddenCanvas.toDataURL('image/jpeg', 1.0)
  const block = imageDataURL.split(";")
  const contentType = block[0].split(":")[1]
  const realData = block[1].split(",")[1]

  blob = b64toBlob(realData, contentType)
  nav.setAttribute('data-status', 'shoot')
}

function sendImage() {
  nav.setAttribute('data-status', 'sending')
  const formDataToUpload = new FormData()
  formDataToUpload.append("photo", blob)

  fetch("/save", {
    method: "POST",
    body: formDataToUpload
  }).then((res) => {
    if (res.status === 200) {
      greet()
    }
  }).catch(function(error) {
    console.error(`🙈  [Print] ${error.message}`)
  });
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || ''
  sliceSize = sliceSize || 512

  const byteCharacters = atob(b64Data);
  let byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize)
    let byteNumbers = new Array(slice.length)

    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    let byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}

function reset() {
  if (nav.getAttribute('data-status') !== 'shoot' && nav.getAttribute('data-status') !== 'sent')
    return

  video.play()
  blob = null
  nav.setAttribute('data-status', 'idle')
}

function greet() {
  nav.setAttribute('data-status', 'sent')
  window.setTimeout(reset, 1500)
}

function validate() {
  switch (nav.getAttribute('data-status')) {
    case "sent":
      return
    case "idle":
      startCountdown()
      break
    case "shoot":
      sendImage()
  }
}

navigator.mediaDevices.getUserMedia({
  audio: false,
  video: {
    facingMode: 'user',
    frameRate: 30,
    width: 1920,
    height: 1080
  }
}).then(function(mediaStream) {
  video.srcObject = mediaStream
  video.onloadedmetadata = initBooth
}).catch(function(err) {
  console.error(`🙈  [Camera] ${err.name}: ${err.message}`)
})

printBtn.addEventListener('click', sendImage)
triggerBtn.addEventListener('click', startCountdown)
resetBtn.addEventListener('click', reset)

document.addEventListener('keypress', function (event) {
  if (event.keyCode === 97)
    validate()

  if (event.keyCode === 98)
    reset()
})

console.log('🙈  Ouistiti!')
