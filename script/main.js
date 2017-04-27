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
    var money = 0;
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

    var g0_0 = 'Congratulations, my friend! You are now the owner of this fantastic shop! I know you are excited and wanna try it now. But before you serve the first guest, let me teach you the simplest way of brew the tea! <span> Click the button below </span> to start!';
    var g1_0 = "Hi! I am Alice, I come from Switzerland where I have a pretty farm with cows and chickens. It's the first time for me to taste the tea, I am very excited! I don't have any preference, just show me what's popular in your shop.";
    var g1_1 = "You: Hi, Alice! I am glad to meet you! You are my first guest!";
    var g1_2 = "Alice: Oh, I am so lucky! You know today is my final day here, so I was wondering where to spend this most precious afternoon. Then I though I should experience tea culture since I am here and I found your tea shop. It’s so great, I like everything here, the furniture, the aroma …";
    var g1_3 = "You: Thank you! Actually, I am just a seven day owner. But I will try my best to improve this tiny space. Do you have any suggestions?";
    var g1_4 = "Alice: I am not a tea expert, but there is a market I want to recommend. I think you could buy more tea sets from there, that would improve your business …";
    var g2_0 = "Qin: It seems like here we have a new shop owner! Hi, I am Qin, an old customer of this tea shop. I own a silk shop across the street. Whenever there is no customer, I would come to this tea shop and have my favorite Puer tea. I am glad I will have a new flavor today. You are a novice, right? ";
    var g2_1 = "You: Thanks for visiting! Yes, I am new here. Hope you don’t mind I have almost no tea knowledge. Why Pu’er is your favorite tea?";
    var g2_2 = "Qin: You know I have to stay in my shop all day, so I feel tired sometimes. Pu’er tea has a stronger flavor than other tea which helps me reduce plaque. Also, it lowers the risk of heart disease and diabetes. It’s healthy. ";
    var g2_3 = "You: Oh, that’s great! It sounds like you know a lot about tea. Can you give me any suggestion to improve my brewing skill?";
    var g2_4 = "Qin: Definitely, let’s brew a tea, I will tell you how to do it. But, firstly, you need to <span> buy a pitcher </span> in the tea shop!";
    var g3_0 = "How’s everything going? I am your neighbor and I have been living in this town for ten years. But I have never been in this shop. Don’t mind, it’s not your fault. I don’t like the former shop owner. Anyway, may I have a cup of Oolong? Thanks!";
    var g3_1 = "You: No problem, Mr. Wang. I am wondering what makes you dislike Mr. Li. ";
    var g3_2 = "Mr. Wang: Um, actually I have never met him. I just heard some bad things about him. It is said that, he didn’t use the pitcher to shake the tea, so each cup of his tea tastes different. Also, he had never washed the tea leaves before serving the guest. ";
    var g3_3 = "You: Oh, I apologize that I am a beginner, I know nothing about what you said. Do you mind teach me?";
    var g3_4 = "Mr. Wang: Ok, click the brew button, make sure you <span> have a pitcher </span> and follow me!";
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
    var g10_0 = "Hi, my name is Lucy, I would like to have a cup of tea that can promote weight loss. I hope to be slim and I heard that drinking specific tea can help me achieve that. Could you brew that kind of tea to me, thanks!";
    var g10_1 = "Hello, Lucy. Let’s be honest. There is no magic herb growing on a rock mountainside in some remote part of the world that, on its own, will slim you down until you’re a trim, glowing version of yourself.";
    var g10_2 = "Oh, you made me disappointed.";
    var g10_3 = "That’s being said, Oolong can assist in fat burning. Do you wanna try it?";
    var g10_4 = "Okay, why not?";
    var g11_0 = "Oh, what a cozy tea shop! Hi, I am John. I’m from American West. I had grown up on a ranch in South Dakota, where I developed an old west, cowboy swagger. Sometimes I drink tea, but I prefer coffee. I am wondering it is because I had never had true tea. Could you let me taste a real Chinese tea?";
    var g11_1 = "Absolutely. I feel the same way as you before I came here. The only thing I knew is to brew the leaves with hot water. I though it is the right process and enjoyed it.";
    var g11_2 = "How long have you been here?";
    var g11_3 = "A couple days. Actually, i am only a 5 days tea shop owner. But I am considering to run my own teashop after this.";
    var g11_4 = "That will cost a bunch of money. I guess you have to prepare 4000 more coins.";
    var g12_0 = "Hello! I am Lan. I am a writer. My grand father is a famous master of tea. So I have tasted a great amount of tea in my childhood. I wrote all my experience of tea drinking down and published them as a book. Now I am traveling to seek different flavor. Could you please brew a cup of Oolong tea for me?";
    var g12_1 = "Hello, Lan, I’m gland to meet you! I have served a lot of guests. A lot of mentioned the experience of tea drinking, but you are the only one that take it so serious! Could you teach me how to enrich the flavor of the tea!";
    var g12_2 = "Absolutely, do you know what is a good tea?";
    if (level == 2) {
        var g12_2 = "Do you know you need to warm tea sets before you brew the tea?";
    } else if (level == 3 || level == 4) {
        var g12_2 = "Do you know why you need warm tea sets?";
    }
    var g12_3 = "Em … I am not sure.";
    var g12_4 = "Okay, as you see, all the tea sets are pretty small. Following the warming process, the tea inside will remain hot longer as it sits, and the warmth of the pot will cause the leaves to release a burst of fragrance. ";
    if (level == 0 || level == 1 || level == 2) {
        var g12_4 = "- I think the answer is quiet simple’ you explain, ‘it should be memorable. If you are still thinking about it after you finish drinking it. It must be pretty good.";
    }
    var g13_0 = "Hi! I am Liu. I am a fever of tea. I have observed several of your guests. They all don’t know how to taste the tea. Fine tea resist easy appreciation. Anyway, may I have a cup of Puer? ";
    var g13_1 = "Hi, Mr Liu. Why you think all of my guests don’t know how to taste tea?";
    var g13_2 = "They all in a hurry to drink it. Actually, the taste of tea start from the moment you get tea leaves out of the box. We should appreciate the aroma of these dry leaves. Be quiet, smell it and savor the moment.";
    var g13_3 = "Oh, it’s interesting.";
    var g13_4 = "Yeah, when the tea is ready, we should note the color and fragrance of the liquid and then our drink should be deliberate and thoughtful.";
    if (level == 3) {
        var g13_4 = "Yeah, when the tea is ready, we should note the color and fragrance of the liquid and then our drink should be deliberate and thoughtful. Buy a smelling cup from the shop, you need this to help you better taste the tea.";
    }
    var g14_0 = "Nice to meet you, I am Anna. I forgot the name of tea I want to drink, I remember the color is red. Could you brew that kind of tea for me, thanks!";
    var g15_0 = "Hi, I am Shan. May I have a cup of Long Jing tea. Hurry up please, I only have ten minutes.";
    var g15_1 = "Sorry Mr. Shan. It takes time to brew a good tea.";
    var g15_2 = "Oh. That sucks. How long does it take for steeping?";
    var g15_3 = "It’s not only steeping. I have other processes to go before brew the tea.";
    var g15_4 = "Okay, okay, at least, please do it very quick.";
    var g16_0 = "Hello, I am Kimmy. I am from Korean. My favorite tea is Dohwa-cha which is a tea made from dried peach blossoms. Do you serve this in your shop? If not, may I have a cup of regular green tea?";
    var g16_1 = "Nice to meet you, Kimmy. I apologize I don’t have flower tea in my shop.";
    var g16_2 = "No worries, I heard that Chinese people do not drink flower tea and fruit tea, is it true?";
    var g16_3 = "Not at all. chrysanthemum tea is popular here!";
    var g16_4 = "Oh, we drink this, too …";
    var g17_0 = "Hello, I am Wei Sheng. I am a tea farmer from a small village in Sichuan which is famous for Puer tea. I am on my journey along Yangtze river for Puer trade now. I had a long time not drink Pure tea. I really miss it. Could you brew Puer tea for me?";
    var g17_1 = "Hello, Mr Wei. I am so glad to meet you! I have a lot of questions for you about tea! How is tea made in your village?";
    var g17_2 = "You know, Chinese tea is mostly small-scale village handicraft. So during the tea harvest, we select and pinch off tea leaves, then we heated tea leaves with charcoal in fiery woks and then vigilantly tended piles of oxidizing leaves.";
    var g17_3 = "So, you just heated the leaves once?";
    var g17_4 = "No, we need to periodical heat these leaves and make them dry. It takes a long time before we can pack and sell them …";
    var g18_0 = "Hi, It’s good to know Mr.Li recruited a new shop owner! I am Xiangxiang. I used to be the owner of this tea shop. That’s three years ago. Today, I happened to past this tea shop and I am curious that who is the shop owner now. Could you please brew my favorite Puer tea for me today?";
    var g18_1 = "Hi, thanks for coming! It’s amazing to know you used to own this tea shop! I think I could know a lot from you!";
    var g18_2 = "Haha~ You know, I owned this shop for five days as you, and I had earned 9K coins eventually!";
    var g18_3 = "That’s so amazing! I cannot wait to learn something from you!";
    var g18_4 = "No problem, click the brew button and let me show you how I succeed in this business!";
    if (level == 4) {
        var g18_4 = "Oh, no, you are already an expert! That is me that should learn from you!";
    }
    var g19_0 = "Hello, I am Tian Tian. I heard that your tea shop is great. I want to have a cup of Long Jing tea. Thanks!";
    var g19_1 = "Hi, Tian Tian, thanks for coming! How you heard from my tea shop.";
    var g19_2 = "One of my friend recommend your shop to me.";
    var g19_3 = "Oh, that’s cool. Please recommend my shop to your friend if you like.";
    var g19_4 = "No problem.";
    var g20_0 = "What an exquisite kettle, where did you get it? Hi, I am Lin Yu. I am a teacher worked in local primary school. I like to spend my free time on appreciating tea. The most important reason is that I love beautiful tea set! May I have a cup of Oolong, please!";
    var g20_1 = "Welcome Mr. Lin. That is to say you are an expert of tea set! I am excited! Before I knew you, I have never cast an eye on my tea set! Tell me more about these tea sets please!";
    var g20_2 = "Okay, look at this very small purple sand clay pot you use to brew the tea here! This is from Yixing which is a historic city in the Yangtze River basin long famous for its ceramics.";
    var g20_3 = "Oh, this is fantastic. But wait, it seems no glaze on it.";
    var g20_4 = "You are right. This purple sand clay is so pleasant to touch that the pot does not need a glaze…";


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
    var g10 = new guest(['Lucy', 'Betty', "Cherry", "Linda"], true, 2, g10_0, [g10_1, g10_2, g10_3, g10_4]);
    var g11 = new guest(['John', 'Hayden', "Michelle", "Jemma"], true, 3, g11_0, [g11_1, g11_2, g11_3, g11_4]);
    var g12 = new guest(['Lan', 'Jun', "Xiaoxue", "Xiaoxi"], true, 2, g12_0, [g12_1, g12_2, g12_3, g12_4]);
    var g13 = new guest(['Mr.Liu', 'Ms.Xia', "Mr.Qin", "Ms.Qin"], true, 1, g13_0, [g13_1, g13_2, g13_3, g13_4]);
    var g14 = new guest(['Anna'], false, 1, g14_0, []);
    var g15 = new guest(['Mr.Shan', 'Ms.Lin', "Mr.Qin", "Ms.Zhao"], true, 0, g15_0, [g15_1, g15_2, g15_3, g15_4]);
    var g16 = new guest(['Kimmy', 'Kim', "Lawe", "Uno"], true, 3, g16_0, [g16_1, g16_2, g16_3, g16_4]);
    var g17 = new guest(['Mr.Wei', 'Mr.Bai', "Ms.Lee", "Mr.Xu"], true, 1, g17_0, [g17_1, g17_2, g17_3, g17_4]);
    var g18 = new guest(['Xiangxiang', 'Rose', "Petro", "Glandia"], true, 1, g18_0, [g18_1, g18_2, g18_3, g18_4]);
    var g19 = new guest(['Tiantian', 'Lily', "Shruti", "Andrew"], true, 0, g19_0, [g19_1, g19_2, g19_3, g19_4]);
    var g20 = new guest(['Mr.Lin', 'Lufeng', "Jessica", "Lokhin"], true, 2, g20_0, [g20_1, g20_2, g20_3, g20_4]);


    var Guest = [g0, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g14, g15, g16, g17, g18, g19, g20];

    var iclick = 0;
    var brew2_first = true;
    var brew3_first = true;
    var brew4_first = true;
    var brew5_first = true;

    function popLevel() {
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
        $('#levelup').css('display', 'block');
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
        if (money >= 200) {
            seat2.lock = false;
            money -= 200;
            setPara();
            lockOn();
            $('#sell4h').css('display', 'block');
        }
    })

    $('#sell5').on("click", function() {
        if (money >= 500 && seat2.lock == false) {
            seat3.lock = false;
            money -= 500;
            setPara();
            lockOn();
            $('#sell5h').css('display', 'block');
        }
    })

    $('#sell6').on("click", function() {
        if (money >= 1000 && seat2.lock == false && seat3.lock == false) {
            seat4.lock = false;
            money -= 1000;
            setPara();
            lockOn();
            teaPrice += 100;
            $('#sell6h').css('display', 'block');
        }
    })

    $('#sell7').on("click", function() {
        if (money >= 2000) {
            money -= 2000;
            dessert.lock = false;
            setPara();
            lockOn();
            teaPrice += 200;
            $('#sell7h').css('display', 'block');
        }
    })

    $('#sell8').on("click", function() {
        if (money >= 800) {
            money -= 800;
            //change picture;
            setPara();
            lockOn();
            teaPrice += 70;
            $('#sell8h').css('display', 'block');
        }
    })

    $('#sell9').on("click", function() {
        if (money >= 600) {
            money -= 600;
            smelling.lock = false;
            setPara();
            lockOn();
            teaPrice += 50;
            $('#sell9h').css('display', 'block');
        }
    })

    $('#sell10').on("click", function() {
        if (money >= 4000) {
            money -= 4000;
            //change picture;
            setPara();
            lockOn();
            teaPrice += 300;
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
        }
    }

    $('#icon3').on("click", function() {
        setShopLock();
        $('#red_dot').css('display', 'none');
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

    function addHour() {
        if (timeNow[1] < 4) {
            timeNow[1] += 1;
        } else if (timeNow[1] == 5) {
            if(timeNow[0] < 4){
                timeNow[0] += 1;
                timeNow[1] = 0;
            }else{
                game_over();
            }
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
        if (brew2_first == true && level == 1) {
            $('#guild6').css('display', 'block');
        }
        if (brew3_first == true && level == 2) {
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
        if (brew2_first == true) {
            $('#guild6').css('display', 'none');
            $('#guild7').css('display', 'block');
        }
        setTimeout(function() { $('#pitcher').addClass('animated wobble'); }, 400);
        setTimeout(function() { $('#pitcher').removeClass('animated wobble'); }, 1400);
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
        if (brew2_first == true) {
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

    function pourFirst() {
        $('#dump').fadeIn(500);
        setTimeout(function() { $('#dump').fadeOut(500); }, 900)
        $('#pot').attr('drag', 'false');
        $('#stove').attr('drag', 'true');
        if (brew3_first == true && level == 2) {
            $('#guild8').css('display', 'none');
            brew3_first = false;
        }

    }

    /********** brew 4 *********/
    function addWaterWarm() {
        setTimeout(function() { $('#pot_cover').css('background-image', 'url(./img/pot11.png)'); }, 200);
        setTimeout(function() { $('#pot_cover').css('background-image', 'url(./img/pot22.png)'); }, 400);
        setTimeout(function() { $('#pot_cover').css('background-image', 'url(./img/pot33.png)'); }, 600);
        setTimeout(function() { $('#pot_cover').css('background-image', ''); }, 800);
        setTimeout(function() { $('#pot_cover').css('display', 'none'); }, 800);
        if (brew4_first == true && level == 3) {
            $('#guild9').css('display', 'none');
            $('#guild10').css('display', 'block');
        }
        $('#stove').attr('drag', 'false');
        $('#pot').attr('drag', 'true');
    }

    function pourWarm() {
        $('#pot_cover').css('display', 'none');
        $('#dump').fadeIn(500);
        setTimeout(function() { $('#dump').fadeOut(500); }, 900)
        $('#pot').attr('drag', 'false');
        $('#leavesup').attr('drag', 'true');
        if (brew4_first == true && level == 3) {
            $('#guild10').css('display', 'none');
            brew4_first = false;
        }
    }
    /******************* brew 5 *******************/
    function pourSmelling() {
        if (tea == 0) {
            $('#smelling').css('background-image', 'url(./img/smelling_1.png)');
        } else if (tea == 1) {
            $('#smelling').css('background-image', 'url(./img/smelling_2.png)');
        } else if (tea == 2) {
            $('#smelling').css('background-image', 'url(./img/smelling_3.png)');
        }
    }

    /******************* Game Section **********************/
    function brewInit() {
        $('#leavesup').css('display', 'none');
        $('#pot').css('background-image', 'url(./img/pot.png)');
        $('#cup').css('background-image', 'url(./img/cup.png)');
        if (level == 4) {
            $('#smelling').css('background-image', 'url(./img/smelling.png)');
        }
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

    function brew3() {
        drag('#leavesup', '#pot', addLeaves);
        drag('#stove', '#pot', addWaterLeaves);
        drag('#pot', '#sink', pourFirst);
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

    function brew4() {
        if (brew4_first == true && level == 3) {
            $('#guild9').css('display', 'block');
        }
        drag('#stove', '#pot_cover', addWaterWarm);
        drag('#pot', '#sink', pourWarm);
        drag('#leavesup', '#pot', addLeaves);
        drag('#stove', '#pot', addWaterLeaves);
        drag('#pot', '#sink', pourFirst);
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

    function brew5() {
        if (brew4_first == true && level == 3) {
            $('#guild9').css('display', 'block');
        }
        drag('#stove', '#pot_cover', addWaterWarm);
        drag('#pot', '#sink', pourWarm);
        drag('#leavesup', '#pot', addLeaves);
        drag('#stove', '#pot', addWaterLeaves);
        drag('#pot', '#sink', pourFirst);
        drag('#stove', '#pot', addWaterLeaves);
        if (pitcher.lock == false) {
            drag('#pot', '#pitcher', pourTeaPitcher);
        }
        if (smelling.lock == false) {
            drag('#pitcher', '#smelling', pourSmelling);
        }
        drag('#smelling', '#seat1pic', payMoney);
        drag('#smelling', '#seat2pic', payMoney);
        drag('#smelling', '#seat3pic', payMoney);
        drag('#smelling', '#seat4pic', payMoney);
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
                $('#red_dot').css('display', 'block');
                teaPrice += 50;
                if (level == 1) {
                    $('#shop_window').css('display', 'block');
                    setShopLock();
                }
                setPara();
                addHour();
            }
            if (guestIndex == 3) {
                level += 1;
                $('#red_dot').css('display', 'block');
                teaPrice += 50;
                if (level == 1) {
                    $('#shop_window').css('display', 'block');
                    setShopLock();
                }
                setPara();
                addHour();
            }
            /************test************/
            if(guestIndex == 20){
                game_over();
            }
            if (guestIndex == 7) {
                level += 1;
                $('#red_dot').css('display', 'block');
                teaPrice += 50;
                if (level == 1) {
                    $('#shop_window').css('display', 'block');
                    setShopLock();
                }
                setPara();
                addHour();
            }
            if (guestIndex == 9) {
                money += 1000;
                $('#money_pop').css('display', 'block');
                $('#teaP').html('1000');
                setPara();
                setTimeout(function() { $('#money_pop').fadeOut(500); }, 900)
            }
            if (guestIndex == 12) {
                if (level == 2) {
                    level += 1;
                    $('#red_dot').css('display', 'block');
                    teaPrice += 50;
                    setPara();
                    addHour();
                }
            }
            if (guestIndex == 13) {
                if (level == 3) {
                    level += 1;
                    $('#red_dot').css('display', 'block');
                    teaPrice += 50;
                    $('#shop_window').css('display', 'block');
                    setShopLock();
                    setPara();
                    addHour();
                }
            }
            if (guestIndex == 18) {
                if (level < 4) {
                    level += 1;
                    $('#red_dot').css('display', 'block');
                    teaPrice += 50;
                    if (level == 1 || level == 4) {
                        $('#shop_window').css('display', 'block');
                        setShopLock();
                    }
                    setPara();
                    addHour();
                }
            }
        }
    })

    $('#chat_brew').on("click", function() {
        add_history(guestIndex);
        iclick = 0;
        $("#chat_window").css('display', 'none');
        $('#shop_window').css('display', 'none');
        brew();
        if (guestIndex == 2 || guestIndex == 3 || guestIndex == 7) {
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

    /********************** Game_End *************************/

    function game_over() {
        $("#end").css('display', 'block');
        if (money >= 4000) {
            $("#end_img1").css('display', 'block');
            $("#end_img2").css('display', 'none');
        } else {
            $('#end_right_top').css('background-image', 'url(./img/fail.png)');
            $("#end_img2").css('display', 'block');
            $("#end_img1").css('display', 'none');
            $("#whatfeedback").html("How about another five days? Do it again, you might be a good tea shop owner!");
        }
        $("#whatnum").html(guestIndex);
        $("#whatmoney").html(money);
        if (level == 0) {
            $('#whatlevel').html("Novice (1/5)");
        } else if (level == 1) {
            $('#whatlevel').html("Beginner (2/5)");
        } else if (level == 2) {
            $('#whatlevel').html("Intermediated (3/5)");
        } else if (level == 3) {
            $('#whatlevel').html("Advanced (4/5)");
        } else {
            $('#whatlevel').html("Expert (5/5)");
        }
    }

    $('#replay_btn').on("click", function() {
        location.reload();
    });

    $('#icon1').on("click", function() {
        location.reload();
    });

    $('#select_close').on("click", function() {
        $("#selectTea").css('display', 'none');
    });

    $('#select_close1').on("click", function() {
        $("#history").css('display', 'none');
    });

    $('#icon2').on("click", function() {
        $("#history").css('display', 'block');
    });

    function add_history(m){
        var name = "<span>"+Guest[m].name[0]+"</span>"; 
        var txt1 = "<p>"+Guest[m].words[0]+"</p>"; 
        var txt2 = "<p>"+Guest[m].words[1]+"</p>"; 
        var txt3 = "<p>"+Guest[m].words[2]+"</p>"; 
        var txt4 = "<p>"+Guest[m].words[3]+"</p>"; 
        $("#history_text").append(name, txt1, txt2, txt3, txt4); 
    }

    guestIntro();
    lockOn();
    setHeader();
    setPara();

})();