﻿// Rexjs 的实现
new function(window, descriptor, defineProperty, getPrototypeOf, setPrototypeOf, getOwnPropertyNames){
"use strict";

this.Rexjs = function(Function, create, getProperties, setPrototypeOf){
	/**
	 * 创建一个继承至指定父类的子类
	 * @param {Function} constructor - 构造函数
	 * @param {Rexjs} _SuperClass - 需要继承的父类
	 */
	return function Rexjs(constructor, _SuperClass){
		var __proto__, prototype, properties = getProperties(constructor);

		// 判断父类类型
		switch(
			typeof _SuperClass
		){
			// 如果是函数
			case "function":
				__proto__ = _SuperClass;
				prototype = _SuperClass.prototype;
				break;

			// 如果是 undefined
			case "undefined":
				__proto__ = Rexjs.getOwnPrototype();
				prototype = this.getOwnClass().prototype;
				break;

			// 默认
			default:
				__proto__ = create(null, properties);
				prototype = null;
				break;
		}

		// 设置 __proto__
		setPrototypeOf(constructor, __proto__);

		// 设置 prototype
		constructor.prototype = create(prototype, properties);
		// 返回类的构造函数
		return constructor;
	};
}(
	Function,
	Object.create,
	// getProperties
	function(constructor){
		return {
			constructor: {
				value: constructor,
				configurable: true,
				writable: true
			}
		};
	},
	// setPrototypeOf
	setPrototypeOf || (
		descriptor ?
			function(obj, prototype){
				// 兼容 ： IE10
				descriptor.set.call(obj, prototype);
			} :
			function(obj, prototype){
				// 兼容 ： IE9、Android
				do {
					getOwnPropertyNames(
						prototype
					)
					.forEach(function(name){
						if(
							obj.hasOwnProperty(name)
						){
							return;
						}

						obj[name] = prototype[name];
					});

					prototype = getPrototypeOf(prototype);
				}
				while(
					prototype
				);
			}
	)
);

this.value = function(Rexjs){
	return new Rexjs(Rexjs, null);
}(
	this.Rexjs
);

defineProperty(window, "Rexjs", this);
}(
	window,
	// descriptor
	Object.getOwnPropertyDescriptor(
		Object.prototype,
		"__proto__"
	),
	Object.defineProperty,
	Object.getPrototypeOf,
	Object.setPrototypeOf,
	Object.getOwnPropertyNames
);


// 原型链属性的定义
new function(Function, prototype, propertyIsEnumerable, hasOwnProperty, isPrototypeOf, getPrototypeOf, defineProperty, getOwnPropertyDescriptor, definePrototype){
"use strict";

this.hasOwnProperty = hasOwnProperty;

this.isPrototypeOf = isPrototypeOf;

this.propertyIsEnumerable = propertyIsEnumerable;

this.assign = function(){
	/**
	 * 给该类的属性赋值
	 * @param {Object} props - 包含一个或多个属性的键值对
	 */
	return function(props){
		// 遍历属性
		for(
			var name in props
		){
			var val = props[name];

			// 如果值是 undefined
			if(
				val === void 0
			){
				continue;
			}

			// 设置属性
			this[name] = val;
		}
	};
}();

this.getSuperClass = function(getPrototypeOf){
	/**
	 * 获取父类
	 */
	return function(){
		return getPrototypeOf(
				this.getOwnClass()
					.prototype
			)
			.constructor;
	};
}(
	Object.getPrototypeOf
);

this.constructor = function(constructor, assign, call, apply, bind, toString, getOwnPrototype, defineProperties){
	defineProperties(
		definePrototype(
			// 兼容 ： IE9、IE10、Android
			getOwnPrototype.call(constructor)
		),
		{
			apply: apply,
			assign: assign,
			bind: bind,
			call: call,
			getOwnPrototype: getOwnPrototype,
			/**
			 * 获取父类
			 */
			getSuperClass: function(){
				return this.prototype.getSuperClass();
			},
			/**
			 * 将一个或多个属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 */
			props: function(props){
				defineProperties(this.prototype, props);
			},
			/**
			 * 将一个或多个静态属性添加到该类，并/或修改现有属性的特性
			 * @param {Object} props - 包含一个或多个属性的键值对
			 */
			static: function(props){
				defineProperties(this, props);
			},
			/**
			 * 对象字符串
			 */
			toString: function(){
				return "function " + this.name + "() { native code }";
			}
		}
	);

	return constructor;
}(
	prototype.constructor,
	this.assign,
	Function.prototype.call,
	Function.prototype.apply,
	Function.prototype.bind,
	Function.prototype.toString,
	// getOwnPrototype
	function(){
		return this instanceof Function ? this : getPrototypeOf(this);
	},
	// defineProperties
	function(obj, props){
		for(
			var name in props
		){
			var descriptor = getOwnPropertyDescriptor(props, name);

			descriptor.enumerable = false;

			defineProperty(obj, name, descriptor);
		}
	}
);

this.getOwnClass = function(){
	/**
	 * 获取自身类
	 */
	return function(){
		return this.constructor;
	};
}();

this.toString = function(){
	/**
	 * 对象字符串
	*/
	return function(){
		return "[Rexjs " + this.constructor.name + "]";
	};
}();

this.toLocaleString = function(toString){
	/**
	 * 对象本地字符串
	 */
	return function(){
		return toString.call(this);
	};
}(
	this.toString
);

this.valueOf = function(){
	/**
	 * 获取当前对象的值
	*/
	return function(){
		return this;
	};
}();

prototype
	.constructor
	.static
	.call(
		definePrototype(prototype),
		this
	);
}(
	Function,
	Rexjs.prototype,
	Object.prototype.propertyIsEnumerable,
	Object.prototype.hasOwnProperty,
	Object.prototype.isPrototypeOf,
	Object.getPrototypeOf,
	Object.defineProperty,
	Object.getOwnPropertyDescriptor,
	// definePrototype
	function(obj){
		/*
			考虑到ES6初稿已经将 __proto__ 属性移除标准，所以在支持ES6的情况下，就不做处理；
			再者，IE10及以下也没有 __proto__ 属性，也不用处理；
			最后，就算其他支持 __proto__ 属性的浏览器，不定义 __proto__ 也没关系，
			通过 Object.getPrototypeO f方法一样可以获取，只不过在控制台里看不到 __proto__ 属性而已。
		*/
		if(
			!Object.prototype.hasOwnProperty("__proto__")
		){
			return obj;
		}

		Object.defineProperty(
			obj,
			"__proto__",
			Object.getOwnPropertyDescriptor(
				Object.prototype,
				"__proto__"
			)
		);

		return obj;
	}
);


