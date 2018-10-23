exports.glitch='true';
exports.system={
   TYPING_TIME:3*1000,
 };//
exports.global={ex:-1,anti_ex:-2,AUTOMIND_DEAKTIVATE_PHRASE:'.mental start%'
};

exports.name='mentioned';

exports.emojis={};

exports.run = (client, message,args) => {
        try{
      let member = message.member;
      let CHANNEL_ID=module.exports.system.CHANNEL_ID;
      let channel = message.channel;
      let TYPING_TIME = module.exports.system.TYPING_TIME;
      let delay =(duration)=>new Promise( resolve=> setTimeout(resolve,duration) );
    
  async function typing_func(msg,obj,delay_time){
       if(!delay_time) delay_time=TYPING_TIME;
       let arr_t=[];
       if(msg.indexOf('#t')!=-1){
           arr_t=msg.split('#t'); 
           console.log(arr_t);              
         };
        if(arr_t.length>0){
            for(let i=0;i<arr_t.length;i++){
               await typing_delay(arr_t[i],obj,delay_time);
            };//
        }else{ await typing_delay(msg,obj,delay_time);};
           
             return;
  };  //async end
  async function typing_delay(msg,obj,delay_time){
            if(obj&&obj.o){await message.react(obj.o)};
    
    console.log(module.exports.emojis);
    if(obj&&obj.e && module.exports.emojis[obj.e]){
                  let arr_emoji = module.exports.emojis[obj.e];
                  let index = (obj.v)?obj.v:await get_rnd(arr_emoji);
                  let emoji_name = await arr_emoji[index];
                 // let emoji_name = await arr_emoji[await get_rnd(arr_emoji)];
                  console.log(emoji_name);
                  let emoji= message.guild.emojis.find(e=>e.name==emoji_name);
                  let e_obj=(emoji)?emoji.id:emoji_name;
                 // if(client.emojis.has(e_obj) )  
               try{
                    await message.react(e_obj); 
               }catch(err){console.log(err)};
                  //};
            };
            if(msg.indexOf('#0')!=-1) return;
            let serial=false;
            let answer=msg;

         
            if(msg.endsWith('#s')){
               answer=answer.slice(0,-2);
               serial=true;
              console.log('serial '+serial);
           }
            await channel.startTyping();
            await delay(delay_time);
            if(answer.indexOf('#u')!=-1){answer=answer.replace(/#u/i,member);};
            if(answer.startsWith('#m')||answer.startsWith(' #m')){
               answer=answer.replace(/#m/i,' ');
               let msg2= await message.channel.send(answer);
           }else { let msg2= await message.channel.send(member+' '+answer); };
           
          // await message.react(message.guild.emojis.find(x=>x.name===module.exports.system.EMOJI_NAME.S).id);
            await channel.stopTyping();      
            if(serial){return typing_delay(obj.s[await get_rnd(obj.s)],obj);};   
            return;
       };//
     async function  get_rnd(arr){
               let x = Math.floor(Math.random()*(arr.length));
               return x;
            };//get_rnd end
      async function process(){
           
           
           function getRnd(){
               let x = Math.floor(Math.random()*(module.exports.phrase.length));
               
               return (  (x!=Number(module.exports.global.ex)) && (x!=Number(module.exports.global.anti_ex))  )?x:getRnd();
            };

            
           
            let x = Number(getRnd());
            module.exports.global.anti_ex=module.exports.global.ex;
            module.exports.global.ex=x;
            console.log(x);
             console.log(module.exports.phrase[x][0]);
            let str = module.exports.phrase[x][0];
            await typing_delay(str);
            
            if(module.exports.phrase[x][1]){
                   for(let i=1;i<module.exports.phrase[x].length;i++){
                        await typing_func(module.exports.phrase[x][i]);
                    }//for end

             };//if end
            
         };//process end
         async function ifEveryHas(str,arr){
                  for(var i=0;i<arr.length;i++){ if(str.indexOf(arr[i])==-1) return 0   ;};
              return 1;
         };//ifEveryHas end
         async function ifOneHas(str,arr){
              for(var i=0;i<arr.length;i++){ if(str.indexOf(arr[i])!=-1) return 1   ;};
              return 0;
         };//ifOneHas end
         async function check(obj,msg_cnt){
                
                 for(var i=0;i<obj.w.length;i++){
                       // if(obj.q&&msg_cnt.indexOf(obj.q)==-1) return;
                         if(obj.q){
                             let bool = await ifEveryHas(msg_cnt,obj.q);
                             if(!bool) continue;
                         };// if q
                         if(obj.a){
                             let bool = await ifOneHas(msg_cnt,obj.a);
                             if(!bool) continue;
                         };// if q
                        let pos = msg_cnt.indexOf(obj.w[i]);
                        if(pos!=-1) {
                            let end_of=msg_cnt.indexOf(' ',pos); 
                            let word = msg_cnt.slice(pos,end_of); 
                            //console.log(word.endsWith('?'));
                            let str = obj.r[await get_rnd(obj.r)];
                            str = str.replace(/#w/i,word);
                        
                            await typing_func(str,obj);
                            return 1;
                        };//if end
                       //return 0;
                  };//for end
              return 0;
          };//check();
//-----------------------------------------------------

           
       async function checkIf(arr,msg_cnt){
                let bool=0;
                for(var i=0;i<arr.length;i++){
                   bool=await check(arr[i],msg_cnt);
                   if (bool) return 1;
                };
                   return 0;
       };//checkIf end
//---------------------------------------------
        async function clear(msg_cnt){
             let arr = ['?' , ',' , '!','.'];
            console.log(msg_cnt);
             msg_cnt=msg_cnt+'.';
             for(var i=0;i<arr.length;i++){ 
               let pos = msg_cnt.indexOf(arr[i]); if (pos!=-1){   msg_cnt = msg_cnt.split(arr[i]).join(' '+arr[i]+' '); };
          //console.log(msg_cnt);
             };console.log(msg_cnt);
            //msg_cnt=msg_cnt.replace(/.|,|!/g, function (x) {return ' '+x+' ';}); console.log(msg_cnt);
            return msg_cnt; 
        };//clear end

        async function AUTO_MIND(){
             if(message.content.startsWith(module.exports.global.AUTOMIND_DEAKTIVATE_PHRASE)){return;};
             let msg_cnt=message.content.toLowerCase()+' ';
                 msg_cnt = await clear(msg_cnt);
 //--------------------------------------------------------                
            //let bool = await checkIf(module.exports.words,msg_cnt); if (bool == 0) {process()}; };
              let Mind = await module.exports.getMind();
              console.log('mind');
              //console.log(Mind);
               let bool = await checkIf(Mind,msg_cnt); if (bool == 0) {process()}; 
           };//AUTO_MIND end;

//---------------------------------------------------------
  let AUTOMIND=!(client.translation);
 if( !AUTOMIND&&message.mentions.members.first()!=undefined && message.mentions.members.first().user.id==client.user.id){
      return;
}else{AUTO_MIND();};
          //AUTO_MIND();
  }catch(err){console.log(err);};
        };//run end


//---------------------
exports.getMind=async()=>{
try{
      const fs = require('fs');
      const JXON = require('jxon');
      const DOMParser=require('xmldom').DOMParser;
      let xmlDoc = await fs.readFileSync('./public/triggers.xml',"utf8",function(err,data){if(err) {return console.log(err);}; return data;});
      
  let parser = new DOMParser();
  xmlDoc = parser.parseFromString(xmlDoc,"text/xml");
    // console.log(xmlDoc);
  var myObject = JXON.build(xmlDoc);
      
      let obj_arr=myObject.triggers.trigger;
        //console.log(obj_arr);
      obj_arr.map(e=>{
          //console.log(e);
         for(var key in e){
          if(typeof e[key]=='number'){e[key]=e[key].toString(); console.log(e[key]);};
           //if(!e[key]||[key]==''|| e[key]==' '){e[key]='undefined';};
           if(key=="w"){ if(e[key].endsWith('.')){e[key]=e[key].slice(0,-1);}; e[key]=e[key].split(",")};
           if(key=="a"){ if(e[key].endsWith('.')){e[key]=e[key].slice(0,-1);}; e[key]=e[key].split(",")};
           if(key=="q"){ if(e[key].endsWith('.')){e[key]=e[key].slice(0,-1);}; e[key]=e[key].split(",")};
           if(key=="r"){
            if(typeof e[key]=='object'){e[key]='undefined';};
           // e[key].replace("\\r\n\g,'\n'"); 
                console.log(e[key]);
                //e[key]=e[key].split("\r\n")
             if(e[key].indexOf('/r/n/r')){console.log('/r/n/r----------------------------------');
       }else if(e[key].indexOf('/r/n')){console.log('/r/n----------------------');}
             e[key]=e[key].trim().split('\r\n');
           };
           if(key=="s"){
             console.log(e[key]);
             //e[key].replace("\\r\n\g,'\n'");
             e[key]=e[key].trim().split("\r\n");
           };
           if(e[key].length==1&&e[key][0]=='undefined'){e[key]=false;};
         };
      });
    //console.log(obj_arr);
     obj_arr=obj_arr.filter(e=>e.type!='off');
  
//--------
      let obj_arr_settings=myObject.triggers.settings;
      console.log(obj_arr_settings);
      let n_arr=obj_arr_settings.default.ds.split("\r\n");
      //let n_arr2=[];
      for(let i=0;i<n_arr.length;i++){
       // n_arr2[i]=n_arr[i];
        n_arr[i]=[n_arr[i]];
      };
      console.log(n_arr);
     module.exports.phrase=n_arr;
  
     let new_obj={};
     for(let key in obj_arr_settings.emojis){
       
       if(key!='undefined'&&obj_arr_settings.emojis[key]!='undefined'){
         new_obj[key]=obj_arr_settings.emojis[key].split(',');
       };
       
     };
     
module.exports.emojis=await new_obj;
     console.log('emoji');
     console.log(module.exports.emojis);
     
  //----
   return obj_arr;
}catch(err){console.log(err);};
};//getMind end