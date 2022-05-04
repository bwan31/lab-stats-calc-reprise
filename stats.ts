function readAllNumbers() : number[] {
    let textArea = document.querySelector("textarea") as HTMLTextAreaElement;
    let lines : string[] = textArea.value.split("\n");
    let numbers : number[] = [];

    //Step 4: update to handle multiple numbers on one line

    for (let i = 0; i < lines.length; i++){
        let line = lines[i].split(" ")
        for (let j = 0; j < line.length; j++){
            if (line[j] === "\n" || line[j] === "")
                continue;
            numbers.push(Number(line[j]));
            // console.log(i);
            // console.log(j);
        }
    }
    return numbers;
}

function getMean( nums  : number[]) : number {
    let sum = 0;
    for (const n of nums){
        sum += n;
    }
    return Number((sum / nums.length).toFixed(2));
}

function getAboveBelowMean(nums : number[]) : [number, number] {
    let mean = getMean(nums);
    let aboveCount = 0;
    let belowCount = 0;
    for (const n of nums){
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}

// PART A : Basic Stats

function getMedian(nums : number[]) : number {
    //Step 1
    let index = nums.length
    let result = (nums[index/2] + nums[(index/2)-1]) / 2
    if (nums.length % 2 === 1)
        return Number(nums[(index - 1) / 2].toFixed(2));
    else
        return Number(result.toFixed(2));
}

function getMinMax(nums : number[]) : [number, number] {
    //Step 2
    return [nums[0], nums[nums.length-1]]; // remove me!
}

function getStdDev(nums : number[]) : number {
    //Step 3
    let stdDev = 0;
    for (let i = 0; i < nums.length; i++) {
        stdDev += (nums[i] - getMean(nums)) ** 2;
    }
    stdDev /= nums.length
    stdDev = Math.sqrt(stdDev);
    return Number(stdDev.toFixed(2)); // remove me!
}

let basicStatsAnalyzeButton = document.querySelector("button#analyze") as HTMLButtonElement;
basicStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });
    // console.log(numbers);
    (document.querySelector("#mean") as HTMLElement).textContent = `${getMean(numbers)}`;    
    (document.querySelector("#aboveBelow") as HTMLElement).textContent = `${getAboveBelowMean(numbers).join(" & ")}`;
    (document.querySelector("#median") as HTMLElement).textContent = `${getMedian(numbers)}`;
    (document.querySelector("#minMax") as HTMLElement).textContent = `${getMinMax(numbers).join(" & ")}`;
    (document.querySelector("#stdDev") as HTMLElement).textContent = `${getStdDev(numbers)}`;
});

// PART B: Advanced Integer Stats

function getLeastCommonMultiple(nums : number[]) : number {
    let number = nums[nums.length-1];
    let check = false;
    while (check === false) {
        check = true
        for(const n of nums) {
            if (number % n != 0){
                check = false;
                break;
            } else
                check = true;
        }
        if (check === false)
            number += 1;
    } 
    return number; // remove me!
}

function getAllCommonFactors(nums : number[]) : number[] {
    let factors : number[] = [];
    let number = nums[0];
    let boolean = false;
    while (number > 0) {
        for (const n of nums) {
            if (n % number != 0){
                boolean = false;
                break;
            } else
                boolean = true;
        }
        if (boolean === true)
            factors.push(number)
        number -= 1
    }
    return factors; // remove me!
}

let advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced") as HTMLButtonElement;
advancedStatsAnalyzeButton.addEventListener("click", function () {
    let numbers : number[] = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function(a,b){ return a - b });

    (document.querySelector("#lcm") as HTMLElement).textContent = `${getLeastCommonMultiple(numbers)}`;
    (document.querySelector("#factors") as HTMLElement).textContent = `${getAllCommonFactors(numbers).join(", ")}`;
});
