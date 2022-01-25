const {Employee }=require('../model/index')

//show the list of employee

const index=(req,res,next)=>
{
   
 Employee.find().then(result=>
    {
        res.json({
            result,
            message:"you account is accessed Successfully"
        })
    }).catch(error=>
        {
            res.json({

                message: "an error occured"
            })
        })


}
module.exports={
    index
}