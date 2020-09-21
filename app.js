'use stricte';
var products = [];
var rightSideImageElement = document.getElementById('right-img');
var centerSideImageElement = document.getElementById('center-img');
var leftSideImageElement = document.getElementById('left-img');
var imgContainer = document.getElementById('img-container');
//current image clicked ...

var left;
var right;
var center;
var totalClicks = 0;
var finalResult = document.getElementById('finalResult');



//  a constructor functionName of the product (File path of image)

function ProductMall(name, link) {
    this.link = link;
    this.name = name;
    this.votes = 0;
    this.timesDisplayed = 0;
    products.push(this);

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
    leftImageIndex = Math.floor((Math.random() * products.length));


    do {
        centerImageIndex = Math.floor(Math.random() * products.length);
    } 
    while (leftImageIndex === rightImageIndex);

    do {
        rightImageIndex = Math.floor((Math.random() * products.length));
        leftImageIndex = Math.floor((Math.random() * products.length));
    } while (leftImageIndex === centerImageIndex || rightImageIndex === centerImageIndex);

    displayImages(leftImageIndex, rightImageIndex, centerImageIndex);
}

function displayImages(leftIndex, rightIndex, centerIndex) {
    // THE IMAGE IS PUT TO CALC TIME DISPLAY 
    left = products[leftIndex];
    right = products[rightIndex];
    center = products[centerIndex];
    left.timesDisplayed++;
    right.timesDisplayed++;
    center.timesDisplayed++;


    leftSideImageElement.setAttribute('src', left.link);
    rightSideImageElement.setAttribute('src', right.link);
    centerSideImageElement.setAttribute('src', center.link);

}

displayRandomImages();
imgContainer.addEventListener('click', eventFUN);
// numer of votes 
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

    if (totalClicks > 25) {
        imgContainer.removeEventListener('click', eventFUN);
        displayResults();
        console.log(this.totalClicks);
    }
}
function displayResults() {
    var listItem;
    for (var i = 0; i < products.length; i++) {
        listItem = document.createElement('li');
        // banana Slicer had 3 votes and was shown 5 times
        listItem.textContent = products[i].name + ' had  ' + '  votes  ' + products[i].votes + ' and was showon ' + products[i].timesDisplayed + ' \"  in persentage   ' + (products[i].timesDisplayed / 25 + '\"');
        finalResult.appendChild(listItem);
    }
}
console.log(this.totalClicks);

