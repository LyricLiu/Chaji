(function() {
    function teaset(name, lock, level, earn, cost) {
        this.name = name;
        this.lock = lock;
        this.level = level;
        this.earn = earn;
        this.cost = cost;
    }

    function Tset(drag, click) {
        this.drag = drag;
        this.click = click;
    }

    $('#stove').attr('drag', 'false');
    $('#pot').attr('drag', 'false');
    $('#cup').attr('drag', 'false');
    $('#leavesup').attr('drag', 'false');

    var level = 0;
    var money = 0;
    var tea = 0;
    var guestIndex = 0;
    var teaPrice = 20;
    var seatNum = 1;
    var dragT = false;

    var seat1_mg = false;
    var seat2_mg = false;
    var seat3_mg = false;
    var seat4_mg = false;

    var timeNow = [0, 0];

    var teapet = new teaset('teapet', true, 3, 200, 800);
    var smelling = new teaset('smelling', true, 4, 0, 400);
    var pitcher = new teaset('pitcher', true, 2, 0, 50);
    var dessert = new teaset('dessert', true, 3, 300, 1000);
    var decobuy1 = new teaset('decobuy1', true, 2, 30, 150);
    var decobuy2 = new teaset('decobuy2', true, 1, 50, 200);
    var puer = new teaset('puer', true, 0, 0, 50);
    var oolong = new teaset('oolong', true, 1, 0, 100);
    var seat2 = new teaset('seat2', false, 0, 0, 100);
    var seat3 = new teaset('seat3', false, 0, 0, 200);
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

    var g0_0 = 'Congratulations, my friend! You are now the owner of this fantastic shop! I know you are excited and wanna try it now. But before you serve the first guest, let me teach you the simplest way of brew the tea! Click the button below to start!';
    var g1_0 = "Hi! I am Alice, I come from Switzerland where I have a pretty farm with cows and chickens. It's the first time for me to taste the tea, I am very excited! I don't have any preference, just show me what's popular in your shop.";
    var g1_1 = "You: Hi, Alice! I am glad to meet you! You are my first guest!";
    var g1_2 = "Alice: Oh, I am so lucky! You know today is my final day here, so I was wondering where to spend this most precious afternoon. Then I though I should experience tea culture since I am here and I found your tea shop. It’s so great, I like everything here, the furniture, the aroma …";
    var g1_3 = "You: Thank you! Actually, I am just a seven day owner. But I will try my best to improve this tiny space. Do you have any suggestions?";
    var g1_4 = "Alice: I am not a tea expert, but there is a market I want to recommend. I think you could but more tea sets from there, that would improve your business …";
    var g2_0 = "Qin: It seems like here we have a new shop owner! Hi, I am Qin, an old customer of this tea shop. I own a silk shop across the street. Whenever there is no customer, I would come to this tea shop and have my favorite Puer tea. I am glad I will have a new flavor today. You are a novice, right? ";
    var g2_1 = "You: Thanks for visiting! Yes, I am new here. Hope you don’t mind I have almost no tea knowledge. Why Pu’er is your favorite tea?";
    var g2_2 = "Qin: You know I have to stay in my shop all day, so I feel tired sometimes. Pu’er tea has a stronger flavor than other tea which helps me reduce plaque. Also, it lowers the risk of heart disease and diabetes. It’s healthy. ";
    var g2_3 = "You: Oh, that’s great! It sounds like you know a lot about tea. Can you give me any suggestion to improve my brewing skill?";
    var g2_4 = "Qin: Definitely, let’s brew a tea, I will tell you how to do it. But, firstly, you need to buy a pitcher in the tea shop!";
    var g0 = new guest(['Fernando'], false, 0, g0_0, []);
    var g1 = new guest(['Alice'], true, 0, g1_0, [g1_1, g1_2, g1_3, g1_4]);
    var g2 = new guest(['Qin', 'Lily'], true, 1, g2_0, [g2_1, g2_2, g2_3, g2_4]);

    var Guest = [g0, g1, g2];

    var iclick = 0;

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
            $('#level').html("Novice");
        } else if (level == 1) {
            $('#level').html("Beginner");
        } else if (level == 2) {
            $('#level').html("Intermediated");
        } else if (level == 3) {
            $('#level').html("Advanced");
        } else {
            $('#level').html("Expert");
        }
        $('#money').html(guestIndex);
    }

    function setMoneyPic() {
        if ((teaPrice >= 60) && (teaPrice <= 200)) {
            $('.money_pay').css('background-image', 'url(./img/money2.png)');
        } else if (teaPrice > 200) {
            $('.money_pay').css('background-image', 'url(./img/money3.png)');
        }
    }

    /***************** Drag Function *********************/
    /*
        source: '#source'
        fn:function
    */

    function drag(source, target, fn) {

        var $sourceClone;
        $(source).css('cursor', 'pointer');

        $(document).on('mousedown', source, function(ev) {
            if ($(source).attr('drag') != 'true') {
                return;
            }

            $sourceClone = $(source).clone();
            $('body').append($sourceClone);
            $(source).css('display', 'none');


            $sourceClone.css({
                opacity: 1,
                marginTop: '-50px',
                marginLeft: '-50px',
                pointerEvents: 'none',
                left: ev.pageX,
                top: ev.pageY
            });
        })

        .on('mousemove', function(ev) {
            $sourceClone && $sourceClone.css({
                left: ev.pageX,
                top: ev.pageY
            });
        })

        .on('mouseenter', target, function() {
            if ($sourceClone) {
                fn();
                dragT = true;
            }
        })

        .on('mouseup', target, function() {
            if ($sourceClone) {
                $(source).css('display', 'block');
            }
        })

        .on('mouseup', function() {
            if ($sourceClone) {
                $sourceClone.remove();
                $sourceClone = null;
                $(source).css('display', 'block');
            }
        })
    }

    /****************** Brew Animation *********************/

    function addLeaves() {
        $('#pot').css('background-image', 'url(./img/pot_1.png)');
        leaves.drag = false;
        if (guestIndex == 0) {
            $('#guild2').css('display', 'none');
            $('#guild3').css('display', 'block');
        }
        $('#stove').attr('drag', 'true');
        $('#leaves').attr('drag', 'false');

    }

    function addWaterLeaves() {
        setTimeout(function() { $('#pot').css('background-image', 'url(./img/pot_2.png)'); }, 200);
        setTimeout(function() { $('#pot').css('background-image', 'url(./img/pot_3.png)'); }, 400);
        setTimeout(function() { $('#pot').css('background-image', 'url(./img/pot_4.png)'); }, 600);
        setTimeout(function() { $('#pot').css('background-image', 'url(./img/pot.png)'); }, 800);
        if (guestIndex == 0) {
            $('#guild3').css('display', 'none');
            $('#guild4').css('display', 'block');
        }
        $('#stove').attr('drag', 'false');
        $('#pot').attr('drag', 'true');
    }

    function pourTeaCup() {
        if (tea == 0) {
            $('#cup').css('background-image', 'url(./img/cup_1.png)');
        } else if (tea == 1) {
            $('#cup').css('background-image', 'url(./img/cup_2.png)');
        } else if (tea == 2) {
            $('#cup').css('background-image', 'url(./img/cup_3.png)');
        }
        if (guestIndex == 0) {
            $('#guild4').css('display', 'none');
            $('#guild5').css('display', 'block');
        }
        $('#pot').attr('drag', 'false');
        $('#cup').attr('drag', 'true');
    }

    function payMoney() {
        if (seat4.lock == false) {
            $('#seat1_money').css('display', 'block');
            $('#seat2_money').css('display', 'block');
            $('#seat3_money').css('display', 'block');
            $('#seat4_money').css('display', 'block');
            seat1_mg = true;
            seat2_mg = true;
            seat3_mg = true;
            seat4_mg = true;
            getMoney();

        } else if (seat3.lock == false) {
            $('#seat1_money').css('display', 'block');
            $('#seat2_money').css('display', 'block');
            $('#seat3_money').css('display', 'block');
            seat1_mg = true;
            seat2_mg = true;
            seat3_mg = true;
            getMoney();

        } else if (seat2.lock == false) {
            $('#seat1_money').css('display', 'block');
            $('#seat2_money').css('display', 'block');
            seat1_mg = true;
            seat2_mg = true;
            getMoney();

        } else {
            $('#seat1_money').css('display', 'block');
            seat1_mg = true;
            getMoney();
        }
    }

    function getMoney() {
        $('#cup').attr('drag', 'false');
    }

    $('#seat1_money').on("click", function() {
        if (seat1_mg == true) {
            money += teaPrice;
            setPara();
        }
        seat1_mg = false;
        $('#seat1_money').css('display', 'none');
        if ((seat1_mg == false) && (seat2_mg == false) && (seat3_mg == false) && (seat4_mg == false)) {
            restart = true;
            brewInit();
            guestIntro();
        }
    });
    $('#seat2_money').on("click", function() {
        if (seat2_mg == true) {
            money += teaPrice;
            setPara();
        }
        seat2_mg = false;
        $('#seat2_money').css('display', 'none');
        if ((seat1_mg == false) && (seat2_mg == false) && (seat3_mg == false) && (seat4_mg == false)) {
            brewInit();
            guestIntro();
        }
    });
    $('#seat3_money').on("click", function() {
        if (seat3_mg == true) {
            money += teaPrice;
            setPara();
        }
        seat3_mg = false;
        $('#seat3_money').css('display', 'none');
        if ((seat1_mg == false) && (seat2_mg == false) && (seat3_mg == false) && (seat4_mg == false)) {
            brewInit();
            guestIntro();
        }
    });
    $('#seat4_money').on("click", function() {
        if (seat4_mg == true) {
            money += teaPrice;
            setPara();
        }
        seat4_mg = false;
        $('#seat4_money').css('display', 'none');
        if ((seat1_mg == false) && (seat2_mg == false) && (seat3_mg == false) && (seat4_mg == false)) {
            brewInit();
            guestIntro();
        }
    })

    /******************* Game Section **********************/
    function brewInit() {
        $('#leavesup').css('display', 'none');
        $('#pot').css('background-image', 'url(./img/pot.png)');
        $('#cup').css('background-image', 'url(./img/cup.png)');
        if (guestIndex == 0) {
            $('#guild5').css('display', 'none');
        }
        timeNow[1] += 1;
        setHeader();
        guestIndex += 1;
    }


    function brew1() {
        drag('#leavesup', '#pot', addLeaves);
        drag('#stove', '#pot', addWaterLeaves);
        drag('#pot', '#cup', pourTeaCup);
        drag('#cup', '#seat1pic', payMoney);
        drag('#cup', '#seat2pic', payMoney);
        drag('#cup', '#seat3pic', payMoney);
        drag('#cup', '#seat4pic', payMoney);
    }



    function brew() {
        $("#chat_brew").css('display', 'none');
        if (guestIndex == 0) {
            $('#guild1').css('display', 'block');
        }
        $('#teabox').click(function() {
            $('#selectTea').css('display', 'block');
            $('#guild1').css('display', 'none');
        });
        if (puer.lock == false) {
            if (oolong.lock == false) {
                $('#longjing').click(function() {
                    tea = 0;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    brew1();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                    $('#leavesup').attr('drag', 'true');
                });
                $('#puer').click(function() {
                    tea = 1;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    brew1();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                    $('#leavesup').attr('drag', 'true');
                });
                $('#oolong').click(function() {
                    tea = 2;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    brew1();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                    $('#leavesup').attr('drag', 'true');
                });
            } else {
                $('#longjing').click(function() {
                    tea = 0;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    brew1();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                    $('#leavesup').attr('drag', 'true');
                });
                $('#puer').click(function() {
                    tea = 1;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    brew1();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                    $('#leavesup').attr('drag', 'true');
                });
            }
        } else {
            $('#longjing').click(function() {
                tea = 0;
                $("#selectTea").css('display', 'none');
                $('#leavesup').css('display', 'block');
                if (guestIndex == 0) {
                    $('#guild2').css('display', 'block');
                }
                $('#leavesup').attr('drag', 'true');
                brew1();
            });
        }
    }

    /****************** chat section  *******************/
    function showChat() {
        if (iclick == 1) {
            $('#chat_content').html(Guest[guestIndex].words[1]);
        } else if (iclick == 2) {
            $('#chat_content').html(Guest[guestIndex].words[2]);
        } else if (iclick == 3) {
            $('#chat_content').html(Guest[guestIndex].words[3]);
            $('#chat_brew').css('display', 'block');
            if (guestIndex == 2) {
                //add open shop window;
            }
        }
    }

    $('#chat_window').on("click", function() {
        iclick += 1;
        showChat();
    })

    $('#chat_brew').on("click",function() {
        iclick = 0;
        $('#chat_brew').css('display', 'none');
        $("#chat_window").css('display', 'none');
        brew();
    });

    function guestChat() {
        $('#chat_window').css('display', 'block');
        var picg = 'url(./img/g' + guestIndex + '.png)';
        $('#chat_pic').css("background-image", picg);
        $('#chat_content').html(Guest[guestIndex].words[0]);
    }


    /***************** Guest Intro ********************/

    $('#intro_chat').on("click", function() {
        $("#guest_window").css('display', 'none');
        timeNow[1] += 1;
        setHeader();
        guestChat();
    })

    function guestIntro() {
        $('#guild5').css('display', 'none');
        $("#guest_window").css('display', 'block');
        $("#guest_intro").html(Guest[guestIndex].intro);
        $('#seat1 p').html(Guest[guestIndex].name[0]);
        $('#seat2 p').html(Guest[guestIndex].name[1]);
        $('#seat3 p').html(Guest[guestIndex].name[2]);
        $('#seat4 p').html(Guest[guestIndex].name[3]);
        var picg = 'url(./img/g' + guestIndex + '.png)';
        $('#guest_pic').css("background-image", picg);
        if (Guest[guestIndex].chat == false) {
            $('#intro_chat').css('display', 'none');
            $('#guest_explain').css('display', 'none');
        } else {
            $('#intro_chat').css('display', 'block');
            $('#guest_explain').css('display', 'block');
        }
        $('#intro_brew').click(function() {
            brew();
            //brewProcess(); --- the first of brew tea
            $("#guest_window").css('display', 'none');
        });
    }

    guestIntro();
    lockOn();
    setHeader();
    setPara();

})();