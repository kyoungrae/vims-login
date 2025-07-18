class file{
    constructor(){

    }

    /**
     * created by go66go66
     * @param BTN_ID file upload active btn id
     * @param PATH  upload file path
     * @param ID_TO_RECEIVE_VALUE  id to receive uuid value
     * @param FOLDER_NAME  file upload folder name
     */
    createFileUpload(BTN_ID,PATH,ID_TO_RECEIVE_VALUE,FOLDER_NAME){
        let flag = Boolean;
        if(!formUtil.checkEmptyValue(BTN_ID)) formUtil.showMessage("");
        if(!formUtil.checkEmptyValue(PATH)) formUtil.showMessage("");
        if(!formUtil.checkEmptyValue(ID_TO_RECEIVE_VALUE)) formUtil.showMessage("");
        if(!formUtil.checkEmptyValue(FOLDER_NAME)) formUtil.showMessage("");

        new createFileUploadHTML(BTN_ID,PATH,ID_TO_RECEIVE_VALUE,FOLDER_NAME);
    };
    deleteFileUpload(){

    };
}

class createFileUploadHTML{
    constructor(BTN_ID,PATH,ID_TO_RECEIVE_VALUE,FOLDER_NAME) {
        this.BTN_ID = BTN_ID;
        this.PATH = PATH;
        this.ID_TO_RECEIVE_VALUE = ID_TO_RECEIVE_VALUE;
        this.FOLDER_NAME = FOLDER_NAME;
        this.setHTML();
    }
    setHTML(){
    }
}
