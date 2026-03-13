import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SatrtGame')
export class SatrtGame extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
  public  LoadScene(){
        director.loadScene("GameScene");
    }
}