// 基本方法和属性的定义
new function(Rexjs, Array){
"use strict";

this.except = function(){
	/**
	 * 返回一个不包含所有指定属性名称的对象
	 * @param {Object} obj - 需要排除属性的对象
	 * @param {Array} props - 需要排除的属性名称数组
	 */
	return function except(obj, props){
		var result = {};

		for(
			var name in obj
		){
			if(
				props.indexOf(name) > -1
			){
				continue;
			}

			result[name] = obj[name];
		}

		return result;
	};
}();

this.every = function(){
	/**
	 * 确定对象的所有成员是否满足指定的测试
	 * @param {*} obj - 需要测试成员的对象
	 * @param {Function} fn - 用于测试对象成员的测试函数
	 * @param {*} _this - 指定测试函数的 this 对象
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function every(obj, fn, _this, _arrayLike){
		// 如果是数组
		if(
			_arrayLike
		){
			for(
				var i = 0, n = obj.length;i < n;i++
			){
				// 调用测试函数
				if(
					fn.call(_this, obj[i], i, obj)
				){
					continue;
				}
				
				return false;
			}
		}
		else {
			// 遍历
			for(
				var name in obj
			){
				// 调用测试函数
				if(
					fn.call(_this, obj[name], name, obj)
				){
					continue;
				}
				
				return false;
			}
		}

		return true;
	};
}();

this.forEach = function(every){
	/**
	 * 遍历对象的所有成员并对其执行指定操作函数
	 * @param {*} obj - 需要遍历的对象
	 * @param {Function} fn - 指定操作的函数
	 * @param {*} _this - 指定操作函数的 this 对象
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function forEach(obj, fn, _this, _arrayLike){
		// 如果是数组
		if(
			_arrayLike
		){
			for(
				var i = 0, n = obj.length;i < n;i++
			){
				// 调用测试函数
				fn.call(_this, obj[i], i, obj)
			}
		}
		else {
			// 遍历
			for(
				var name in obj
			){
				// 调用测试函数
				fn.call(_this, obj[name], name, obj)
			}
		}
		
		return obj;
	};
}(
	this.every
);

this.isInstanceOf = function(getPrototypeOf){
	/**
	 * 判断对象是否为指定类构造函数的一级实例（即直接由该类实例化）
	 * @param {Object} obj - 用于判断的实例对象
	 * @param {Function} constructor - 指定的类的构造函数
	 */
	return function isInstanceOf(obj, constructor){
		return getPrototypeOf(obj) === constructor.prototype;
	};
}(
	Object.getPrototypeOf
);

this.map = function(forEach){
	/**
	 * 遍历对象的所有成员并对其执行指定操作函数，取其返回值作为新对象集合的同名值，最后返回此新对象
	 * @param {Object} obj - 需要遍历的对象
	 * @param {Function} fn - 指定操作的函数
	 * @param {*} _this - 指定操作函数的 this 对象
	 * @param {Boolean} _arrayLike - 对象是否是一种伪数组
	 */
	return function map(obj, fn, _this, _arrayLike){
		var result = new obj.constructor();

		// 遍历对象
		forEach(
			obj,
			function(value, name, obj){
				// 设置值为fn的返回值
				result[name] = fn.call(this, value, name, obj);
			},
			_this,
			_arrayLike
		);
		
		return result;
	};
}(
	this.forEach
);

this.set = function(){
	/**
	 * 添加或修改指定对象的属性
	 * @param {*} obj - 需要添加或修改属性的对象
	 * @param {Object} props - 需要添加或修改的属性集合
	 */
	return function set(obj, props){
		for(
			var name in props
		){
			obj[name] = props[name];
		}

		return obj;
	};
}();

this.toArray = function(slice){
	/**
	 * 将类似数组的对象转化为数组
	 * @param {Object} obj - 需要遍历的对象
	 * @param {Number} _start - 进行截取，截取的起始索引
	 * @param {Number} _end - 需要截取的末尾索引
	 */
	return function toArray(obj, _start, _end){
		return slice.call(obj, _start || 0, _end);
	};
}(
	Array.prototype.slice
);

this.toString = function(){
	/**
	 * 使函数在控制台里看起来像本地代码
	 */
	return function toString(){
		var name = this.name;

		if(
			name
		){
			return "function " + name + "() { [native code] }";
		}

		return "function (){ [native code] }";
	};
}();

this.forEach(
	this,
	function(property, name, self){
		// 如果属性是函数
		if(
			typeof property === "function"
		){
			// 将函数的 toString 设置为 self.toString，实现模拟 native code
			property.toString = self.toString;
		}

		// 如果不是函数，则直接设置属性
		this[name] = property;
	},
	Rexjs
);

}(
	Rexjs,
	Array
);


