class customresponse{
    constructor(OK){
        if(OK =="OK")
        this.ResultCode=1;
        else{
            this.ResultCode = 2;
            this.Message=OK;

        }
        this.Message=OK;
    }

}
module.exports = customresponse;