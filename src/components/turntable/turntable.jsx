
export default class RealWheel {
	constructor(options) {
		this.centerX = options.centerX;
		this.centerY = options.centerY;
		this.outsideRadius = options.outsideRadius;

		this.awards = options.awards;                           		// 奖品配置列表
		this.outPlanColor = options.outPlanColor || '#FFFFFA'   		// 次外表盘颜色
		this.outFlashColor = options.outFlashColor || '#2C7EC8' 		// 最外表盘颜色

		this.centerOutShadowColor = 'rgba(0, 0, 0, .3)'         		// 按钮周围外圈表盘颜色
		this.centerInnerShadowColor = 'rgba(67,83,105,.6)'     	 		// 按钮周围内圈表盘颜色

		this.arrowColorTo = options.arrowColorTo || '#FC610E';     	// 按钮圆盘渐变色 
		this.buttonColorTo = options.buttonColorTo || '#FC610E';
		this.arrowColorFrom = options.arrowColorFrom || '#FA640D'; 	// 按钮指针颜色
		this.buttonFontColor = options.buttonFontColor || '#FFFFFF';// 按钮文字颜色
		this.buttonColorFrom = options.buttonColorFrom || '#FDA92F';// 按钮渐变色

		this.startRadian = options.startRadian || 0;                // 奖品开始渲染的角度

		this.arrowStartRadian = -Math.PI / 2                        // 指针渲染开始角度

		this.isShowImg = options.isShowImg;			// 是否显示图片
		this.rotateStyle = options.rotateStyle; // 旋转方式

		this._extraDegrees;      		// 额外的圈数
		this._spinningTime;     		// 缓动单次时间
		this._spinTotalTime;     		// 缓动所用总时间
		this._spinningChange;    		// 每次运动所变化的角度

		this._canvasStyle;       		// canvas旧的样式

		this.outSideDottedSize;			// 原点大小
		this.outSideSecondRadius;   // 第二个表盘绘制半径
		this.eachColorPanelRadius;	// 色块绘制半径
		this.outSideDottedPosition; // 原点的绘制位置

		this.imgSize;								// 图片大小
		this.imgRadius;							// 图片绘制半径
		this.fontSize;							// 色块文字大小
		this.textRadius;						// 色块文字绘制半径
		this.textWidth;							// 每行文字显示数量
		this.textLineHeight;				// 文字行间距

		this.outSideShowPanel;			// 外阴影表盘半径
		this.innerSideShowPanel;		// 内阴影表盘半径

		this.buttonFont;						// 按钮文字
		this.arrowRadius;						// 箭头绘制半径
		this.buttonRadius;					// 按钮绘制半径
		this.desArrowRadius;				// 箭头绘制目标半径

		this._isAnimate = false; 		// 控制抽奖频繁点击
	};

	// 判断是否为PC
	isPc() {
		let userAgentInfo = navigator.userAgent,
			flag = true,
			Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];

		for (let v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	};

	// 把canvas的点转成window坐标
	windowToCanvas(canvas, e) {
		let bbox = canvas.getBoundingClientRect(),
			x = this.isPc() ? e.clientX || event.clientX : e.changedTouches[0].clientX,
			y = this.isPc() ? e.clientY || event.clientY : e.changedTouches[0].clientY;

		return {
			x: x - bbox.left,
			y: y - bbox.top
		}
	};

	// 返回换行的文本
	getLineTextArr(context, t, w) {
		let chr = t.split(''), temp = '', row = [];
		for (let a = 0; a < chr.length; a++) {
			if (context.measureText(temp).width > w) {
				row.push(temp);
				w = w - 14;
				temp = '';
			}
			temp += chr[a];
		};
		row.push(temp);
		return row;
	};

