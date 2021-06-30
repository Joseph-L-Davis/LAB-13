import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  const { session } = req.cookies;
  const payload = jwt.verify(session, process.env.SECRET);
  req.use = payload;
  next();
}
