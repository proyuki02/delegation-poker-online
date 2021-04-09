import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Margin } from "../atoms/Margin";

export function TopicSampleModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        議題サンプル
      </Button>

      <Modal show={show} onHide={handleClose} keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>議題サンプル</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          これらはサンプルです。議題は自由に決めてください。
          <Margin height={20} />
          <div>
            <ul>
              <li>休暇</li>
              <li>勤務時間（シフト、休憩時間、夜間対応、休日出勤など）</li>
              <li>ツール選定</li>
              <li>ゴール設定</li>
              <li>タスク管理（アサイン、期限、優先度など）</li>
              <li>アーキテクチャ</li>
              <li>画面デザイン</li>
              <li>設計（基本、外部、内部、詳細、DBなど）</li>
              <li>物品・ソフトウェアの購入（月10万円以下）</li>
              <li>他チームとの相談・交渉</li>
              <li>チームメンバーの増員</li>
              <li>リリース日</li>
              <li>バグ修正、緊急リリース</li>
              <li>利用率の少ない機能・システムの除去</li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
