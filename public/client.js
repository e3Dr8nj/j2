const testForm = document.forms[1];
//function func(){prefentDefault();};
document.addEventListener('mousewheel', null, {passive: true});
let but_img = 'https://openclipart.org/image/150px/svg_to_png/168778/1331240791.png';
//let but_img='https://st.depositphotos.com/1686288/3191/v/450/depositphotos_31919521-stock-illustration-transparent-glass-button.jpg';
let but1_img = 'http://mir-tlt.ru/images/sait/knopki_logotipy/Aqua-Button.png';
let glitch=true;
let obj_arr_new="";
function Obj(e){
         let arr=e.split('r:');
//-------------
       console.log(glitch!='true');
       let part1='';
        
       console.log('glitch'); part1=arr[0].split('\n');//for win else for glitch
//-----------------------------------
         part1.pop();
         for(var i=0;i<part1.length;i++){ 
            let name = part1[i].slice(0,1);
            let str= part1[i].slice(2);
            if(name=='w'||name=='s'||name=='a'){
                this[name]=str.split('/');
                if(this[name][this[name].length-1]==' '||this[name][this[name].length-1]==''){this[name].pop();};
            }else
            if(name=='q'){
                this[name]=str.split('&');
                if(this[name][this[name].length-1]==' '||this[name][this[name].length-1]==''){this[name].pop();};
            }else{ this[name]=str;};//
         
        };//for end
//--------------------
     
     if(this.s) this.s=this.s.join('\n');     
     //this.r=arr[1].trim().split('\n  ');//for win else for glitch 
    this.r=arr[1].trim().split('\n  ').join('\n');
//--------------------  
    //this.r.pop();
  };
let empty_trigger={n:'',e:'undefined',w:'',q:'',a:'',r:'',s:'',type:'not set'};
let type_select={off:"Выкл", on:"Вкл",del:"Удалить",ds:"На предложения",dq:"На вопросы"};
let emoji_select={undefined:"Нету",snob:"Надменность",positive:"Позитив",negative:"Негатив",dzen:"Дзен",thinking:"Задумчивость",hello:"Приветливость",e5:"5э"};
function list(tagname,val_obj,obj){
  let str=""; console.log(obj);
  for(let key in val_obj){
    
     let val =(obj[key])?obj[key]:'';
     str+=val_obj[key]+':<textarea class="bl"  name="'+tagname+'['+key+']" rows="1" cols="100">'+val+'</textarea>';
  };
  return str;
};

