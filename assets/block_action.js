// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		mouseDownTime: 0,
		rotatedByYAxis: true
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.node.on('mouseup', function(event) {
			var today = new Date();
			var timeInterval = today.getTime() - this.mouseDownTime;
			
			if (timeInterval > 350) {
				if (this.rotatedByYAxis) {
					this.node.rotationY += 180;
				} else {
					this.node.rotationX += 180;
				}
			} else {
				this.node.rotationX += 90;
				this.node.rotationY += 90;
				this.rotatedByYAxis = !this.rotatedByYAxis;
			}
			
			this.mouseDownTime = 0;
		}, this);
		
		this.node.on('mousedown', function(event) {
			var today = new Date();
			this.mouseDownTime = today.getTime();
		}, this);		
	},

    start () {

    },

    // update (dt) {},
});
