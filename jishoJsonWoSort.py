# -*- coding: utf-8 -*-

import sys
import json
import collections

# コマンドライン引数の1,2番目取得
input_path = sys.argv[1]
output_path = sys.argv[2]

# 引数で取得したとこ`jisho.json`もってくる
# json.loadの2個目の引数は各項目内の順番ちゃんとするため
with open(input_path + 'jisho.json') as f:
    df = json.load(f, object_pairs_hook=collections.OrderedDict)

# kotbキーでソートする(破壊的に)
df.sort(key=lambda x: x['kotb'])

# 引数で取得したとこに`jisho.json`を書き込み(破壊的に)
with open(output_path + 'jisho.json', 'w+') as f:
    json.dump(df, f)
