
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
        if (oil <= 10) return reject(new Error("Not enough oil"));
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
        result("Done: 1 Donut");
    });
};

// Làm bánh donut: Xử lý bất đồng bộ Promise
const makeDonutPromise = () => {
    return formDonut()
        .then(res => fryDonut(res))
        .then(res => coveredByChoco(res))
        .then(res => coveredByTopping(res))
};


///Tạo đơn hàng
//Cần xử lý dừng vòng lặp khi  Promise trả về err
const orderDonutPromise = (num) => {
    for (let i = 0; i < num; i++) {
        makeDonutPromise().then((data) => console.log(data)).catch(err => console.log(err + ''));
    };
}

orderDonutPromise(2);

// Làm bánh donut: Xử lý bất đồng bộ Async/Await
const makeDonutAsync = async () => {
    try {
        let formD = await formDonut();
        let fryD = await fryDonut(formD);
        let coverChoco = await coveredByChoco(fryD);
        let coverTopping = await coveredByTopping(coverChoco);
        console.log(coverTopping);
    } catch (err) {
        console.log(err + '');
    };
};


//Tạo đơn hàng
//Cần xử lý dừng vòng lặp khi  Async/Await trả về err
const orderDonutAsync = async (num) => {
    let count = 0;
    try {
        for (; count < num; count++) {
            let doing = await makeDonutAsync();
            // if (doing.match(/^Error/)) break;
        }
        console.log(`Ready to server: ${count} donut(s)`);
    } catch (err) {
        console.log(err + '');
    };
};


orderDonutAsync(2);

