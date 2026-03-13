import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    @property(Prefab)
    enemy0Prefab:Prefab = null;
    @property
    enmy0SpawnRate:number = 1;


    start() {
        this.schedule(this.enemy0Spawn, this.enmy0SpawnRate);
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        this.unschedule(this.enemy0Spawn);
    }

    //生成敌人0
    enemy0Spawn(){
        const enmy0 = instantiate(this.enemy0Prefab);
        this.node.addChild(enmy0);
        
        const randomX = math.randomRange(-210, 210);
        enmy0.setPosition(randomX, 450, 0);
    }
        
}


