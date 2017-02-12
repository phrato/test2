$(function(){
	var $equip1 = $("#block_cast_data > div.mp_cast_set_assist > a > div:nth-child(1)"),
		$equip2 = $("#block_cast_data > div.mp_cast_set_assist > a > div:nth-child(2)"),
		$equip3 = $("#block_cast_data > div.mp_cast_set_assist > a > div:nth-child(3)"),
		$soul = $("#block_cast_data > div.mp_cast_set_assist > a > div:nth-child(4)"),
		equip1Plus = $equip1.children("div").text(),
		equip1Url = $equip1.children("img").attr("src").replace(/common\u002fimg_card_thum\u002fassist\u002f/g, ""),
		equip2Plus = $equip2.children("div").text(),
		equip2Url = $equip2.children("img").attr("src").replace(/common\u002fimg_card_thum\u002fassist\u002f/g, ""),
		equip3Plus = $equip3.children("div").text(),
		equip3Url = $equip3.children("img").attr("src").replace(/common\u002fimg_card_thum\u002fassist\u002f/g, ""),
		soulPlus = $soul.children("div").text(),
		soulUrl = $soul.children("img").attr("src").replace(/common\u002fimg_card_thum\u002fassist\u002f/g, "");
		alert("!");
	console.log ($equip1);
	console.log ($equip2);
	console.log ($equip3);
	console.log ($soul);
	console.log (equip1Plus);
	console.log (equip1Url);
		alert("!!!");
	var array = [];
	console.log(array);
		for (var i=0; i=3; i++){
		array.push{($equip + i)}
		}
	console.log(array);
	var equipNo = equipState(equip);
	function equipState(Url) {
		if(equipNo = 0){

		}
	}
	alert("!!!!");
});