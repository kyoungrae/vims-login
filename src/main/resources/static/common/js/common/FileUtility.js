class file{
    constructor(){

    }

    /**
     * created by ikyoungtae
     * @param BTN_ID file upload active btn id
     * @param PATH  upload file path
     * @param ID_TO_RECEIVE_VALUE  id to receive uuid value
     * @param FOLDER_NAME  file upload folder name
     */
    createFileUpload(BTN_ID,PATH,ID_TO_RECEIVE_VALUE,FOLDER_NAME){
        new createFileUploadHTML(BTN_ID,PATH,ID_TO_RECEIVE_VALUE,FOLDER_NAME);
    };
    deleteFileUpload(){

    };
}

class createFileUploadHTML{
    constructor(BTN_ID,PATH,ID_TO_RECEIVE_VALUE,FOLDER_NAME) {
        this.BTN_ID = "#"+BTN_ID;
        this.PATH = PATH;
        this.ID_TO_RECEIVE_VALUE = ID_TO_RECEIVE_VALUE;
        this.FOLDER_NAME = FOLDER_NAME;

        this.isCheckParameters();                //NOTE : (1) 파라미터 검증
        this.globalVariable();                   //NOTE : (2) 전역 변수 설정
        this.setUploadHTML();                    //NOTE : (3) 업로드 POPUP UI 설정
        this.fileUploadPopupOpenBtnClickEvent(); //NOTE : (4) 파일 업로드 팝업 OPEN 이벤트
    }
    //NOTE : 파라미터 검증
    isCheckParameters(){
        if(!formUtil.checkEmptyValue(this.BTN_ID)) formUtil.showMessage("please insert BTN_ID value");
        if(!formUtil.checkEmptyValue(this.PATH)) formUtil.showMessage("please insert PATH value");
        if(!formUtil.checkEmptyValue(this.ID_TO_RECEIVE_VALUE)) formUtil.showMessage("please insert ID_TO_RECEIVE_VALUE value");
        if(!formUtil.checkEmptyValue(this.FOLDER_NAME)) formUtil.showMessage("please insert FOLDER_NAME value");
    }
    //NOTE : 전역 변수 설정
    globalVariable(){
        this.EXISTS_FILE_LIST =[];          //NOTE : 기존 파일 목록
        this.CHANGED_EXISTS_FILE_LIST =[];  //NOTE : 기존 파일 목록 변경 체크
        this.EXISTS_IS_CHANGED  = false;
        this.ADDED_FILE_LIST = [];          //NOTE : 신규 추가 파일 목록
        this.TOTAL_FILE_LIST = [];          //NOTE : 기존 + 신규 파일 목록 (화면 목록 처리용)
        this.FINAL_UPLOAD_FILE_LIST = {};   //NOTE : 최종 upload 대상 파일 목록
        this.FILE_TEXT_LIST = [];
        this.CONTENTS = null;
        this.COMMON_FILE_UPLOAD_ID = "#formUtil_fileUpload"; //NOTE: home.html 내에 있는 파일 업로드용 layout ID
        this.CANCEL_BTN = ".formUtil-fileUpload_cancelBtn";
        this.UPLOAD_BTN = ".formUtil-fileUpload_uploadBtn";
        this.DRAG_N_DROP_INPUT = "#fileElem";
        this.FILE_UPLOAD_LIST_HEADER = ".formUtil-fileUpload_list-contents";
        this.NO_WIDTH = "gi-row-10";
        this.FILE_NAME_WIDTH = "gi-row-50";
        this.FILE_SIZE_WIDTH = "gi-row-15";
        this.FILE_EXTENTION_WIDTH = "gi-row-15";
        this.FILE_DELETE_BTN_WIDTH = "gi-row-10";
    }
    //NOTE : 파일 업로드 취소 버튼 이벤트 할당 및 변수 초기화
    resetVariable(){
            this.EXISTS_FILE_LIST =[];
            this.CHANGED_EXISTS_FILE_LIST =[];
            this.ADDED_FILE_LIST = [];
            this.TOTAL_FILE_LIST = [];
            this.FINAL_UPLOAD_FILE_LIST = {};
            this.FILE_TEXT_LIST = [];
    }
    //NOTE: 업로드 POPUP UI 설정
    setUploadHTML(){
        this.CONTENTS +=
            '<div class="formUtil-fileUpload_body" data-fileupload-boxopen="on">'
            +'    <div class="gi-row-450px formUtil-fileUpload gi-flex gi-flex-column slide-in-blurred-top">'
            +'        <div class="formUtil-fileUploading-section"></div>'
            +'        <article class="gi-col-100px formUtil-fileUpload_content">'
            +'            <form class="formUtil-fileUpload_form gi-col-100">'
            +'                <div class="formUtil-fileUpload_dropArea">'
            +'                    <input type="file" id="fileElem" style="display: none" multiple enctype="multipart/form-data">'
            +'                    <label for="fileElem">'
            +'                        <i class="bi bi-upload" style="color: #999 !important;margin-right: 1.3rem !important;font-size: 3rem;"></i>'
            +'                        <div class="formUtil-fileUpload_span-body ">'
            +'                            <span class="formUtil-fileUpload_span" style="display:block">FILE UPLOAD CLICK</span>'
            +'                            <span class="formUtil-fileUpload_span">[Drag And Drop]</span>'
            +'                        </div>'
            +'                    </label>'
            +'                </div>'
            +'            </form>'
            // +'            <div class="formUtil-fileUpload_memoArea">'
            // +'            </div>'
            +'        </article>'
            // +'        <div class="formUtil-file_description-box gi-input-container">'
            // +'          <label for="formUtil-file_description" class="gi-input-label" data-focus-label="false" data-focus-label-text-align="default" data-required="false">전체 메모</label>'
            // +'          <input type="text" class="formUtil-file_description gi-input" data-focus-span-text-align="center" data-required="true" autocomplete="off"/>'
            // +'        </div>'
            +'        <div class="formUtil-fileUpload_list">'
            // +'            <div class="formUtil-fileUpload_list-header">'
            // +'                <ul class="gi-row-100 sub-card-2">'
            // +'                    <li class="'+this.NO_WIDTH+'">NO</li>'
            // +'                    <li class="'+this.FILE_NAME_WIDTH+'">파일명</li>'
            // +'                    <li class="'+this.FILE_SIZE_WIDTH+'">파일크기</li>'
            // +'                    <li class="'+this.FILE_EXTENTION_WIDTH+'">확장자</li>'
            // +'                    <li class="'+this.FILE_DELETE_BTN_WIDTH+'">삭제</li>'
            // +'                </ul>'
            // +'            </div>'
            +'            <div class="formUtil-fileUpload_list-contents">'
            +'            </div>'
            +'        </div>'
            +'        <article class="formUtil-fileUpload_footer">'
            +'            <button class="formUtil-fileUpload_uploadBtn">'
            +'                <span>업로드</span>'
            +'                <span></span>'
            +'            </button>'
            +'            <button class="formUtil-fileUpload_cancelBtn">'
            +'                <span>취소</span>'
            +'                <span></span>'
            +'            </button>'
            +'        </article>'
            +'    </div>'
            +'</div>';
    }
    //NOTE : 파일크기 계산
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    //NOTE : 파일 업로드 POPUP OPEN 시 이벤트 바인딩 목록
    openPopupEventBinding(){
        this.clearFileUploadBody();               //NOTE : 파일 업로드 UI 노출 및 숨김
        this.fileUploadPopupCloseBtnClickEvent(); //NOTE : 파일 업로드 CLOSE 이벤트 (취소)
        this.fileUploadBtnClickEvent();           //NOTE : 파일 업로드
        this.dragAndDropAreaChangeEvent();
    }
    //NOTE : 파일 업로드 UI 노출 및 숨김
    clearFileUploadBody(){
        let isEmpty = $(".fileUpload_body").length === 0;
        let $fileUpload = $(this.COMMON_FILE_UPLOAD_ID);

        isEmpty ? $fileUpload.append(this.CONTENTS) : $fileUpload.empty();
    }
    //NOTE : 파일 업로드 OPEN 이벤트
    fileUploadPopupOpenBtnClickEvent(){
        $(this.BTN_ID).off("click").on("click",fileUploadPopupOpenBtnClickEventHandler);
        let that = this;

        //NOTE : 파일 업로드 POPUP OPEN 시 이벤트 바인딩
        function fileUploadPopupOpenBtnClickEventHandler(){
            that.openPopupEventBinding();
        }
    }
    //NOTE : 파일 업로드 CLOSE 이벤트 (취소)
    fileUploadPopupCloseBtnClickEvent() {
        let that = this;
        $(this.CANCEL_BTN)
            .off("click.formUtilFileUploadCancelBtnClickEventHandler")
            .on("click.formUtilFileUploadCancelBtnClickEventHandler", formUtilFileUploadCancelBtnClickEventHandler);
        function formUtilFileUploadCancelBtnClickEventHandler() {
            $(that.COMMON_FILE_UPLOAD_ID).empty();
            that.resetVariable();
        }
    }
    //NOTE : 파일 업로드
    fileUploadBtnClickEvent(){
        let that = this;
        $(that.UPLOAD_BTN)
            .off("click.fileUploadBtnClickEventHandler")
            .on("click.fileUploadBtnClickEventHandler",fileUploadBtnClickEventHandler);
        function fileUploadBtnClickEventHandler(){
            console.log("upload Btn Click Event settings");
        }
    }
    dragAndDropAreaChangeEvent(){
        let that = this;
        $(that.DRAG_N_DROP_INPUT)
            .off("change.dragAndDropAreaChangeEventHandler")
            .on("change.dragAndDropAreaChangeEventHandler" ,function(e){
                dragAndDropAreaChangeEventHandler(e);
            })
        function dragAndDropAreaChangeEventHandler(e){
            let fileSettingsHtml = "";
            let fileSettingsList = Array.from(e.target.files);
            // this.FILE_UPLOAD_LIST_HEADER

            //NOTE : 기존 파일 목록에 새 파일 추가
            that.ADDED_FILE_LIST = that.ADDED_FILE_LIST.concat(fileSettingsList);
            //NOTE : 중복된 파일 제거 (이름, 사이즈 기준)
            that.ADDED_FILE_LIST = that.ADDED_FILE_LIST.filter((file, index, self) =>
                index === self.findIndex((f) => f.name === file.name && f.size === file.size)
            );

            that.TOTAL_FILE_LIST = that.TOTAL_FILE_LIST.concat(that.ADDED_FILE_LIST);
            that.TOTAL_FILE_LIST = that.TOTAL_FILE_LIST.filter((file, index, self) =>
                index === self.findIndex((f) => f.name === file.name && f.size === file.size)
            );

            if(that.TOTAL_FILE_LIST.length>0){
                for(let i = 0 ; i< that.TOTAL_FILE_LIST.length; i++){
                    let file = that.TOTAL_FILE_LIST[i];
                    let fileName = file.name.substring(0, file.name.lastIndexOf('.'));
                    let fileSize = that.formatBytes(file.size);
                    let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
                    fileSettingsHtml  +=
                         '<ul class="gi-row-100">'
                        +'   <li class="'+that.NO_WIDTH+'">'+(i+1)+'</li>'
                        +'   <li class="'+that.FILE_NAME_WIDTH+' formUtil-file_name ">'+fileName+'</li>'
                        +'   <li class="'+that.FILE_SIZE_WIDTH+' formUtil-file_size">'+fileSize+'</li>'
                        +'   <li class="'+that.FILE_EXTENTION_WIDTH+' formUtil-file_extension">'+fileExtension+'</li>'
                        +'   <li class="'+that.FILE_DELETE_BTN_WIDTH+' "><button type="button" class="formUtil-file_delete"></button></li>'
                        +'</ul>';
                }
            }
            that.ADDED_FILE_LIST.forEach(file => {
                let fileName = file.name.substring(0, file.name.lastIndexOf('.'));
                let fileSize = that.formatBytes(file.size);
                let fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1);
                that.FILE_TEXT_LIST.push({"file_name":fileName , "file_size":fileSize, "file_extension":fileExtension, "file_description":""});
            });

            that.FINAL_UPLOAD_FILE_LIST = that.ADDED_FILE_LIST;
            $(that.FILE_UPLOAD_LIST_HEADER).html(fileSettingsHtml);

            //NOTE : 팝업내에 업로드할 파일 삭제 이벤트
            fileDeleteBtnClickEvent();
        }
        function fileDeleteBtnClickEvent(){
            $(".formUtil-file_delete").off("click.fileDeleteBtnClickEventHandler")
                .on("click.fileDeleteBtnClickEventHandler",fileDeleteBtnClickEventHandler);
        }
        function fileDeleteBtnClickEventHandler(e){
            const target = $(e.currentTarget).parent().parent();
            formUtil.popup("deleteFileBtn","파일을 삭제 하시겠습니까?",remove);
            // console.log(that.TOTAL_FILE_LIST);
            function remove(){
                $(target).remove();
            }

        }
    }

}
