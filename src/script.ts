
// Copyright 2020 actionpterygii

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.




////////////////////
// 型
////////////////////

// 単語の型
type Tango = {[key: string]: string;};
// 辞書の型(単語の配列)
type JishoData = [Tango];
// HTMLとしての文字列
type HTMLString = string;
// なんかこれやらんとつかえんのですわ
interface HTMLButtonElement {checked: boolean};


class Jisho {

    jisho_data!: JishoData;

    constructor(jisho_data_path: string) {
        const my_xhr: XMLHttpRequest = new XMLHttpRequest();
        my_xhr.overrideMimeType("application/json");
        my_xhr.open('GET', jisho_data_path, true);
        // my_xhr.onreadystatechange = function()
        // {
            if (my_xhr.readyState == XMLHttpRequest.DONE && my_xhr.status == 200)
            {
                this.jisho_data = JSON.parse(my_xhr.responseText || 'null');
            }
        // };
        my_xhr.send();
    }
}


const jisho: Jisho = new Jisho('jisho.json');