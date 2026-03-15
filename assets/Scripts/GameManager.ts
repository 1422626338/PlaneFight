import { _decorator, Component, Game, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    static instance :GameManager;
    public static getInstance():GameManager{
        return this.instance;
    }

    //分数
    private score : number = 0;


    start() {

    }

    update(deltaTime: number) {
        
    }

    //添加分数
    addScore(s:number){

    }
}


