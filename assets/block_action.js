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
		rotatedByYAxis: true,
		mouseDown: false,
		moved: false,
		newBlksGen: false	
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this.node.on('mouseup', function(event) {
			this.mouseDown = false;
			
			if (!this.moved) {
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
			} else {
				this.moved = false;
			}
			
			this.mouseDownTime = 0;
		}, this);
		
		this.node.on('mousedown', function(event) {
			var today = new Date();
			this.mouseDownTime = today.getTime();
			this.mouseDown = true;
		}, this);

		this.node.on('mousemove', function(event) {
			var offset_x = event.getLocationX() - this.node.x;
			var offset_y = event.getLocationY() - this.node.y;
			// it's a drag event
			if (this.mouseDown && (Math.abs(offset_x) >= 10 || Math.abs(offset_y) >= 10)) {
				cc.log('newBlksGen: ' + this.newBlksGen);
				if (!this.newBlksGen) {
					if (this.node.name == 'redI') {
						this.genRedI();
					} else if (this.node.name == 'yellowZ') {
						this.genYellowZ();
					} else if (this.node.name == 'orangeL') {
						this.genOrangeL();
					} else if (this.node.name == 'greenT') {
						this.genGreenT();
					} else if (this.node.name == 'purpleO') {
						this.genPurpleO();
					}
					this.newBlksGen = true;
				}
			}
		}, this);		

		// this.node.on('mousemove', function(event) {
			// cc.log('mousemove: ' + this.mouseDown);
			// if (this.mouseDown) {
				// cc.log('blocks x: ' + this.node.x + ', y: ' + this.node.y)
				// cc.log('cursor x: ' + event.getLocationX() + ', y: ' + event.getLocationY())
				// this.node.x = event.getLocationX();
				// this.node.y = event.getLocationY();
				// this.moved = true;
			// }
		// }, this);
	},

    start () {

    },

    // update (dt) {},
	
	genRedI () {
		cc.log('redI');
		var new_one = new cc.Node(this.node.name + '_new');
		new_one.x = this.node.x + 10;
		new_one.y = this.node.y - 10;
		new_one.rotationX = this.node.rotationX;
		new_one.rotationY = this.node.rotationY;
		new_one.addComponent(cc.Sprite);
		new_one._components[0]._spriteFrame = this.node._components[0]._spriteFrame;
		new_one.parent = this.node.parent;
		new_one.setAnchorPoint(0, 0);
		cc.log(new_one);
	},
	
	genYellowZ () {
		cc.log('yellowZ');
		var new_one = new cc.Node(this.node.name + '_new');
		new_one.x = this.node.x + 10;
		new_one.y = this.node.y - 10;
		new_one.rotationX = this.node.rotationX;
		new_one.rotationY = this.node.rotationY;
		new_one.addComponent(cc.Sprite);
		new_one._components[0]._spriteFrame = this.node._components[0]._spriteFrame;		
		new_one.parent = this.node.parent;
		new_one.setAnchorPoint(0, 0);		
		cc.log(new_one);		
	},
	
	genOrangeL () {
		cc.log('orangeL');
		var new_one = new cc.Node(this.node.name + '_new');
		new_one.x = this.node.x + 10;
		new_one.y = this.node.y - 10;
		new_one.rotationX = this.node.rotationX;
		new_one.rotationY = this.node.rotationY;
		new_one.addComponent(cc.Sprite);
		new_one._components[0]._spriteFrame = this.node._components[0]._spriteFrame;		
		new_one.parent = this.node.parent;
		new_one.setAnchorPoint(0, 0);
		cc.log(new_one);		
	},
	
	genGreenT () {
		cc.log('greenT');
		var new_one = new cc.Node(this.node.name + '_new');
		new_one.x = this.node.x + 10;
		new_one.y = this.node.y - 10;
		new_one.rotationX = this.node.rotationX;
		new_one.rotationY = this.node.rotationY;
		new_one.addComponent(cc.Sprite);
		new_one._components[0]._spriteFrame = this.node._components[0]._spriteFrame;		
		new_one.parent = this.node.parent;
		new_one.setAnchorPoint(0, 0);
		cc.log(new_one);		
	},
	
	genPurpleO () {
		cc.log('purpleO');
		var new_one = new cc.Node(this.node.name + '_new');
		new_one.x = this.node.x + 10;
		new_one.y = this.node.y - 10;
		new_one.rotationX = this.node.rotationX;
		new_one.rotationY = this.node.rotationY;
		new_one.addComponent(cc.Sprite);
		new_one._components[0]._spriteFrame = this.node._components[0]._spriteFrame;		
		new_one.parent = this.node.parent;
		new_one.setAnchorPoint(0, 0);
		cc.log(new_one);		
	},
});
