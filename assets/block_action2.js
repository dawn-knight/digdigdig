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
});
