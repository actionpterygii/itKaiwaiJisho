class Result
{
    constructor(jisho,inputValue)
    {
        this.jisho = jisho;
        this.inputValue = inputValue;
        createResult();
    }

    createResult()
    {
        serch();
        requiredElements.forEach(function(element)
        {
            this.entity += createHtml(element);
        });
    }

    serch()
    {

        this.requiredElements = 'xxx';
    }

    createHtml(element)
    {
        this.html = 0;
        for(let key in element)
        {

        }
        return html;
    }
}