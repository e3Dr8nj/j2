exports.system={
   CHANNEL_ID:'416255611819524097',
   SERVER_ID:'301063859702071316',
   TYPING_TIME:3*1000
};//
exports.global={
   arr:['-1'],
   ex:-1,anti_ex:-2,anti_ex1:-3,anti_ex2:-4,anti_ex3:-5};
exports.phrase=[
  
  ['Чудно, славно… Могучей силой владеешь ты. Великим ситхом ты станешь. \nВстань. Впредь ты будешь носить имя ...#u !'],
  ['Да это же #u собственной персоной!  '],
  ['Enjoy the Silence'],
  ['Memento mori'],['Одиночество — лучший друг. Тишина — лучший собеседник.'],
  ['Империя ситхов будет гореть ярко, как сверхновая звезда, затмевая Республику.Мы будем держать галактику мёртвой хваткой.'],
  ['Здесь царит темная сторона силы. Зла обитель. Войти ты должен.'],
  ['Бинго! Вы выиграли в рандомном розыгрыше админку сервера, за сменой власти обратитесь к текущему админу. Мои поздравления!'],
  ['Исчезая в темноту, я звала тебя..'],['Ты пришел'],['Исчезая в темноту, я звала тебя..'],
  ['\nКогда уходят поезда из Ниоткуда в Никуда, \nТо им с перрона машут вслед \nНикто, Ничто, Никак и Нет. \nВ их чёрных окнах, как в воде, \nПлывёт бескрайнее Нигде \nИ исчезает без следа \nВ необозримом Никуда.'],
  
  ['\nМне грустно на тебя смотреть\nКакая боль, какая жалость!\nЗнать, только ивовая медь\nНам в сентябре с тобой осталась.'],
  [" ytn 'vjwbq? tcnm njkmrj gjrjq/"],['jniktgfq vtyz'],['Покайся грешник!'],
  
  ['Аллo. Пpивeт. Как сам? Как дети?'],['Оставь надежды, всяк сюда входящий.'],
  
  ['\nУмников как-то чатовских трое\nВ корыте заплыли в открытое море,\nИ если бы крепче корыто попалось,\nТо песня б длиннее моя оказалась.'],
  ['Сколько лет, сколько зим.'],['Я б попросила вас остаться, но вы ж останетесь, боюсь.'],['Ассалам алейкум'],['Бонжорно'],
  ['\nкогда идем с тобою вместе \nвсе звезды гаснут и цветы \nна клумбах вянут и машины \nсбивают намертво людей'],
  ['Йоу нига бич бро!'],[' Я устала ждать, пока ты сделаешь первый шаг. Привет!'],
  ['Руками челку теребя, я думала сегодня про тебя'],
  ['Наш тёмный орден приветствует тебя.'],['Hет бога кроме аллаха и мохаммед пророк его'],
  ['\n Я пришла к тебе с приветом \n Рассказать, что солнце встало, \n Что оно горячим светом \n По листам затрепетало.'],
  ['Мое почтение.','Сынок, поздоровайся с дядей.','Поздоровайся с дядей, как папа здоровается с друзьями!'],
  ['Кого я вижу!',' И действительно, кого?🤔'],['Здравствуйте','Пройдите немного прямо, а потом налево, там вас встретят.']
  ['Охайо'],['Милости просим мимо ворот щей хлебать.'],
  ['Здравиа желаю.'],
  ['Анийо хасейо.'],['Входите \n *было произнесено сквозь стиснутые зубы и звучало как* ступайте к черту.'],
  [' Я Вас категорически приветствую!'],['Я пришла к тебе с приветом, топором и пистолетом.'],
  ['🐿'],['Да пребудет с тобой Сила'],['...'],['Ты даже не представляешь куда ты попал.. '],
  ['Спасайся, беги отсюда! (нет, останься, прошу.)'],
  ['\nОстановись в потоке мирской суеты, не спеши, побудь со мной немного.'],['\nТри мудреца в одном тазу\nПустились по морю в грозу.\nБудь попрочнее старый таз,\nДлиннее был бы мой рассказ.'],
  ['\nКак гoвopил бeccмepтный клaccик\nВильям Сepгeeвич Шекcпиp\nЧyмa нa oбa вaши дoмa\nИ пиp']

];

exports.run = (client, member) => {
        try{
          if(member.guild.id!=module.exports.system.SERVER_ID) return;
      //if(member.id!=module.exports.system.SERVER_ID) return;
      let CHANNEL_ID=module.exports.system.CHANNEL_ID;
        
      let channel = client.channels.get(CHANNEL_ID);
      let TYPING_TIME = module.exports.system.TYPING_TIME;
      let delay =(duration)=>new Promise( resolve=> setTimeout(resolve,duration) );
    
     async function typing_delay(msg,delay_time){
            if(!delay_time) delay_time=TYPING_TIME;
            await channel.startTyping();
            await delay(delay_time);
            await channel.send(msg);
            await channel.stopTyping();         
            return;
       };//
      async function process(){
           
           
           function getRnd(){
               let x = Math.floor(Math.random()*(module.exports.phrase.length));
               if(module.exports.global.arr.length==module.exports.phrase.length){module.exports.global.arr.length=0;};
               if(module.exports.global.arr.length==0||module.exports.global.arr.indexOf(x)==-1){
                        module.exports.global.arr.push(x);return x;
                }else{  return getRnd();};
               //return (  (x!=Number(module.exports.global.ex)) && (x!=Number(module.exports.global.anti_ex))  )?x:getRnd();
            };

            
           
            let x = Number(getRnd());
            module.exports.global.anti_ex=module.exports.global.ex;
            module.exports.global.ex=x;
            console.log(x);
             console.log(module.exports.phrase[x][0]);
             let str = module.exports.phrase[x][0];
             str=(module.exports.phrase[x][0].indexOf('#u')==-1)?member+" "+str:str.replace(/#u/i,member);
            
            await typing_delay(str);
            
            if(module.exports.phrase[x][1]){
                   for(let i=1;i<module.exports.phrase[x].length;i++){
                        
                        if(module.exports.phrase[x][i]=='#d'){await delay(1*15*1000);}else
                        {await typing_delay(module.exports.phrase[x][i]);};
                    }//for end

             };//if end
            
            
         };//process end

         process();

         }catch(err){console.log(err);}
  
};
/*
exports.run = (client, member) => {
        try{

            let CHANNEL_ID=modul.exports.CHANNEL_ID;
            let channel = client.channels.get(CHANNEL_ID);
            let x = Math.floor(Math.random()*(module.exports.phrase.length));
            console.log(x);
             console.log(module.exports.phrase[x]);
            let str = module.exports.phrase[x][0]+member.username+module.exports.phrase[x][1];
            channel.send(str)
         }catch(err){console.log(err);}
  
};
*/