// 基于 Rexjs 的拓展类
new function(Rexjs, forEach){
"use strict";

// 列表相关
void function(isNaN){

this.List = function(Array, Object, toArray){
	/**
	 * 对列表进行管理、操作的类
	 */
	function List(_rest){};
	List = new Rexjs(List);

	List.props({
		/**
		 * 交替性取出集合索引值所符合的项
		 * @param {Number} num - 取模运算值
		 * @param {Number} _remainder - 余数
		 */
		alternate: function(num, _remainder){
			var list = [];

			_remainder = _remainder || 0;

			this.forEach(function(item, i){
				if(
					i % num === _remainder
				){
					list.push(item);
				}
			});
			
			return list;
		},
		/**
		 * 清空整个集合
		 */
		clear: function(){
			this.splice(0);
		},
		/**
		 * 在原列表上，合并另一个集合
		 * @param {List, Array} list - 另一个集合
		 */
		combine: function(list){
			this.push
				.apply(
				this,
				toArray(list)
			);
		},
		/**
		 * 对列表进行去重
		 */
		distinct: function(){
			this.splice(
					0
				)
				.forEach(
					function(item){
						if(
							this.indexOf(item) > -1
						){
							return;
						}

						this.push(item);
					},
					this
				);
		},
		/**
		 * 返回集合中偶数项集合
		 */
		even: function(){
			return this.alternate(2);
		},
		length: 0,
		/**
		 * 返回集合中奇数项集合
		 */
		odd: function(){
			return this.alternate(2, 1);
		}
	});

	Object
		.getOwnPropertyNames(
			Array.prototype
		)
		.forEach(
			function(name){
				if(
					List.prototype.hasOwnProperty(name)
				){
					return;
				}

				if(
					name === "toString"
				){
					return;
				}

				var props = {};

				props[name] = this[name];

				List.props(props);
			},
			Array.prototype
		);

	List.props({
		/**
		 * 合并另外一个数组，并返回合并后的新数组
		 * @param {Array} list - 另一个集合
		 */
		concat: function(array){
			return toArray(
					this
				)
				.concat(
					toArray(array)
				);
		}
	});

	return List;
}(
	Array,
	Object,
	Rexjs.toArray
);

}.call(
	this
);


// 语法标签相关
void function(){
	
this.SyntaxTag = function(TYPE_UNEXPECTED, parseInt, empty){
	/**
	 * 语法标签
	 * @param {Number} _type - 标签类型
	 */
	function SyntaxTag(_type){
		if(
			_type === void 0
		){
			return;
		}
		
		this.type = _type;
	};
	SyntaxTag = new Rexjs(SyntaxTag);
	
	SyntaxTag.static({
		CLASS_NONE: parseInt(0, 2),
		CLASS_STATEMENT: parseInt(10, 2),
		CLASS_EXPRESSION: parseInt(110, 2),
		CLASS_EXPRESSION_CONTEXT: parseInt(1000, 2),
		TYPE_MATCHABLE: parseInt(10, 2),
		TYPE_UNEXPECTED: TYPE_UNEXPECTED = parseInt(100, 2),
		TYPE_MISTAKABLE: parseInt(1100, 2)
	});

	SyntaxTag.props({
		/**
		 * 提取该标签上下文，此方法的目的是针对某些特殊的标签，在提取时进行处理上下文
		 * @param {Context} context - 标签上下文
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractContextTo: function(context, contentBuilder){
			// 不做任何处理，直接添加
			contentBuilder.appendContext(context);
		},
		class: SyntaxTag.CLASS_NONE,
		order: 0,
		regexp: null,
		/**
		 * 获取此标签接下来所需匹配的标签列表
		 * @param {TagsMap} tagsMap - 标签集合映射
		 * @param {SyntaxTags} currentTags - 之前标签所需匹配的标签列表
		 */
		require: function(tagsMap, currentTags){
			return currentTags;
		},
		type: SyntaxTag.TYPE_MATCHABLE,
		/**
		 * 判断该标签是否是意外标签
		 */
		unexpected: function(){
			return (this.type & TYPE_UNEXPECTED) === TYPE_UNEXPECTED;
		},
		visitor: empty
	});

	return SyntaxTag;
}(
	// TYPE_UNEXPECTED
	null,
	parseInt,
	// empty
	Function.prototype
);

this.WhitespaceTag = function(SyntaxTag){
	/**
	 * 空白字符标签
	 * @param {Number} _type - 标签类型
	 */
	function WhitespaceTag(_type){
		SyntaxTag.call(this, _type);
	};
	WhitespaceTag = new Rexjs(WhitespaceTag, SyntaxTag);
	
	WhitespaceTag.props({
		regexp: /[^\S\r\n\u2028\u2029]+/
	});
	
	return WhitespaceTag;
}(
	this.SyntaxTag
);

this.LineTerminatorTag = function(WhitespaceTag){
	/**
	 * 行结束符标签
	 * @param {Number} _type - 标签类型
	 */
	function LineTerminatorTag(_type){
		WhitespaceTag.call(this, _type);
	};
	LineTerminatorTag = new Rexjs(LineTerminatorTag, WhitespaceTag);
	
	LineTerminatorTag.props({
		regexp: /[\r\n\u2028\u2029]/,
		/**
		 * 标签访问器
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 标签上下文
		 * @param {Statement} statement - 当前语句
		 * @param {Statements} statements - 当前语句块
		 */
		visitor: function(parser){
			var position = parser.position;
			
			position.line += 1;
			position.column = 1;
		}
	});
	
	return LineTerminatorTag;
}(
	this.WhitespaceTag
);

this.TokenTag = function(SyntaxTag){
	/**
	 * 标记标签，一般指定的是两次匹配字符串之间的内容
	 * @param {Number} _type - 标签类型
	 */
	function TokenTag(_type){
		SyntaxTag.call(this, _type);
	};
	TokenTag = new Rexjs(TokenTag, SyntaxTag);
	
	TokenTag.props({
		type: SyntaxTag.TYPE_UNEXPECTED
	});
	
	return TokenTag;
}(
	this.SyntaxTag
);

}.call(
	this
);


// 标签列表相关
void function(SyntaxTag, RegExp, TYPE_MATCHABLE, TYPE_MISTAKABLE){

this.SyntaxTags = function(List, sort, distinct){
	/**
	 * 语法标签列表
	 * @param {String} _id - 该标签列表的 id
	 */
	function SyntaxTags(_id){
		List.call(this);
		
		// 如果指定了 id
		if(
			_id
		){
			// 设置 id
			this.id = _id;
		}
	};
	SyntaxTags = new Rexjs(SyntaxTags, List);

	SyntaxTags.props({
		entrance: false,
		/**
		 * 标签过滤处理
		 * @param {SyntaxTag} tag - 语法标签
		 */
		filter: function(tag){
			return false;
		},
		id: "",
		/**
		 * 将所有标签准备就绪，即排序和初始化正则表达式，ps：这是个耗性能的方法
		 */
		ready: function(){
			// 排序标签
			sort(this);
			
			// 初始化正则表达式
			this.regexp = new RegExp(
				// 去重并获取 source
				distinct(this),
				// 必须为全局匹配，否则正则的 lastIndex 无效
				"g"
			);
		},
		regexp: /[^\S\s]/g,
		/**
		 * 添加语法标签，与 push 方法不同的是，register 会进过过滤器，而 push 不会
		 */
		register: function(_rest){
			forEach(
				arguments,
				function(tag){
					// 检查是否应该过滤该标签
					if(
						this.filter(tag)
					){
						return;
					}
					
					// 添加标签
					this.push(tag);
				},
				this,
				true
			);
		}
	});

	return SyntaxTags;
}(
	this.List,
	// sort
	function(tags){
		var copy = tags.slice(0);
		
		// 对标签进行排序
		tags.sort(function(tag1, tag2){
			// 如果 tag1 的排序更大
			if(
				tag1.order - tag2.order > 0
			){
				// 将 tag1 插入到 tag2 前面
				return -1;
			}
			
			// 如果 tag2 的排序更大
			if(
				tag1.order - tag2.order < 0
			){
				// 将 tag2 插入到 tag1 前面
				return 1;
			}
			
			// 如果 tag1 是可捕获的
			if(
				(tag1.type & TYPE_MATCHABLE) === TYPE_MATCHABLE
			){
				// 如果 tag2 不可以捕获的
				if(
					(tag2.type & TYPE_MATCHABLE) !== TYPE_MATCHABLE
				){
					// 将 tag1 插入到 tag2 前面
					return -1;
				}
			}
			// 如果 tag2 是可以捕获的，而 tag1 不可捕获
			else if(
				(tag2.type & TYPE_MATCHABLE) === TYPE_MATCHABLE
			){
				// 将 tag2 插入到 tag1 前面
				return 1;
			}
			
			// 如果 tag1 是可能被误解的
			if(
				(tag1.type & TYPE_MISTAKABLE) === TYPE_MISTAKABLE
			){
				// 如果 tag2 不是可能被误解的
				if(
					(tag2.type & TYPE_MISTAKABLE) !== TYPE_MISTAKABLE
				){
					// 将 tag1 插入到 tag2 前面
					return -1;
				}
			}
			// 如果 tag2 是可能被误解的，而 tag1 不是
			else if(
				(tag2.type & TYPE_MISTAKABLE) === TYPE_MISTAKABLE
			){
				// 将 tag2 插入到 tag1 前面
				return 1;
			}
			
			// 默认，不改变排序，即 tag1 和 tag2 都是不可捕获且不可能被误解的。ps：不能使用 0，0 会使 tag1 排到 tag2 前面
			return copy.indexOf(tag1) - copy.indexOf(tag2);
		});
	},
	// distinct
	function(tags){
		var sources = [];
		
		tags.splice(
				0
			)
			.forEach(
				function(tag){
					var regexp = tag.regexp;
					
					// 如果没有提供正则，则说明不需要匹配，作为未捕获的标签
					if(
						regexp === null
					){
						tags[-1] = tag;
						return;
					}
					
					var source = regexp.source;
					
					// 如果已经存在
					if(
						this(source)
					){
						return;
					}
					
					// 添加正则源字符串
					sources.push(
						"(?:" + source + ")()"
					);
					
					// 添加标签
					tags.push(tag);
				},
				function(source){
					// 检测是否有重复标签
					return !tags.every(function(tag){
						return tag.regexp.source !== source;
					});
				}
			);
			
		return sources.join("|")
	}
);

this.DefaultTags = function(SyntaxTags, WhitespaceTag, LineTerminatorTag, TokenTag){
	/**
	 * 默认标签列表
	 */
	function DefaultTags(_id){
		SyntaxTags.call(this, _id);
		
		this.register(
			new WhitespaceTag(),
			new LineTerminatorTag(),
			new TokenTag()
		);
	};
	DefaultTags = new Rexjs(DefaultTags, SyntaxTags);
	
	return DefaultTags;
}(
	this.SyntaxTags,
	this.WhitespaceTag,
	this.LineTerminatorTag,
	this.TokenTag
);

this.SyntaxTagsMap = function(){
	/**
	 * 语法标签列表映射，供解析时在不同需求下获取不同的语法标签集合
	 */
	function SyntaxTagsMap(){};
	SyntaxTagsMap = new Rexjs(SyntaxTagsMap);
	
	SyntaxTagsMap.props({
		/**
		 * 映射标签列表
		 * @param {SyntaxTags} tags - 需要映射的标签列表
		 */
		map: function(tags){
			// 标签列表就绪
			tags.ready();
			
			// 如果是入口标签列表
			if(
				tags.entrance
			){
				// 设置入口标签
				this.entranceTags = tags;
			}
			
			// 根据 id 设置标签列表
			this[tags.id] = tags;
		}
	});
	
	return SyntaxTagsMap;
}();

}.call(
	this,
	this.SyntaxTag,
	RegExp,
	this.SyntaxTag.TYPE_MATCHABLE,
	this.SyntaxTag.TYPE_MISTAKABLE
);


// 文件相关
void function(){

this.File = function(){
	/**
	 * 文件信息
	 * @param {String} filename - 文件名
	 * @param {String} source - 源文件内容
	 */
	function File(filename, source){
		this.filename = filename;
		this.source = source;
	};
	File = new Rexjs(File);
	
	File.props({
		filename: "",
		source: ""
	});
	
	return File;
}();

this.Base64VLQ = function(base64, parseInt){
	/**
	 * base64 VLQ 编码
	 */
	function Base64VLQ(){};
	Base64VLQ = new Rexjs(Base64VLQ);
	
	Base64VLQ.static({
		/**
		 * 将指定数字进行 base64 VLQ 编码
		 * @param {Number} num - 所需提供的数字
		 */
		encode: function(num){
			// 将数字转化为二进制，并在后面加 0，表示正数
			var result = "", binary = num.toString(2) + "0", length = binary.length;
			
			// 字符串从后往前逆序循环，当长度大于 5 时
			while(
				length > 5
			){
				// 拼接结果
				result += base64[
					// 转化为十进制
					parseInt(
						// 截取字符串，每段前面加 1，表示一个数字（num）的连续编码中
						"1" + binary.substring(length - 5, length),
						2
					)
				];
				
				// 长度减 5
				length -= 5;
			}
			
			// 拼接结果
			result += base64[
				// 转化为十进制
				parseInt(
					/*
						截取最后一段字符串，前面“不”加 1，表示该数字（num）编码结束
						原理：
						1. 剩余长度不足 5 位，前面应该用 0 来补足 5 位数
						2. 在最前面加上 0，表示该数字（num）编码结束
						但是，在实际计算中，前面的 0，都可以忽略，所以代码中不会加入这段“原理性代码”。
					*/
					binary.substring(0, length),
					2
				)
			];
			
			// 返回结果
			return result;
		}
	});
	
	return Base64VLQ;
}(
	// base64
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),
	parseInt
);

this.Position = function(){
	/**
	 * 标签在语法文件中所处的位置
	 * @param {Number} line - 标签所处行数
	 * @param {Number} column - 标签所处列数
	 */
	function Position(line, column){
		this.line = line;
		this.column = column;
	};
	Position = new Rexjs(Position);
	
	Position.props({
		column: 1,
		line: 1
	});
	
	return Position;
}();

this.MappingPosition = function(Position){
	/**
	 * 映射生成器中所记录的位置
	 */
	function MappingPosition(){
		Position.call(this, 0, 0);
	};
	MappingPosition = new Rexjs(MappingPosition, Position);
	
	MappingPosition.props({
		emptyGeneratedLine: true,
		generatedLineOffset: 0,
		generatedColumnOffset: 0
	});
	
	return MappingPosition;
}(
	this.Position
);

this.ContentBuilder = function(){
	/**
	 * 内容生成器
	 * @param {String} _statementJoin - 语句连接符
	 */
	function ContentBuilder(_statementJoin){
		// 如果提供了语句连接符
		if(
			_statementJoin
		){
			// 记录
			this.statementJoin = _statementJoin;
		}
	};
	ContentBuilder = new Rexjs(ContentBuilder);
	
	ContentBuilder.props({
		/**
		 * 追加内容上下文，同时会更新 source map
		 * @param {String} content - 数据内容
		 */
		appendContext: function(context){
			// 添加字符串
			this.appendString(context.content);
		},
		/**
		 * 追加空格
		 */
		appendSpace: function(){
			this.appendString(" ");
		},
		/**
		 * 追加内容
		 * @param {String} content - 数据内容
		 */
		appendString: function(content){
			this.result += content;
		},
		/**
		 * 完成生成，返回结果
		 */
		complete: function(){
			return this.result;
		},
		/**
		 * 追加新行
		 */
		newline: function(){
			this.appendString("\n");
		},
		result: ""
	});
	
	return ContentBuilder;
}();

this.MappingBuilder = function(ContentBuilder, MappingPosition, Base64VLQ, JSON, complete, initialize, newline, btoa){
	/**
	 * 映射生成器
	 * @param {File} file - 生成器相关文件
	 * @param {String} _statementJoin - 语句连接符
	 */
	function MappingBuilder(file, _statementJoin){
		ContentBuilder.call(this, _statementJoin);
		
		this.file = file;
		this.position = new MappingPosition();
	};
	MappingBuilder = new Rexjs(MappingBuilder, ContentBuilder);
	
	MappingBuilder.static({
		supported: !!btoa
	});
	
	MappingBuilder.props({
		/**
		 * 追加内容上下文，同时会更新 source map
		 * @param {String} content - 数据内容
		 */
		appendContext: function(context){
			var contextPosition = context.position, builderPosition = this.position,
			
				line = contextPosition.line - 1, column = contextPosition.column,
			
				gcOffset = this.result.length, dc = line === builderPosition.line ? column - builderPosition.column : column;

			// 如果是空行
			if(
				builderPosition.emptyGeneratedLine
			){
				builderPosition.emptyGeneratedLine = false;
			}
			else {
				// 添加逗号
				this.mappings += ",";
			}
			
			// 拼接 mappings
			this.mappings +=
				Base64VLQ.encode(gcOffset - builderPosition.generatedColumnOffset) +
				"A" +
				Base64VLQ.encode(line - builderPosition.line) +
				Base64VLQ.encode(dc);
			
			// 记录源码的行
			builderPosition.line = line;
			// 记录源码的列
			builderPosition.column = dc;
			// 记录生成后的列
			builderPosition.generatedColumnOffset = gcOffset;
			
			// 追加源码字符串
			this.appendString(context.content);
		},
		/**
		 * 追加 mappings 内容
		 */
		appendMappings: function(){
			var filename = this.file.filename;
			
			// 追加新行
			this.newline();
			// 追加 sourceURL
			this.appendString("//# sourceURL=http://rexjs.org/" + filename);
			
			// 如果 btoa 存在，则添加 mappingURL，否则不支持 btao 的环境，应该也不会支持 source map
			if(
				btoa
			){
				// 追加新行
				this.newline();
				// 追加 mappingURL 头部
				this.appendString("//# sourceMappingURL=data:application/json;base64,");
				
				// 追加 mappingURL 主体
				this.appendString(
					btoa(
						JSON.stringify({
							sources: [ filename ],
							names: [],
							mappings: this.mappings
						})
					)
				);
			}
		},
		/**
		 * 完成生成，返回结果
		 */
		complete: function(){
			// 追加 mapping
			this.appendMappings();
			
			// 返回结果
			return complete.call(this);
		},
		file: null,
		mappings: "",
		/**
		 * 追加新行
		 */
		newline: function(){
			var position = this.position;
			
			// 追加换行符
			newline.call(this);
			
			// 给 mappings 添加分号，表示新行的开始
			this.mappings += ";";
			
			// 设置 generatedLineOffset 和 generatedColumnOffset
			position.generatedLineOffset = position.generatedColumnOffset = this.result.length;
			// 空的一行
			position.emptyGeneratedLine = true;
		},
		position: null
	});
	
	return MappingBuilder;
}(
	this.ContentBuilder,
	this.MappingPosition,
	this.Base64VLQ,
	JSON,
	this.ContentBuilder.prototype.complete,
	this.ContentBuilder.prototype.initialize,
	this.ContentBuilder.prototype.newline,
	typeof btoa === "undefined" ? null : btoa
);
	
this.Context = function(){
	/**
	 * 标签在语法文件中所匹配的上下文
	 * @param {SyntaxTag} tag - 相关的标签
	 * @param {String} content - 标签内容
	 * @param {Position} position - 标签在语法文件中所处的位置
	 */
	function Context(tag, content, position){
		this.tag = tag;
		this.content = content;
		this.position = position;
	};
	Context = new Rexjs(Context);
	
	Context.props({
		content: "",
		position: 0,
		tag: null
	});
	
	return Context;
}();

}.call(
	this
);


