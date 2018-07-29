cc.Class({
    extends: cc.Component,

    properties: {
		mouse_left_down: false,
		moved: false,
		cube_position_list: [],
		overlapped: false,
		bg_pos: cc.v2(0, 0),
		rect_node: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		// have no effect here, maybe this object is not fully initialized
		// var cubes = this.node.parent.children[0].children;
		// var cube_position_list = [];
		// for (var i in cubes) {
			// cc.log('pos: ' + cubes[i].getPosition());
			// this.cube_position_list.push(cubes[i].getPosition());
		// }
		
		this.node.on('mousedown', function(event) {
			this.mouse_left_down = true;
		}, this);

		this.node.on('mousemove', function(event) {
			if (this.mouse_left_down) {
				this.node.x = event.getLocationX();
				this.node.y = event.getLocationY();
				this.moved = true;
				for (var i = 0; i < this.cube_position_list.length; i++) {
					var pos_diff = this.node.getPosition().sub(this.bg_pos);
					if (Math.abs((pos_diff.x.toFixed(0) - this.cube_position_list[i].x)) < 10 && Math.abs((pos_diff.y.toFixed(0) - this.cube_position_list[i].y)) < 10) {
						this.overlapped = true;
						break;
					}
				}
			}
		}, this);

		this.node.on('mouseup', function(event) {
			this.mouse_left_down = false;
			if (!this.moved) {
				this.node.rotation += 90;
			}
			if (this.moved) {
				this.moved = false;
				cc.log(this.node.getPosition().sub(this.bg_pos));
				if (this.overlapped) {
					cc.log('perfect overlapped');
					var ctx = this.rect_node.getComponent(cc.Graphics);
					var rect_start_x = (this.node.getPosition().x - this.node.width / 2).toFixed(0);
					cc.log('original rect start x:' + rect_start_x);
					var rect_start_y = (this.node.getPosition().y - this.node.height / 2).toFixed(0);
					cc.log('original rect start y:' + rect_start_y);
					// ctx.rect((this.node.getPosition().x - this.node.width / 2).toFixed(0), (this.node.getPosition().y - this.node.height / 2).toFixed(0), this.node.width, this.node.height);
					ctx.rect(300, 1000, this.node.width, this.node.height);
					ctx.stroke();
					cc.log(ctx);
				} else {
					cc.log('not close');
				}				
			}
		}, this);		
	},

    start () {
		this.rect_node = this.bg_pos = this.node.parent.children[2];
		var cubes = this.node.parent.children[0].children;
		for (var i in cubes) {
			cc.log('pos: ' + cubes[i].getPosition());
			this.cube_position_list.push(cubes[i].getPosition());
		}
		this.bg_pos = this.node.parent.children[0].getPosition();
		// cc.log('x = ' + this.node.x + ', y = ' + this.node.y); 
		// this.node.x = (this.node.width / 2).toFixed(0);
		// this.node.y = (this.node.height / 2).toFixed(0);
    },

    // update (dt) {},
});