	defaultConf() {
		this.outSideSecondRadius = this.outsideRadius * 0.9;
		this.outSideDottedPosition = this.outsideRadius * 0.95;
		this.outSideDottedSize = 4;
		this.eachColorPanelRadius = this.outsideRadius * 0.85;
		this.textRadius = this.outsideRadius * .64;
		this.fontSize = '14px Helvetica, Arial'
		this.textLineHeight = 18
		this.textWidth = 70
		this.outSideShowPanel = this.outsideRadius * 0.36;
		this.innerSideShowPanel = this.outsideRadius * 0.3;
		this.arrowRadius = this.outsideRadius * 0.24;
		this.desArrowRadius = this.outsideRadius * 0.1
		this.buttonRadius = this.outsideRadius * 0.22;
		this.buttonFont = 'bold 24px helvetica, Arial';
	}

	defaultConfHasImg() {
		const awardRadian = (Math.PI * 2) / this.awards.length
		this.imgRadius = this.outsideRadius * .78;
		this.imgSize = Math.sin(awardRadian) * this.outsideRadius / 4;
		this.textLineHeight = 15
		this.textRadius = this.outsideRadius * .42;
		this.textWidth = 70
		this.fontSize = '12px Helvetica, Arial'
		this.outSideShowPanel = this.outsideRadius * 0.3;
		this.innerSideShowPanel = this.outsideRadius * 0.25;
		this.arrowRadius = this.outsideRadius * 0.18;
		this.buttonRadius = this.arrowRadius * .88;
		this.buttonFont = 'bold 20px helvetica, Arial';
	}

	autoResize() {
		const size = this.awards.length;
		switch (size) {
			case 4:
				this.defaultConf()
				if (this.isShowImg) {
					this.defaultConfHasImg()
				}
				break;
			case 6:
				this.defaultConf()
				if (this.isShowImg) {
					this.defaultConfHasImg()
					this.textRadius = this.outsideRadius * .45;
				}
				break;
			case 8:
				this.defaultConf()
				this.fontSize = '12px Helvetica, Arial'
				if (this.isShowImg) {
					this.defaultConfHasImg()
					this.textRadius = this.outsideRadius * .5;
					this.textWidth = 42
					this.fontSize = '12px Helvetica, Arial'
					this.outSideShowPanel = this.outsideRadius * 0.26;
					this.innerSideShowPanel = this.outsideRadius * 0.21;
					this.arrowRadius = this.outsideRadius * 0.16;
					this.buttonFont = 'bold 18px helvetica, Arial';
				}
				break;
			case 10:
				this.defaultConf()
				this.textRadius = this.outsideRadius * .7;
				this.fontSize = '12px Helvetica, Arial'
				this.textWidth = 56
				this.outSideShowPanel = this.outsideRadius * 0.32;
				this.innerSideShowPanel = this.outsideRadius * 0.27;
				this.arrowRadius = this.outsideRadius * 0.22;
				if (this.isShowImg) {
					this.defaultConfHasImg()
					this.textRadius = this.outsideRadius * .55;
					this.textWidth = 42
					this.fontSize = '12px Helvetica, Arial'
					this.outSideShowPanel = this.outsideRadius * 0.26;
					this.innerSideShowPanel = this.outsideRadius * 0.21;
					this.arrowRadius = this.outsideRadius * 0.16;
					this.buttonFont = 'bold 18px helvetica, Arial';
				}
				break;
			default:
				break;
		}
	}

