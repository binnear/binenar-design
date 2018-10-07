import * as React from 'react';
import Dot from 'components/dot/dot';

const s = require('./canvas.pcss');

interface Props {

}
interface State {
}

class Canvas extends React.Component<Props, State> {
  WIDTH: number
  HEIGHT: number
  mouseX: number
  mouseY: number
  dots: Array<Dot>
  dotsMinDist: number
  mouseMoveChecker: any
  mouseMoving: boolean
  maxDistFromCursor: number
  initStarsPopulation: number
  canvas: any
  ctx: CanvasRenderingContext2D
  constructor(props: Props) {
    super(props)
    this.ctx;
    this.WIDTH;
    this.HEIGHT;
    this.mouseX;
    this.mouseY;
    this.canvas;
    this.dots = [];
    this.dotsMinDist = 2;
    this.mouseMoveChecker;
    this.mouseMoving = false;
    this.maxDistFromCursor = 50;
    this.initStarsPopulation = 80;
  }

  componentDidMount() {
    this.canvas = document.getElementById('dotCanvas')
    this.ctx = this.canvas.getContext('2d')
    this.setCanvasSize();
    this.init();
    let _this = this
    window.onmousemove = (e) => {
      _this.mouseMoving = true;
      _this.mouseX = e.clientX;
      _this.mouseY = e.clientY;
      clearInterval(_this.mouseMoveChecker);
      _this.mouseMoveChecker = setTimeout(function () {
        _this.mouseMoving = false;
      }, 100);
    }
    window.ontouchmove = function (e) {
      _this.mouseMoving = true;
      _this.mouseX = e.changedTouches[0].clientX;
      _this.mouseY = e.changedTouches[0].clientY;
      clearInterval(_this.mouseMoveChecker);
      _this.mouseMoveChecker = setTimeout(function () {
        _this.mouseMoving = false;
      }, 100);
    }
  }

  setCanvasSize() {
    this.WIDTH = document.documentElement.clientWidth;
    this.HEIGHT = document.documentElement.clientHeight;
    this.canvas.setAttribute("width", this.WIDTH);
    this.canvas.setAttribute("height", this.HEIGHT);
  }

  init() {
    this.ctx.strokeStyle = "white";
    this.ctx.shadowColor = "white";
    // for (var i = 0; i < initStarsPopulation; i++) {
    //   stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
    //   //stars[i].draw();
    // }
    this.ctx.shadowBlur = 0;
    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    // for (var i in stars) {
    //   stars[i].move();
    // }
    for (var i in this.dots) {
      this.dots[i].move();
    }
    this.drawIfMouseMoving();
    requestAnimationFrame(this.animate.bind(this));
  }

  drawIfMouseMoving() {
    if (!this.mouseMoving) return;
    if (this.dots.length == 0) {
      this.dots[0] = new Dot(0, this.mouseX, this.mouseY, this.ctx, this.dots);
      this.dots[0].draw();
      return;
    }
    var previousDot: any = Dot.getPreviousDot(this.dots.length, 1, this.dots);
    var prevX = previousDot.x;
    var prevY = previousDot.y;
    var diffX = Math.abs(prevX - this.mouseX);
    var diffY = Math.abs(prevY - this.mouseY);
    if (diffX < this.dotsMinDist || diffY < this.dotsMinDist) return;
    var xVariation = Math.random() > .5 ? -1 : 1;
    xVariation = xVariation * Math.floor(Math.random() * this.maxDistFromCursor) + 1;
    var yVariation = Math.random() > .5 ? -1 : 1;
    yVariation = yVariation * Math.floor(Math.random() * this.maxDistFromCursor) + 1;
    this.dots[this.dots.length] = new Dot(this.dots.length, this.mouseX + xVariation, this.mouseY + yVariation, this.ctx, this.dots);
    this.dots[this.dots.length - 1].draw();
    this.dots[this.dots.length - 1].link();
  }

  render() {
    return <canvas id="dotCanvas" className={s.canvas}></canvas>
  }
}

export default Canvas