function option_select(selected_key,val_obj){
  let str='<option value="'+selected_key.toLowerCase()+'" selected>'+val_obj[selected_key.toLowerCase()]+'</option>';
  for(let key in val_obj){  
    if(key==selected_key) continue;
     str+='<option value="'+key+'">'+val_obj[key]+'</option>';
  };
  return str;
};
function triggerConstructor(e,num){
  let str2='';
  let i=num;
  e.id=num;
        e.type=(e.type)?e.type:"on";
         e.type=(e.type=="not set")?"on":e.type;
      // str2+='<hr>';
       str2+='<div id="'+e.id+'" name="trs">';
       str2+='<div class="inv2" id="border2x'+e.id+'">'+'<hr><p id="p4_'+e.id+'" class="a_inl" onclick="show('+e.id+')"><img height=30 width=30 src='+but_img+'></img></p></div>';
       str2+='<div class="inv2" id="trigg'+e.id+'">';
  
      str2+='<div id="id_number"class="inl" name="'+e.id+'[_id]" value=e.id>ID'+i +'    </div>';
       str2+='<div class="inl">Название:<textarea name="'+e.id+'[n]" id="n'+e.id+'"  class="il" rows="1" cols="30">'+e.n+'</textarea></div>';
       str2+='<div class="inl">Emoji:<select name="'+e.id+'[e]" id="e'+e.id+'"  class="bl"  required>'+option_select(e.e,emoji_select)+'</select></div>';
       
       // str2+='<div class="inl">Тип:<select name="'+e.id+'[type]" id="type'+e.id+'"  class="bl" ><option value="'+e.type+'">'+type_select[e.type]+'</option><option value="off">'+type_select[e.on]+'</option><option value="off">'+type_select[e.on]+'</option></select></div><br>';
       str2+='<div class="inl">Тип:<select  name="'+e.id+'[type]" id="type'+e.id+'"  class="bl" required>'+option_select(e.type,type_select)+'</select></div><br>';
       
       
       str2+='Слова (или их части) триггеры:<br>';
       str2+='</div>';
       str2+='<p id="p3_'+e.id+'" class="a_inl" onclick="show('+e.id+')"><img height=30 width=30 src='+but_img+'></img></p><textarea name="'+e.id+'[w]" id="w'+e.id+'" rows="2" cols="120" >'+e.w+'</textarea><p id="p1_'+e.id+'" class="a_inl" onclick="showRestTriggers('+e.id+')">&#x2795</p><br>';
       str2+='<div class="inv" id="triggers'+e.id+'">';
       str2+='Все слова которые должны присутсвовать во входной фразе:<br><textarea name="'+e.id+'[q]" id="q'+e.id+'" row="2" cols="120">'+e.q+'</textarea><br>';
       str2+='Слова хотябы одно из которых должно присутствовать во входной фразе:<br><textarea name="'+e.id+'[a]" id="a'+e.id+'"  row="2" cols="120">'+e.a+'</textarea><br>';
       str2+='</div>';
       str2+='<div class="inv2" id="trigg2x'+e.id+'">';
       str2+='Основные фразы ответа:<br><textarea name="'+e.id+'[r]" id="r'+e.id+'"  rows="10" cols="120">'+e.r+'</textarea><p id="p2_'+e.id+'" class="a_inl" onclick="showRest('+e.id+')">&#x2795</p><br>';
       str2+='<div class="inv" id="rest'+e.id+'">';
       str2+='Фразы следующие за основной:<br><textarea name="'+e.id+'[s]" id="s'+e.id+'" rows="10"  cols="120" >'+e.s+'</textarea>';
       str2+='</div>';
       str2+='</div>';
       str2+='<div class="inv2" id="border'+e.id+'">'+'<hr><br></div>';
       str2+='</div>';
      
      return str2;
};//triggerConstructor end
function addTrigger(){
  let num=document.getElementsByName('trs').length;
  let str = triggerConstructor(empty_trigger,num+1);
  let prev=document.getElementById('new triggers').innerHTML;
  document.getElementById('new triggers').innerHTML=prev+str;
};
var emoji_level={1:"Холоднокровный(4э)",2:"Адекватный(3э)",3:"Теплый(2э)",4:"Истеричка(1э)",5:"Гиперактивный шизойд(5э)"};
function get_e(a){
 return emoji_level[a];
};
function generate(obj_arr,settings_obj){
  //console.log(obj_arr); console.log(settings_obj);
  let str2='';
   str2+='<form name="testForm" method="post" action="/addData" target="frame" oninput="emoji_x.value=get_e(parseInt(a.value))">';
    //str2+='<form name="testForm" method="post" action="/addData" target="frame" >';
    
  str2+=' <input type="submit" value="Submit" class ="submitStick">';
   str2+='<div value="0">Login:<textarea name="avtorization[login]"   rows="1" cols="30">Log</textarea> Password: <textarea name="avtorization[pass]"   rows="1" cols="30">qwerty</textarea></div>';
    
  str2+='<div id="settings">'; 
  str2+='<p id="emoji_p" class="a_inl" onclick="showOnly(id)"><img height=30 width=30 src='+but_img+'></img></p>Эмоджи';
  str2+='<p id="time_p" class="a_inl" onclick="showOnly(id)"><img height=30 width=30 src='+but_img+'></img></p>Время';
  str2+='<p id="default_p" class="a_inl" onclick="showOnly(id)"><img height=30 width=30 src='+but_img+'></img></p>Дефолт. Триггеры';
  
  str2+='<br><div id="emoji" class="emoji">';
  str2+=  list('emojis',emoji_select,settings_obj.emojis);
  str2+='Эмоциональность: <input type="range" class="range" id="a" name="a" value="'+settings_obj.a+'" min="1" max="5">';
  str2+=' <output name="emoji_x" for="a b"></output>';
  str2+='</div><br>';
  
 
  
  
  str2+='<br><div id="time" class="time">';
  str2+='Время ответа:<input class="bl" type="textarea" name="time[response]">'+settings_obj.time.response+'</textarea>';
  str2+='Посылка второй фразы через:<input class="bl" type="textarea" name="time[response2]">'+settings_obj.time.response2+'</textarea>';
  str2+='</div>';
  
  str2+='<br><div id="default" class="default">';
 // str2+=  list('emojis',emoji_select);
  str2+='Предложения:<textarea class="bl" type="textarea" name="default[ds]" rows="50" cols="120">'+settings_obj.default.ds+'</textarea>';
  str2+='Вопросы:<textarea class="bl" type="textarea" name="default[dq]" rows="50" cols="120">'+settings_obj.default.dq+'</textarea>';
  str2+='</div><br>';
  
  str2+='</div><br>';
  
  str2+=' <input type="button" class="submit2" value="Добавить триггер" onclick="addTrigger()">';
  str2+=' <input type="button" class="submit2" value="Развернуть/Свернуть триггеры" onclick="showAllTriggerSet()">';
    str2+='<br><div id="new triggers"></div><br>';
   let i=0;
obj_arr.map(e=>{
      str2+=triggerConstructor(e,i++);
     });
     
      str2+='</form>';
   return str2;
};//
const dreamsForm = document.forms[0];
  const dreamInput = dreamsForm.elements['dream'];
  const textOutput=document.getElementById('text_out');
