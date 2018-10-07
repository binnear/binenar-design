import * as React from 'react';
const s = require('./dog.pcss');
const dog0 = require('public/images/dog/dog0.jpg');
const dog1 = require('public/images/dog/dog1.jpg');
const dog2 = require('public/images/dog/dog2.jpg');
const dog3 = require('public/images/dog/dog3.jpg');
const dog4 = require('public/images/dog/dog4.jpg');
const dog5 = require('public/images/dog/dog5.jpg');
const dog6 = require('public/images/dog/dog6.jpg');
const dog7 = require('public/images/dog/dog7.jpg');
const dog8 = require('public/images/dog/dog8.jpg');
const dogPathList: Array<string> = [dog0, dog1, dog2, dog3, dog4, dog5, dog6, dog7, dog8]
interface Props {

}
class Dog extends React.Component {
  canvas: any
  COUNT: number
  mouseX: number
  dogSpeed: number
  currentX: number
  backStopX: number
  frontStopX: number
  stepDistance: number
  pictureWidth: number
  keyFrameIndex: number
  lastWalkingTime: number
  dogPictures: Array<HTMLImageElement>
  ctx: CanvasRenderingContext2D
  constructor(props: Props) {
    super(props)
    this.start = this.start.bind(this)
    this.loadImg = this.loadImg.bind(this)
    this.ctx;
    this.canvas;
    this.COUNT = 9;
    this.mouseX = -1
    this.currentX = 0;
    this.pictureWidth;
    this.frontStopX = -1
    this.dogSpeed = 0.15;
    this.dogPictures = [];
    this.stepDistance = 10
    this.keyFrameIndex = -1;
    this.lastWalkingTime = Date.now();
    this.backStopX = window.innerWidth
  }

  componentDidMount() {
    this.canvas = document.querySelector('#dogCanvas');
    this.ctx = this.canvas.getContext('2d')
    this.canvas.width = window.innerWidth;
    this.canvas.height = 170;
    this.start()
  }

  async start(): Promise<any> {
    await this.loadResources()
    this.pictureWidth = this.dogPictures[0].naturalWidth / 2;
    this.recordMousePosition();
    window.requestAnimationFrame(this.walk.bind(this));
  }

  walk() {
    let now = Date.now();
    if (now - this.lastWalkingTime > 100) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      let distance = (now - this.lastWalkingTime) * this.dogSpeed;
      if (distance < this.stepDistance) {
        window.requestAnimationFrame(this.walk.bind(this));
        return;
      }
      // this.currentX += distance;
      this.keyFrameIndex = ++this.keyFrameIndex % (this.COUNT - 1);

      let direct = -1, stopWalking = false;
      if (this.frontStopX > this.mouseX) {
        direct = 1;
      } else if (this.backStopX < this.mouseX) {
        direct = -1;
      } else {
        stopWalking = true;
        direct = this.backStopX - this.mouseX > this.pictureWidth / 2 ? 1 : -1;
        this.keyFrameIndex = -1;
      }
      if (!stopWalking) {
        this.mouseX += this.stepDistance * direct;
      }
      this.ctx.save();
      if (direct === -1) {
        this.ctx.scale(direct, 1);
      }
      let img = this.dogPictures[this.keyFrameIndex + 1];
      let drawX = 0;
      drawX = this.mouseX * direct - (direct === -1 ? this.pictureWidth : 0);
      this.ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, drawX, 0, 200, 170);
      this.lastWalkingTime = now;
      this.ctx.restore();
    }
    window.requestAnimationFrame(this.walk.bind(this));
  }

  recordMousePosition() {
    window.addEventListener("mousemove", (event: MouseEvent) => {
      this.frontStopX = event.clientX - this.pictureWidth;
      this.backStopX = event.clientX;
    });
    window.addEventListener("touchmove", (event: TouchEvent) => {
      this.frontStopX = event.changedTouches[0].clientX - this.pictureWidth;
      this.backStopX = event.changedTouches[0].clientX;
    });
  }

  loadResources() {
    let _this = this
    let works: Array<Promise<any>> = [];
    dogPathList.forEach((dogPath: string) => {
      works.push(new Promise((resolve: Function) => {
        let img = new Image();
        img.onload = () => resolve(img);
        img.src = dogPath;
      }));
    });
    return new Promise((resolve: Function) => {
      Promise.all(works).then((dogPictures: Array<HTMLImageElement>) => {
        this.dogPictures = dogPictures;
        resolve();
      });
    });
  }

  loadImg(dogPath: any) {
    let _this = this;
    let img = new Image();
    img.onload = function () {
      _this.beginDraw(img);
    };
    img.src = dogPath;
    return img
  }

  beginDraw(img: HTMLImageElement) {

  }

  render() {
    return <canvas id="dogCanvas" className={s.canvas}></canvas>
  }
}

export default Dog