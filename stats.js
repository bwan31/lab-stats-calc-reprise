function readAllNumbers() {
    var textArea = document.querySelector("textarea");
    var lines = textArea.value.split("\n");
    var numbers = [];
    //Step 4: update to handle multiple numbers on one line
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].split(" ");
        for (var j = 0; j < line.length; j++) {
            if (line[j] === "\n" || line[j] === "")
                continue;
            numbers.push(Number(line[j]));
            // console.log(i);
            // console.log(j);
        }
    }
    return numbers;
}
function getMean(nums) {
    var sum = 0;
    for (var _i = 0, nums_1 = nums; _i < nums_1.length; _i++) {
        var n = nums_1[_i];
        sum += n;
    }
    return Number((sum / nums.length).toFixed(2));
}
function getAboveBelowMean(nums) {
    var mean = getMean(nums);
    var aboveCount = 0;
    var belowCount = 0;
    for (var _i = 0, nums_2 = nums; _i < nums_2.length; _i++) {
        var n = nums_2[_i];
        if (n < mean)
            belowCount++;
        else if (n > mean)
            aboveCount++;
    }
    return [aboveCount, belowCount];
}
// PART A : Basic Stats
function getMedian(nums) {
    //Step 1
    var index = nums.length;
    var result = (nums[index / 2] + nums[(index / 2) - 1]) / 2;
    if (nums.length % 2 === 1)
        return Number(nums[(index - 1) / 2].toFixed(2));
    else
        return Number(result.toFixed(2));
}
function getMinMax(nums) {
    //Step 2
    return [nums[0], nums[nums.length - 1]]; // remove me!
}
function getStdDev(nums) {
    //Step 3
    var stdDev = 0;
    for (var i = 0; i < nums.length; i++) {
        stdDev += Math.pow((nums[i] - getMean(nums)), 2);
    }
    stdDev /= nums.length;
    stdDev = Math.sqrt(stdDev);
    return Number(stdDev.toFixed(2)); // remove me!
}
var basicStatsAnalyzeButton = document.querySelector("button#analyze");
basicStatsAnalyzeButton.addEventListener("click", function () {
    var numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    // console.log(numbers);
    document.querySelector("#mean").textContent = "".concat(getMean(numbers));
    document.querySelector("#aboveBelow").textContent = "".concat(getAboveBelowMean(numbers).join(" & "));
    document.querySelector("#median").textContent = "".concat(getMedian(numbers));
    document.querySelector("#minMax").textContent = "".concat(getMinMax(numbers).join(" & "));
    document.querySelector("#stdDev").textContent = "".concat(getStdDev(numbers));
});
// PART B: Advanced Integer Stats
function getLeastCommonMultiple(nums) {
    var number = nums[nums.length - 1];
    var check = false;
    while (check === false) {
        check = true;
        for (var _i = 0, nums_3 = nums; _i < nums_3.length; _i++) {
            var n = nums_3[_i];
            if (number % n != 0) {
                check = false;
                break;
            }
            else
                check = true;
        }
        if (check === false)
            number += 1;
    }
    return number; // remove me!
}
function getAllCommonFactors(nums) {
    var factors = [];
    var number = nums[0];
    var boolean = false;
    while (number > 0) {
        for (var _i = 0, nums_4 = nums; _i < nums_4.length; _i++) {
            var n = nums_4[_i];
            if (n % number != 0) {
                boolean = false;
                break;
            }
            else
                boolean = true;
        }
        if (boolean === true)
            factors.push(number);
        number -= 1;
    }
    return factors; // remove me!
}
var advancedStatsAnalyzeButton = document.querySelector("button#analyze-advanced");
advancedStatsAnalyzeButton.addEventListener("click", function () {
    var numbers = readAllNumbers();
    //Note: Sorting numbers requires passing a custom comparison function to .sort()
    numbers.sort(function (a, b) { return a - b; });
    document.querySelector("#lcm").textContent = "".concat(getLeastCommonMultiple(numbers));
    document.querySelector("#factors").textContent = "".concat(getAllCommonFactors(numbers).join(", "));
});
