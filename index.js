const Query = require("minecraft-server-util")
const fs = require('fs');
const util = require('util')


//const domains = [
  //"mudfish.aternos.host",
  //"175.107.194.138",
  //"duckbill.aternos.host",
  //"barb.aternos.host","jill.aternos.host"
//];

const fileContents = fs.readFileSync('domains.txt', 'utf8')
const domains = fileContents.split('\n')


var data={};
try{
  data = JSON.parse(fs.readFileSync('servers.json'));
}catch{
  fs.writeFileSync('servers.json', "{}");
  data = JSON.parse(fs.readFileSync('servers.json'));
}

async function pingServer(server,port) {
  var sip=server+":"+port
  try {
    
    
    const client = require('minecraft-server-util')
    const mserver = await client.status(server,port)
    //console.log(sip)const mserver = await client.status(squid.aternos.host,33711)
    //const response = await util.promisify(mserver.ping).call(mserver)
    //console.log(mserver)
    //console.log(mserver.players)
    
    if (mserver.players.online > -1&&mserver.version.name!="⚠ Error") {
      data[sip] = {};
      data[sip]["version"]=mserver.version.name
      data[sip]["online"]=mserver.players.online
      data[sip]["players"]=mserver.players.sample
      console.log(sip);
      fs.writeFileSync('servers.json', JSON.stringify(data));
    }

  }
    //const query = mcserver.status();
    
   catch (error) {
    
    if(error.message.substring(0, 20)!="Server is offline or"&&error.message.substring(0, 20)!="Socket closed unexpe"&&error.message.substring(0, 20)!="getaddrinfo ENOTFOUN"){
      console.log(sip)
      console.log(error);
      console.log("("+error.message.substring(0, 20)+")");
    }console.log(sip);
  }
}


  for (const subdomain of domains) {
    if(subdomain!==""){
      for (let i = 33710; i < 33712; i++) {
        setTimeout(() => pingServer(subdomain,i), 0);
        
      }
    }
}

