var db =require('../config/connection')
var collection= require('../config/collections')
var objectId=require('mongodb').ObjectID
const collections = require('../config/collections')
const { response } = require('express')

module.exports={

blogViewer:()=>{

  return new Promise(async(resolve,reject)=>{
      let blogs=await db.get().collection(collection.BLOGS_COLLECTIONS).find().toArray()
      resolve(blogs)
  })

},
readAblog:(blogId)=>{

    return new Promise(async(resolve,reject)=>{
        let blog=await db.get().collection(collection.BLOGS_COLLECTIONS).findOne({_id:objectId(blogId)})
            resolve(blog)
        
        
    })

},
commentAdder:(blogId,commentData)=>{
    return new Promise(async(resolve,reject)=>{
     
        let comment={
            email:commentData.email,
            message:commentData.comment,
            blogid:blogId

        }
   
      
        let blog=await db.get().collection(collection.BLOGS_COLLECTIONS).findOne({_id:objectId(blogId)})
        if(blog)
        {
            db.get().collection(collection.BLOGS_COLLECTIONS).updateOne({ _id: objectId(blogId) },
                {
                    $push: { comments: comment }
                }
            ).then((response) => {
                resolve()
            })
        }
        else{
            console.log("no such blogs found in the database");
        }
    })
},
emailCollector:(data)=>{
    return new Promise((resolve,reject)=>{
       emailobj={
           email:data.email
       }
        db.get().collection(collection.EMAILIDS_COLLECTED).insertOne(emailobj).then((data)=>{
            resolve(data)
        })
    })
},
enquiryCollector:(data)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.ENQUIRY_COLLECTION).insertOne(data).then((response)=>{
            resolve(response)
        })

    })
},
enquiryViewer:()=>{
    return new Promise(async(resolve,reject)=>{
        let enquiry=db.get().collection(collection.ENQUIRY_COLLECTION).find().toArray().then((enquiry)=>{
            console.log(enquiry);
            resolve(enquiry)
        })
    })
},
subscribe:(data)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.SUBSCRIBE).insertOne(data).then((response)=>{
            resolve(response)
        })
    })
},
recomendations:(type)=>{
    return new Promise(async(resolve,reject)=>{
        let catBlogs=db.get().collection(collection.BLOGS_COLLECTIONS).find({category:type}).toArray().then((catBlogs)=>{
            resolve(catBlogs)
        })
    })
},
mostViwed:()=>{
    return new Promise(async(resolve,reject)=>{
        
        
        let mostViewed=await db.get().collection(collection.BLOGS_COLLECTIONS).find({clicks:{$gt:100}},).toArray().then((mostViewed)=>{
            resolve(mostViewed)
        })
    })
},
clickCounter:(blogId)=>{
    return new Promise(async(resolve,reject)=>{
       await db.get().collection(collection.BLOGS_COLLECTIONS).updateOne({ _id: objectId(blogId) },{$inc:{clicks:1}}).then((response)=>{
            resolve(response)
           
        })
    })
},
likeBlog:(blogId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.BLOGS_COLLECTIONS).updateOne({ _id: objectId(blogId) },{$inc:{likes:1}}).then((response)=>{
            resolve(response)
        })
    })
}
}