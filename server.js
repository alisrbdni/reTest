var request = require('request');
const express = require('express')
const app = express()
var async = require('async');
var responseBody1,responseBody2,resStr='';
     function checkIfDivisible(results){
      obj = results[0];
      obj2 = results[1];
       //loop through between range provided by first api 
       for(var i=obj.lower;i<obj.upper+1;i++){
         resStr+=(i!=0?i+':':'');
         //for each key value in respond of second api array loop to find divisible divisors of i
       for(var z=0;z<obj2.outputDetails.length;z++){
         
        (i!=0 && i % (obj2.outputDetails[z].divisor) == 0)?resStr+=obj2.outputDetails[z].output:''  
       }
       resStr+='<br>';    
       }
     }
   

app.get('/', (req, res) => {
//using async parallel to run both funcs with callbacks 
//and store in results arr
      async.parallel([
        /*
         * range API
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
         * divisor API
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
      /*
       * calling checkIfDivisible as logic and sending resStr as response 
       */
      function(err, results) {
        if(err) { console.log(err); res.send(500,"Server Error"); return; }
        checkIfDivisible(results);
        res.send(resStr);
        resStr ='';
      }
      );
    // }
  
  })

app.listen(9999, () => console.log('Reckon test1 app listening on port 9999'))
