import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
     speed:number = 500;

    start() {

    }

    update(deltaTime: number) {
        //存储子弹位置，制作向上移动
        const p = this.node.position;
        this.node.setPosition(p.x, p.y + this.speed * deltaTime, p.z);  

        //超出600销毁
        if(p.y > 600){
            this.node.destroy();
        }
    }
}


