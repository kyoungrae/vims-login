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

        this.isCheckParameters();       //NOTE : (1) 파라미터 검증
        this.globalVariable();          //NOTE : (2) 전역 변수 설정
        this.setUploadHTML();           //NOTE : (3) 파라미터 검증
        this.fileUploadBtnClickEvent();//NOTE : (4) 파일 업로드 이벤트
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
    //NOTE: 업로드 UI 설정
    setUploadHTML(){
        this.CONTENTS +=
            '<div class="formUtil-fileUpload_body" data-fileupload-boxopen="on">'
            +'    <div class="formUtil-fileUpload gi-flex gi-flex-column slide-in-blurred-top">'
            +'        <article class="formUtil-fileUpload_content">'
            +'            <form class="formUtil-fileUpload_form gi-col-100">'
            +'                <div class="formUtil-fileUpload_dropArea">'
            +'                    <input type="file" id="fileElem" style="display: none" multiple enctype="multipart/form-data">'
            +'                    <label for="fileElem" >'
            +'                        <i class="bi bi-upload" style="color: #999 !important;margin-right: 1.3rem !important;font-size: 3rem;"></i>'
            +'                        <div class="formUtil-fileUpload_span-body">'
            +'                            <span class="formUtil-fileUpload_span" style="display:block">FILE UPLOAD CLICK</span>'
            +'                            <span class="formUtil-fileUpload_span">[Drag And Drop]</span>'
            +'                        </div>'
            +'                    </label>'
            +'                </div>'
            +'            </form>'
            +'            <div class="formUtil-fileUpload_memoArea">'
            +'            </div>'
            +'        </article>'
            +'        <div class="formUtil-file_description-box gi-input-container">'
            +'          <label for="formUtil-file_description" class="gi-input-label" data-focus-label="false" data-focus-label-text-align="default" data-required="false">전체 메모</label>'
            +'          <input type="text" class="formUtil-file_description gi-input" data-focus-span-text-align="center" data-required="true" autocomplete="off"/>'
            +'        </div>'
            +'        <div class="formUtil-fileUpload_list">'
            +'            <div class="formUtil-fileUpload_list-header">'
            +'                <ul class="gi-row-100 sub-card-2">'
            +'                    <li class="gi-row-10">NO</li>'
            +'                    <li class="gi-row-40">파일명</li>'
            +'                    <li class="gi-row-30">파일크기</li>'
            +'                    <li class="gi-row-20">확장자</li>'
            +'                    <li class="gi-row-20">설명</li>'
            +'                </ul>'
            +'            </div>'
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
    //NOTE : 파일 업로드 UI 노출 및 숨김
    clearFileUploadBody(){
        let isEmpty = $(".fileUpload_body").length === 0;
        let $fileUpload = $(this.COMMON_FILE_UPLOAD_ID);

        isEmpty ? $fileUpload.append(this.CONTENTS) : $fileUpload.empty();
    }
    //NOTE : 파일 업로드 이벤트
    fileUploadBtnClickEvent(){
        $(this.BTN_ID).off("click").on("click",fileUploadAreaClickEventHandler);
        let that = this;
        function fileUploadAreaClickEventHandler(){
            that.clearFileUploadBody();
        }
        this.fileCancelBtnClickEvent();
    }
    fileCancelBtnClickEvent() {
        $(this.CANCEL_BTN).off("click").on("click", formUtilFileUploadCancelBtnClickEventHandler);
        let that = this;
        function formUtilFileUploadCancelBtnClickEventHandler() {
            $(that.COMMON_FILE_UPLOAD_ID).empty();
            that.resetVariable();
        }
    }
}