function save(testForm){
    const Request=new XMLHttpRequest();
 
  
Request.onreadystatechange=function(){
   if(this.readyState==4 && this.status==200){
     
     let str = this.responseText;
};
   Request.open("POST","/addData",true);
 Request.send(testForm);
}};
function loadSome(){
  
  let fd;


  
  const Request=new XMLHttpRequest();
 
  
Request.onreadystatechange=function(){
   if(this.readyState==4 && this.status==200){
     
     let str = this.responseText;
     console.log(dreamInput.value);
     let arr=this.responseText.split("***"); arr.pop(); arr.shift();
     let str2='';
     let obj_arr=[];
     arr.map(e=>{obj_arr.push(new Obj(e));});
     let i=0;
    
     str2=generate(obj_arr);
     let pos_start=str.indexOf(dreamInput.value); console.log(pos_start);
     let pos_end=str.indexOf("***",pos_start);console.log(pos_end);
     str = str.slice(pos_start,pos_end);
    
     
     document.getElementById("pi").innerHTML=str2;
     obj_arr_new=obj_arr;
     
   };
};
 Request.open("GET","/source_m.txt",true);
 Request.send();

};

function getFocus(){
  console.log('d');
  console.log(obj_arr_new);
  let cnt = [];
     let i=0;
     obj_arr_new.map(e=>{ console.log(e.w);if(e.w.indexOf(dreamInput.value.trim())!=-1){cnt.push(i)}; i++;});
     textOutput.innerHTML='';
     console.log(cnt);
  document.getElementById(cnt[0]).focus();
  document.getElementById(cnt[0]).scrollIntoView();
};
let bin=0;
function showAllTriggerSet(){
  for(let i=0;i<obj_arr_new.length;i++){ 
    if(bin==0){  show(i);}else{ show(i); };
    bin=(bin==0)?1:0;
  };

};
function show(id){
  
  if(document.getElementById("trigg"+id).style.display=="none"){
     document.getElementById("trigg"+id).style.display="inline";
     document.getElementById("trigg2x"+id).style.display="inline";
    document.getElementById("border"+id).style.display="inline";
    document.getElementById("border2x"+id).style.display="inline";
    //if(document.getElementById("triggers"+id).style.display="none"){showRestTriggers(id);};
     document.getElementById("p3_"+id).innerHTML="";
     document.getElementById("p4_"+id).innerHTML='<img height=30 width=30 src='+but1_img+'></img>';;
    //document.getElementById("p4_"+id).innerHTML="<img height=20 width=20 src='"+but_img+"'></img>";
  }else{
     if(document.getElementById("triggers"+id).style.display="inline"){showRestTriggers(id);};
     document.getElementById("trigg"+id).style.display="none";
     document.getElementById("trigg2x"+id).style.display="none";
    document.getElementById("border"+id).style.display="none";
    document.getElementById("border2x"+id).style.display="none";
     document.getElementById("p3_"+id).innerHTML="<img height=30 width=30 src='"+but_img+"'></img>";
  };
};
function showRestTriggers(id){
  
  if(document.getElementById("triggers"+id).style.display=="none"){
     document.getElementById("triggers"+id).style.display="inline";
    // if(document.getElementById("trigg"+id).style.display=="none"){show(id);};
     document.getElementById("p1_"+id).innerHTML="&#x2796";
  }else{
     
     document.getElementById("triggers"+id).style.display="none";
    
     document.getElementById("p1_"+id).innerHTML="&#x2795";
  };
};
function showRest(id){
    if(document.getElementById("rest"+id).style.display=="none") {
     document.getElementById("rest"+id).style.display="inline";
     document.getElementById("p2_"+id).innerHTML="&#x2796";
  }else{
     
     document.getElementById("rest"+id).style.display="none";
     document.getElementById("p2_"+id).innerHTML="&#x2795";
  };
};
function shut(name){
   document.getElementById(name).style.display="none";
  document.getElementById(name+"_p").innerHTML="<img height=30 width=30 src='"+but_img+"'></img>"; };
