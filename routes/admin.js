const { response } = require('express');
var express = require('express');
var router = express.Router();
var adminHelpers=require('../helpers/admin-helpers');
var userHelpers=require('../helpers/user-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
 userHelpers.blogViewer().then((blogs)=>{
  res.render('adminpage',{admin:true,blogs});

 })
 
});
router.post('/add-blog',(req,res)=>{
  adminHelpers.blogadder(req.body)
  res.redirect('/admin')

})
router.get('/edit-blog/:id',async(req,res)=>{
  console.log(req.params.id);
  let blogs=await adminHelpers.blogViewer(req.params.id)
  res.render('edit-blogs',{admin:true,blogs})
  
})

router.post('/update-blog/:id',(req,res)=>{
  adminHelpers.updateBlog(req.params.id,req.body).then((response)=>{
    res.redirect('/admin')
  })

})
router.get('/delete-blog/:id',(req,res)=>{
adminHelpers.deleteBlog(req.params.id).then((response)=>{
  console.log("Deleted succcessfully....");
  res.redirect('/admin')
})
})
router.get('/view-data',(req,res)=>{
adminHelpers.viewEmails().then((email)=>{
  res.render('view-emails',{admin:true,email})
})

})
router.get('/edit-comments/:id',async(req,res)=>{
  console.log(req.params.id);
  let blogs=await adminHelpers.blogViewer(req.params.id)
  res.render('edit-comments',{admin:true,blogs})
  
})
router.post('/update-comments/:id',(req,res)=>{
  console.log(req.body);
  var arraySize=req.body.email.length
  var checker=req.body.email
  console.log(typeof checker);
  if (typeof checker=='string')
  {
    arraySize=1
    var ifChecker=true
  }else{
    console.log("more than 1");
  }
  for(let i=0;i<arraySize;i++)
  {
  adminHelpers.updateComments(req.params.id,i,req.body,ifChecker)
  .then((response)=>{
    
  })
}
  res.redirect('/admin')
})
router.get('/view-enquiry',(req,res)=>{
  userHelpers.enquiryViewer().then((enquiry)=>{
    res.render('enquiry-viewer',{admin:true,enquiry})
  })
})
router.get('/subscribe',(req,res)=>{
  adminHelpers.subscribeViewer().then((subscribe)=>{
    res.render('subscribe-viewer',{admin:true,subscribe})
  })
})
router.post('/delete-comment/:id',(req,res)=>{
  console.log(req.body);
  console.log(req.params.id);
  adminHelpers.deleteComment(req.params.id,req.body).then((response)=>{
    res.redirect('/admin')
  })
})

module.exports = router;
