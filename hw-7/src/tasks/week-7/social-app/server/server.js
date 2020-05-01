const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const { errorHandler, requireAuth } = require('./middlewares');
const bodyParser = require('body-parser');
const getDb = require('./db');
const PORT = 5000;

const app = express();


app.use(bodyParser.json());

app.use(errorHandler);

app.use(express.static(`${__dirname}/public`));

app.use(cors());

app.post('/signup', async (req, res) => {
    const newUser = req.body;
    const db = await getDb();
    const user = await db.collection('users').findOne({ email: newUser.email.toLowerCase() });
    if (user) {
        return res.sendHTTPError(400, 'User already exists')
    }
    newUser.email = newUser.email.toLowerCase();
    newUser.password = bcrypt.hashSync(newUser.password, 10);
    await db.collection('users').insertOne(newUser);
    res.send({ message: 'success' })
});

app.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    const db = await getDb();
    const user = await db.collection('users').findOne({ email: email.toLowerCase() });
    if (!user) {
        return res.sendHTTPError(401, 'User does not exist')
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            delete user.password;
            const authToken = jwt.sign({_id: user._id}, 'secret', { expiresIn: '10h' });
            res.send({ user, authToken });
        } else {
            res.sendHTTPError(401, 'Password is incorrect');
        }
    })
});

app.get('/api/users', requireAuth, async (req, res) => {
    const db = await getDb();
    const result = await db.collection('users').find({}).toArray();
    res.send(result);
});

app.post('/api/users', async (req, res) => {
    const {id, email, password, first_name, last_name, age} = req.body;
    const newUser = {
        _id: id,
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        age: age,
    };
    const db = await getDb();
    await db.collection('users').insertOne(newUser);
    res.send(newUser);
});

app.get('/api/me', requireAuth, async (req, res) => {
    const db = await getDb();
    const user = await db.collection('users').findOne({ _id: ObjectId(req.userId) }, { fields: { password: false } });
    res.json(user)
});


app.get('/api/posts', requireAuth, async (req, res) => {
    const db = await getDb();
    const posts = await db.collection('posts');
    posts
        .aggregate([
        {
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post_id',
                as: 'post_comments'
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author_id',
                foreignField: '_id',
                as: 'author'
            }
        }
    ])
   .toArray((err, posts) => {
        if (err) {
            console.log('Aggregate error: ', err);
            throw err;
        }
        res.send(posts);
    });
});

app.get('/api/posts/:id', requireAuth, async (req, res) => {
    const db = await getDb();
    console.log(req.params.id);
    const posts = await db.collection('posts');
    posts
        .aggregate([
            {
                $lookup: {
                    from: 'comments',
                    localField: '_id',
                    foreignField: 'post_id',
                    as: 'post_comments'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'author'
                }
            }
        ]).toArray((err, posts) => {
        if (err) {
            console.log('Aggregate error: ', err);
            throw err;
        }
        const post = posts.find(post => post._id ===  Number(req.params.id));
        res.json(post)
    });
});

app.post('/api/posts', requireAuth, async (req, res) => {
    const { id, title, text, author_id } = req.body;
    const post = {
        _id: id,
        title: title,
        text: text,
        author_id: author_id
    };
    const db = await getDb();
    await db.collection('posts').insertOne(post);
    console.log(post);
    res.send(post);
});

app.post('/api/comments', requireAuth, async (req, res) => {
    const {id, post_id, title, text, author_id} = req.body;
    const comment = {
        _id: id,
        post_id: post_id,
        title: title,
        text: text,
        author_id: author_id
    };
    const db = await getDb();
    await db.collection('comments').insertOne(comment);
    res.send(comment);
});

app.get('/api/comments/:id', requireAuth, async (req, res) => {
    const db = await getDb();
    console.log(req.params.id);
    const comments = await db.collection('comments');
    comments
        .aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'author'
                }
            }
        ]).toArray((err, comments) => {
        if (err) {
            console.log('Aggregate error: ', err);
            throw err;
        }
        const comment = comments.find(comment => comment._id ===  Number(req.params.id));
        res.json(comment);
    });
});


app.delete('/api/posts', requireAuth, async (req, res) => {
    const db = await getDb();
    const deletedPost = await db.collection('posts').findOne({_id: req.body.id});

    if(!deletedPost) {
        return res.sendHTTPError(404, 'Post not found');
    }
    await db.collection('posts').deleteOne({_id: req.body.id});
    res.send({ message: `post ${req.body.id} deleted` })
});

app.get('/api/comments', requireAuth, async (req, res) => {
    const db = await getDb();
    console.log(req.params.id);
    const comments = await db.collection('comments');
    comments
        .aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'author_id',
                    foreignField: '_id',
                    as: 'author'
                }
            }
        ]).toArray((err, posts) => {
        if (err) {
            console.log('Aggregate error: ', err);
            throw err;
        }

        res.send(posts);

    });
});

app.delete('/api/comments', async (req, res) => {
    const db = await getDb();
    const deletedComment = await db.collection('comments').findOne({_id: req.body.id});

    if(!deletedComment) {
        return res.sendHTTPError(404, 'Comment not found');
    }
    await db.collection('comments').deleteOne({_id: req.body.id});
    res.send({ message: `comment  ${req.body.id} deleted` })
});



app.use((req, res, next) => {
    res.status(404).send({ message: 'Not Found' })
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on ${PORT} port`)
});
