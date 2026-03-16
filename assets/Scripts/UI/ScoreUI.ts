import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreUI')
export class ScoreUI extends Component {
    
    @property(Label)
    scoreLable:Label = null;

    protected start(): void {
        this.updateScore(0);
    }

    updateScore(count:number){
        this.scoreLable.string =count.toString();
    }
    
}


