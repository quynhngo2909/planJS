
let powder = 100;
let yeast = 10;
let water = 50;
let oil = 50;
let chocolateSauce = 50;
let topping = 50;

// 1.Tạo hình bánh
const formDonut = () => {
    return new Promise((result, reject) => {
        if (powder <= 0 || yeast <= 0 || water <= 0) return reject(new Error("Not enough ingredient"));
        powder -= 10;
        yeast -= 1;
        water -= 5;
        console.log("Formed donut");
        result("Done");
    })
};

// 2.Chiên bánh
const fryDonut = (input) => {
    return new Promise((result, reject) => {
        if (!input) return reject(new Error("Not finish forming donut"));
        if (oil < 10) return reject(new Error("Not enough oil"));
        oil -= 5;
        console.log("Fried donut");
        result("Done");
    });
};

// 3.Phủ chocolate
const coveredByChoco = (input) => {
    return new Promise((result, reject) => {
        if (!input) return reject(new Error("Not finish chocolate covering"));
        if (chocolateSauce <= 0) return reject(new Error("Not enough chocolate"));
        chocolateSauce -= 1;
        console.log("Done chocolate covering");
        result("Done");
    });
};

// 4.Rắc topping cốm
const coveredByTopping = (input) => {
    return new Promise((result, reject) => {
        if (!input) return reject(new Error("Not finish topping covering"));
        if (topping <= 0) return reject(new Error("Not enough topping"));
        topping -= 1;
        console.log("Done topping covering");
        result("Ready to serve: 1 Donut");
    });
};

// Làm bánh donut: Xử lý bất đồng bộ Promise
const makeDonutPromise = () => {
    return formDonut()
    .then(res => fryDonut(res))
    .then(res => coveredByChoco(res))
    .then(res =>  coveredByTopping(res))
};

// Đơn hàng 10 bánh donut
for (let i = 0; i<=10; i++) {
    makeDonutPromise().then((data) => console.log(data)).catch(err => console.log(err + ''));
};

// Làm bánh donut: Xử lý bất đồng bộ Async/Await
const makeDonutAsync = async () => {
    try {
        let formD = await formDonut();
        let fryD = await fryDonut(formD);
        let coverChoco = await coveredByChoco(fryD);
        let coverTopping = await coveredByTopping(coverChoco);
        console.log("Ready to serve: 1 Donut");
    } catch (err) {
        console.log(err + '');
    };
};


// Đơn hàng 10 bánh donut
for (let i = 0; i <= 10; i++) {
    makeDonutAsync();
};