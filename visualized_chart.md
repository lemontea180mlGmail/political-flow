# 政治志向診断 フローチャート全体図

以下のコードをコピーして [Mermaid Live Editor](https://mermaid.live/) に貼り付けるか、VS Code の Mermaid プレビュー機能を使用することで、画像として書き出すことができます。

```mermaid
graph TD
    %% 全体のスタイル
    classDef question fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff;
    classDef result fill:#0f172a,stroke:#10b981,stroke-width:3px,color:#fff,stroke-dasharray: 5 5;

    Start((開始)) --> Q1
    
    Q1[Q1: 統一教会の信者である]
    Q1 -- はい --> R_LDP[結果: 自民党]
    Q1 -- いいえ --> Q2
    
    Q2[Q2: 政治家はお金に汚くてもよい]
    Q2 -- はい --> R_LDP
    Q2 -- いいえ --> Q3
    
    Q3[Q3: 大阪の副首都構想が一番大事]
    Q3 -- はい --> R_Ishin[結果: 日本維新の会]
    Q3 -- いいえ --> Q4
    
    Q4[Q4: 具体性と実現性で手取りを増やす]
    Q4 -- はい --> R_Kokumin[結果: 国民民主党]
    Q4 -- いいえ --> Q5
    
    Q5[Q5: 外国人政策が一番大事]
    Q5 -- はい --> Q6
    Q5 -- いいえ --> Q7
    
    Q6[Q6: 移民は1人もいらない]
    Q6 -- はい --> R_Hoshu[結果: 日本保守党]
    Q6 -- いいえ --> R_Sansei[結果: 参政党]
    
    Q7[Q7: 創価学会の信者である]
    Q7 -- はい --> R_Chudo[結果: 中道改革連合\n公明・立憲]
    Q7 -- いいえ --> Q8
    
    Q8[Q8: 夫婦別姓・平和主義が大事]
    Q8 -- はい --> R_Chudo
    Q8 -- いいえ --> Q9
    
    Q9[Q9: 将来的に消費税0％を希望]
    Q9 -- はい --> Q10
    Q9 -- いいえ --> Q11
    
    Q10[Q10: 今すぐ消費税0％にすべき]
    Q10 -- はい --> R_Reiwa[結果: れいわ新選組]
    Q10 -- いいえ --> Q11
    
    Q11[Q11: デジタル技術で効率化が大事]
    Q11 -- はい --> R_Mirai[結果: チームみらい]
    Q11 -- いいえ --> Q12
    
    Q12[Q12: 私の生活は幸せです]
    Q12 -- はい --> R_Yoto[結果: 与党のどれか\n現状維持]
    Q12 -- いいえ --> R_Yato[結果: 野党のどれか\n現状打破]

    %% クラスの適用
    class Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8,Q9,Q10,Q11,Q12 question;
    class R_LDP,R_Ishin,R_Kokumin,R_Hoshu,R_Sansei,R_Chudo,R_Reiwa,R_Mirai,R_Yoto,R_Yato result;
```

---

### 画像として保存する方法
1. 上記の `mermaid` ブロック内のコードをコピーします。
2. [Mermaid Live Editor](https://mermaid.live/) を開きます。
3. 左側の入力欄（Code）を全消しして、コピーした内容を貼り付けます。
4. 下の方にある **「Actions」** -> **「Download PNG」** または **「Download SVG」** を選ぶと、綺麗な画像として保存できます。
