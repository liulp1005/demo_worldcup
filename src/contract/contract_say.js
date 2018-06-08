"use strict";

var DictItem = function(text) {
	// "{\"key\":\"liyuechun\",\"author\":\"n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw\",\"value\":\"我是黎跃春\"}"
	if (text) {
		/*
		{
			"key": "巴西",
			"value": [
                {"nkdsnfksnf_addr" : "我们是冠军"}
            
                }
            ]
		}
		*/
		var obj = JSON.parse(text);
		this.key = obj.key;
        //this.value[] = obj.value;
        this.value = obj.value;
	} else {
	    this.key = "";
	    this.value = new Array();
	}
};

// {"key":"liyuechun","author":"n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw","value":"我是黎跃春"}
DictItem.prototype = {
	toString: function () {
		return JSON.stringify(this);
	}
};

// 创建了一个类
// 类名：SuperDictionary
// 部署一个合约，会创建一个SuperDictionary对象，通过合约地址可以找到这个对象
// 合约地址可以理解成合约对象存储的空间地址
// 每部署一次合约，就会产生一个新合约对象，并且对应一个新的合约地址
// n1gefqT1Vn7vGaCEDBA2UmV8dG2ChSNDRKW
var Say = function () {

		// 定一个了一个SuperDictionary类的属性，属性类型为字典，当前定义的属性名为repo
    LocalContractStorage.defineMapProperty(this, "repo", {
				// get 读取数据时，会将JSON字符串转换成对象返回
        parse: function (text) {
            return new DictItem(text);
        },
				// 往 repo 里面写数据，set方法或者put方法时，会把对象转换成JSON字符串并且写到链上
        stringify: function (o) {
            return o.toString()
        }
				// {"key":"liyuechun","value":"黎跃春"}+hehe
    });

};


Say.prototype = {
		// 1. 原型
		// 2. init方法
		// 3. 函数以_开头，那么方法为私有，外部不能调用
    init: function () {
        // todo
    },


    save: function (key ,say_h) {

        key = key.trim(); // 去掉两边的空格
        say_h = say_h.trim(); // // 去掉两边的空格
        if (key==="" || say_h === ""){ //不能为空
            throw new Error("empty key / say_h");
        }
        var valuemap = {};
        // if (value.length > 64 || key.length > 64){ //长度限制
        //     throw new Error("key / value exceed limit length")
        // }

				// 自动获取当前钱包检测到的登录钱包地址
				// n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw
        var from = Blockchain.transaction.from;
				// this.repo[key] nil
        var dictItem = this.repo.get(key);
				/*
				{result: "{"key":"liyuechun","value":"黎跃春",
				"author":"n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw"}",
				 execute_err: "insufficient balance", estimate_gas: "20223"}
				*/
				// 如果key对应的value存在，抛出异常
        if (dictItem){
            //throw new Error("value has been occupied");
                        //dictItem是非空的
                valuemap[from] = say_h;
                dictItem.value.push(valuemap);
        }else {
					// 创建一个dictItem对象，dictItem是空的
	            dictItem = new DictItem();
                dictItem.key = key;
                valuemap[from] = say_h;
                dictItem.value.push(valuemap);
	            
        }

					// this.repo[key] = dictItem
					// this.repo.set(key, dictItem);
		this.repo.put(key, dictItem);
    },

		// 查询
    get: function (key) {
        key = key.trim();
        if ( key === "" ) {
            throw new Error("empty key")
        }
        return this.repo.get(key);
    }
};
module.exports = Say;
