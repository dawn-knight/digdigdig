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
		},
		occupationMapoccupationMap: {
			default: null
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
		
		this.occupationMap = new Object();
		this.occupationMap.totalInspectedTimes = 0;
		this.occupationMap.map = null;
		cc.log(this.occupationMap);
		
		this.occupationMap.map = new Array(max_row_num);
		for (var i = 0; i < this.occupationMap.map.length; i++) {
			var detail = new Array(max_col_num);
			for(var j = 0; j < detail.length; j++) {
				detail[j] = {occupied:false, inspected:0};
			}
			this.occupationMap.map[i] = detail;
		}
		var inspected_times_limit = max_col_num * max_row_num;
		
		var first_pos_idx_vec = {x:0, y:0}
		first_pos_idx_vec.x = Math.floor(Math.random() * max_col_num);
		first_pos_idx_vec.y = Math.floor(Math.random() * max_row_num);
		cc.log(first_pos_idx_vec);
		cc.log('[' + first_pos_idx_vec.y + '][' + first_pos_idx_vec.x + '] -> ' + this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].occupied + ', ' + this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].inspected);
		// 不管最终是否使用该坐标点，标记该坐标点为已检视，总检视次数加1
		if (this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].inspected == 0) {
			this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].inspected = 1;
			this.occupationMap.totalInspectedTimes++;
			cc.log('totalInspectedTimes: ' + this.occupationMap.totalInspectedTimes);
		}		
		var occupied = this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].occupied;
		while (occupied && this.occupationMap.totalInspectedTimes < inspected_times_limit) {			
			first_pos_idx_vec.x = Math.floor(Math.random() * max_col_num);
			first_pos_idx_vec.y = Math.floor(Math.random() * max_row_num);
			cc.log(first_pos_idx_vec);
			cc.log('[' + first_pos_idx_vec.y + '][' + first_pos_idx_vec.x + '] -> ' + this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].occupied + ', ' + this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].inspected);
			// 不管最终是否使用该坐标点，标记该坐标点为已检视，总检视次数加1
			if (this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].inspected == 0) {
				this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].inspected = 1;
				this.occupationMap.totalInspectedTimes++;
				cc.log('totalInspectedTimes: ' + this.occupationMap.totalInspectedTimes);
			}			
			occupied = this.occupationMap.map[first_pos_idx_vec.y][first_pos_idx_vec.x].occupied;
		}
		
		var pos_idx_vec_arr = new Array();
		cc.log('declare');
		cc.log(pos_idx_vec_arr);
		cc.log(pos_idx_vec_arr.length);
		pos_idx_vec_arr.push(first_pos_idx_vec);
		cc.log('first push');
		cc.log(pos_idx_vec_arr);
		cc.log(pos_idx_vec_arr.length);
		var second_pos_idx_vec = this.getNextPosIdxVec(pos_idx_vec_arr);
		cc.log(second_pos_idx_vec);
		pos_idx_vec_arr.push(second_pos_idx_vec);
		cc.log('second push');
		cc.log(pos_idx_vec_arr);
		cc.log(pos_idx_vec_arr.length);		
		var third_pos_idx_vec = this.getNextPosIdxVec(pos_idx_vec_arr);
		cc.log(third_pos_idx_vec);
		pos_idx_vec_arr.push(third_pos_idx_vec);
		cc.log('third push');
		cc.log(pos_idx_vec_arr);
		cc.log(pos_idx_vec_arr.length);
		var fourth_pos_idx_vec = this.getNextPosIdxVec(pos_idx_vec_arr);
		cc.log(fourth_pos_idx_vec);
		pos_idx_vec_arr.push(fourth_pos_idx_vec);
		cc.log('fourth push');
		cc.log(pos_idx_vec_arr)
		cc.log(pos_idx_vec_arr.length);
		
		for (var i = 0; i < pos_idx_vec_arr.length; i++) {
			var node = new cc.Node(i);
			var texture = node.addComponent(cc.Sprite);
			texture.spriteFrame = obj.red;
			node.setAnchorPoint(0, 0);
			node.x = pos_idx_vec_arr[i].x * 50;
			node.y = pos_idx_vec_arr[i].y * 50;
			node.parent = obj.node;
			cc.log(node);
		}
	},
	
	/*
		下一个坐标需满足的条件：
		1 不越界
		2 与已有坐标不同
		3 未使用
	*/
	getNextPosIdxVec(pos_idx_vec_arr) {
		cc.log('get next pos idx vec from ...');
		cc.log(pos_idx_vec_arr);
		if (Array.isArray(pos_idx_vec_arr)) {
			var i = 0;
			var inspected_vec_arr_idx = new Array(pos_idx_vec_arr.length);
			while (i < pos_idx_vec_arr.length) {
				var rnd_vec_arr_idx = Math.floor(Math.random() * pos_idx_vec_arr.length);
				cc.log('index: ' + rnd_vec_arr_idx);
				if (!inspected_vec_arr_idx.includes(rnd_vec_arr_idx)) {
					var j = 0;
					var inspected_direction_arr = new Array(4);
					while (j < 4) {
						var rnd_dir = Math.floor(Math.random() * 4);
						if (!inspected_direction_arr.includes(rnd_dir)) {
							var nxt_pos_idx_vec = this.moveRandom(rnd_vec_arr_idx, pos_idx_vec_arr, rnd_dir);
							if (nxt_pos_idx_vec.x != -1 && nxt_pos_idx_vec.y != -1) {
								return nxt_pos_idx_vec;
							}
							inspected_direction_arr.push(rnd_dir);
							j++;
						}
					}
					inspected_vec_arr_idx.push(rnd_vec_arr_idx);
					i++;
				}
			}
			return {x:-1, y:-1};
		} else {
			return {x:-1, y:-1};
		}
	},
	
	moveRandom(rnd_vec_arr_idx, pos_idx_vec_arr, rnd_dir) {
		cc.log('dir: ' + rnd_dir);
		var boundary = -1;
		var value_to_check;
		if (rnd_dir == 0) {
			// move right
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].x++;
			boundary = 15; // 之后用变量替代
		} else if (rnd_dir == 1) {
			// move down
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].y--;
			boundary = 0; // 之后用变量替代
		} else if (rnd_dir == 2) {
			// move left
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].x--;
			boundary = 0; // 之后用变量替代
		} else if (rnd_dir == 3) {
			// move up
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].y++;
			boundary = 20; // 之后用变量替代
		}
		
		if (this.isOverBoundary(value_to_check, boundary)) 
			return {x:-1, y:-1};
		
		if (this.isDuplicated(rnd_vec_arr_idx, pos_idx_vec_arr))
			return {x:-1, y:-1};
		
		if (this.isOccupied(pos_idx_vec_arr[rnd_vec_arr_idx]))
			return {x:-1, y:-1};
		
		cc.log(pos_idx_vec_arr[rnd_vec_arr_idx]);
		return {x:pos_idx_vec_arr[rnd_vec_arr_idx].x, y:pos_idx_vec_arr[rnd_vec_arr_idx].y}
	},
	
	isOverBoundary(value_to_check, boundary) {
		if (boundary == 0) {
			if (value_to_check <= boundary)
				return true;
		} else {
			if (value_to_check >= boundary)
				return true;
		}
		return false;
	},
	
	isDuplicated(rnd_vec_arr_idx, pos_idx_vec_arr) {
		for (var i = 0; i < pos_idx_vec_arr.length; i++) {
			if (i != rnd_vec_arr_idx) {
				if (pos_idx_vec_arr[rnd_vec_arr_idx].x == pos_idx_vec_arr[i].x && pos_idx_vec_arr[rnd_vec_arr_idx].y == pos_idx_vec_arr[i].y) {
					return true;
				}
			}
		}
		return false;
	},
	
	isOccupied(pos_idx_vec) {
		return this.occupationMap.map[pos_idx_vec.y][pos_idx_vec.x].occupied;
	},
});
