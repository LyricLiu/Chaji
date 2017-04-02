(function() {

        function teaset(name, lock, level, earn, cost) {
            this.name = name;
            this.lock = lock;
            this.level = level;
            this.earn = earn;
            this.cost = cost;
        }

        var state = 0;
        var level = 0;
        var money = 0;
        var tea = 0;
        var guestIndex = 0;
        var brewProcess = 0;
        var teaPrice = 20;
        var seatNum = 1;
        var calcMoney = false;

        var timeNow = [0, 0];

        var teapet = new teaset('teapet', true, 3, 200, 800);
        var smelling = new teaset('smelling', true, 4, 0, 400);
        var pitcher = new teaset('pitcher', true, 2, 0, 100);
        var dessert = new teaset('dessert', true, 3, 300, 1000);
        var decobuy1 = new teaset('decobuy1', true, 2, 30, 150);
        var decobuy2 = new teaset('decobuy2', true, 1, 50, 200);
        var puer = new teaset('puer', true, 0, 0, 50);
        var oolong = new teaset('oolong', true, 1, 0, 100);
        var seat2 = new teaset('seat2', true, 0, 0, 30);
        var seat3 = new teaset('seat3', true, 0, 0, 100);
        var seat4 = new teaset('seat4', true, 0, 0, 300);


        var teaset_lock = [teapet, smelling, pitcher, dessert, decobuy1, decobuy2, puer, oolong];
        var seat_lock = [seat2, seat3, seat4];

        function guest(name, chat, tea, intro, words) {
            this.name = name;
            this.chat = chat;
            this.tea = tea;
            this.intro = intro;
            this.words = words;
        }

        var g1_0 = 'Congratulations, my friend! You are now the owner of this fantastic shop! I know you are excited and wanna try it now. But before you serve the first guest, let me teach you the simplest way of brew the tea! Click the button below to start!';
        var g2_0 = "Hi! I am Alice, I come from Switzerland where I have a pretty farm with cows and chickens. It's the first time for me to taste the tea, I am very excited! I don't have any preference, just show me what's popular in your shop.";
        var g2_1 = "You: Hi, Alice! I am glad to meet you! You are my first guest!";
        var g2_2 = "Alice: Oh, I am so lucky! You know today is my final day here, so I was wondering where to spend this most precious afternoon. Then I though I should experience tea culture since I am here and I found your tea shop. It’s so great, I like everything here, the furniture, the aroma …";
        var g2_3 = "You: Thank you! Actually, I am just a seven day owner. But I will try my best to improve this tiny space. Do you have any suggestions?";
        var g2_4 = "Alice: I am not a tea expert, but there is a market I want to recommend. I think you could but more tea sets from there, that would improve your business …";
        var g1 = new guest(['Fernando'], false, 0, g1_0 , []);
        var g2 = new guest(['Alice'], true, 0, g2_0, [g2_1, g2_2, g2_3, g2_4]);

            var Guest = [g1, g2];

            function lockOn() {
                var i;
                var j;
                for (i = 0; i <= 7; i++) {
                    var set = '#' + teaset_lock[i].name;
                    var label = '#' + teaset_lock[i].name + '_label';
                    if (teaset_lock[i].lock === true) {
                        $(set).addClass('lock');
                        $(label).css('display', 'none');
                    } else {
                        $(set).removeClass('lock');
                        $(label).css('display', 'block');
                    }
                }
                for (j = 0; j < 3; j++) {
                    var seat = '#' + seat_lock[j].name + 'pic';
                    var people = '#' + seat_lock[j].name + ' p'
                    if (seat_lock[j].lock === true) {
                        $(seat).addClass('lock');
                        $(people).css('display', 'none');
                    } else {
                        $(seat).removeClass('lock');
                        $(people).css('display', 'block');
                    }
                }
            }

            function setHeader() {
                var i;
                for (i = 0; i <= timeNow[1]; i++) {
                    var hour = '#hour' + i.toString();
                    $(hour).addClass('hour');
                }
                for (i = 5; i > timeNow[1]; i--) {
                    var hour = '#hour' + i.toString();
                    $(hour).removeClass('hour');
                }
                var dayimage = './img/day' + (timeNow[0] + 1).toString() + '.png';
                $('#header_day').attr('src', dayimage);
            }

            function setPara() {
                if (level == 0) {
                    $('#level').html("Novel");
                } else if (level == 1) {
                    $('#level').html("Beginner");
                } else if (level == 2) {
                    $('#level').html("Intermediated");
                } else if (level == 3) {
                    $('#level').html("Advanced");
                } else {
                    $('#level').html("Expert");
                }
                $('#money').html(money);
            }

            function setMoneyPic(){
                if ((teaPrice >= 60) && (teaPrice <= 200)) {
                    $('.money_pay').css('background-image','url(./img/money2.png)');
                }else if (teaPrice > 200){
                    $('.money_pay').css('background-image','url(./img/money3.png)');
                }
            }
            /***************** Drag Function *********************/
            /*
                source: '#source'
                fn:function
            */
            var dragT = false;
            
            function drag(source,target,fn){
                var $sourceClone;

                $(document).on('mousedown', source, function(ev){
                    $sourceClone = $(source).clone();
                    $('body').append($sourceClone);
                    $(source).css('display','none');

                    $sourceClone.css({
                        opacity: 1,
                        marginTop: '-50px',
                        marginLeft: '-50px',
                        pointerEvents: 'none'
                    });
                })

                .on('mousemove', function(ev){
                    $sourceClone && $sourceClone.css({
                        left: ev.pageX,
                        top: ev.pageY
                    });
                })

                .on('mouseenter', target, function(){
                    if($sourceClone){
                        console.log('mouseenter');
                        fn();
                        dragT = true;
                    }
                })

                .on('mouseup', target, function(){
                    if($sourceClone){
                        console.log('mouseup');
                        $(source).css('display','block');
                    }  
                })

                .on('mouseup', function(){
                    if($sourceClone){
                    $sourceClone.remove();
                    $sourceClone = null;
                    $(source).css('display','block');
                    }
                })
            }

            /****************** Brew Animation *********************/
            function addLeaves(){
                $('#pot').css('background-image','url(./img/pot_1.png)');
            }

            function addWaterLeaves(){
                setTimeout(function(){ $('#pot').css('background-image','url(./img/pot_2.png)'); }, 300);
                setTimeout(function(){ $('#pot').css('background-image','url(./img/pot_3.png)'); }, 600);
                setTimeout(function(){ $('#pot').css('background-image','url(./img/pot_4.png)'); }, 900);
                setTimeout(function(){ $('#pot').css('background-image','url(./img/pot.png)'); }, 1200);
            }

            function pourTeaCup(){
                if(tea==0){
                    $('#cup').css('background-image','url(./img/cup_1.png)');
                }else if(tea==1){
                    $('#cup').css('background-image','url(./img/cup_2.png)');
                }else if(tea==2){
                    $('#cup').css('background-image','url(./img/cup_3.png)');
                }
            }

            function payMoney1(){
                $('#seat1_money').css('display','block');
            }
            function payMoney2(){
                $('#seat2_money').css('display','block');
                $('#seat1_money').css('display','block');
            }
            function payMoney3(){
                $('#seat3_money').css('display','block');
                $('#seat2_money').css('display','block');
                $('#seat1_money').css('display','block');
            }
            function payMoney4(){
                $('#seat4_money').css('display','block');
                $('#seat3_money').css('display','block');
                $('#seat2_money').css('display','block');
                $('#seat1_money').css('display','block');
            }

            /******************* Game Flow **********************/
            /*  state == 0 guest intro
                state == 1 brew the tea
                state == 2 chat
                state == 3 pay money
            */

            function changeState(){
                if (state == 0) {
                    $("#guest_window").css('display', 'block');
                    $("#guest_intro").html(Guest[guestIndex].intro);
                    $('#seat1 p').html(Guest[guestIndex].name[0]);
                    $('#seat2 p').html(Guest[guestIndex].name[1]);
                    $('#seat3 p').html(Guest[guestIndex].name[2]);
                    $('#seat4 p').html(Guest[guestIndex].name[3]);
                    var picg = 'url(./img/g' + guestIndex + '.png)';
                    $('#guest_pic').css("background-image", picg);
                    if(Guest[guestIndex].chat == false){
                        $('#intro_chat').css('display','none');
                        $('#guest_explain').css('display','none');
                    }else{
                        $('#intro_chat').css('display','block');
                        $('#guest_explain').css('display','block');
                    }
                    $('#intro_brew').click(function(){
                        state = 1;
                        $("#guest_window").css('display', 'none');
                    });
                    $('#intro_chat').click(function(){
                        state = 2;
                        $("#guest_window").css('display', 'none');
                    })
                }

                function brewInit(){
                    $('#leavesup').css('display','none');
                    $('#pot').css('background-image','url(./img/pot.png)');
                    $('#cup').css('background-image','url(./img/cup.png)');

                }

                if (state == 1) {
                    if (brewProcess == 0){
                        $('#teabox').css('cursor','pointer');
                        $('#teabox').click(function(){
                            $('#selectTea').css('display','block');
                            brewProcess = 1;
                        });
                    }else if(brewProcess ==1 ){
                        if(puer.lock == false){
                            if(oolong.lock == false){
                                $('#longjing').click(function(){
                                    tea = 0;
                                    $("#selectTea").css('display', 'none');
                                    brewProcess = 2;
                                    $('#leavesup').css('display', 'block');
                                });
                                $('#puer').click(function(){
                                    tea = 1;
                                    $("#selectTea").css('display', 'none');
                                    brewProcess = 2;
                                    $('#leavesup').css('display', 'block');
                                });
                                $('#oolong').click(function(){
                                    tea = 2;
                                    $("#selectTea").css('display', 'none');
                                    brewProcess = 2;
                                    $('#leavesup').css('display', 'block');
                                });
                            }else{
                                $('#longjing').click(function(){
                                    tea = 0;
                                    $("#selectTea").css('display', 'none');
                                    brewProcess = 2;
                                    $('#leavesup').css('display', 'block');
                                });
                                $('#puer').click(function(){
                                    tea = 1;
                                    $("#selectTea").css('display', 'none');
                                    brewProcess = 2;
                                    $('#leavesup').css('display', 'block');
                                });
                            }
                        }else{
                            $('#longjing').click(function(){
                                tea = 0;
                                $("#selectTea").css('display', 'none');
                                brewProcess = 2;
                                $('#leavesup').css('display', 'block');
                            });
                        }
                    }else if(brewProcess == 2){
                        drag('#leavesup','#pot',addLeaves);
                        if (dragT == true){
                            brewProcess = 3;
                            dragT = false;
                        }
                    }else if(brewProcess == 3){
                        drag('#stove','#pot',addWaterLeaves);
                        if (dragT == true){
                            brewProcess = 4;
                            dragT = false;
                        }
                    }else if(brewProcess == 4){
                        drag('#pot','#cup',pourTeaCup);
                        if (dragT == true){
                            brewProcess = 5;
                            dragT = false;
                        }
                    }else if(brewProcess == 5){
                        if (seat4.lock == false) {
                            drag('#cup','#seat1pic',payMoney4);
                            drag('#cup','#seat2pic',payMoney4);
                            drag('#cup','#seat3pic',payMoney4);
                            drag('#cup','#seat4pic',payMoney4);
                            if (dragT == true){
                                brewProcess = 6;
                                dragT = false;
                            }
                        }else if(seat3.lock == false){
                            drag('#cup','#seat1pic',payMoney3);
                            drag('#cup','#seat2pic',payMoney3);
                            drag('#cup','#seat3pic',payMoney3);
                            if (dragT == true){
                                brewProcess = 6;
                                dragT = false;
                            }
                        }else if(seat2.lock == false){
                            drag('#cup','#seat1pic',payMoney2);
                            drag('#cup','#seat2pic',payMoney2);
                            if (dragT == true){
                                brewProcess = 6;
                                dragT = false;
                            }
                        }else{
                            drag('#cup','#seat1pic',payMoney1);
                            if (dragT == true){
                                brewProcess = 6;
                                dragT = false;
                            }
                        } 
                    }else if(brewProcess == 6){
                        $('.money_pay').click(function(){
                            $('.money_pay').css('display','none');
                            $('#money_board').css('display','block');
                            calcMoney  = true;
                        });
                    }
                }

            }
            function calcM(){
                if (calcMoney == true) {
                    money = money + teaPrice * seatNum;
                    calcMoney = false;
                }
            }

            /******************* Update ************************/

            var myVar = setInterval(changeState, 300);
            var myVar1 = setInterval(lockOn, 300);
            var myVar2 = setInterval(setHeader, 300);
            var myVar3 = setInterval(setPara, 300);
            var myVar4 = setInterval(setMoneyPic, 300);
            var myVar4 = setInterval(calcM, 100);



        })();