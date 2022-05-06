// import rimraf from 'rimraf';
import tar from 'tar';

tar.create(
    {
        gzip: true,
        cwd: '../banca-fe/local-packages',
        file: '../banca-fe/local-packages/banca-api.tgz',
    },
    ['banca-api'],
    /*() => {
  /!*TODO uncomment went tgz is usable*!/
  // rimraf.sync('../banca-fe/local-packages/banca-api');
},*/
);
