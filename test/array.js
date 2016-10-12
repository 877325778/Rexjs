void function(SimpleTest, test){

test.group("数组测试");

test.true("空的数组", "[]");
test.true("单项数组", "[1];[true];[!true];['string'];[a += 5 + !false - 0];")
test.true("多项数组", "[1, true, !true, 2 + 3, 'string', a += 5 + !false - 0]");
test.true("最简单的空项数组", "[,]");
test.true("全空项数组", "[,,,,,,,,,,,,,,,]");
test.true("带空项的数组", "[1, true,, !true, 2 + 3,, 'string',, a += 5 + !false - 0]");
test.true("小括号内的数组", "([1,2,,3])");
test.true("连续的赋值运算符", "[a + 5, a += 5, , , a + 6, , a -= 100]");

test.true(
	"运算结果测试",
	SimpleTest.innerContentOf(function(){
		a = 100
		a = [1, true,, !true, 2 + 3,, 'string',, a += 5 - !false - 0]
		
		if(
			a.length !== 9
		){
			throw "错误的数组长度"
		}
		
		if(
			a[8] !== 104
		){
			throw "错误的数组项"
		}
	}),
	true
);

test.false(
	"缺少结束中括号的空数组",
	"[",
	function(parser, err){
		return err.context.tag instanceof Rexjs.FileEndTag ? "" : "未捕获文件结束标签";
	}
);

test.false(
	"缺少结束中括号的非空数组",
	"[1, true, !false - 0",
	function(parser, err){
		return err.context.tag instanceof Rexjs.StatementEndTag ? "" : "未捕获语句结束标签";
	}
);

test.false(
	"带语句的数组",
	"[break]",
	function(parser, err){
		return err.context.tag instanceof Rexjs.BreakTag ? "" : "未捕获 break 语句标签";
	}
);

test.groupEnd();
}(
	Rexjs.SimpleTest,
	test
);