import { _decorator, Collider2D, Component, Contact2DType, Enum, IPhysics2DContact, Node, Sprite } from 'cc';
import { Player } from './Player';
const { ccclass, property } = _decorator;

//奖励类型
export enum RewardType{
    TwoShoot,
    Bomb,
}

@ccclass('Reward')
export class Reward extends Component {

    @property({type:Enum(RewardType)})
    rewardType:RewardType = RewardType.TwoShoot;

    @property   //下落速度
    rewardSpeed : number = 100;
    @property(Collider2D)
    collider: Collider2D = null;

     protected start(): void {
            // 注册单个碰撞体的回调函数
            if (this.collider) {
                this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            }            
        }
        onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
            // 只在两个碰撞体开始接触时被调用一次
            //通过获取组件来判断对方
            if (!otherCollider.getComponent(Player)) return;
    
            // 禁用奖励
            this.collider.enabled = false;
            this.getComponent(Sprite).enabled = false;
            //销毁
            console.log("碰到了");
            this.destroy();
        }
    
        update(deltaTime: number) {
            //奖励移动
            this.node.setPosition(this.node.position.x, this.node.position.y - this.rewardSpeed * deltaTime, this.node.position.z);
            //如果敌人超过了边界，销毁
            if (this.node.position.y < -440) {
                if (this.node.isValid)   //先判断有这个节点，避免节点已经被销毁时重复调用。
                    this.node.destroy();
            }
        }
}


