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
		// cc.log(first_pos_idx_vec);
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
		pos_idx_vec_arr.push(first_pos_idx_vec);
		var second_pos_idx_vec = this.getNextPosIdxVec(pos_idx_vec_arr);
		pos_idx_vec_arr.push(second_pos_idx_vec);
		var third_pos_idx_vec = this.getNextPosIdxVec(pos_idx_vec_arr);
		pos_idx_vec_arr.push(third_pos_idx_vec);
		var fourth_pos_idx_vec = this.getNextPosIdxVec(pos_idx_vec_arr);
		pos_idx_vec_arr.push(fourth_pos_idx_vec);
		
		cc.log(pos_idx_vec_arr);
		
		var color = this.getColor(pos_idx_vec_arr);
		
		for (var i = 0; i < pos_idx_vec_arr.length; i++) {
			var node = new cc.Node(i);
			var texture = node.addComponent(cc.Sprite);
			texture.spriteFrame = color;
			node.setAnchorPoint(0, 0);
			node.x = pos_idx_vec_arr[i].x * 50;
			node.y = pos_idx_vec_arr[i].y * 50;
			node.parent = obj.node;
			// cc.log(node);
		}
	},
	
	/*
		下一个坐标需满足的条件：
		1 不越界
		2 与已有坐标不同
		3 未使用
	*/
	getNextPosIdxVec(pos_idx_vec_arr) {
		if (Array.isArray(pos_idx_vec_arr)) {
			var i = 0;
			var inspected_vec_arr_idx = new Array(pos_idx_vec_arr.length);
			while (i < pos_idx_vec_arr.length) {
				var rnd_vec_arr_idx = Math.floor(Math.random() * pos_idx_vec_arr.length);
				// cc.log('index: ' + rnd_vec_arr_idx);
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
		// cc.log('move from pos below');
		// cc.log(pos_idx_vec_arr[rnd_vec_arr_idx]);
		// cc.log('dir: ' + rnd_dir);
		var boundary = -1;
		var value_to_check;
		if (rnd_dir == 0) {
			// move right
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].x + 1;
			boundary = 15; // 之后用变量替代
		} else if (rnd_dir == 1) {
			// move down
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].y - 1;
			boundary = 0; // 之后用变量替代
		} else if (rnd_dir == 2) {
			// move left
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].x - 1;
			boundary = 0; // 之后用变量替代
		} else if (rnd_dir == 3) {
			// move up
			value_to_check = pos_idx_vec_arr[rnd_vec_arr_idx].y + 1;
			boundary = 20; // 之后用变量替代
		}
		
		if (this.isOverBoundary(value_to_check, boundary)) 
			return {x:-1, y:-1};
		
		if (rnd_dir == 0 || rnd_dir == 2) {
			var pos_idx_vec_to_return = {x:value_to_check, y:pos_idx_vec_arr[rnd_vec_arr_idx].y};
			if (!this.isDuplicated(pos_idx_vec_to_return, pos_idx_vec_arr) && !this.isOccupied(pos_idx_vec_to_return))
				return pos_idx_vec_to_return;
			else
				return {x:-1, y:-1};
		}
		
		if (rnd_dir == 1 || rnd_dir == 3) {
			var pos_idx_vec_to_return = {x:pos_idx_vec_arr[rnd_vec_arr_idx].x, y:value_to_check};
			if (!this.isDuplicated(pos_idx_vec_to_return, pos_idx_vec_arr) && !this.isOccupied(pos_idx_vec_to_return))
				return pos_idx_vec_to_return;
			else
				return {x:-1, y:-1};
		}
	},
	
	isOverBoundary(value_to_check, boundary) {
		if (boundary == 0) {
			if (value_to_check < boundary)
				return true;
		} else {
			if (value_to_check >= boundary)
				return true;
		}
		return false;
	},
	
	isDuplicated(pos_idx_vec_to_return, pos_idx_vec_arr) {
		for (var i = 0; i < pos_idx_vec_arr.length; i++) {
			if (pos_idx_vec_to_return.x == pos_idx_vec_arr[i].x && pos_idx_vec_to_return.y == pos_idx_vec_arr[i].y) {
				return true;
			}
		}
		return false;
	},
	
	isOccupied(pos_idx_vec) {
		return this.occupationMap.map[pos_idx_vec.y][pos_idx_vec.x].occupied;
	},
	
	getColor(pos_idx_vec_arr) {
		var x_arr = new Array();
		var y_arr = new Array();
		for (var i = 0; i < pos_idx_vec_arr.length; i++) {
			x_arr.push(pos_idx_vec_arr[i].x);
			y_arr.push(pos_idx_vec_arr[i].y);
		}
		
		if (this.isI(x_arr, y_arr)) {
			cc.log('I, red');
			return this.red;
		} else {
			cc.log('not I');
		}
		
		if (this.isZ(x_arr, y_arr)) {
			cc.log('Z, yellow');
			return this.yellow;
		} else {
			cc.log('not Z');
		}

		if (this.isL(x_arr, y_arr)) {
			cc.log('L, orange');
			return this.orange;
		} else {
			cc.log('not L');
		}

		if (this.isT(x_arr, y_arr)) {
			cc.log('T, green');
			return this.green;
		} else {
			cc.log('not T');
		}

		if (this.isO(x_arr, y_arr)) {
			cc.log('O, purple');
			return this.purple;
		} else {
			cc.log('not O');
		}		
	},
	
	isI(x_arr, y_arr) {
		var all_x_same = true;
		for (var i = 0; i < x_arr.length - 1; i++) {
			if (x_arr[i] != x_arr[i + 1]) {
				all_x_same = false;
				break;
			}
		}
		
		var all_y_same = true;
		for (var i = 0; i < y_arr.length - 1; i++) {
			if (y_arr[i] != y_arr[i + 1]) {
				all_y_same = false;
				break;
			}
		}

		return (all_x_same || all_y_same);
	},
	
	isZ(x_arr, y_arr) {
		if ((x_arr[0] == x_arr[1]) && (x_arr[2] == x_arr[3]) && (Math.abs(x_arr[2] - x_arr[1]) == 1) && (Math.abs(x_arr[0] - x_arr[3]) == 2)) {
			return true;
		}
		
		if ((y_arr[0] == y_arr[1]) && (y_arr[2] == y_arr[3]) && (Math.abs(y_arr[2] - y_arr[1]) == 1) && (Math.abs(y_arr[0] - y_arr[3]) == 2)) {
			return true;
		}
		
		return false;
	},
	
	isL(x_arr, y_arr) {
		if ((x_arr[0] == x_arr[1]) && (x_arr[1] == x_arr[2])) {
			var max_x_idx = 0; // 不是最大的 是最大或者最小的，需要修改
			for (var i = 0; i < x_arr.length - 1; i++) {
				if (x_arr[i + 1] > x_arr[i]) {
					max_x_idx = i + 1;
				}
			}
			
			if (!((Math.abs(x_arr[max_x_idx] - x_arr[1]) == 1) && (y_arr[max_x_idx] == y_arr[1]))) {
				return true;
			}
		}
		
		if ((y_arr[0] == y_arr[1]) && (y_arr[1] == y_arr[2])) {
			var max_y_idx = 0;
			for (var i = 0; i < y_arr.length - 1; i++) {
				if (y_arr[i + 1] > y_arr[i]) {
					max_y_idx = i + 1;
				}
			}			
			
			if (!((Math.abs(y_arr[max_y_idx] - y_arr[1]) == 1) && (x_arr[max_y_idx] == x_arr[1]))) {
				return true;
			}			
		}
		
		return false;
	},
	
	isT(x_arr, y_arr) {
		if ((x_arr[0] == x_arr[1]) && (x_arr[1] == x_arr[2])) {
			var max_x_idx = 0;
			for (var i = 0; i < x_arr.length - 1; i++) {
				if (x_arr[i + 1] > x_arr[i]) {
					max_x_idx = i + 1;
				}
			}			
			
			if ((Math.abs(x_arr[max_x_idx] - x_arr[1]) == 1) && (y_arr[max_x_idx] == y_arr[1])) {
				return true;
			}			
		}
		
		if ((y_arr[0] == y_arr[1]) && (y_arr[1] == y_arr[2])) {
			var max_y_idx = 0;
			for (var i = 0; i < y_arr.length - 1; i++) {
				if (y_arr[i + 1] > y_arr[i]) {
					max_y_idx = i + 1;
				}
			}			
			
			if ((Math.abs(y_arr[max_y_idx] - y_arr[1]) == 1) && (x_arr[max_y_idx] == x_arr[1])) {
				return true;
			}				
		}
		
		return false;	
	},
	
	isO(x_arr, y_arr) {
		var min_x = 14; // 之后用变量替代
		var min_y = 19; // 之后用变量替代
		var max_x = 0;
		var max_y = 0;
		for (var i = 0; i < x_arr.length; i++) {
			if (x_arr[i] < min_x)
				min_x = x_arr[i];
			
			if (x_arr[i] > max_x)
				max_x = x_arr[i];
		}
		for (var i = 0; i < y_arr.length; i++) {
			if (y_arr[i] < min_y)
				min_y = y_arr[i];			
			
			if (y_arr[i] > max_y)
				max_y = y_arr[i];
		}

		var sqrt = Math.sqrt(x_arr.length); // y_arr the same
		
		if ((max_x - min_x == sqrt - 1) && (max_y - min_y == sqrt - 1))
			return true;
		
		return false;
	},
});
