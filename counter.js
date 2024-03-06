
import fs from 'fs/promises';
// import the path module for working with file paths:
import path from 'path';

const DIR_NODE_MODULES = "./node_modules";

//  init counters for MIT and ISC licenses:
let mitCounter = 0;
let iscCounter = 0;

// 1. define async function to tally licenses recursively inside the specified dir:
async function tallyLicensesRecursively(directoryPath) {
    try {
        // 2. Read the contents of the directory specified by directoryPath asynchronously
            const files = await fs.readdir(directoryPath);

        // 3. Loop through each item in the dir:
        for (const file of files) {
            // 4. Create the full file path by joining the directory path with the file name
                const filePath = path.join(directoryPath, file);
            // 5. Get the file stats asynchronously to determine if it's a directory or a file
                const stats = await fs.stat(filePath);

            // 6. If file = directory:
            if (stats.isDirectory()) {
                // recursively call tallyLicensesRecursively with the dir path
                    await tallyLicensesRecursively(filePath);
            } 
           // 7. Else if file = regular file & its name is package.json:
            else if (stats.isFile() && path.basename(file) === 'package.json') {

                // read content of the file async and parse it to JSON
                // * destructure { license } extract only 'license' property from the parsedContent obj and assign it to const license.
                    const { license } = JSON.parse(await fs.readFile(filePath));

                //  inc the mitCounter
                    if (license === 'MIT') mitCounter++;
                // inc the iscCounter
                    else if (license === 'ISC') iscCounter++;
            }
        }
    } 
    
    catch (error) {
        console.error('Error:', error.message);
    }
}

try {
    // call async func directly and await its completion:
    await tallyLicensesRecursively(DIR_NODE_MODULES);
    
    // 8. create an obj called licenseCounts containing the counts of MIT and ISC licenses:
    const licenseCounts = { MIT: mitCounter, ISC: iscCounter };
    
     // 9. write license counts to 'licenses.json' file in a formatted JSON:
    await fs.writeFile('licenses.json', JSON.stringify(licenseCounts, null, 2));
  
    } catch (error) {
    console.error('Balagan occured error writing to licenses.json:', error);
}





// Start traversing the node_modules folder
// async function start() {
    //     await tallyLicensesRecursively(DIR_NODE_MODULES);
    
    //     const licenseCounts = { MIT: mitCounter, ISC: iscCounter };
    
    //     try {
        //         await fs.writeFile('licenses.json', JSON.stringify(licenseCounts, null, 2));
        //         console.log('License counts written to licenses.json file.');
        //     } catch (error) {
            //         console.error('Error writing to licenses.json:', error);
            //     }
            // }
            
            // start();
            
            
            
            
            // -----------------
            
            // tallyLicensesRecursively(DIR_NODE_MODULES)
            // .then(async () => {
            //     // 8. create an obj called licenseCounts containing the counts of MIT and ISC licenses:
            //     const licenseCounts = { MIT: mitCounter, ISC: iscCounter };
            //     // 9. write license counts to 'licenses.json' file in a formatted JSON:
            //     await fs.writeFile('licenses.json', JSON.stringify(licenseCounts, null, 2));
            //     // console.log('License counts passed to licenses.json file.');
            // })
            // .catch((error) => {
            //     console.error('Balagan occured error writing to licenses.json:', error);
            // });



// ---------------------
// console.log('licence node hello');

// *check licence types in node_modules
// *write 2 saparete counters for licenses MIT and ISC
// * Initialize empty objects for license tally
// * create licenses.json file during execution
// * extracting license data from package.json files within the node_modules directory.
// *  build a license object

// import fs from 'fs/promises'
// import path from 'path'

// const DIR_NODE_MODULES = "./node_modules"
// const licensesFile = "./package.json"

// // console.log(licensesFile);


// // 1. Initialize an empty object to store separate counters for each license type (e.g., MIT, ISC, etc.).

// let mitTally = {};
// let iscTally = {};
// // let mitCounter = 0;
// // let iscCounter = 0;

// // 2. Define a function tallyLicensesRecursively(directoryPath) that accepts a directory path as a parameter:

// async function tallyLicensesRecursively(DIR_NODE_MODULES){
//     try{
//         // 3. Read the contents of the directory asynchronously at directoryPath:
//         const readFiles = await fs.readdir(DIR_NODE_MODULES);
//         // 4. Loop through each item in the directory:

//         for (const file of readFiles) {
//             // 5. Construct the full path of the item by joining directoryPath with the item's name:
//             const filePathConstruct = path.join(DIR_NODE_MODULES, file);
//             // 6. Check if the item is a directory:


// // 9. If the item is a directory: 
//  if (file.isDirectory()) {
//                // * isDirectory() return a boolean

//                await countFilesRecursively(filePathConstruct);
// // a. Recursively call countFilesRecursively with the subdirectory path:
// // b. Add the returned count of files in the subdirectory to fileCount:
//                                      // * when recursively call to countFilesRecursively function with the path of the subdirectory (filePath) 
//                                      //  It calc the total num of files in that subdirectory.

// } 
//         }



//             //  build a license object:
//             // const user = {mit_type,isc_type};

//         // return fs.writeFile('./licenses.json', JSON.stringify(users, null,2));
//     }catch(err){

//     }
// }



// 1. Define a function tallyLicensesRecursively(directoryPath) that accepts a directory path as a parameter:
//     a. Initialize an empty object to store separate counters for each license type (e.g., MIT, ISC, etc.).
//     b. Read the contents of the directory asynchronously at directoryPath.
//     c. Loop through each item in the directory:
//         ci. Construct the full path of the item by joining directoryPath with the item's name.
//         cii. Check if the item is a directory:
//             - If it is a directory, recursively call tallyLicensesRecursively with the subdirectory path.
//             - Merge the returned counters with the main counters object.
//             - Continue to the next item.
//         ciii. If it is a file:
//             - Read the package.json file of the item.
//             - Extract the license type from the package.json.
//             - Update the respective counter for the extracted license type.
//     d. Return the counters object.

// 2. Call tallyLicensesRecursively with the 'node_modules' directory path.
// 3. Write the counters object to a 'licenses.json' file.