// 语法解析转换相关
void function(SyntaxTag, empty){

this.Syntax = function(){
	/**
	 * 语法基类
	 */
	function Syntax(){};
	Syntax = new Rexjs(Syntax);
	
	Syntax.props({
		extratTo: empty,
		target: null
	});
	
	return Syntax;
}();

this.Expression = function(Syntax, parseInt){
	/**
	 * 表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function Expression(context){
		Syntax.call(this);
		
		this.context = context;
	};
	Expression = new Rexjs(Expression, Syntax);
	
	Expression.static({
		// 无状态
		STATE_NONE: parseInt(0, 2),
		// 表达式结束状态
		STATE_EXPRESSION_END: parseInt(10, 2),
		// 语句可结束状态
		STATE_STATEMENT_ENDABLE: parseInt(110, 2),
		// 语句结束状态，当进行语句连接时，应该在两语句之间加语句连接符（如分号等）
		STATE_STATEMENT_END: parseInt(1110, 2),
		// 语句已结束状态，当进行语句连接时，不需要再加语句连接符（如分号等）
		STATE_STATEMENT_ENDED: parseInt(11110, 2)
	});
	
	Expression.props({
		context: null,
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			contentBuilder.appendContext(this.context);
		},
		state: Expression.STATE_NONE
	});
	
	return Expression;
}(
	this.Syntax,
	parseInt
);

this.ListExpression = function(Expression){
	/**
	 * 列表表达式
	 * @param {String} join - 表达式连接符
	 */
	function ListExpression(join){
		Expression.call(this, null);

		this.join = join;
	};
	ListExpression = new Rexjs(ListExpression, Expression);
	
	ListExpression.props({
		/**
		 * 添加表达式
		 * @param {Expression} expression - 需要添加的表达式
		 */
		add: function(expression){
			this[this.length] = expression;
			
			this.length++;
		},
		/**
		 * 提取表达式文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var join = this.join;

			this[0].extractTo(contentBuilder);

			// 遍历项
			for(
				var i = 1, j = this.length;i < j;i++
			){
				// 添加表达式连接符
				contentBuilder.appendString(join);

				// 提取项表达式
				this[i].extractTo(contentBuilder);
			}
		},
		join: "",
		length: 0
	});
	
	return ListExpression;
}(
	this.Expression
);

this.EmptyExpression = function(Expression){
	/**
	 * 空表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function EmptyExpression(context){
		Expression.call(this, context);
	};
	EmptyExpression = new Rexjs(EmptyExpression, Expression);
	
	EmptyExpression.props({
		/**
		 * 提取文本内容，空函数，不做任何处理
		 */
		extractTo: empty
	});
	
	return EmptyExpression;
}(
	this.Expression
);

this.EmptyStatementExpression = function(EmptyExpression, STATE_STATEMENT_ENDED){
	/**
	 * 空语句表达式
	 * @param {Context} context - 语法标签上下文
	 */
	function EmptyStatementExpression(context){
		EmptyExpression.call(this, context);
	};
	EmptyStatementExpression = new Rexjs(EmptyStatementExpression, EmptyExpression);
	
	EmptyStatementExpression.props({
		state: STATE_STATEMENT_ENDED
	});
	
	return EmptyStatementExpression;
}(
	this.EmptyExpression,
	this.EmptyExpression.STATE_STATEMENT_ENDED
);

this.PartnerExpression = function(Expression, end, endWith){
	/**
	 * 匹配组表达式
	 * @param {Context} open - 起始标签上下文
	 */
	function PartnerExpression(open){
		Expression.call(this, open);
		
		this.open = open;
	};
	PartnerExpression = new Rexjs(PartnerExpression, Expression);
	
	PartnerExpression.props({
		close: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 追加起始标签内容
			contentBuilder.appendContext(this.open);
			
			// 追加中间内容
			this.inner.extractTo(contentBuilder);
			
			// 追加结束标签内容
			contentBuilder.appendContext(this.close);
		},
		inner: null,
		open: null
	});
	
	return PartnerExpression;
}(
	this.Expression,
	this.Expression.prototype.end,
	this.Expression.prototype.endWith
);