function shutAll(){
  shut("emoji");
  shut("time");
  shut("default");
};
function turn(name){
   if(document.getElementById(name).style.display=="none"){
         shutAll();
         document.getElementById(name).style.display="inline";
         document.getElementById(name+"_p").innerHTML='<img height=30 width=30 src='+but1_img+'></img>';
      }else{
          document.getElementById(name).style.display="none";
            document.getElementById(name+"_p").innerHTML="<img height=30 width=30 src='"+but_img+"'></img>";
          //document.getElementById(name+"_p").innerHTML="<img height=30 width=30 src='"+but_img+"'></img>";
      };
};
function showOnly(that){
  if (that=="emoji_p"){ turn("emoji");
    
  };
  if (that=="time_p"){ turn("time");
    
      };
      
    if(that=="default_p"){turn("default");};
  };
  
    
  

function change(){
  let b_url="https://livewallpaperhd.com/wp-content/uploads/2017/08/Anime-Re-Zero-Wallpaper-Emilia.jpg";
  document.body.style.backgroundImage =(document.body.style.backgroundImage=='url('+b_url+')')?'url(" ")':'url('+b_url+')';

};


function save(){
  
  
  

};


//----------
function loadSome2(){
 let fd;
 const Request=new XMLHttpRequest();
 Request.onreadystatechange=function(){
  try{
   if(this.readyState==4 && this.status==200){

     let parser = new DOMParser();
     let xmlDoc = parser.parseFromString(this.responseText,"text/xml");
     let x = xmlDoc.getElementsByTagName("trigger");
     //console.log(xmlDoc);
     let doc=this.responseXML;
     let txt="";
     let path="/triggers/trigger";
     
      var nodes = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
     var arr_obj=[];
     var result = nodes.iterateNext();
     while (result) {
           let newJXON ={};
           for(let i=0;i<result.childNodes.length;i++){
               newJXON[result.childNodes.item(i).nodeName]=result.childNodes.item(i).childNodes[0].nodeValue;
            };
            result = nodes.iterateNext();
            console.log(newJXON);
            arr_obj.push(newJXON);
        } 
    let triggers_arr= doc.getElementsByTagName("trigger");
     console.log(arr_obj);
     obj_arr_new=arr_obj;
     
     let settings_obj={};
     let doc2=this.responseXML;
     let path_settings="/triggers/settings";
     let test=doc2.evaluate(path_settings,doc2,null,XPathResult.ANY_TYPE,null);
      test=test.iterateNext();
     
     for(let i=1;i<test.childNodes.length;i++)  {
       let i_node =test.childNodes[i];
        settings_obj[i_node.nodeName]={};
          for(let ii=0;ii<i_node.childNodes.length;ii++){
            settings_obj[i_node.nodeName][i_node.childNodes[ii].nodeName]={};
            let i_node2=i_node.childNodes[ii];
            for(let iii=0;iii<i_node2.childNodes.length;iii++){
               settings_obj[i_node.nodeName][i_node.childNodes[ii].nodeName]=i_node2.childNodes[0].nodeValue;
            };
          };
       // console.log(test.childNodes[1].childNodes[i].childNodes[0].nodeValue);
     };
       
       
     
    // settings_obj[test.childNodes[1].nodeName]=test.childNodes[1].nodeValue;
     console.log(settings_obj);
     txt = generate(arr_obj,settings_obj);
     //- txt = generate(arr_obj);
     document.getElementById('pi').innerHTML=txt;
      
   };
     
  }catch(err){console.log(err);};     
   
};
 Request.open("GET","/triggers.xml",true);
 Request.send();

};
//---------------constructor xmltojsobj
function xmlToObj(xml){
  //console.log(xml.childNodes[0]);

};

function loadGreatings(){
 let fd;
 const Request=new XMLHttpRequest();
 Request.onreadystatechange=function(){
  try{
   if(this.readyState==4 && this.status==200){
    let val = confirm("Загрузить сраницу для редактирования приветствий (несохраненные данне будут утеряны!)");
   // if(val==false) return;
     console.log(val);
    let txt = 'greating';
   if(val){ document.getElementById('pi').innerHTML=txt;};

   };
  }catch(err){console.log(err);};     
   
};
 Request.open("GET","/triggers.xml",true);
 Request.send();

};//