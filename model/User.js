const mysql = require('mysql');

//mysql 연결
const conn = mysql.createConnection({
    host: 'lecture-test.cg2c2nro2fra.ap-northeast-2.rds.amazonaws.com',
    user: 'admin',
    password: '01073172026',
    database: 'kdt9',
    port: 3306,
});
conn.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('connect');
});

exports.post_signup = (data, callback) => {
    const query = `INSERT INTO user (userid, pw, name) VALUES ('${data.userid}', '${data.pw}', '${data.name}')`;
    conn.query(query, (err, rows) => {
        console.log('post_signup', rows);
        callback();
    });
};

exports.post_signin = (data, callback) => {
    const query = `SELECT * FROM user WHERE userid='${data.userid}' AND pw='${data.pw}'`;
    conn.query(query, (err, rows) => {
        console.log('post_signin', rows);
        callback(rows);
    });
};

exports.post_profile = (data, callback) => {
    const query = `SELECT * FROM user WHERE userid='${data.userid}' `;
    conn.query(query, (err, rows) => {
        console.log('post_profile', rows);
        callback(rows);
    });
};

exports.edit_profile = (data, callback) => {
    const query = `UPDATE user SET userid='${data.userid}', pw='${data.pw}', name='${data.name}' WHERE id=${data.id}  `;
    conn.query(query, (err, rows) => {
        callback();
    });
};

exports.delete_profile = (id, callback) => {
    const query = `DELETE FROM user WHERE id=${id}`;
    conn.query(query, (err, rows) => {
        callback();
    });
};