class Result
{
    constructor(jisho,inputValue)
    {
        this.jisho = jisho;
        this.inputValue = inputValue;
        this.requiredElements = [];
        this.createResult();
    }

    createResult()
    {
        this.serch();
        this.requiredElements.forEach(function(element)
        {
            this.entity += this.createHtml(element);
        });
    }

    serch()
    {
        if(this.inputValue === '--all')
        {
            this.requiredElements = this.jisho;
        }

        this.requiredElements = 'xxx';
    }

    createHtml(element)
    {
        this.html = '<div class="tango">';
        for(let key in element)
        {
            if(element[key] !== null)
            {
                switch(key)
                {
                    case kotb:
                        this.html += 
                            '<h2>' + element[key] + '</h2>';
                        break;
                    case eigo:
                        this.html +=
                            '<p class="eigo">' + element[key] + '</p>';
                        break;
                    case kwsk:
                        this.html +=
                            '<p class="kwsk">' + element[key] + '</p>';
                        break;
                    case tnjt:
                        this.html +=
                            '<dl class="tnjt">' +
                                '<dt>転じて</dt>' +
                                '<dd>' + element[key] + '</dd>' +
                            '</dl>';
                        break;
                    case tigg:
                        this.html +=
                            '<dl class="tigg">' +
                                '<dt>対義語</dt>' +
                                '<dd>' + element[key] + '</dd>' +
                            '</dl>';
                        break;
                    default:
                        break;
                }
            }
        }
        this.html += '</div>';
        return html;
    }
}