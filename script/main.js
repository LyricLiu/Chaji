(function() {

	function teaset(name,lock,level,earn,cost){
		this.name = name;
		this.lock = lock;
		this.level = level;
		this.earn = earn;
		this.cost = cost;
	}

	var timeNow = [0,0];

	var teapet = new teaset('teapet',true,3,200,800);
	var smelling = new teaset('smelling',true,4,0,400);
	var pitcher = new teaset('pitcher',true,2,0,100);
	var dessert = new teaset('dessert',true,3,300,1000);
	var decobuy1 = new teaset('decobuy1',true,2,30,150);
	var decobuy2 = new teaset('decobuy2',true,1,50,200);
	var puer = new teaset('puer',true,0,0,50);
	var oolong = new teaset('oolong',true,1,0,100);
	var seat2 = new teaset('seat2',true,0,0,30);
	var seat3 = new teaset('seat3',true,0,0,100);
	var seat4 = new teaset('seat4',true,0,0,300);


	var teaset_lock = [teapet,smelling,pitcher,dessert,decobuy1,decobuy2,puer,oolong];
	var seat_lock = [seat2,seat3,seat4];

	function lockOn(){
		var i;
		var j;
		for (i=0; i<=7; i++){
			var set = '#' + teaset_lock[i].name;
			var label = '#' + teaset_lock[i].name + '_label';
			if (teaset_lock[i].lock === true){
				$(set).addClass('lock');
				$(label).css('display','none');
			}else{
				$(set).removeClass('lock');
				$(label).css('display','block');
			}
		}
		for (j=0; j<3; j++){
			var seat = '#' + seat_lock[j].name + 'pic';
			var people = '#' + seat_lock[j].name + ' p'
			if (seat_lock[j].lock === true){
				$(seat).addClass('lock');
				$(people).css('display','none');
			}else{
				$(seat).removeClass('lock');
				$(people).css('display','block');
			}
		}
	}

	function SetHeader(){
		var i;
		for (i=0; i<=timeNow[1]; i++){
			var hour = '#hour' + i.toString();
			$(hour).addClass('hour');
		}
		for (i=5; i>timeNow[1]; i--){
			var hour = '#hour' + i.toString();
			$(hour).removeClass('hour');
		}
		var dayimage = './img/day' + (timeNow[0]+1).toString() + '.png';
		$('#header_day').attr('src', dayimage);
	}

	lockOn();
	SetHeader();
	

})();