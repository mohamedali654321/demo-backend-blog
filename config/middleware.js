module.exports={
    timeout:100 ,
    load:{
        before:['responseTime','logger','cors','responses','gzip','elastic'] ,
        order:[] ,
        after:['parser' , 'router']
    },
    settings:{
        elastic:{
            enabled:true
        }
    }
}