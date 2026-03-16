import { _decorator, Component, Label, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerHpUI')
export class PlayerHpUI extends Component {

@property(Label)
playerHpLabel:Label = null;


    start() {
        GameManager.getInstance().node.on("onHpChange",this.onHpChange,this);
        //// 2. 初始化显示（避免UI初始为空）
        this.onHpChange();
    }

    onHpChange(){
        this.playerHpLabel.string = GameManager.getInstance().GetPlayerHpNumber().toString();
    }
}


