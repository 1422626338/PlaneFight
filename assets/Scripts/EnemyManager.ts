import { _decorator, Component, Game, instantiate, math, Node, Prefab } from 'cc';
import { RewardManager } from './RewardManager';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {

    private static instance:EnemyManager;

    public static getInstance():EnemyManager{
        return this.instance;
    }

    //敌人0的生成
    @property
    enmy0SpawnRate:number = 1;
    @property(Prefab)
    enemy0Prefab:Prefab = null;

    //敌人1的生成
    @property
    enmy1SpawnRate:number = 2;
    @property(Prefab)
    enemy1Prefab:Prefab = null;

    //敌人2的生成
    @property
    enmy2SpawnRate:number = 3;
    @property(Prefab)
    enemy2Prefab:Prefab = null;

    protected onLoad(): void {
        EnemyManager.instance = this;
    }

    start() {
        this.schedule(this.enemy0Spawn, this.enmy0SpawnRate);
        this.schedule(this.enemy1Spawn,this.enmy1SpawnRate);
        this.schedule(this.enemy2Spawn,this.enmy2SpawnRate)
    }

    update(deltaTime: number) {
        
    }

    protected onDestroy(): void {
        this.unschedule(this.enemy0Spawn);
        this.unschedule(this.enemy1Spawn);
        this.unschedule(this.enemy2Spawn);
    }

    //生成敌人0
    enemy0Spawn(){
        const enmy0 = instantiate(this.enemy0Prefab);
        this.node.addChild(enmy0);
        
        const randomX = math.randomRangeInt(-210, 210);
        enmy0.setPosition(randomX, 450, 0);
    }

    enemy1Spawn()
    {
        const enemy1 = instantiate(this.enemy1Prefab);
        this.node.addChild(enemy1);

        const randomX = math.randomRangeInt(-200,200);
        enemy1.setPosition(randomX,475,0);
    }
    enemy2Spawn()
    {
        const enemy2 = instantiate(this.enemy2Prefab);
        this.node.addChild(enemy2);

        const randomX = math.randomRangeInt(-152,152);
        enemy2.setPosition(randomX,555,0);
    }
        
}


