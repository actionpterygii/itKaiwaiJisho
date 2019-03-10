class Jisho
{
    constructor(jishoPath)
    {
        this.all = {};
        this.xhr = new XMLHttpRequest();
        this.xhr.open('GET', chrome.extension.getURL(jishoPath), true);
        this.xhr.onreadystatechange = function()
        {
            if(this.xhr.readyState == XMLHttpRequest.DONE && this.xhr.status == 200)
            {
                all = JSON.parse(this.xhr.responseText);
            }
        };
        this.xhr.send();
        this.aaa = 'fff';

        // this.fs = new ActiveXObject("Scripting.FileSystemObject");
        // this.file = fs.OpenTextFile(jishoPath);
        // this.all = JSON.parse(file);


    }

    // get all()
    // {
    //     return this.all;
    // }

    // get aaa()
    // {
    //     return this.aaa;
    // }

    // createResult(value)
    // {

    // }
}
