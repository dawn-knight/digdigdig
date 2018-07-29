cc.Class({
    extends: cc.Component,

    properties: {
		spriteFrame1: {
			default: null,
			type: cc.SpriteFrame
		},
		spriteFrame2: {
			default: null,
			type: cc.SpriteFrame
		},
		red: {
			default: null,
			type: cc.SpriteFrame,
			shape: 'i'
		},
		yellow: {
			default: null,
			type: cc.SpriteFrame,
			shape: 'z'
		},
		orange: {
			default: null,
			type: cc.SpriteFrame,
			shape: 'l'
		},
		green: {
			default: null,
			type: cc.SpriteFrame,
			shape: 't'
		},
		purple: {
			default: null,
			type: cc.SpriteFrame,
			shape: 'o'
		}
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		// this.randomGenNodes(this);
		this.genLayerWithFourBlocksShape(this);
	},

    start () {
		
    },

    // update (dt) {},
	
	randomGenNodes(obj) {
		cc.log(obj);
		
		var width = obj.node.width;
		var height = obj.node.height;
		var max_col_num = parseInt((width / 50));
		var max_row_num = parseInt((height / 50));
		cc.log('max_col_num: ' + max_col_num);
		cc.log('max_row_num: ' + max_row_num);
		
		for (var i = 0; i < max_row_num; i++) {
			var current_col_num = Math.floor(Math.random() * (max_col_num + 1))
			cc.log('current_col_num of row' + i + ': ' + current_col_num);
			
			var disabled_num = 0;
			var enabled_num = 0;
			for (var j = 0; j < max_col_num; j++) {
				if (enabled_num == current_col_num) {
					break;
				}
				
				var disable = (Math.floor(Math.random() * 2) == 0);
				if (disable) {
					disabled_num++;
				}
				
				if (disabled_num > (max_col_num - current_col_num)) {
					disable = false;
				}
				
				cc.log(disable ? 'disable' : 'enable')
				
				if (!disable) {
					enabled_num++;
					
					var node = new cc.Node(i + '_' + j);
					var texture = node.addComponent(cc.Sprite);
					var random_texture_id = Math.floor(Math.random() * 2);
					if (random_texture_id == 0) {
						texture.spriteFrame = obj.spriteFrame1;
					} else {
						texture.spriteFrame = obj.spriteFrame2;
					}
					node.setAnchorPoint(0, 0);
					node.x = j * 50;
					node.y = (max_row_num - i - 1) * 50;
					node.parent = obj.node;
				}
			}
		}		
	},
	
	genLayerWithFourBlocksShape(obj) {
		var width = obj.node.width;
		var height = obj.node.height;
		var max_col_num = parseInt((width / 50));
		var max_row_num = parseInt((height / 50));
		cc.log('max_col_num: ' + max_col_num);
		cc.log('max_row_num: ' + max_row_num);
		
		var occupationMap = new Object();
		occupationMap.totalInspectedTimes = 0;
		occupationMap.map = null;
		cc.log(occupationMap);
		
		occupationMap.map = new Array(max_row_num);
		for (var i = 0; i < occupationMap.map.length; i++) {
			var detail = new Array(max_col_num);
			for(var j = 0; j < detail.length; j++) {
				detail[j] = {occupied:false, inspected:0};
			}
			occupationMap.map[i] = detail;
		}
		var inspected_times_limit = max_col_num * max_row_num;
		
		var first_pos_idx = {x:0, y:0}
		first_pos_idx.x = Math.floor(Math.random() * max_col_num);
		first_pos_idx.y = Math.floor(Math.random() * max_row_num);
		cc.log('x: ' + first_pos_idx.x);
		cc.log('y: ' + first_pos_idx.y);
		cc.log('[' + first_pos_idx.y + '][' + first_pos_idx.x + '] -> ' + occupationMap.map[first_pos_idx.y][first_pos_idx.x].occupied + ', ' + occupationMap.map[first_pos_idx.y][first_pos_idx.x].inspected);
		// 不管最终是否使用该坐标点，标记该坐标点为已检视，总检视次数加1
		if (occupationMap.map[first_pos_idx.y][first_pos_idx.x].inspected == 0) {
			occupationMap.map[first_pos_idx.y][first_pos_idx.x].inspected = 1;
			occupationMap.totalInspectedTimes++;
			cc.log('totalInspectedTimes: ' + occupationMap.totalInspectedTimes);
		}		
		var occupied = occupationMap.map[first_pos_idx.y][first_pos_idx.x].occupied;
		while (occupied && occupationMap.totalInspectedTimes < inspected_times_limit) {			
			first_pos_idx.x = Math.floor(Math.random() * max_col_num);
			first_pos_idx.y = Math.floor(Math.random() * max_row_num);
			cc.log('x: ' + first_pos_idx.x);
			cc.log('y: ' + first_pos_idx.y);
			cc.log('[' + first_pos_idx.y + '][' + first_pos_idx.x + '] -> ' + occupationMap.map[first_pos_idx.y][first_pos_idx.x].occupied + ', ' + occupationMap.map[first_pos_idx.y][first_pos_idx.x].inspected);
			// 不管最终是否使用该坐标点，标记该坐标点为已检视，总检视次数加1
			if (occupationMap.map[first_pos_idx.y][first_pos_idx.x].inspected == 0) {
				occupationMap.map[first_pos_idx.y][first_pos_idx.x].inspected = 1;
				occupationMap.totalInspectedTimes++;
				cc.log('totalInspectedTimes: ' + occupationMap.totalInspectedTimes);
			}			
			occupied = occupationMap.map[first_pos_idx.y][first_pos_idx.x].occupied;
		}
	},
	
	/*
		下一个坐标需满足的条件：
		1 不越界
		2 与已有坐标不同
		3 未使用
	*/
	getNextPosIdx(pos_idx_arr) {
		if (Array.isArray(pos_idx_arr)) {
			var i = 0;
			var inspected_pos_idx_arr = new Array(pos_idx_arr.length);
			while (i < pos_idx_arr.length) {
				var random_start_idx = Math.floor(Math.random() * pos_idx_arr.length);
				if (!inspected_pos_idx_arr.includes(random_start_idx)) {
					var j = 0;
					var inspected_direction_arr = new Array(4);
					while (j < 4) {
						var random_direction = Math.floor(Math.random() * 4);
						if (!inspected_direction_arr.includes(random_direction)) {
							var next_pos_idx = moveRandom(random_start_idx, pos_idx_arr, random_direction);
							if (next_pos_idx.x != -1 && next_pos_idx.y != -1) {
								return next_pos_idx;
							}
							inspected_direction_arr.push(random_direction);
							j++;
						}
					}
					inspected_pos_idx_arr.push(random_start_idx);
					i++;
				}
			}
			return {x:-1, y:-1};
		} else {
			return {x:-1, y:-1};
		}
	},
	
	moveRandom(random_start_idx, pos_idx_arr, random_direction) {
		if (random_direction == 0) {
			// move right
		} else if (random_direction == 1) {
			// move down
		} else if (random_direction == 2) {
			// move left
		} else if (random_direction == 3) {
			// move up
		}
	}
});