	// 绘制转盘
	drawRouletteWheel(context) {
		this.autoResize()
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		let awardRadian = (Math.PI * 2) / this.awards.length

		// ---------- 绘制外闪光盘
		let outsideG1 = context.createLinearGradient(
			this.centerX - this.outsideRadius * Math.cos(Math.PI / 4), this.centerY - this.outsideRadius * Math.cos(Math.PI / 4),
			this.centerX + this.outsideRadius * Math.cos(Math.PI / 4), this.centerY + this.outsideRadius * Math.cos(Math.PI / 4)
		);
		context.save();
		outsideG1.addColorStop(0, '#43ADEB');
		outsideG1.addColorStop(1, '#2B7BC4');
		context.fillStyle = outsideG1;
		context.beginPath();
		context.moveTo(this.centerX, this.centerY)
		context.arc(this.centerX, this.centerY, this.outsideRadius, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
		// ----------

		// ---------- 绘制外表盘
		context.save();
		context.fillStyle = this.outPlanColor;
		context.beginPath();
		context.moveTo(this.centerX, this.centerY)
		context.shadowColor = 'rgba(0, 0, 0, .24)';
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 5;
		context.shadowBlur = 15;
		context.arc(this.centerX, this.centerY, this.outSideSecondRadius, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
		// ----------

		// --------- 绘制表盘中的色块，和对应的文字与图片
		for (let i = 0; i < this.awards.length; i++) {
			// ---------- 绘制外闪光盘上的圆点
			let startX = this.centerX + (this.outSideDottedPosition) * Math.cos(this.startRadian + awardRadian * i),
				startY = this.centerY + (this.outSideDottedPosition) * Math.sin(this.startRadian + awardRadian * i),
				g1 = context.createRadialGradient(startX, startY, 0, startX, startY, 5);
			context.save();
			g1.addColorStop(0.1, '#FFF');
			g1.addColorStop(0.7, '#FFFCEA');
			g1.addColorStop(1, '#CFE2F2');
			context.fillStyle = g1;
			context.shadowColor = '#FFF';
			context.shadowBlur = 15;
			context.beginPath();
			context.arc(startX, startY, this.outSideDottedSize, 0, Math.PI * 2, false);
			context.fill();
			context.restore();

			// 绘制色块
			context.save();
			context.fillStyle = this.awards[i].color
			let _startRadian = this.startRadian + awardRadian * i,
				_endRadian = _startRadian + awardRadian;
			context.beginPath();
			context.moveTo(this.centerX, this.centerY)
			context.arc(this.centerX, this.centerY, this.eachColorPanelRadius, _startRadian, _endRadian, false);
			context.fill();
			context.restore();

			// 绘制图片
			if (this.isShowImg && this.awards[i].img) {
				let self = this,
					image = new Image();
				image.src = this.awards[i].img;
				function drawImage(self, context) {
					context.save();
					context.translate(
						self.centerX + Math.cos(_startRadian + awardRadian / 2) * self.imgRadius,
						self.centerY + Math.sin(_startRadian + awardRadian / 2) * self.imgRadius
					)
					context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
					context.drawImage(
						image,
						- self.imgSize / 2, 0,
						self.imgSize, self.imgSize
					);
					context.restore();
				}
				if (!image.complete) {
					image.onload = function (e) {
						drawImage(self, context);
					}
				} else {
					drawImage(self, context);
				}
			}
			// 绘制文字
			let award = this.awards[i].content;
			context.save();
			context.fillStyle = this.awards[i].textColor;
			context.font = this.fontSize;
			context.translate(
				this.centerX + Math.cos(_startRadian + awardRadian / 2) * this.textRadius,
				this.centerY + Math.sin(_startRadian + awardRadian / 2) * this.textRadius
			);
			context.rotate(_startRadian + awardRadian / 2 + Math.PI / 2);
			this.getLineTextArr(context, award, this.textWidth).forEach((data, index) => {
				context.fillText(data, -context.measureText(data).width / 2, index * this.textLineHeight);
			})
			context.restore();
		}
		// ----------

		// ---------- 绘制指针外部轮廓阴影
		context.save();
		context.fillStyle = this.centerOutShadowColor;
		context.beginPath();
		context.moveTo(this.centerX, this.centerY)
		context.arc(this.centerX, this.centerY, this.outSideShowPanel, this.arrowStartRadian, Math.PI * 2 + this.arrowStartRadian, false);
		context.fill();
		context.restore();

		context.save();
		context.fillStyle = this.centerInnerShadowColor;
		context.beginPath();
		context.moveTo(this.centerX, this.centerY)
		context.arc(this.centerX, this.centerY, this.innerSideShowPanel, this.arrowStartRadian, Math.PI * 2 + this.arrowStartRadian, false);
		context.fill();
		context.restore();
		// ----------

		// ---------- 绘制按钮指针
		let moveX = this.centerX + this.arrowRadius * Math.cos(this.arrowStartRadian),
			moveY = this.centerY + this.arrowRadius * Math.sin(this.arrowStartRadian),
			moveFirstX = this.centerX + this.arrowRadius * Math.cos(this.arrowStartRadian - Math.PI / 12),
			moveFirstY = this.centerY + this.arrowRadius * Math.sin(this.arrowStartRadian - Math.PI / 12),
			moveSecondX = this.centerX + this.arrowRadius * Math.cos(this.arrowStartRadian + Math.PI / 12),
			moveSecondY = this.centerY + this.arrowRadius * Math.sin(this.arrowStartRadian + Math.PI / 12),
			moveDesX = this.centerX + (this.arrowRadius + this.desArrowRadius) * Math.cos(this.arrowStartRadian),
			moveDesY = this.centerY + (this.arrowRadius + this.desArrowRadius) * Math.sin(this.arrowStartRadian);
		context.save();
		context.fillStyle = this.arrowColorFrom;
		context.beginPath();
		context.moveTo(moveX, moveY);
		context.lineTo(moveFirstX, moveFirstY);
		context.lineTo(moveDesX, moveDesY);
		context.closePath();
		context.fill();
		context.restore();

		context.save();
		context.fillStyle = this.arrowColorFrom;
		context.beginPath();
		context.moveTo(moveX, moveY);
		context.lineTo(moveSecondX, moveSecondY);
		context.lineTo(moveDesX, moveDesY);
		context.closePath();
		context.fill();
		context.restore();
		// ----------


		// ---------- 绘制按钮圆盘
		let gradient_1 = context.createLinearGradient(
			this.centerX - this.arrowRadius, this.centerY - this.arrowRadius,
			this.centerX - this.arrowRadius, this.centerY + this.arrowRadius
		);
		context.save();
		gradient_1.addColorStop(0, this.arrowColorFrom);
		gradient_1.addColorStop(1, this.arrowColorTo);
		context.fillStyle = gradient_1;

		context.shadowColor = 'rgba(0, 0, 0, .12)';
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 5;
		context.shadowBlur = 15;

		context.beginPath();
		context.arc(this.centerX, this.centerY, this.arrowRadius, this.arrowStartRadian, Math.PI * 2 + this.arrowStartRadian, false);
		context.fill();
		context.restore();
		// ---------- 

		// ---------- 绘制按钮
		let gradient_2 = context.createLinearGradient(
			this.centerX - this.buttonRadius, this.centerY - this.buttonRadius,
			this.centerX - this.buttonRadius, this.centerY + this.buttonRadius
		);
		context.save();
		gradient_2.addColorStop(0, this.buttonColorFrom);
		gradient_2.addColorStop(1, this.buttonColorTo);
		context.fillStyle = gradient_2;
		context.beginPath();
		context.arc(this.centerX, this.centerY, this.buttonRadius, this.arrowStartRadian, Math.PI * 2 + this.arrowStartRadian, false);
		context.fill();
		context.restore();
		// ----------

		// ---------- 绘制按钮文字
		context.save();
		context.fillStyle = this.buttonFontColor;
		context.font = this.buttonFont;
		context.translate(
			this.centerX + Math.cos(this.arrowStartRadian) * this.buttonRadius,
			this.centerY + Math.sin(this.arrowStartRadian) * (this.buttonRadius - 8)
		);
		context.rotate(this.arrowStartRadian + Math.PI / 2);
		context.fillText('Start', -context.measureText('Start').width / 2, this.buttonRadius);
		context.restore();
		// ----------
	};

	// 循环绘制转盘知道停止
	whenStopdrawWheel(context, moveDegrees, startRadian, rotateWheel) {
		if (moveDegrees - startRadian <= 0.05) {
			this._isAnimate = false;
			return
		}
		this.drawRouletteWheel(context);
		window.requestAnimationFrame(rotateWheel.bind(this, context, moveDegrees));
	}

	// 转盘旋转
	rotateWheel(context, moveDegrees) {
		this._spinningChange = (moveDegrees - this.startRadian) * (this._spinningTime / this._spinTotalTime * 1.5)
		this.startRadian += this._spinningChange
		this.whenStopdrawWheel(context, moveDegrees, this.startRadian, this.rotateWheel)
	}

	// 指针旋转
	spinRotateWheel(context, moveDegrees) {
		this._spinningChange = (moveDegrees - this.arrowStartRadian) * (this._spinningTime / this._spinTotalTime * 1.5);
		this.arrowStartRadian += this._spinningChange
		this.whenStopdrawWheel(context, moveDegrees, this.arrowStartRadian, this.spinRotateWheel)
	}

	// 获取到达指定点的需要移动的角度
	getValue(context) {
		let middleDegrees = 0,		 // 中奖奖品所在区域中间角度
			moveDegrees = 0,    // 中奖奖品移动到指针处需变化的角度
			awardsToDegrees = this.awards.map((data, index) => {
				let awardRadian = (Math.PI * 2) / this.awards.length
				return awardRadian * index + (awardRadian * (index + 1) - awardRadian * index) / 2
			});
		this.remoteIndex = Math.floor(Math.random() * this.awards.length)
		middleDegrees = awardsToDegrees[this.remoteIndex];
		moveDegrees = Math.PI * 3 / 2 - middleDegrees
		moveDegrees = moveDegrees > 0 ? moveDegrees : Math.PI * 2 + moveDegrees
		return moveDegrees;
	};

	// 开始抽奖
	luckyDraw(context) {
		this.startRadian = 0;
		this.arrowStartRadian = -Math.PI / 2;
		this._isAnimate = true;
		this._spinningTime = 100;
		this._spinTotalTime = Math.random() * 5000 + 4000;
		this._spinningChange = 0;
		this._extraDegrees = Math.PI * 2 * Math.floor((Math.random() * 5 + 5))
		let destance = 0;
		if (this.rotateStyle === 'spin') {
			destance = Math.PI * 2 - this.getValue(context) + this.arrowStartRadian + this._extraDegrees
			this.spinRotateWheel(context, destance)
		} else {
			destance = this.getValue(context) + this._extraDegrees
			this.rotateWheel(context, destance);
		}
	};

	// 初始化转盘
	render(canvas, context) {
		this._canvasStyle = canvas.getAttribute('style');
		this.drawRouletteWheel(context);
		['touchstart', 'mousedown'].forEach(event => {
			canvas.addEventListener(event, e => {
				if (!this._isAnimate) {
					let loc = this.windowToCanvas(canvas, e);
					context.beginPath();
					context.arc(this.centerX, this.centerY, this.buttonRadius, 0, Math.PI * 2, false);
					if (context.isPointInPath(loc.x, loc.y)) {
						this.luckyDraw(context);
					}
				}
			})
		});
		canvas.addEventListener('mousemove', e => {
			let loc = this.windowToCanvas(canvas, e);
			context.beginPath();
			context.arc(this.centerX, this.centerY, this.buttonRadius, 0, Math.PI * 2, false);
			if (context.isPointInPath(loc.x, loc.y)) {
				canvas.setAttribute('style', `cursor: pointer;${this._canvasStyle}`);
			} else {
				canvas.setAttribute('style', this._canvasStyle);
			}
		});
	}
}