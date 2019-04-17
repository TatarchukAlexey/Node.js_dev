// Вариант с промисами

const startAfterTime = (timeout, cb) => {
    return setTimeout(cb, timeout);
};


const getQuestion = () => confirm('Как на счет пойти в магазин?');
const moveToShop = () => console.log('Пойти в магазин.');
const choseProducts = () => console.log('Выбираю покупки.');
const getPay = () => console.log('Сделали оплату');

if(getQuestion()) {
    startAfterTime(3000, () => {
        moveToShop();
        startAfterTime(2000, () => {
            choseProducts();
            startAfterTime(1000, () => {
                getPay();
            })
        })
    })
}

// 2 вариант без промиса а с зеном

const startAfterTime = (timeout) => {
    return new Promise((resolve, reject) => {
    setTimeout(() => resolve, timeout);
    })
};

const getQuestion = () => confirm('Как на счет пойти в магазин?');
const moveToShop = () => console.log('Пойти в магазин.');
const choseProducts = () => console.log('Выбираю покупки.');
const getPay = () => console.log('Сделали оплату');

if(getQuestion()) {
    startAfterTime(3000).then(() => {
        moveToShop();
        return startAfterTime(2000)
    })
    .then(() => {
        choseProducts()
        return startAfterTime(1000);
    })
    .then(() => getPay());
}