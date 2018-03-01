var request = require('request');
const express = require('express')
const app = express()
    

function checkIfDevisible(results){


      obj = results[0];
      obj2 = results[1];
       //loop through between range provided by first api 
       for(var i=obj.lower;i<obj.upper+1;i++){
         resStr+=(i!=0?i+':':'');
         //for each key value in respond of second api array loop to find devisible devisors of i
       for(var z=0;z<obj2.outputDetails.length;z++){
         
        (i!=0 && i % (obj2.outputDetails[z].divisor) == 0)?resStr+=obj2.outputDetails[z].output:''  
       }
       resStr+='<br>';    
       }
     }
   

app.get('/', (req, res) => {
//using async.parallel to call both
//and return results as array
      async.parallel([
        /*
         * range Api
         */
        function(callback) {
          var url = "https://join.reckon.com/test1/rangeInfo";
          request(url, function(err, response, body) {
            // JSON body
            if(err) { console.log(err); callback(true); return; }
            obj = JSON.parse(body);
            callback(false, obj);
          });
        },
        /*
         * divisor Api
         */
        function(callback) {
          var url = "https://join.reckon.com/test1/divisorInfo";
          request(url, function(err, response, body) {
            // JSON body
            if(err) { console.log(err); callback(true); return; }
            obj = JSON.parse(body);
            callback(false, obj);
          });
        },
      ],
     //returning resStr after logic is called as res and emptying resStr
      function(err, results) {
        if(err) { console.log(err); res.send(500,"Server Error"); return; }
        checkIfDevisible(results);
        res.send(resStr);
        resStr ='';
      }
      );
 
  
  })

app.listen(9999, () => console.log('Reckon test1 app listening on port 9999'))
