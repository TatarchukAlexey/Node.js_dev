// const misc = require ('./simple_model')
// console.log('добавим %d к 10 и получим "%d+10", misc.x,misc.addX(10)');

// const User = require ('./simple_model');
// const u = new User('Alex',"email");

// console.log(u);

////////////////3

// require ('./simple_model')(9058);
// const check = require ('./simple_model');
// check (9058);

//////////////4
const path = require ('path')

// console.log(path.extname('index.html'));
// выведет: .html

// склеивает , о ставить слеш
// console.log(path.join('/foo','bar','bar(asdf)','...'));
// результат:
// \foo\bar\bar(asdf)

// console.log(path.parse('/foo/user/dyd/file.txt'));
// результат: всегда такие ключи в виде объекта
// { root: '/',
//   dir: '/foo/user/dyd',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }

// console.log(path.resolve('/foo/user', './user'));
// результат: 
// E:\foo\user\user

// console.log(path.resolve('wewewe', 'asfsdafsadf/pmg', '../tyt/image.gif'));
// // результат: 
// E:\bootcamp09\Node.js\Modul1\wewewe\asfsdafsadf\tyt\image.gif


