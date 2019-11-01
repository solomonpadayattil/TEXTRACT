
const AWS = require('aws-sdk');
AWS.config.update({
  region: "us-east-1" //Here add you region
});
/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

// Load the SDK and UUID
const uuid = require('node-uuid');

// Create an S3 client
const s3 = new AWS.S3();


const express = require('express')
const app = express()
const port = 3000
const textract = new AWS.Textract();

console.log("Region: ", AWS.config.region);

app.get('/textdetect', (req, res) =>{


  let params = {
    Document: { /* required */
      // Bytes: Buffer.from('...') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */,
      S3Object: {
        Bucket: 'node-sdk-sample-b684ad3c-8362-4b3a-9ccd-54ddc428ba3a',
        Name: 'testing2.png',
        // Version: 'STRING_VALUE'
      }
    }
  };

  textract.detectDocumentText(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
  // res.send('Hello World!')

})

// Create a bucket and upload something into it
// var bucketName = 'node-sdk-sample-' + uuid.v4();
// var keyName = 'hello_world.txt';

// s3.createBucket({Bucket: bucketName}, function() {
//   var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//   s3.putObject(params, function(err, data) {
//     if (err)
//       console.log(err)
//     else
//       console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//   });
// });


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