this.Statement = function(Syntax, TYPE_MISTAKABLE, CLASS_STATEMENT, STATE_STATEMENT_ENDABLE, parseInt, getCatchedTag){
	/**
	 * 语句
	 * @param {Statements} statements - 该语句将要所处的语句块
	 */
	function Statement(statements){
		Syntax.call(this);
		
		this.target = statements.statement;
		this.statements = statements;
	};
	Statement = new Rexjs(Statement, Syntax);
	
	Statement.static({
		BLACKLIST_CONTEXT_TAGS: parseInt(10, 2),
		BLACKLIST_ASSGINMENT: parseInt(100, 2),
		BLACKLIST_SEMICOLON: parseInt(1000, 2),
		BLACKLIST_COMMA: parseInt(10000, 2)
	});
	
	Statement.props({
		$expression: null,
		blacklist: Statement.BLACKLIST_CONTEXT_TAGS,
		/**
		 * 捕获并处理错误异常，此方法一般是处理一些未知或底层统一处理的异常
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		catch: function(parser, context){
			var target = this.target;
			
			return target ? target.try(parser, context) : null;
		},
		expression: null,
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			// 提取表达式内容
			this.expression.extractTo(contentBuilder);
		},
		/**
		 * 将临时的表达式设置为正式的表达式
		 */
		formalize: function(){
			var $expression = this.$expression;
			
			this.expression = $expression;
			this.$expression = null;
			
			return $expression;
		},
		/**
		 * 跳出该语句
		 */
		out: function(){
			return this.statements.statement = this.target;
		},
		/**
		 * 请求将 target 语句的临时表达式设置为正式表达式并跳出该语句
		 */
		requestFormalize: function(){
			var expression = this.expression, targetExpression = this.out().formalize();
			
			// 如果当前语句有表达式
			if(
				expression
			){
				// 设置 state
				targetExpression.state = expression.state;
			}
			
			return targetExpression;
		},
		statements: null,
		/**
		 * 尝试处理异常，此方法捕获的一般都是处理当前语句正确、明了的信息
		 * @param {SyntaxParser} parser - 语法解析器
		 * @param {Context} context - 语法标签上下文
		 */
		try: function(parser, context){
			var tag = context.tag;

			// 如果标签是可能被误解的
			if(
				(tag.type & TYPE_MISTAKABLE) === TYPE_MISTAKABLE
			){
				// 如果是语句标签
				if(
					(tag.class & CLASS_STATEMENT) === CLASS_STATEMENT
				){
					var t = getCatchedTag(this, parser, context);

					// 如果标签存在
					if(
						t
					){
						return t;
					}

					var statements = this.statements;

					// 如果表达式还可以结束
					if(
						(statements.statement.expression.state & STATE_STATEMENT_ENDABLE) === STATE_STATEMENT_ENDABLE
					){
						// 创建新语句
						statements.newStatement();
						return tag;
					}

					return null;
				}
				
				return tag;
			}

			return getCatchedTag(this, parser, context);

			if(
				tag
			){
				return tag;
			}

			var target = this.target;
			
			// 如果 target 存在
			if(
				target
			){
				// 返回 target 的结果
				return target.try(parser, context);
			}


			switch(
				true
			){
				// 如果标签不是可能被误解的
				case (tag.type & TYPE_MISTAKABLE) !== TYPE_MISTAKABLE:
					break;
				
				// 如果表达式还并不可以结束
				case (this.expression.state & STATE_STATEMENT_ENDABLE) !== STATE_STATEMENT_ENDABLE:
					break;

				// 默认
				default:
					// 创建新语句
					this.statements.newStatement();
					// 返回标签
					return tag;
			}

			// 直接调用 catch
			return this.catch(parser, context);
		}
	});
	
	return Statement;
}(
	this.Syntax,
	SyntaxTag.TYPE_MISTAKABLE,
	SyntaxTag.CLASS_STATEMENT,
	this.Expression.STATE_STATEMENT_ENDABLE,
	parseInt,
	// getCatchedTag
	function(statement, parser, context){
		var tag = null;

		// 当语句存在
		while(
			statement
		){
			// 获取 catch 所返回的标签
			tag = statement.catch(parser, context);

			// 如果标签存在
			if(
				tag
			){
				// 跳出循环
				break;
			}

			// 设置语句为 target
			statement = statement.target;
		}

		// 返回标签
		return tag;
	}
);

