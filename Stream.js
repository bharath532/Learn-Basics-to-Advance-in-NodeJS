const fs=require('fs');

const readstream=fs.createReadStream('./docs/Huge.text',{encoding:'utf8'})
const writestream=fs.createWriteStream('./docs/copyhuge.text')


// readstream.on('data',(buffer)=>{
//     writestream.write('\n new biffer\n');
//     writestream.write(buffer);
// })


//  if you want the content to go on the file don't show 

readstream.pipe(writestream);
 

