const fs = require('fs');

// Specify the path to the source JSON file
const sourceFilePath = './blockstring.txt';

// Read the JSON file asynchronously
fs.readFile(sourceFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const obj = JSON.parse(JSON.parse(data))
    console.log(obj)

    // Transform the object's keys into an array of values
    const resultArray = Object.keys(obj).map(key => obj[key]);

    // Write the output to a new JSON file
    fs.writeFile('./output.json', JSON.stringify(resultArray, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
      } else {
        console.log('Output saved to output.json');
      }
    });

  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});
