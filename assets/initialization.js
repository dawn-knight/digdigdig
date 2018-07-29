cc.Class({
    extends: cc.Component,

    properties: {
		spriteFrame: {
			default: null,
			type: cc.SpriteFrame
		}
    },

    onLoad () {
		// var self = this;

		// cc.loader.loadRes("avatar", cc.SpriteFrame, function (error, spriteFrame) {
			// self.spriteFrame = spriteFrame;
			// cc.log("loaded");
		// });
	},

    start () {
		// cc.log(this.node.width + ", " + this.node.height);
		var node = new cc.Node('cube');
		var sp = node.addComponent(cc.Sprite);
		sp.spriteFrame = this.spriteFrame;
		node.x = -((this.node.width / 2).toFixed(0) - (node.width / 2).toFixed(0));
		node.y = (this.node.height / 2).toFixed(0) - (node.width / 2).toFixed(0);
		node.parent = this.node;
		cc.log(node.getPosition());
		
		var node2 = new cc.Node('cube');
		var sp2 = node2.addComponent(cc.Sprite);
		sp2.spriteFrame = this.spriteFrame;
		node2.x = -((this.node.width / 2).toFixed(0) - (node.width / 2 * 3).toFixed(0));
		node2.y = (this.node.height / 2).toFixed(0) - (node2.width / 2).toFixed(0);
		node2.parent = this.node;
		cc.log(node2.getPosition());		
    },

    // update (dt) {},
});
