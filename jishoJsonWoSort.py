# -*- coding: utf-8 -*-

import json
import collections

# 開発用ディレクトリ(src)から`jisho.json`もってくる
# json.loadの2個目の引数は各項目内の順番ちゃんとするため
with open('src/jisho.json') as f:
    df = json.load(f, object_pairs_hook=collections.OrderedDict)

# kotbキーでソートする(破壊的に)
df.sort(key=lambda x: x['kotb'])

# 配布用ディレクトリ(dist)に`jisho.json`を書き込み(破壊的に)
with open('dist/jisho.json', 'w+') as f:
    json.dump(df, f)