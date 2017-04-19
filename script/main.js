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
    $('#pitcher').attr('drag', 'false');

    var level = 0;
    var money = 100;
    var tea = 0;
    var guestIndex = 0;
    var teaPrice = 20;
    var dragT = false;

    var seat1_mg = false;
    var seat2_mg = false;
    var seat3_mg = false;
    var seat4_mg = false;



    var timeNow = [0, 0];

    var teapet = new teaset('teapet', true, 3, 200, 800);
    var smelling = new teaset('smelling', true, 4, 0, 400);
    var pitcher = new teaset('pitcher', true, 1, 30, 20);
    var dessert = new teaset('dessert', true, 3, 300, 1000);
    var decobuy1 = new teaset('decobuy1', true, 1, 0, 150);
    var decobuy2 = new teaset('decobuy2', true, 2, 0, 350);
    var puer = new teaset('puer', true, 0, 0, 20);
    var oolong = new teaset('oolong', true, 1, 0, 50);

    var leaves = new teaset('leaves', false, 3, 100, 600);
    var highpot = new teaset('leaves', false, 4, 800, 2000);

    var seat2 = new teaset('seat2', true, 0, 0, 100);
    var seat3 = new teaset('seat3', true, 0, 0, 200);
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
    var g1_4 = "Alice: I am not a tea expert, but there is a market I want to recommend. I think you could buy more tea sets from there, that would improve your business …";
    var g2_0 = "Qin: It seems like here we have a new shop owner! Hi, I am Qin, an old customer of this tea shop. I own a silk shop across the street. Whenever there is no customer, I would come to this tea shop and have my favorite Puer tea. I am glad I will have a new flavor today. You are a novice, right? ";
    var g2_1 = "You: Thanks for visiting! Yes, I am new here. Hope you don’t mind I have almost no tea knowledge. Why Pu’er is your favorite tea?";
    var g2_2 = "Qin: You know I have to stay in my shop all day, so I feel tired sometimes. Pu’er tea has a stronger flavor than other tea which helps me reduce plaque. Also, it lowers the risk of heart disease and diabetes. It’s healthy. ";
    var g2_3 = "You: Oh, that’s great! It sounds like you know a lot about tea. Can you give me any suggestion to improve my brewing skill?";
    var g2_4 = "Qin: Definitely, let’s brew a tea, I will tell you how to do it. But, firstly, you need to buy a pitcher in the tea shop!";
    var g3_0 = "How’s everything going? I am your neighbor and I have been living in this town for ten years. But I have never been in this shop. Don’t mind, it’s not your fault. I don’t like the former shop owner. Anyway, may I have a cup of Oolong? Thanks!";
    var g3_1 = "You: No problem, Mr. Wang. I am wondering what makes you dislike Mr. Li. ";
    var g3_2 = "Mr. Wang: Um, actually I have never met him. I just heard some bad things about him. It is said that, he had never washed the tea leaves before serving the guest. Also, he didn’t use the pitcher. You know the pitcher is impotent to make the tea taste good.";
    var g3_3 = "You: Oh, I apologize that I am a beginner, I know nothing about what you said. Do you mind teach me?";
    var g3_4 = "Mr. Wang: Ok, click the brew button, make sure you have a pitcher and follow me!";
    var g4_0 = "I am gland to see there is a tea shop here! It’s hot outside, I am thirsty now. Hi, my name is Qiu Qiu. I want a cup of tea to drink. Do you have any recommendation that is not that bitter and can make me feel relaxed?";
    var g4_1 = "You: Hi, Qiu Qiu. Nice to meet you! I would like to recommend Long Jing tea to you. It is a kind of green tea. The flavor is not as strong as Oolong and Puer. I bet you would like it.";
    var g4_2 = "Qiu Qiu: That would be great!";
    var g4_3 = "You: Haha, you know green tea is my favorite one. I read from a book that it can also improve bran function and promote weight loss.";
    var g4_4 = "Qiu Qiu: Really? I cannot wait to taste it!";
    var g5_0 = "Hi! I am Micheal. Congrats on opening your new place! I originally came from New Zealand, I am a farm owner there. But for now I run a Jewelry business. I have been living here for five years and really love this place. Can I have a cup of Puer tea?";
    var g5_1 = "Thank you! You are my first guest that comes from New Zealand. What makes you change your business? Being a farm owner is pretty cool, I think.";
    var g5_2 = "You are right. I have never though of coming to China five years ago. A trip changed me. It is the food here that made me really want to stay. I love noodles, dumplings and hot pot. Also, I love tea.";
    var g5_3 = "Good to know! You are welcome to come here as often as you like!";
    var g5_4 = "That’s for sure!";
    var g6_0 = "Namaste. I am Bharati, I came from India. It’s my first time to taste Chinese tea. I am a Indian tea fever. Assam tea and Darjeeling tea are my favorite. Do you serve these two kinds of tea? No worries, if you don’t, I am totally open to all kinds of flavor!";
    var g6_1 = "Hi Bharati. Nice to see you! You can see I am a foreigner here, I don’t know much about Chinese tea, not to mention indian tea. That’s being said, there is a name I have heard before which is “Masala Chai”. Do you mind let me know what it is?";
    var g6_2 = "Haha, yeah. So, basically, it is a flavoured tea beverage made by brewing black tea with a mixture of aromatic Indian spices and herbs. It is traditionally prepared by a decoction of green cardamom pods, cinnamon sticks, ground cloves, ground ginger, and black peppercorn together with black tea leaves.";
    var g6_3 = "Oh, that sounds delicious! I hope to try it one day!";
    var g6_4 = "I believe it won’t let you down. What would you like to brew for me now? I cannot wait to taste it!";
    var g7_0 = "It’s surprising to see you missed so many important brewing processes! Hi, I am Yu Xuan, a Chinese Zither musician. Except for music which is my job, studying tea is my favorite thing to do. I would like to have a cup of Oolong tea. I am open to discuss everything that’s about tea culture.";
    var g7_1 = "Hi Ms. Yu. I am so excited to meet someone who knows a lot about tea culture! Do you mind share some tea making knowledge with me?";
    var g7_2 = "Well. Do you know why we need to use the pitcher when we brew the tea. It is because if you pour the tea directly from pot to cups, each cup of tea will have a slightly different strength.";
    var g7_3 = "Oh, so that’s why we need to shake the pitcher before we pour the liquid into the drinking cup.";
    var g7_4 = "Correct. Also, there is a golden rule of tea making. The smaller the pot, the better the tea. So you see here you used is a very small purple sand clay pot… Let me show you a good way to brew the tea. Click the brew button and follow me. I believe hands-on practice is the best way to improve your knowledge.";
    var g8_0 = "Hi, have me met before? I am Chen. A manager for the largest shipping company here. I played Majiang for the whole night. I feel sleepy now, but I have to work two hours later. I hate it! I want something that can make me feel refreshed or I won’t pay you even a coin.";
    var g8_1 = "You are so gorgeous, Mr. Chen. I don’t think we met before which is good for me. Please be polite or I won’t serve you.";
    var g8_2 = "Hey, I just kidding. Don’t be so serious. I am a regular customer for this shop.";
    var g8_3 = "Well, okay. So, where are your friends?";
    var g8_4 = "My friends are gorgers! They eat me out of house. Basically, I’m on my own…";
    var g9_0 = "Hi, I cannot believe that I am meeting you here! I don’t know what to say. How’s everything going? Your new job is fantastic! I miss you so much these years. Oh, almost forgotten, I am traveling here with my friends Christine and Stephanie. Can we have green tea?";
    var g9_1 = "Hi, Joanna! My warmest welcome to you. You are always so addictive. I am doing well! I really like my job, I learn a lot here! I am only a step away from true tea master!";
    var g9_2 = "That’s the greatest news I heard this year! I am proud of you! Is there anything I can do for you?";
    var g9_3 = "Thanks a lot, Joanna! The biggest problem I face now is that I need to earn 4000 coins in five days which is stressful. Except for that, I am doing everything good!";
    var g9_4 = "Oh, that’s stressful. No worries, My friends and I want to buy some tea leaves home, we can buy from you! Here is 1000 coins, let me taste your work!";


    var g0 = new guest(['Mr.Li'], false, 3, g0_0, []);
    var g1 = new guest(['Alice'], true, 3, g1_0, [g1_1, g1_2, g1_3, g1_4]);
    var g2 = new guest(['Qin', 'Lily'], true, 1, g2_0, [g2_1, g2_2, g2_3, g2_4]);
    var g3 = new guest(['Mr.Wang', 'Mrs.Wang'], true, 2, g3_0, [g3_1, g3_2, g3_3, g3_4]);
    var g4 = new guest(['Qiu Qiu', 'Lucy', "Ann"], true, 0, g4_0, [g4_1, g4_2, g4_3, g4_4]);
    var g5 = new guest(['Micheal', 'Jason', "Nick"], true, 1, g5_0, [g5_1, g5_2, g5_3, g5_4]);
    var g6 = new guest(['Bharati', 'Gitika', "Dahana"], true, 3, g6_0, [g6_1, g6_2, g6_3, g6_4]);
    var g7 = new guest(['Ms.Yu', 'Ms.Ling ', "Ms.Hu"], true, 2, g7_0, [g7_1, g7_2, g7_3, g7_4]);
    var g8 = new guest(['Mr.Chen', 'Ms.Qin ', "Mr.Zhang"], true, 1, g8_0, [g8_1, g8_2, g8_3, g8_4]);
    var g9 = new guest(['Joanna', 'Christine ', "Stephanie", "Mariam"], true, 3, g9_0, [g9_1, g9_2, g9_3, g9_4]);


    var Guest = [g0, g1, g2, g3, g4, g5, g6, g7, g8, g9];

    var iclick = 0;
    var brew2_first = true;
    var brew3_first = true;
    var brew4_first = true;
    var brew5_first = true;

    function popLevel(){
        if (level == 0) {
            $('#levelwhat').html("#1 Novice");
        } else if (level == 1) {
            $('#levelwhat').html("#2 Beginner");
        } else if (level == 2) {
            $('#levelwhat').html("#3 Intermediated");
        } else if (level == 3) {
            $('#levelwhat').html("#4 Advanced");
        } else {
            $('#levelwhat').html("#5 Expert");
        }
        $('#levelup').css('display','block');
        $('#levelup').addClass('animated bounceIn');
        setTimeout(function() { $('#levelup').fadeOut(500); }, 2000);
    }

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
        $('#money').html(money);
    }

    function setMoneyPic() {
        if ((teaPrice >= 60) && (teaPrice <= 200)) {
            $('.money_pay').css('background-image', 'url(./img/money2.png)');
        } else if (teaPrice > 200) {
            $('.money_pay').css('background-image', 'url(./img/money3.png)');
        }
    }

    /****************** Set Shop ********************/
    $('#sell1').on("click", function() {
        if (money >= 20) {
            puer.lock = false;
            money -= 20;
            setPara();
            lockOn();
            $('#sell1h').css('display', 'block');
        }
    })

    $('#sell2').on("click", function() {
        if (money >= 50) {
            oolong.lock = false;
            money -= 50;
            setPara();
            lockOn();
            $('#sell2h').css('display', 'block');
        }
    })

    $('#sell3').on("click", function() {
        if (money >= 20) {
            pitcher.lock = false;
            money -= 20;
            setPara();
            lockOn();
            $('#sell3h').css('display', 'block');
        }
    })

    $('#sell4').on("click", function() {
        if (money >= 150) {
            seat2.lock = false;
            money -= 150;
            setPara();
            lockOn();
            $('#sell4h').css('display', 'block');
        }
    })

    $('#sell5').on("click", function() {
        if (money >= 350) {
            seat3.lock = false;
            money -= 350;
            setPara();
            lockOn();
            $('#sell5h').css('display', 'block');
        }
    })

    $('#sell6').on("click", function() {
        if (money >= 800) {
            seat4.lock = false;
            money -= 800;
            setPara();
            lockOn();
            teaPrice += 150;
            $('#sell6h').css('display', 'block');
        }
    })

    $('#sell7').on("click", function() {
        if (money >= 1000) {
            money -= 1000;
            dessert.lock = false;
            setPara();
            lockOn();
            teaPrice += 300;
            $('#sell7h').css('display', 'block');
        }
    })

    $('#sell8').on("click", function() {
        if (money >= 600) {
            money -= 600;
            //change picture;
            setPara();
            lockOn();
            teaPrice += 100;
            $('#sell8h').css('display', 'block');
        }
    })

    $('#sell9').on("click", function() {
        if (money >= 400) {
            money -= 400;
            smelling.lock = false;
            setPara();
            lockOn();
            teaPrice += 50;
            $('#sell9h').css('display', 'block');
        }
    })

    $('#sell10').on("click", function() {
        if (money >= 2000) {
            money -= 2000;
            //change picture;
            setPara();
            lockOn();
            teaPrice += 800;
            $('#sell9h').css('display', 'block');
        }
    })


    function setShopLock() {
        if (level == 0) {
            $('#sell1').css('display', 'block');
        } else if (level == 1) {
            $('#sell1').css('display', 'block');
            $('#sell2').css('display', 'block');
            $('#sell3').css('display', 'block');
        } else if (level == 2) {
            $('#sell1').css('display', 'block');
            $('#sell2').css('display', 'block');
            $('#sell3').css('display', 'block');
            $('#sell4').css('display', 'block');
            $('#sell5').css('display', 'block');
        } else if (level == 3) {
            $('#sell1').css('display', 'block');
            $('#sell2').css('display', 'block');
            $('#sell3').css('display', 'block');
            $('#sell4').css('display', 'block');
            $('#sell5').css('display', 'block');
            $('#sell6').css('display', 'block');
            $('#sell7').css('display', 'block');
            $('#sell8').css('display', 'block');
        } else if (level == 4) {
            $('#sell1').css('display', 'block');
            $('#sell2').css('display', 'block');
            $('#sell3').css('display', 'block');
            $('#sell4').css('display', 'block');
            $('#sell5').css('display', 'block');
            $('#sell6').css('display', 'block');
            $('#sell7').css('display', 'block');
            $('#sell8').css('display', 'block');
            $('#sell9').css('display', 'block');
            $('#sell10').css('display', 'block');
        }
    }

    $('#icon3').on("click", function() {
        setShopLock();
        $('#shop_window').css('display', 'block');
    })

    $('#cross').on("click", function() {
        $('#shop_window').css('display', 'none');
    })

    $('#icon4').on("click", function() {
        $('#ques_window').css('display', 'block');
    })

    $('#ques_cross').on("click", function() {
        $('#ques_window').css('display', 'none');
    })

    function addHour(){
        if (timeNow[1]<5){
            timeNow[1]+=1;
        }else if(timeNow[1]==5){
            timeNow[0]+=1;
            timeNow[1]=0;
        }
        setHeader();
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
        if(brew2_first ==true && level==1) {
            $('#guild6').css('display', 'block');
        }
        if(brew3_first ==true && level==2) {
            $('#guild8').css('display', 'block');
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

    rightTea = () => {
        if (Guest[guestIndex].tea == tea) {
            money += teaPrice;
            money += 50;
            $('#money_pop').css('display', 'block');
            var mp = teaPrice + 50;
            $('#teaP').html(mp);
            setPara();
            setTimeout(function() { $('#money_pop').fadeOut(500); }, 900)
        } else {
            money += teaPrice;
            $('#money_pop').css('display', 'block');
            $('#teaP').html(teaPrice);
            setPara();
            setTimeout(function() { $('#money_pop').fadeOut(500); }, 900)

        }
    }

    function getMoney() {
        $('#cup').attr('drag', 'false');
    }

    $('#seat1_money').on("click", function() {
        if (seat1_mg == true) {
            rightTea();
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
            rightTea();
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
            rightTea();
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
            rightTea();
        }
        seat4_mg = false;
        $('#seat4_money').css('display', 'none');
        if ((seat1_mg == false) && (seat2_mg == false) && (seat3_mg == false) && (seat4_mg == false)) {
            brewInit();
            guestIntro();
        }
    })

    /**** brew 2*****/

    function pourTeaPitcher() {
        if (tea == 0) {
            $('#pitcher').css('background-image', 'url(./img/pitcher0.png)');
        } else if (tea == 1) {
            $('#pitcher').css('background-image', 'url(./img/pitcher1.png)');
        } else if (tea == 2) {
            $('#pitcher').css('background-image', 'url(./img/pitcher2.png)');
        }
        if(brew2_first ==true) {
            $('#guild6').css('display', 'none');
            $('#guild7').css('display', 'block');
        }
        setTimeout(function() {$('#pitcher').addClass('animated wobble'); }, 400);
        setTimeout(function() {$('#pitcher').removeClass('animated wobble');}, 1400);
        $('#pot').attr('drag', 'false');
        $('#pitcher').attr('drag', 'true');
    }

    function pourTeaCup1() {
        if (tea == 0) {
            $('#cup').css('background-image', 'url(./img/cup_1.png)');
        } else if (tea == 1) {
            $('#cup').css('background-image', 'url(./img/cup_2.png)');
        } else if (tea == 2) {
            $('#cup').css('background-image', 'url(./img/cup_3.png)');
        }
        $('#pitcher').css('background-image', 'url(./img/pitcher.png)');
        $('#pitcher').css('left', '38%');
        if(brew2_first ==true) {
            $('#guild7').css('display', 'none');
            brew2_first = false;
        }
        if (guestIndex == 0) {
            $('#guild4').css('display', 'none');
            $('#guild5').css('display', 'block');
        }
        $('#pitcher').attr('drag', 'false');
        $('#cup').attr('drag', 'true');
    }

    /********** brew 3 ***********/

    function pourFirst(){
        $('#dump').fadeIn(500);
        setTimeout(function() { $('#dump').fadeOut(500); }, 900)
        $('#pot').attr('drag', 'false');
        $('#stove').attr('drag', 'true');
        if(brew3_first ==true && level==2) {
            $('#guild8').css('display', 'none');
            brew3_first =false;
        }

    }

    /********** brew 4 *********/ 
    function addWaterWarm() {
        setTimeout(function() { $('#pot_cover').css('background-image', 'url(./img/pot11.png)'); }, 200);
        setTimeout(function() { $('#pot_cover').css('background-image', 'url(./img/pot22.png)'); }, 400);
        setTimeout(function() { $('#pot_cover').css('background-image', 'url(./img/pot33.png)'); }, 600);
        setTimeout(function() { $('#pot_cover').css('background-image', ''); }, 800);
        setTimeout(function() { $('#pot_cover').css('display', 'none'); }, 800);
        if(brew4_first ==true && level==3) {
            $('#guild9').css('display', 'none');
            $('#guild10').css('display', 'block');
        }
        $('#stove').attr('drag', 'false');
        $('#pot').attr('drag', 'true');
    }

    function pourWarm(){
        $('#pot_cover').css('display', 'none');
        $('#dump').fadeIn(500);
        setTimeout(function() { $('#dump').fadeOut(500); }, 900)
        $('#pot').attr('drag', 'false');
        $('#leavesup').attr('drag', 'true');
        if(brew4_first ==true && level==3) {
            $('#guild10').css('display', 'none');
            brew4_first =false;
        }
    }
    /******************* Game Section **********************/
    function brewInit() {
        $('#leavesup').css('display', 'none');
        $('#pot').css('background-image', 'url(./img/pot.png)');
        $('#cup').css('background-image', 'url(./img/cup.png)');
        if (guestIndex == 0) {
            $('#guild5').css('display', 'none');
        }
        addHour();
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

    function brew2() {
        drag('#leavesup', '#pot', addLeaves);
        drag('#stove', '#pot', addWaterLeaves);
        if (pitcher.lock == false) {
            drag('#pot', '#pitcher', pourTeaPitcher);
        }
        drag('#pitcher', '#cup', pourTeaCup1);
        drag('#cup', '#seat1pic', payMoney);
        drag('#cup', '#seat2pic', payMoney);
        drag('#cup', '#seat3pic', payMoney);
        drag('#cup', '#seat4pic', payMoney);
    }

    function brew3(){
        drag('#leavesup', '#pot', addLeaves);
        drag('#stove', '#pot', addWaterLeaves);
        drag('#pot','#sink',pourFirst);
        drag('#stove', '#pot', addWaterLeaves);
        if (pitcher.lock == false) {
            drag('#pot', '#pitcher', pourTeaPitcher);
        }
        drag('#pitcher', '#cup', pourTeaCup1);
        drag('#cup', '#seat1pic', payMoney);
        drag('#cup', '#seat2pic', payMoney);
        drag('#cup', '#seat3pic', payMoney);
        drag('#cup', '#seat4pic', payMoney);
    }

    function brew4(){
        if(brew4_first ==true && level==3) {
            $('#guild9').css('display', 'block');
        }
        drag('#stove', '#pot_cover', addWaterWarm);
        drag('#pot','#sink',pourWarm);
        drag('#leavesup', '#pot', addLeaves);
        drag('#stove', '#pot', addWaterLeaves);
        drag('#pot','#sink',pourFirst);
        drag('#stove', '#pot', addWaterLeaves);
        if (pitcher.lock == false) {
            drag('#pot', '#pitcher', pourTeaPitcher);
        }
        drag('#pitcher', '#cup', pourTeaCup1);
        drag('#cup', '#seat1pic', payMoney);
        drag('#cup', '#seat2pic', payMoney);
        drag('#cup', '#seat3pic', payMoney);
        drag('#cup', '#seat4pic', payMoney);
    }

    function decideBrew() {
        if (level == 0) {
            $('#leavesup').attr('drag', 'true');
            brew1();
        } else if (level == 1) {
            $('#leavesup').attr('drag', 'true');
            brew2();
        } else if (level == 2) {
            $('#leavesup').attr('drag', 'true');
            brew3();
        } else if (level == 3) {
            $('#stove').attr('drag', 'true');
            $('#pot_cover').css('display', 'block');
            brew4();
        } else if (level == 4) {
            $('#stove').attr('drag', 'true');
            brew5();
        }
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
                    decideBrew();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                });
                $('#puer').click(function() {
                    tea = 1;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    decideBrew();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                });
                $('#oolong').click(function() {
                    tea = 2;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    decideBrew();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                });
            } else {
                $('#longjing').click(function() {
                    tea = 0;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    decideBrew();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
                });
                $('#puer').click(function() {
                    tea = 1;
                    $("#selectTea").css('display', 'none');
                    $('#leavesup').css('display', 'block');
                    decideBrew();
                    if (guestIndex == 0) {
                        $('#guild2').css('display', 'block');
                    }
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
                decideBrew();
            });
        }
    }

    /****************** chat section  *******************/

    $('#chat_window').on("click", function() {
        if (iclick < 3) {
            iclick += 1;
            $('#chat_content').html(Guest[guestIndex].words[iclick]);
        } else if (iclick == 3) {
            $('#chat_content').html(Guest[guestIndex].words[iclick]);
            $('#chat_brew').css('display', 'block');
            // check guest number to improve the index.
            if (guestIndex == 2) {
                level += 1;
                teaPrice += 50;
                if (level == 1){
                    $('#shop_window').css('display', 'block');
                    setShopLock();
                }
                setPara();
            }
            if (guestIndex == 3) {
                level += 1;
                teaPrice += 50;
                if (level == 1){
                    $('#shop_window').css('display', 'block');
                    setShopLock();
                }
                setPara();
            }
            if (guestIndex == 7) {
                level += 1;
                teaPrice += 50;
                if (level == 1){
                    $('#shop_window').css('display', 'block');
                    setShopLock();
                }
                setPara();
            }
        }
    })

    $('#chat_brew').on("click", function() {
        iclick = 0;
        $("#chat_window").css('display', 'none');
        $('#shop_window').css('display', 'none');
        brew();
        if (guestIndex == 2 || guestIndex == 3 || guestIndex == 7){
            popLevel();
        }
    });

    function guestChat() {
        iclick = 0;
        $('#chat_brew').css('display', 'none');
        $('#chat_window').css('display', 'block');
        var picg = 'url(./img/g' + guestIndex + '.png)';
        $('#chat_pic').css("background-image", picg);
        $('#chat_content').html(Guest[guestIndex].words[0]);
    }


    /***************** Guest Intro ********************/

    $('#intro_chat').on("click", function() {
        $("#guest_window").css('display', 'none');
        addHour();
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