
// // vocal, drum, bass, and other are volumes ranging from 0 to 100s
//customFrame
var customFrameCount = 0;
//LineWave
let x = 0; // x 坐标的初始值
let linePoints = []; // 存储点的数组
const maxPoints = 1000; // 限制数组大小的最大值
let waveHeight = 1000;
let waveHeight1 = 0;
// images
let img;
let firstRun = true;
let angle = 0
let img4;
let imgF;
// //circles
let numCircles = 5;
let numCircles1 = 6;
// ///实验5
let lines = []; // 用来存储线条的 x 和 y 坐标
let numLines = 3; // 线条数量
///实验6
let Ymove = 1
let lines1 = []; // 存储线条的 x 和 y 坐标
// //////////////////////////////////////////////////////////////////////////////////////////////////////

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  // //fundation
  colorMode(HSB, 360, 100, 100, 255);
  const canvaWidth = 1000;
  const canvaHeight = 1000;
  createCanvas(canvaWidth, canvaHeight);
  background(40, 12, 98);
  strokeWeight(10)

  //////////////////////////
  //dripping red
  background(40, 12, 100); 
  strokeWeight(10); 
  stroke(0, 85, 50);
  // lines[]
  if (firstRun) {
    for (let i = 0; i < 20; i++) {
      let x = random(width); // 随机 x 坐标
      let y = random(0, 1000); // 随机 y 坐标
      lines1.push({ x: x, y: y }); // 存储每个line的坐标
    }
  } else {
    if (songIsPlaying) {
    for (let i = 0; i < 20; i++) {
      let linej = lines1[i];
      line(linej.x, linej.y, linej.x, linej.y + 5); // 每条线
      drum_speed = 1
      if (drum < 10){drum_speed = 0}
      lines1[i].y = lines1[i].y + drum_speed + 4;

      if (lines1[i].y > 1000) {
        lines1[i].y -= 1000; // 重新设置 y 坐标为负
      }
    }
  }
}
  //////circles
  let circleAlpha = map(vocal, 0, 100, 0, 255);
  let strokeNum = map(bass, 0, 100, 1, 10);
  if (songIsPlaying) {
    for (let i = 0; i <= numCircles; i++) {
      noFill(); 
      strokeWeight(2); 
      stroke(0, 0, 10, 50 + circleAlpha);
      ellipse(500, 500, 530 + 25 * i, 530 + 25 * i);
    }
    for (let i = 0; i <= numCircles1; i++) {
      noFill(); 
      strokeWeight(strokeNum / 2);
      stroke(0, 0, 20, 200 - circleAlpha);
      ellipse(500, 500, 530 + 15 * i, 530 + 15 * i);
    }
  }
  let circleAlpha1 = map(bass, 0, 100, 0, 255);
  if (songIsPlaying) {
    for (let i = 0; i <= numCircles; i++) {
      noFill(); 
      strokeWeight(2*strokeNum-6); 
      stroke(0, 0, 40, 180 + circleAlpha);
      ellipse(500, 500, 540 + 47 * i, 540 + 47 * i);
    }
    for (let i = 0; i <= numCircles1; i++) {
      noFill(); 
      strokeWeight(6 * strokeNum - 12);
      stroke(0, 0, 65, 200 - circleAlpha1);
      ellipse(500, 500, 580 + 38 * i, 580 + 38 * i);
    }
    //frame text
    stroke(0, 0, 0);
    strokeWeight(1);
    fill(0);
    if (songIsPlaying) {
      customFrameCount++;
      text("customFrame: " + customFrameCount, 20, 20)
      text(firstRun,40,40)
    } else {
      text("customFrame: 歌曲未播放,暂停计数", 20, 20);
    }

    // // lineWaves
    if (songIsPlaying) {
      linePoints.push({ x: x, y: drum });// 将新的端点添加到数组中
      if (linePoints.length > maxPoints) {// 限制数组[]的大小
        linePoints.shift(); // 移除最早的点
      }
      strokeWeight(3);
      noFill();
      for (let i = 0; i < linePoints.length - 1; i++) {
        stroke(225, 100, 50)
        line(linePoints[i].x, waveHeight, linePoints[i].x, waveHeight - 100 + 2 * (linePoints[i + 1].y)); // 画线
      }
      x += 7 / 2;// x 坐标每帧增加，波形向右移动
      if (x > width) {  // 当 x 超过画布宽度时，从左侧重新开始
        x = 0;
        linePoints = []; // 清空数组，避免波形过长
      }
      strokeWeight(10);
      line(0, 1000, 1000, 1000);
    }

    //////image&rotate
    push()
    if (songIsPlaying) {
      imageMode(CENTER);
      translate(500, 500); // 将原点移动到 (500, 500)
      rotate(angle); // 旋转图像
      if (firstRun) {
        img = loadImage('record.png')
        img1 = loadImage('lily1.png')
        img2 = loadImage('lily2.png')
        img3 = loadImage('lily3.png')
        img4 = loadImage('lily-white.png')
        imgF = loadImage('flowers.png')
    firstRun = false
      }
      if (customFrameCount < 1000) {
        image(img4, 30, -25, 630, 630); 
      } else if (customFrameCount < 1480) {
        image(img, 0, 0);   
      } else if (customFrameCount < 1960) {
        image(img4, 30, -25, 630, 630); 
      } else if (customFrameCount < 2415) {
        image(img, 0, 0);  
      } else if (customFrameCount < 4900) {
        image(img, 0, 0);  
        image(img4, 30, 0, 760, 760); 
      } else if (customFrameCount < 6100) {
        image(imgF, -20, -30,1500,1500);
      }else {
      image(img, 0, 0);  
      image(imgF, -20, -30,1500,1500);
    }
    angle += 1; // 每帧增加旋转角度
    }
    pop()

    ////arc()semicircle
    if (songIsPlaying) {
      stroke(0, 0, 0, 100); 
      strokeWeight(2); 
      fill(235, other, 40, 5); 
      let maxRadius1 = 410; // 最大半径
      let numArcs = 55; // 半圆的数量
      let stepArcs = maxRadius1 / numArcs; // 每个半圆的半径减小steps
      for (let i = 0; i < numArcs; i++) {
        let radius1 = maxRadius1 - i * stepArcs; // 当前半圆的半径
        arc(500, 500, radius1 * 2, radius1 * 2, radians(5100), radians(15500)); 
      }
      strokeWeight(15)
      stroke(8, 90, 40)
      line(1000, 150, 800, 360)
      stroke(40, 12, 98)
      fill(8, 90, 40)
      rect(770, 330, 60, 40)
      strokeWeight(5)
      stroke(0, 0, 0)
      noFill()
      rect(765, 325, 72, 53)
    }

    ///recordCenter
    stroke(0)
    fill(other, 12, 98)
    ellipse(500, 500, 180)
    strokeWeight(1)
    ellipse(500, 500, 170)
    fill(0, 80-vocal, 80-other)
    ellipse(500, 500, 165)

    ///////////////////threadredlines////////
    let lineX = random(width);
    let lineY = random(0, height / 2);
    for (let i = 0; i <= numLines; i++) {
      strokeWeight(1); 
      stroke(0, 85, 50, 150);  
      line(lineX, lineY, lineX, lineY + 300)
    }
  }
}
