(function() {

	function teaset(name,lock,level,earn,cost){
		this.name = name;
		this.lock = lock;
		this.level = level;
		this.earn = earn;
		this.cost = cost;
	}

	var teapet = new teaset('teapet',true,3,200,800);
	var smelling = new teaset('smelling',true,4,0,400);
	var pitcher = new teaset('pitcher',true,2,0,100);
	var dessert = new teaset('dessert',true,3,300,1000);
	var decobuy1 = new teaset('decobuy1',true,2,30,150);
	var decobuy2 = new teaset('decobuy2',true,1,50,200);
	var puer = new teaset('puer',true,0,0,50);
	var oolong = new teaset('oolong',true,1,0,100);

	var teaset_lock = [teapet,smelling,pitcher,dessert,decobuy1,decobuy2,puer,oolong];

	function lockOn(){
		var i;
		for (i=0; i<=7; i++){
			if (teaset_lock[i].lock === true){
				var set = '#' + teaset_lock[i].name;
				console.log(set);
				$(set).addClass('lock');
				var label = '#' + teaset_lock[i].name + '_label';
				$(label).css('display','none');
			}else{
				$(set).removeClass('lock');
			}
		}
	}

	lockOn();
	

})();