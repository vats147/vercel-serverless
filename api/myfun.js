

module.exports = (req, res) => {
       console.log(req.body);
   res.status(200).json({ name: 'John Doe' ,data:req});

};
