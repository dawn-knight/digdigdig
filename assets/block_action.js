var newBlkActionInstance = new (require('block_action2'));
var newBlkAction = require('block_action2');

cc.Class({
    extends: cc.Component,

    properties: {
		mouseDownTime: 0,
		rotatedByYAxis: true,
		mouseDown: false,
		// moved: false,
		newBlksGen: false,
		texture: {
			default: null,
			type: cc.SpriteFrame
		}		
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		if (this.node.name.endsWith('_new'))
			return;
		
		this.node.on('mouseup', function(event) {
			this.mouseDown = false;
			
			// if (!this.moved) {
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
			// } else {
				// this.moved = false;
			// }
			
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
					this.genNewBlks();
					this.newBlksGen = true;
				}
			}
		}, this);
	},

    start () {

    },

    // update (dt) {},
	
	genNewBlks () {
		var new_one = new cc.Node(this.node.name + '_new');
		new_one.width = this.node.width;
		new_one.height = this.node.height;
		for(var i = 0; i < 4; i++) {
			var new_sub_node = new cc.Node(this.node.name + '_new_sub' + i);
			new_sub_node.setAnchorPoint(0, 0);
			new_sub_node.parent = new_one;
			var texture = new_sub_node.addComopnent(cc.Sprite);
			texture = this.texture;
		}
		new_one.x = this.node.x - 10;
		new_one.y = this.node.y - 10;
		new_one.rotationX = this.node.rotationX;
		new_one.rotationY = this.node.rotationY;
		new_one.addComponent(cc.Sprite);
		new_one._components[0]._spriteFrame = this.node._components[0]._spriteFrame;
		new_one.addComponent(newBlkAction);
		new_one.parent = this.node.parent;
		
	},
});
