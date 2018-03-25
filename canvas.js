var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 5
autoSetCanvasSize(canvas)

listenToUser(canvas)


var eraserEnabled = false
eraser.onclick = function() {
  eraserEnabled =true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
brush.onclick = function(){
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
  var url = canvas.toDataURL("img/png")
  // console.log(url)
  // var a = document.createElement('a')
  // document.body.appendChild(a)
  // a.href = url
  // a.download = '我的绘画'
  // a.click()
  document.write('<img src="'+url+'"/>');
}

black.onclick = function(){
  context.strokeStyle = 'black'
  black.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
red.onclick = function(){
  context.strokeStyle = 'red'
  red.classList.add('active')
  black.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  black.classList.remove('active')
}

thin.onclick = function(){
  lineWidth = 5
}

thick.onclick = function(){
  lineWidth = 10
}

/******/

function autoSetCanvasSize(canvas) {
  setCanvasSize()

  window.onresize = function() {
    setCanvasSize()
  }

  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
    context.fillStyle = "#fff";   
    context.fillRect(0, 0, canvas.width, canvas.height);  
  }
}

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}

function listenToUser(canvas) {


  var using = false
  var lastPoint = {
    x: undefined,
    y: undefined
  }
  // 特性检测
  if (document.body.ontouchstart !== undefined) {
    // 触屏设备
    canvas.ontouchstart = function(cursor){
      var x = cursor.touches[0].clientX
      var y = cursor.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.ontouchmove = function(cursor){
      var x = cursor.touches[0].clientX
      var y = cursor.touches[0].clientY

      if (!using) {return}

        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }
      }
      canvas.ontouchend = function(cursor){
        using = false
      }
    }else{
    // 非触屏设备
    canvas.onmousedown = function(cursor) {
      var x = cursor.clientX
      var y = cursor.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = {
          "x": x,
          "y": y
        }
      }
    }
    canvas.onmousemove = function(cursor) {
      var x = cursor.clientX
      var y = cursor.clientY

      if (!using) {return}

        if (eraserEnabled) {
          context.clearRect(x - 5, y - 5, 10, 10)
        } else {
          var newPoint = {
            "x": x,
            "y": y
          }
          drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
          lastPoint = newPoint
        }

      }
      canvas.onmouseup = function(cursor) {
        using = false
      }
    }
  }
  