this.Statements = function(Syntax, Statement, STATE_STATEMENT_ENDED){
	/**
	 * 语句块
	 */
	function Statements(){
		Syntax.call(this);
		
		this.newStatement();
	};
	Statements = new Rexjs(Statements);
	
	Statements.props({
		/**
		 * 清空语句块
		 */
		clear: function(){
			// 清空当前语句
			this.statement = null;
			
			// 清空列表
			this.splice(0);
		},
		/**
		 * 提取文本内容
		 * @param {ContentBuilder} contentBuilder - 内容生成器
		 */
		extractTo: function(contentBuilder){
			var join = this.join;

			// 遍历所有语句
			for(
				var i = 0, j = this.length;i < j;i++
			){
				var statement = this[i];

				// 提取语句
				statement.extractTo(contentBuilder);

				// 如果表达式状态是 STATE_STATEMENT_ENDED，则说明不需要加语句连接符
				if(
					(statement.expression.state & STATE_STATEMENT_ENDED) === STATE_STATEMENT_ENDED
				){
					continue;
				}
				
				// 追加语句连接符
				contentBuilder.appendString(join);
			}
		},
		/**
		 * 初始化语句
		 */
		initStatement: function(){
			return new Statement(this);
		},
		join: ";",
		length: 0,
		/**
		 * 创建新语句
		 */
		newStatement: function(){
			// 先清空当前语句
			this.statement = null;
			
			return this.statement = this[this.length++] = this.initStatement();
		},
		splice: Array.prototype.splice,
		statement: null
	});
	
	return Statements;
}(
	this.Syntax,
	this.Statement,
	this.Expression.STATE_STATEMENT_ENDED
);

}.call(
	this,
	this.SyntaxTag,
	// empty
	Function.prototype
);


