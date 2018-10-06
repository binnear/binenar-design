import Canvas from "../canvas/canvas";

const s = require('./dot.pcss');
interface This {
  id: number,
  x: number
}
class Dot {
  x: number                       // 圆点在界面中的x坐标
  y: number                       // 圆点在界面中的y坐标
  r: number                       // 绘制圆点的半径
  a: number                       // 圆点的透明度
  id: number                      // 圆点的唯一标识
  dir: number                     // 控制圆点的移动距离的一个参数
  speed: number                   // 控制圆点的移动距离的一个参数
  color: string
  dots: Array<Dot>
  maxLinks: number
  linkColor: string
  aReduction: number
  ctx: CanvasRenderingContext2D
  constructor(id: number, x: number, y: number, ctx: CanvasRenderingContext2D, dots: Array<Dot>) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.a = .5;
    this.ctx = ctx
    this.speed = .5;
    this.maxLinks = 2;
    this.dots = dots || [];
    this.aReduction = .005;
    this.r = Math.floor(Math.random() * 5) + 1;
    this.color = "rgba(209,144,144," + this.a + ")";
    this.dir = Math.floor(Math.random() * 140) + 200;
    this.linkColor = "rgba(209,144,144," + this.a / 4 + ")";

    this.die = this.die.bind(this);
    this.draw = this.draw.bind(this);
    this.link = this.link.bind(this);
    this.move = this.move.bind(this);
  }

  static getPreviousDot(id: number, stepback: number, dots: Array<Dot>) {
    if (id == 0 || id - stepback < 0) return false;
    if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
    else return false;
  }

  static degToRad(deg: number) {
    return deg * (Math.PI / 180);
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.shadowBlur = this.r * 2;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    this.ctx.closePath();
    this.ctx.fill();
  }

  link() {
    if (this.id == 0) return;
    var previousDot1 = Dot.getPreviousDot(this.id, 1, this.dots);
    var previousDot2 = Dot.getPreviousDot(this.id, 2, this.dots);
    var previousDot3 = Dot.getPreviousDot(this.id, 3, this.dots);
    if (!previousDot1) return;
    this.ctx.strokeStyle = this.linkColor;
    this.ctx.moveTo(previousDot1.x, previousDot1.y);
    this.ctx.beginPath();
    this.ctx.lineTo(this.x, this.y);
    if (previousDot2 != false) this.ctx.lineTo(previousDot2.x, previousDot2.y);
    if (previousDot3 != false) this.ctx.lineTo(previousDot3.x, previousDot3.y);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  move() {
    this.a -= this.aReduction;
    if (this.a <= 0) {
      this.die();
      return
    }
    this.color = "rgba(209,144,144," + this.a + ")";
    this.linkColor = "rgba(209,144,144," + this.a / 4 + ")";
    this.x = this.x + Math.cos(Dot.degToRad(this.dir)) * this.speed,
      this.y = this.y + Math.sin(Dot.degToRad(this.dir)) * this.speed;
    this.draw();
    this.link();
  }

  die() {
    this.dots[this.id] = null;
    delete this.dots[this.id];
  }

}

export default Dot