class Result
{
    constructor(jisho,value)
    {
        this.jisho = jisho;
        this.value = value;
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
        element.forEach(function(item)
        {

        });
        return html;
    }
}