// 语法树辅助相关
void function(DOUBLE_CHAR_REGEXP){

this.SyntaxError = function(MappingBuilder, e){
	/**
	 * 抛出语法错误信息
	 * @param {File} file - 具有语法错误的文件
	 * @param {Context} context - 出错处的上下文
	 * @param {String} description - 错误描述
	 */
	function SyntaxError(file, context, description){
		var filename = file.filename, position = context.position;
		
		// 如果支持 MappingBuilder
		if(
			MappingBuilder.supported
		){
			// 生成源文件 map
			e(
				new MappingBuilder(file).complete()
			);
		}
		
		this.file = file;
		this.context = context;
		this.description = description;
		this.message = "SyntaxError: " + description + " @ " + filename + ":" + position.line + ":" + position.column;
		
		throw this;
	};
	SyntaxError = new Rexjs(SyntaxError);
	
	SyntaxError.props({
		context: null,
		description: "",
		message: "",
		file: null,
		/**
		 * 转字符串
		 */
		toString: function(){
			return this.message;
		}
	});

	return SyntaxError;
}(
	this.MappingBuilder,
	// e
	eval
);

this.SyntaxRegExp = function(RegExp, Infinity){
	/**
	 * 语法正则表达式类，用于语法树匹配
	 */
	function SyntaxRegExp(){};
	SyntaxRegExp = new Rexjs(SyntaxRegExp);

	SyntaxRegExp.props({
		/**
		 * 中断正则表达式的匹配
		 */
		break: function(){
			this.lastIndex = Infinity;
		},
		/**
		 * 重新编辑表达式
		 * @param {RegExp} regexp - 新的表达式
		 */
		compile: function(regexp){
			this.originalRegExp = regexp;
		},
		/**
		 * 执行正则表达式进行匹配
		 * @param {RegExp} regexp - 初始化的表达式
		 * @param {String} source - 需要匹配的源代码内容字符串
		 * @param {Function} regexpCallback - 正则表达式匹配出来的回调函数
		 */
		exec: function(regexp, source, callback){
			var result, content = "", diff = 0, index = -1, lastIndex = this.lastIndex;

			// 编译表达式
			this.compile(regexp);
			
			// 初始化
			this.lastIndex = 0;
			
			while(
				true
			){
				regexp = this.originalRegExp;
				regexp.lastIndex = lastIndex = this.lastIndex;
				result = regexp.exec(source);

				// 如果没匹配到结果
				if(
					result === null
				){
					// 跳出循环
					break;
				}
				
				diff = result.index - lastIndex;
				
				// 存在中间未捕获的内容
				if(
					diff === 0
				){
					content = result[0];
					index = result.lastIndexOf("") - 1;
				}
				else {
					content = source.substr(lastIndex, diff);
					index = -1;
				}

				// 进行回调
				callback.call(this, content, index);

				// 计算 lastIndex
				this.lastIndex += content.length;
			}

			// 如果成立，说明已经没有未处理的代码
			if(
				this.lastIndex >= source.length
			){
				return;
			}
			
			// 剩余子字符串处理
			content = source.substring(this.lastIndex);
			index = -1;
			
			// 进行回调
			callback.call(this, content, index);

			// 计算 lastIndex
			this.lastIndex += content.length;
		},
		lastIndex: 0,
		originalRegExp: /(?:)/
	});

	return SyntaxRegExp;
}(
	RegExp,
	Infinity
);

}.call(
	this,
	// DOUBLE_CHAR_REGEXP
	/[^\x00-\xff]+/g
);


