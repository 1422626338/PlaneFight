import { _decorator, Component, Game, Node } from 'cc';
import { ScoreUI } from './UI/ScoreUI';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    static instance :GameManager;
    public static getInstance():GameManager{
        return this.instance;
    }

    //分数
    private score : number = 0;
    //分数节点
    @property(ScoreUI)
    scoreUI : ScoreUI = null;

    protected onLoad(): void {
        //一定要初始化
        GameManager.instance = this;
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    //添加分数
    addScore(s:number){
        this.score += s;
        this.scoreUI.updateScore(this.score);
    }
}


