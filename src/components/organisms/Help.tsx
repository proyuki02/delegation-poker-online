import React, { useState } from "react";
import { Alert } from "react-bootstrap";

export function Help() {
  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <Alert variant="info" onClose={() => setShow(false)} dismissible>
      <Alert.Heading>ゲームの紹介</Alert.Heading>
      <div>
        このデリゲーションポーカーを通して、以下のようなことを学びましょう。
        <ul>
          <li>
            移譲は0/1ではないということ
            <br />
            命令型と委任型の間には多くの段階があります
          </li>
          <li>
            移譲はStep by Stepの対話で行われること
            <br />
            あなたが何を移譲したいのか、何を移譲して欲しいのか、具体的に説明してください
          </li>
          <li>
            移譲はコンテキストに依存しているということ
            <br />
            あなたが可能な限り移譲することを望んでいても、急速にやりすぎると混乱をきたすことがあります
          </li>
        </ul>
        デリゲーションポーカーの基本的なアイデアは7つの権限レベルです。
      </div>
      <hr />
      <Alert.Heading>7つの権限レベル</Alert.Heading>
      <div>
        <ol>
          <li>命令する： 私が彼らに決定を伝える</li>
          <li>説得する： 私が彼らに売り込む</li>
          <li>相談する： 彼らに相談し私が決める</li>
          <li>同意する： 私と彼らが合意して決める</li>
          <li>助言する： 私は助言するが彼らが決める</li>
          <li>尋ねる： 彼らが決めた後で私が尋ねる</li>
          <li>委任する： 私は彼らに完全に委ねる</li>
        </ol>
      </div>
      <hr />
      <Alert.Heading>プレイ方法</Alert.Heading>
      <div>
        <ol>
          <li>ルームを作成してURLをプレイヤーに共有します</li>
          <li>プレイヤーは「参加する」ボタンからゲームに参加します</li>
          <li>Delegation Boardに議題を登録します</li>
          <li>「投票開始」ボタンを押すと投票が始まります</li>
          <li>各プレイヤーは議題について、どこまで移譲したいか回答します</li>
          <li>
            話し合いをして、決定した権限レベルをDelegation Boardに反映します
          </li>
        </ol>
        TIPS:
        <ul>
          <li>
            多数決ではなく、最高や最低のカードを出した人に、なぜそれを選択したのか聞いてみましょう
          </li>
          <li>
            余裕があれば、決定した権限レベルとは別に理想の権限レベルについても話し合ってみましょう
          </li>
        </ul>
      </div>
    </Alert>
  );
}