// 语法树相关
void function(document){

this.SyntaxParser = function(SyntaxRegExp, SyntaxError, Statement, Statements, Position, Context, ContentBuilder){
	/**
	 * 语法树类，初始化语法树是个耗性能过程，建议作为单例使用
	 * @param {SyntaxTagsMap} tagsMap - 标签列表映射
	 */
	function SyntaxParser(tagsMap, _statements){
		this.regexp = new SyntaxRegExp();
		this.tagsMap = tagsMap;
		this.statements = _statements || new Statements();
	};
	SyntaxParser = new Rexjs(SyntaxParser);
	
	SyntaxParser.props({
		/**
		 * 将解析后的语法生成字符串
		 * @param {ContentBuilder} _contentBuilder - 内容生成器
		 */
		build: function(_contentBuilder){
			var contentBuilder = _contentBuilder || new ContentBuilder();
			
			// 提取语法列表内容
			this.statements.extractTo(contentBuilder);
			// 生成完成，并返回
			return contentBuilder.complete();
		},
		content: "",
		/**
		 * 报错
		 * @param {Context} context - 错误信息上下文
		 * @param {String} description - 错误描述
		 */
		error: function(context, description){
			// 中断匹配，结束解析
			this.regexp.break();
			// 抛出语法错误
			new SyntaxError(this.file, context, description);
		},
		file: null,
		/**
		 * 开始解析
		 * @param {File} file - 文件信息
		 */
		parse: function(file){
			var parser = this, tagsMap = this.tagsMap, tags = tagsMap.entranceTags, statements = this.statements, position = this.position = new Position(1, 1);

			this.file = file;
			
			// 清空语句块
			statements.clear();
			// 创建新语句
			statements.newStatement();
			
			// 执行表达式
			this.regexp.exec(
				tags.regexp,
				file.source,
				function(content, tagIndex){
					var context, tag = tags[tagIndex], statements = parser.statements, statement = statements.statement;
					
					// 初始化 context
					context = new Context(
						tag,
						content,
						new Position(
							position.line,
							position.column
						)
					);
					
					// 增加列数
					position.column += content.length;
					
					// 如果标签异常，即不应该被捕获
					if(
						tag.unexpected(statement)
					){
						// 如果表达式存在，则进入异常捕获处理
						tag = statement.expression ? statement.try(parser, context) : null;
						
						// 如果标签存在
						if(
							tag
						){
							context.tag = tag;
							statements = parser.statements;
							statement = statements.statement;
						}
						// 否则
						else {
							// 报错
							parser.error(context, "Unexpected token " + content);
							return;
						}
					}
					
					// 访问标签
					tag.visitor(parser, context, statement, statements);
					
					// 编译正则
					this.compile(
						(
							// 获取需要匹配的标签集合
							tags = tag.require(tagsMap, tags)
						)
						.regexp
					);
				}
			);
		},
		position: null,
		regexp: null,
		rex: false,
		statements: null,
		tagsMap: null
	});
	
	return SyntaxParser;
}(
	this.SyntaxRegExp,
	this.SyntaxError,
	this.Statement,
	this.Statements,
	this.Position,
	this.Context,
	this.ContentBuilder
);

}.call(
	this,
	document
);


// 解析器测试相关
void function(File){

this.SimpleTest = function(INNER_CONTENT_REGEXP, file, console, toArray, e, catchErrors){
	/**
	 * 解析器测试
	 * @param {SyntaxParser} parser - 相关的语法解析器
	 */
	function SimpleTest(parser){
		this.parser = parser;
	};
	SimpleTest = new Rexjs(SimpleTest);
	
	SimpleTest.static({
		/**
		 * 获取函数主体代码
		 * @param {Function} func - 需要获取主体代码的函数
		 */
		innerContentOf: function(func){
			return func.toString().match(INNER_CONTENT_REGEXP)[1];
		}
	});
	
	SimpleTest.props({
		/**
		 * 测试结果为假的代码，即代码解析时候正确应该报错
		 * @param {String} description - 该测试的描述
		 * @param {String} source - 需要测试的代码
		 * @param {Function} _callbacks - 解析错误分析回调
		 */
		false: function(description, source, _callbacks){
			var parser = this.parser;
			
			try {
				// 设置文件源代码
				file.source = source;
				
				// 解析文件
				parser.parse(file);
				// 如果进入这里，说明上面解析没有报错，而我们是希望报错的，说明解析器有 bug
				console.error("Uncaught Exceptions: " + description);
			}
			catch(e){
				// 如果没有捕获到错误
				if(
					!catchErrors(
						description,
						toArray(arguments, 2),
						parser,
						e
					)
				){
					// 打印成功捕获信息
					console.log("Caught Exceptions: " + description);
				}
			}
		},
		/**
		 * 测试分组
		 * @param {String} name - 分组名称
		 */
		group: function(name){
			this.groupName = name;
			
			console.group(name);
		},
		/**
		 * 测试分组结束
		 * @param {String} name - 分组名称
		 */
		groupEnd: function(){
			console.groupEnd(this.groupName);
			
			this.groupName = "";
		},
		groupName: "",
		parser: null,
		/**
		 * 测试结果为真的代码，即代码正确解析
		 * @param {String} description - 该测试的描述
		 * @param {String} source - 需要测试的代码
		 * @param {Boolean} _eval - 代码解析完，是否需要立马执行
		 * @param {Function} _callbacks - 解析成功后的分析回调
		 */
		true: function(description, source, _eval, _callbacks){
			try {
				var parser = this.parser, result = "";
				
				// 设置文件源代码
				file.source = source;
				
				// 解析文件
				parser.parse(file);
				
				// 如果需要执行
				if(
					_eval
				){
					// 获取解析结果
					result = parser.build();
					
					// 执行代码
					e(result);
				}
				
				// 如果没有捕获到错误
				if(
					!catchErrors(
						description,
						toArray(arguments, 3),
						parser,
						result
					)
				){
					// 打印成功解析信息
					console.log("Success: " + description);
				}
			}
			catch(e){
				// 输出错误
				console.error("Fail: " + description + " %o", e);
			}
		}
	});
	
	return SimpleTest;
}(
	// INNER_CONTENT_REGEXP
	/\{([\s\S]*)\}\s*$/,
	// file
	new File("test.js", ""),
	console,
	Rexjs.toArray,
	eval,
	// catchErrors
	function(description, callbacks, parser, result){
		var clean = true;
		
		// 遍历回调
		callbacks.forEach(function(callback){
			var error = callback(parser, result);
			
			// 如果返回了错误信息
			if(
				error
			){
				// 如果目前解析还是干净的，即还没有报错
				if(
					clean
				){
					// 启用控制台分组
					console.group(description);
					clean = false;
				}
				
				// 输出错误
				console.error("Callback Error: " + error);
			}
		});
		
		// 如果已经报错，说明启用了控制台分组
		if(
			!clean
		){
			// 控制台分组结束
			console.groupEnd(description);
			return true;
		}
		
		return false;
	}
);

}.call(
	this,
	this.File
);

Rexjs.static(this);
}(
	Rexjs,
	Rexjs.forEach
);