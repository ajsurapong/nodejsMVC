const db = require('../config/db');

// create a new blog post
const create = (post, callback) => {   
    const sql = "INSERT INTO post(title, detail) VALUES(?, ?)";
    db.query(sql, [post.title, post.detail], (err, result) => {
        if(err) throw err;
        return callback(result);
    });
}

// read all blog posts
const readAll = (callback) => {
    const sql = "SELECT * FROM post";
    db.query(sql, (err, result) => {
        if(err) throw err;
        return callback(result);
    });
}

// read a blog post
const read = (id, callback) => {
    const sql = "SELECT * FROM post WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if(err) throw err;
        // be careful, we must return result[0] because this is a single query
        return callback(result[0]);
    });
}

// remove a blog post
const remove = (id, callback) => {
    const sql = "DELETE FROM post WHERE id = ?";
    db.query(sql, id, (err, result) => {
        if(err) throw err;
        return callback(result);
    });
}

// update a blog post
const update = (id, post, callback) => {
    const sql = "UPDATE post SET title=?, detail=? WHERE id = ?";
    db.query(sql, [post.title, post.detail, id], (err, result) => {
        if(err) throw err;
        return callback(result);
    });
}

module.exports = {
    create,
    readAll,
    read,
    remove,
    update
};

// Alternatively, we can rewrite:
// module.exports = {
//     create: () => (post, callback) => {   
//         const sql = "INSERT INTO post(title, detail) VALUES(?, ?)";
//         db.query(sql, [post.title, post.detail], (err, result) => {
//             if(err) throw err;
//             return callback(result);
//         });
//     },

//     readAll: (callback) => {
//         const sql = "SELECT * FROM post";
//         db.query(sql, (err, result) => {
//             if(err) throw err;
//             return callback(result);
//         });
//     }
// };