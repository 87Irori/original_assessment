'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };

assessmentButton.onclick = function() {
  const userName = userNameInput.value;
  if(userName.length === 0){
    //名前が空の時は処理を終了する
    return;
  }



  //診断結果表示エリアの作成
  resultDivided.innerText ='';
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

  //TODO　ツイートエリアの作成
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue = 
   'https://twitter.com/intent/tweet?button_hashtag='+encodeURIComponent('あなたのいいところ')+'&ref_src=twsrc%5Etfw';
   anchor.setAttribute('href', hrefValue);
   anchor.setAttribute('class', 'tweeter-hashtag-button');
   anchor.setAttribute('data-text', result);
   anchor.innerText = 'Tweet #あなたの秘めている能力';
   tweetDivided.appendChild(anchor);

   //widgets.jsの設定
   const script = document.createElement('script');
   script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
   tweetDivided.appendChild(script);
};

const answers=[
  '{userName}は空を飛べる',
  '{userName}は透視ができる',
  '{userName}は透明になれる',
  '{userName}はどの言語も操れる',
  '{userName}は小さくなれる',
  '{userName}は巨人になれる',
  '{userName}は動物と話せる',
  '{userName}は相手の心が読める',
  '{userName}は一度聴いただけでピアノが弾ける',
  '{userName}は人の未来が読める',
  '{userName}は人の前世がわかる',
  '{userName}はタイムスリップできる',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param{string} userName ユーザの名前
 * @return{string}診断結果
 */
function assessment(userName){
  //全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for(let i = 0; i < userName.length; i++){
     sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
}

//文字のコード番号の合計を回数の数で割って添字の数字を求める
const index = sumOfCharCode % answers.length;
let result = answers[index];

result = result.replaceAll('{userName}',userName);
return result;
}