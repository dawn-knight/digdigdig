cc.Class ({
    extends: cc.Component,
	
	ctor: function () {},
	
    properties: {
		// mouseDownTime: 0,
		// rotatedByYAxis: true,
		mouseDown: false,
		// moved: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		cc.log('load ' + this.node.name);
		// if (!this.node.name.endsWith('_new'))
			// return;
		
		this.node.on('mouseup', function(event) {
			this.mouseDown = false;
			cc.log(this.node.getPosition());
			// if (!this.moved) {				
				// var today = new Date();
				// var timeInterval = today.getTime() - this.mouseDownTime;
				
				// if (timeInterval > 350) {
					// if (this.rotatedByYAxis) {
						// this.node.rotationY += 180;
					// } else {
						// this.node.rotationX += 180;
					// }
				// } else {
					// this.node.rotationX += 90;
					// this.node.rotationY += 90;
					// this.rotatedByYAxis = !this.rotatedByYAxis;
				// }
			// } else {
				// this.moved = false;
			// }
			
			// this.mouseDownTime = 0;
			
			this.overlappingCheck();
		}, this);
		
		this.node.on('mousedown', function(event) {				
			// var today = new Date();
			// this.mouseDownTime = today.getTime();
			this.mouseDown = true;
		}, this);		

		this.node.on('mousemove', function(event) {
			if (this.mouseDown) {
				this.node.x = event.getLocationX();
				this.node.y = event.getLocationY();
				// this.moved = true;
			}
		}, this);
	},

    start () {

    },

    // update (dt) {},
	
	overlappingCheck() {
		if (this.node.name == 'purpleO_new') {
			// 50是单个block的宽度，暂时写死
			cc.log('first block[' + (this.node.x - 50) + ', ' + this.node.y + ']');
			cc.log('second block[' + this.node.x + ', ' + this.node.y + ']');
			cc.log('third block[' + (this.node.x - 50) + ', ' + (this.node.y - 50) + ']');
			cc.log('fourth block[' + this.node.x + ', ' + (this.node.y - 50) + ']');
			return;
		}
		
		
		if (this.node.name == 'redI_new') {
			// 50是单个block的宽度，暂时写死
			// 只需检查x或者y任意一个轴的旋转值即可，长条的姿态只有水平和竖直两种（旋转），无论有没有围绕某个轴进行过翻转
			// 如果某个轴的旋转值除以90得到的结果又能被2整除，则说明姿态为水平，然则为竖直
			var remainder = (this.node.rotationX / 90) % 2;
			if (remainder == 0) {
				cc.log('first block[' + (this.node.x - 100) + ', ' + (this.node.y - 25) + ']');
				cc.log('second block[' + (this.node.x - 50) + ', ' + (this.node.y - 25) + ']');
				cc.log('third block[' + (this.node.x) + ', ' + (this.node.y - 25) + ']');
				cc.log('fourth block[' + (this.node.x + 50) + ', ' + (this.node.y - 25) + ']');				
			} else {
				cc.log('first block[' + (this.node.x - 25) + ', ' + (this.node.y + 100) + ']');
				cc.log('second block[' + (this.node.x - 25)+ ', ' + (this.node.y + 50) + ']');
				cc.log('third block[' + (this.node.x - 25) + ', ' + (this.node.y) + ']');
				cc.log('fourth block[' + (this.node.x - 25) + ', ' + (this.node.y - 50) + ']');				
			}
			return;
		}
		
		if (this.node.name == 'yellowZ_new') {
			// 50是单个block的宽度，暂时写死
			if (this.node.rotationX == this.node.rotationY) {
				// 无翻转
				// 检查x或者y任意一个轴的旋转值，该值如果除以90得到的结果又能被2整除，则说明姿态为水平，然则为竖直
				var remainder = (this.node.rotationX / 90) % 2;
				if (remainder == 0) {
					cc.log('first block[' + (this.node.x - 75) + ', ' + this.node.y + ']');
					cc.log('second block[' + (this.node.x - 25) + ', ' + this.node.y + ']');
					cc.log('third block[' + (this.node.x - 25) + ', ' + (this.node.y - 50) + ']');
					cc.log('fourth block[' + (this.node.x + 25) + ', ' + (this.node.y - 50) + ']');				
				} else {
					cc.log('first block[' + (this.node.x) + ', ' + (this.node.y + 25) + ']');
					cc.log('second block[' + (this.node.x)+ ', ' + (this.node.y - 25) + ']');
					cc.log('third block[' + (this.node.x - 50) + ', ' + (this.node.y - 25) + ']');
					cc.log('fourth block[' + (this.node.x - 50) + ', ' + (this.node.y - 75) + ']');				
				}				
			} else {
				// 有翻转
				// 如发生过翻转，rotationX与rotationY的值将会不一致，取较小的那个值来确定旋转的角度，哪个值较大也意味着图形沿着对应的轴发生了翻转，事实上，该图形水平翻转和垂直翻转得到的姿态是一致的
				var rotationDegree = (this.node.rotationX > this.node.rotationY) ? this.node.rotationY : this.node.rotationX;
				var remainder = (rotationDegree / 90) % 2;
				if (remainder == 0) {
					cc.log('first block[' + (this.node.x + 25) + ', ' + this.node.y + ']');
					cc.log('second block[' + (this.node.x - 25) + ', ' + this.node.y + ']');
					cc.log('third block[' + (this.node.x - 25) + ', ' + (this.node.y - 50) + ']');
					cc.log('fourth block[' + (this.node.x - 75) + ', ' + (this.node.y - 50) + ']');						
				} else {
					cc.log('first block[' + (this.node.x - 50) + ', ' + (this.node.y + 25) + ']');
					cc.log('second block[' + (this.node.x - 50)+ ', ' + (this.node.y - 25) + ']');
					cc.log('third block[' + (this.node.x) + ', ' + (this.node.y - 25) + ']');
					cc.log('fourth block[' + (this.node.x) + ', ' + (this.node.y - 75) + ']');					
				}
			}
			return;
		}		
		
		if (this.node.name == 'greenT_new') {
			// 50是单个block的宽度，暂时写死
			// 没有旋转或旋转360°N次，4N * 90
			// 旋转90°N次，(4N + 1) * 90
			// 旋转180°N次，(4N + 2) * 90
			// 旋转270°N次，(4N + 3) * 90
			var times = this.node.rotationX / 90;
			if ((times % 4) == 0) {
				cc.log('first block[' + (this.node.x - 75) + ', ' + (this.node.y - 50) + ']');
				cc.log('second block[' + (this.node.x - 25)+ ', ' + (this.node.y - 50) + ']');
				cc.log('third block[' + (this.node.x - 25) + ', ' + (this.node.y) + ']');
				cc.log('fourth block[' + (this.node.x + 25) + ', ' + (this.node.y - 50) + ']');						
			} else if ((times % 4) == 1) {
				cc.log('first block[' + (this.node.x - 50) + ', ' + (this.node.y + 25) + ']');
				cc.log('second block[' + (this.node.x - 50)+ ', ' + (this.node.y - 25) + ']');
				cc.log('third block[' + (this.node.x) + ', ' + (this.node.y - 25) + ']');
				cc.log('fourth block[' + (this.node.x - 50) + ', ' + (this.node.y - 75) + ']');						
			} else if ((times % 4) == 2) {
				cc.log('first block[' + (this.node.x - 75) + ', ' + (this.node.y) + ']');
				cc.log('second block[' + (this.node.x - 25)+ ', ' + (this.node.y) + ']');
				cc.log('third block[' + (this.node.x - 25) + ', ' + (this.node.y - 50) + ']');
				cc.log('fourth block[' + (this.node.x + 25) + ', ' + (this.node.y) + ']');						
			} else if ((times % 4) == 3) {
				cc.log('first block[' + (this.node.x) + ', ' + (this.node.y + 25) + ']');
				cc.log('second block[' + (this.node.x)+ ', ' + (this.node.y - 25) + ']');
				cc.log('third block[' + (this.node.x - 50) + ', ' + (this.node.y - 25) + ']');
				cc.log('fourth block[' + (this.node.x) + ', ' + (this.node.y - 75) + ']');						
			}
			return;
		}
		
		if (this.node.name == 'orangeL_new') {
			// 50是单个block的宽度，暂时写死
			if (this.node.rotationX == this.node.rotationY) {
				// 无翻转
				var times = this.node.rotationX / 90;
				if ((times % 4) == 0) {
					cc.log('first block[' + (this.node.x - 50) + ', ' + (this.node.y + 25) + ']');
					cc.log('second block[' + (this.node.x - 50)+ ', ' + (this.node.y - 25) + ']');
					cc.log('third block[' + (this.node.x - 50) + ', ' + (this.node.y - 75) + ']');
					cc.log('fourth block[' + (this.node.x) + ', ' + (this.node.y - 75) + ']');						
				} else if ((times % 4) == 1) {
					cc.log('first block[' + (this.node.x - 75) + ', ' + (this.node.y - 50) + ']');
					cc.log('second block[' + (this.node.x - 75)+ ', ' + (this.node.y) + ']');
					cc.log('third block[' + (this.node.x - 25) + ', ' + (this.node.y) + ']');
					cc.log('fourth block[' + (this.node.x + 25) + ', ' + (this.node.y) + ']');					
				} else if ((times % 4) == 2) {
					cc.log('first block[' + (this.node.x - 50) + ', ' + (this.node.y + 25) + ']');
					cc.log('second block[' + (this.node.x)+ ', ' + (this.node.y + 25) + ']');
					cc.log('third block[' + (this.node.x) + ', ' + (this.node.y - 25) + ']');
					cc.log('fourth block[' + (this.node.x) + ', ' + (this.node.y - 75) + ']');					
				} else if ((times % 4) == 3) {
					cc.log('first block[' + (this.node.x - 75) + ', ' + (this.node.y - 50) + ']');
					cc.log('second block[' + (this.node.x - 25)+ ', ' + (this.node.y - 50) + ']');
					cc.log('third block[' + (this.node.x + 25) + ', ' + (this.node.y - 50) + ']');
					cc.log('fourth block[' + (this.node.x + 25) + ', ' + (this.node.y) + ']');						
				}
			} else {
				// 有翻转
				var rotationDegree = (this.node.rotationX > this.node.rotationY) ? this.node.rotationY : this.node.rotationX;
				var times = rotationDegree / 90;
				if ((times % 4) == 0) {
					cc.log('first block[' + (this.node.x) + ', ' + (this.node.y + 25) + ']');
					cc.log('second block[' + (this.node.x)+ ', ' + (this.node.y - 25) + ']');
					cc.log('third block[' + (this.node.x) + ', ' + (this.node.y - 75) + ']');
					cc.log('fourth block[' + (this.node.x - 50) + ', ' + (this.node.y - 75) + ']');						
				} else if ((times % 4) == 1) {
					cc.log('first block[' + (this.node.x - 75) + ', ' + (this.node.y) + ']');
					cc.log('second block[' + (this.node.x - 25)+ ', ' + (this.node.y) + ']');
					cc.log('third block[' + (this.node.x + 25) + ', ' + (this.node.y) + ']');
					cc.log('fourth block[' + (this.node.x + 25) + ', ' + (this.node.y - 50) + ']');						
				} else if ((times % 4) == 2) {
					cc.log('first block[' + (this.node.x) + ', ' + (this.node.y + 25) + ']');
					cc.log('second block[' + (this.node.x - 50)+ ', ' + (this.node.y + 25) + ']');
					cc.log('third block[' + (this.node.x - 50) + ', ' + (this.node.y - 25) + ']');
					cc.log('fourth block[' + (this.node.x - 50) + ', ' + (this.node.y - 75) + ']');						
				} else if ((times % 4) == 3) {
					cc.log('first block[' + (this.node.x - 75) + ', ' + (this.node.y) + ']');
					cc.log('second block[' + (this.node.x - 75)+ ', ' + (this.node.y - 50) + ']');
					cc.log('third block[' + (this.node.x - 25) + ', ' + (this.node.y - 50) + ']');
					cc.log('fourth block[' + (this.node.x + 25) + ', ' + (this.node.y - 50) + ']');					
				}				
			}
		}
	}
});
