const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
function findSummation(n =1) {
    if (typeof n !== 'number' || n <= 0 || !Number.isInteger(n)) {
        return 'Invalid input';
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

function uppercaseFirstandLast(str) {
    let words = str.split(' ');
    let result = words.map(word => {
        if (word.length === 0) {
            return '';
        }
        let firstChar = word.charAt(0).toUpperCase();
        let lastChar = word.charAt(word.length - 1).toUpperCase();
        let middlePart = word.slice(1, -1);
        return firstChar + middlePart + lastChar;
    });
    return result.join(' ');
}
// Function to find average and median of an array of numbers
function findAverageAndMedian(numArr) {
    let sum = numArr.reduce((acc, val) => acc + val, 0);
    let average = sum / numArr.length;

    let sortedArr = numArr.slice().sort((a, b) => a - b);
    let n = sortedArr.length;
    let median;

    if (n % 2 === 0) {
        // Even number of elements
        median = (sortedArr[n / 2 - 1] + sortedArr[n / 2]) / 2;
    } else {
        // Odd number of elements
        median = sortedArr[Math.floor(n / 2)];
    }

    return { average, median };
}

// Function to find the first four-digit number in a string
function find4Digits(str) {
    let numbers = str.split(' ');
    for (let i = 0; i < numbers.length; i++) {
        let num = numbers[i];
        // Check if the current item is a four-digit number
        if (num.length === 4 && !isNaN(num)) {
            return num; // Return the first four-digit number
        }
    }
    return false;
}


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'A3-Q1.html'));
})


app.post('/summation', (req, res) => {
    const num1 = parseInt(req.body.num1);
    const result = findSummation(num1);
    res.send(`<p>Summation result is: ${result}</p><a href="/">Back</a>`);
});
app.post('/uppercase', (req, res) => {
    const word = req.body.word;
    const result = uppercaseFirstandLast(word);
    res.send(`<p>The result is: ${result}</p><a href="/">Back</a>`);
});

app.post('/averageMedian', (req, res) => {
    const numArray = req.body.numArray.split(',').map(Number);
    const result = findAverageAndMedian(numArray);
    res.send(`<p>Average: ${result.average}, Median: ${result.median}</p><a href="/">Back</a>`);
});

app.post('/findDigits', (req, res) => {
    const text = req.body.text;
    const result = find4Digits(text);
    res.send(`<p>Four-digit number found: ${result ? result : 'None found'}</p><a href="/">Back</a>`);
});


const port = 3000;

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:3000`);

});
