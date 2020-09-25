'use stricte';
var products = [];
var rightSideImageElement = document.getElementById('right-img');
var centerSideImageElement = document.getElementById('center-img');
var leftSideImageElement = document.getElementById('left-img');
var imgContainer = document.getElementById('img-container');
//current image clicked ...
var testArray = [-1, -1, -1];
var left;
var right;
var center;
var totalClicks = 0;
var finalResult = document.getElementById('finalResult');
// var votesArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// var shownArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// var lables = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
var votesArr = [];
var shownArr = [];
var lable = [];
//  a constructor functionName of the product (File path of image)
function ProductMall(name, link) {
    this.link = link;
    this.name = name;
    this.votes = 0;
    this.displayed = 0;
    products.push(this);
    lable.push(this.name);
}

if(localStorage.getItem('p')){
    // products=[];
    products=JSON.parse(localStorage.getItem('products'));
} 
new ProductMall('pag', 'img/bag.jpg');
new ProductMall('banana', 'img/banana.jpg');
new ProductMall('boots', 'img/boots.jpg');
new ProductMall('breakfast', 'img/breakfast.jpg');
new ProductMall('bubblegum', 'img/bubblegum.jpg');
new ProductMall('chair', 'img/chair.jpg');
new ProductMall('cthulhu', 'img/cthulhu.jpg');
new ProductMall('dog-duck', 'img/dog-duck.jpg');
new ProductMall('dragon', 'img/dragon.jpg');
new ProductMall('pen', 'img/pen.jpg');
new ProductMall('pet-sweep', 'img/pet-sweep.jpg');
new ProductMall('scissors', 'img/scissors.jpg');
new ProductMall('shark', 'img/shark.jpg');
new ProductMall('sweep', 'img/sweep.png');
new ProductMall('tauntaun', 'img/tauntaun.jpg');
new ProductMall('unicorn', 'img/unicorn.jpg');
new ProductMall('usb', 'img/usb.gif');
new ProductMall('water-can', 'img/water-can.jpg');
new ProductMall('wine-glass', 'img/wine-glass.jpg');

function displayRandomImages() {
    var leftImageIndex;
    var rightImageIndex;
    var centerImageIndex;
    do {
        leftImageIndex = Math.floor((Math.random() * products.length));//3
    } while (leftImageIndex === testArray[0] || leftImageIndex === testArray[1] || leftImageIndex === testArray[2]);

    do {
        centerImageIndex = Math.floor(Math.random() * products.length);//5 
    }
    while (leftImageIndex === centerImageIndex || centerImageIndex === testArray[0] || centerImageIndex === testArray[1] || centerImageIndex === testArray[2]);// no duplicate image in the row


    do {
        rightImageIndex = Math.floor((Math.random() * products.length));//7
    } while (leftImageIndex === rightImageIndex || rightImageIndex === centerImageIndex || rightImageIndex === testArray[0] || rightImageIndex === testArray[1] || rightImageIndex === testArray[2]);
    testArray=[];
    // testArray.pop();
    // testArray.pop();
    // testArray.pop();
    testArray.push(leftImageIndex);
    testArray.push(centerImageIndex);
    testArray.push(rightImageIndex);

    displayImages(leftImageIndex, rightImageIndex, centerImageIndex);
}

function displayImages(leftIndex, rightIndex, centerIndex) {
    // THE IMAGE IS PUT TO CALC TIME DISPLAY 
    left = products[leftIndex];
    right = products[rightIndex];
    center = products[centerIndex];
    left.displayed++;
    right.displayed++;
    center.displayed++;
    leftSideImageElement.setAttribute('src', left.link);
    rightSideImageElement.setAttribute('src', right.link);
    centerSideImageElement.setAttribute('src', center.link);

}

displayRandomImages();
// add listner to change it 
imgContainer.addEventListener('click', eventFUN);
// numer of votes 
// change img+ chane votes and display 
function eventFUN(event) {
    var clickedImage;
    if (event.target.id === 'left-img') {
        clickedImage = left;
    } else if (event.target.id === 'right-img') {
        clickedImage = right;
    }
    else if (event.target.id === 'center-img') {
        clickedImage = center;
    }

    if (clickedImage) {
        clickedImage.votes++;
        displayRandomImages();
        totalClicks++;
    }

    if (totalClicks >= 25) {
        imgContainer.removeEventListener('click', eventFUN);
        displayResults(); // to display 3 img with not clickable ...
        console.log(this.totalClicks);
        localStorage.setItem('products',JSON.stringify(products));

    }

}
function chart(){
    var ctx = document.getElementById('myChart').getContext('2d');
     var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: lable,
            datasets: [{
                label: 'voted products',
                backgroundColor: 'darkgray',
                borderColor: 'black',
                data: votesArr

            }, {
                label: 'shown products',
                backgroundColor: 'black',
                borderColor: 'white',
                data: shownArr
            }]

        }
        });
}

function displayResults() {

    var listItem;
    for (var i = 0; i < products.length; i++) {
        listItem = document.createElement('li');
        // banana Slicer had 3 votes and was shown 5 times
        listItem.textContent = products[i].name + ' had  ' + '  votes  ' + products[i].votes + ' and was showon ' + products[i].displayed + ' \"  in persentage   ' + (products[i].displayed / 25 + '\"');
        finalResult.appendChild(listItem);
    }
    //     var votesArr=[];
    // var shownArr=[];
    // var lable=[];
    // x-axis products        

    for (var i = 0; i < products.length; i++) {
        // lables[i] += products[i].name;
        // console.log(lables[i]);
        shownArr.push(products[i].displayed);
    }
    // y-axis  # votes  for 
    for (var i = 0; i < products.length; i++) {
        // votesArr[i] += products[i].votes;
        // console.log(votesArr[i]);
        votesArr.push(products[i].votes);
    }
    console.log(votesArr);
    chart();
    //shownArr
    // y-axis s= display

    // for (var i = 0; i < products.length; i++) {
    //     // shownArr[i] += products[i].displayed;
    //     // console.log(shownArr[i]);
    //     label.
    // }
    // chart.config.data[0]. = lables;
    // chart.config.data.datasets[0] = votesArr;
    // chart.config.data.datasets[1].data = shownArr;
}

console.log(ProductMall);
