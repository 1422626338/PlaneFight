import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

@property//敌人移动速度
enemySpeed:number = 100;

boxCollider:Node = null;

    start() {

    }

    update(deltaTime: number) {
        //敌人移动
        this.node.setPosition(this.node.position.x, this.node.position.y - this.enemySpeed * deltaTime, this.node.position.z);  
    }
}


