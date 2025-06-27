
class loadToScript{
    constructor() {
        const scriptsToLoad = [
            "CommonUserMessage"
        ];
        this.loadScripts(scriptsToLoad)
    }
    loadScripts(scripts){
        scripts.forEach(script => {
            const scriptElement = document.createElement('script');
            scriptElement.src = `/common/js/message/${script}.js`; // 경로 동적으로 생성
            scriptElement.async = false; // 순서대로 로드되도록 비동기 로드를 비활성화
            document.head.appendChild(scriptElement);
        });
    }
}
