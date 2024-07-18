function signInUser(req, res, pool) {
    const { username, password } = req.body;
  
    pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ Login: false, error: 'Internal server error' });
      }
  
      if (results.length > 0) {
        const user = results[0];
        req.session.username = user.username;
        req.session.userid = user.user_id;
        req.session.role = user.role;
        req.session.image=user.image_url
  
        console.log('Session after signInUser:', req.session); 
  
        return res.json({ Login: true });
      } else {
        return res.json({ Login: false });
      }
    });
  }
  
  function checkImage(req, res) {
  
    if (req.session.image) {
      return res.json({ valid: true, image: req.session.image });
    } else {
      return res.json({ valid: false });
    }
  }



  function checkUserId(req, res) {
  
    if (req.session.userid) {
      return res.json({ valid: true, userid: req.session.userid });
    } else {
      return res.json({ valid: false });
    }
  }

  function checkUsername(req, res) {
        console.log('Session in checkUserId:', req.session); 
      
        if (req.session.userid) {
          return res.json({ valid: true, username: req.session.username });
        } else {
          return res.json({ valid: false });
        }
      }
  


function checkRole(req, res) {
    if (req.session.role) {
      return res.json({ valid: true, role: req.session.role});
    } else {
      return res.json({ valid: false });
    }
  }
  
  

  
  function signUpUser(req, res, pool) {
    const { username, email, password, first_name, last_name, image } = req.body;
  
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email, and password' });
    }
  
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ message: 'Database error' });
      }
  
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists with that email' });
      }
  
      pool.query('INSERT INTO users (username, email, password, first_name, last_name, image_url) VALUES (?, ?, ?, ?, ?,?)', [username, email, password, first_name, last_name, image], (err, result) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ message: 'Failed to register user' });
        }
  
        req.session.username = username;
        req.session.userid = result.insertId; 
        req.session.role = 'customer'; 
  
        return res.status(201).json({ id: result.insertId, username, email });
      });
    });
  }
  

  function Logout(req, res) {
    req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session: ' + err.stack);
          return res.status(500).json({ message: 'Failed to logout' });
        }
        res.clearCookie('connect.sid'); 
        res.status(200).json({ message: 'Logged out successfully' });
      });
  }
  
  module.exports = {
    signUpUser,
    signInUser,
    checkUserId,
    Logout,
    checkRole,
    checkImage,
    checkUsername,
  };
  