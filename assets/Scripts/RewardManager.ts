import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RewardManager')
export class RewardManager extends Component {

    //先做一个单例
    private static instance : RewardManager;
    public static getInstance(){
        return this.instance;
    }

    @property   //奖励生成时间
    rewardSpawnRate  : number = 5;

    //炸弹奖励
    @property(Prefab)
    bombReward:Prefab = null;

    //双发奖励
    @property(Prefab)
    doubleReward:Prefab = null;


    protected onLoad(): void {
        RewardManager.instance = this;
    }

    //启动生成奖励
    start() {
        this.schedule(this.spawnReward,this.rewardSpawnRate);
    }

    update(deltaTime: number) {
        
    }
    protected onDestroy(): void {
        this.unschedule(this.spawnReward);
    }
    
    spawnReward()
    {
        const randomNumber = math.randomRangeInt(0,2);
        let prefab :Prefab = null;
        if(randomNumber ===0){
            prefab = this.doubleReward;
        }
        else
        {
            prefab = this.bombReward;
        }
        const reward = instantiate(prefab);
        this.node.addChild(reward);

        const randomX = math.randomRangeInt(-200,200);
        reward.setPosition(randomX,475,0);
    }
}


