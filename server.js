
const http = require('http');
const express = require('express');
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
 // http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = {};
config.prefix=".";
client.lang=1;
client.prefix=".";




var bodyParser = require('body-parser');

var multer = require('multer'); // v1.0.5
var upload = multer();
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('public'));




 
// http://expressjs.com/en/starter/basic-routing.html
app.get('/i', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
   //response.sendStatus(200);
  
});

app.get('/showData', function(request, response) {
  
});
//let res="";
app.post('/addData',function(request, response) {
try{ 
   //if(request.body.avtorization.login!=process.env.login||request.body.avtorization.pass!=process.env.pass) {
     if(process.env["x_"+request.body.avtorization.login]!=request.body.avtorization.pass){
     console.log("wrong login or password");
     response.send("<style>h1 {color:red;}p {color:red;}</style><p>!Не верный логин/пароль </p>"); 
     //return;
     };
    
  async function ins(){
   let obj=request.body[0];
  let obj2=request.body;

    let res= await createXML(obj2);
    response.send("<style>h1 {color:red;}p {color:blue;}</style><p>Изменения сохранены</p>");
    
 
 
 
    };//async ins end
         ins();
         
}catch(err){console.log(err);};  

});//post  end









//-------------------------------------
async function xml_body(obj,tagname){
  let str_xml='<'+tagname+'>';
    for(let key in obj){ str_xml+='<'+key+'>'; str_xml+=(obj[key]!='')?obj[key]:'undefined'; str_xml+='</'+key+'>'; };
    str_xml+='</'+tagname+'>';
  return str_xml;
};
async function createXML(obj2){
  let res="";
   let str_xml='<?xml version="1.0" encoding="UTF-8"?>\n';
  var d=new Date();
  str_xml+='<triggers data="'+d.toString()+'">\n';
  let setting_xml='<settings>\n';
  console.log(obj2);
  for(let key2 in obj2){
    let obj=obj2[key2];
    if(key2=="emojis"){
       //setting_xml+=obj2[key2]+'</settings>'; 
       setting_xml+=await xml_body(obj,'emojis');
        };
    if(key2=="time"){
       //setting_xml+=obj2[key2]+'</settings>'; 
       setting_xml+=await xml_body(obj,'time');
        };
     if(key2=="a"){setting_xml+='<a>'+obj+'</a>';};
     if(key2=="default"){
       setting_xml+='<default>';
       setting_xml+='<ds>'+obj['ds']+'</ds>';
       setting_xml+='<dq>'+obj['dq']+'</dq>';
       setting_xml+='</default>';
     };
    if(!Number(parseInt(key2[0]))&& key2[0]!='0' ){continue;};
    
    
    if(obj.type=='del'){continue;};
    if((obj.w==''||obj.r==''||obj.w=='undefined'||obj.r=='undefined')&&(!(obj.type=='dq'||obj.type=='ds'))){obj.type='off';};
    /*
    str_xml+='<trigger>';
    for(let key in obj){ str_xml+='<'+key+'>'; str_xml+=(obj[key]!='')?obj[key]:'undefined'; str_xml+='</'+key+'>'; };
    str_xml+='</trigger>';
    */
    str_xml+=await xml_body(obj,'trigger');
  };
  
  
  setting_xml+='</settings>';
  str_xml+=setting_xml;
  str_xml+='</triggers>';
await fs.writeFile('./public/triggers.xml', str_xml, function (err) {
  if (err) {console.log(err); res+=err.message;};
  console.log('Saved!');
   res+=" file save; ";
});
  await fs.writeFile('./public/setting.xml', setting_xml, function (err) {
  if (err) {console.log(err); res+=err.message;};
  console.log('Saved!');
   res+=" file save; ";
});
  //---------------
  
  await fs.appendFile('./public/triggers_recovery.xml', "\n"+d.toString()+"\n"+str_xml, function (err) {
  if (err) {console.log(err); res+=err.message;};
  res+=" recovery file add; ";
});
  //----------------------------------------------
  return res;
  
};//createXML end
//---------------------------------------------------------------


//-------------------DISCORD
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});//event trigger

client.on("ready", () => {
  console.log("I am ready!");
});

client.on("message", (message) => {
 
  if ( message.content.startsWith(config.prefix)||(message.mentions.members.first()!=undefined && message.mentions.members.first().user.id==client.user.id)  ){
    

    
    let args=[];
  if( message.content.startsWith(config.prefix) ){
       args = message.content.slice(config.prefix.length).trim().split(/ +/g);
       
   }else if (message.mentions.members.first().user.id==client.user.id)  {
      
        
      //if(message.guild.id=='301063859702071316'||message.guild.id=='476056002391834634'){
        args = message.content.slice().trim().split(/ +/g);
        args[0]='mental';
     // };//if ali
        
   };
  
    try {
    let alias =args[0];
    let keyWords={
       typing:[['typeme'],['ктоя']],
        start:[['start'],['старт']],
       typing_rnd:[['typemefast'],['ктоябыстро']]
    };
      if(!args[0]) return;
    for( var key in keyWords){if(keyWords[key][client.lang]==args[0].toLowerCase()){ alias=key; break;}};

    let commandFile = require(`./commands/${alias}.js`);
    commandFile.run(client, message,args);
  } catch (err) {
    console.error(err);
  }//try end
  };//if starts with prefix
  return;
});
client.login(process.env.TOKEN_BOT);
//--------DISCORD END