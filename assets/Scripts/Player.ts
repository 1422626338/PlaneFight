import { _decorator, Component, Input, input, Node, EventTouch, Vec3, Prefab, instantiate, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { Reward, RewardType } from './Reward';
const { ccclass, property } = _decorator;

enum ShootType {
    OneShoot,
    TwoShoot,
}

@ccclass('Player')
export class Player extends Component {

    //子弹
    //子弹发射计时器
    shootTimer: number = 0;
    //子弹发射频率
    @property
    shootRate: number = 0.5;
    //子弹父节点
    @property(Node)
    bulletParent: Node = null;

    //单发子弹类型
    //子弹1预制体
    @property(Prefab)
    bulletPrefab1: Prefab = null;
    //子弹1位置
    @property(Node)
    bulletPosition1 = null;

    //双发子弹类型
    //子弹2预制体
    @property(Prefab)
    bulletPrefab2: Prefab = null;
    //子弹2位置
    @property(Node)
    bulletPosition2 = null;
    //子弹3位置
    @property(Node)
    bulletPosition3 = null;

    @property(Collider2D)   //用于碰撞检测
    collider: Collider2D = null;

    @property
    //双发时间
    twoShootTime : number = 5;
    //双发计时器
    twoShootTimer:number = 0;
    

    //当前射击类型
    @property
    shootType: ShootType = ShootType.OneShoot;

    protected onLoad(): void {
        input.on(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
        //.on是「绑定事件监听」的方法
        //onTouchMove事件触发后的回调函数，自定义回调函数this.onTouchMove是callback(event);
        //最后一个this是回调函数的上下文（作用域），确保 onTouchMove 函数里的 this 指向当前脚本组件（比如飞机脚本）

        //碰撞检测
        if (this.collider) {
            //注册碰撞开始事件
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    // 碰撞回调函数
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        //先判断碰到的是什么，如果通过碰撞获取到了Reward组件
        const reward = otherCollider.getComponent(Reward);
        if (reward) {
            this.onContactToReward(reward);
        }
        else {
            //this.onContactToEnemy();
        }
    }


    lastReward: Reward = null;
    //碰撞逻辑（碰到谁）
    onContactToReward(reward: Reward) {
        //防止多次触发
        if (reward === this.lastReward) {
            return;
        }
        this.lastReward = reward;
        switch (reward.rewardType) {
            case RewardType.TwoShoot:
                //TODO：逻辑
                //转变发射模式
                this.transitionToTwoShoot();
                break;
            case RewardType.Bomb:
                ////TODO：逻辑
                break;
        }
    }

    //切换成双发射击
    transitionToTwoShoot()
    {
        this.shootType = ShootType.TwoShoot;
        this.twoShootTimer = 0;
    }

    //切换成单发射击
    transitionToOneShoot()
    {
        this.shootType = ShootType.OneShoot;
    }

    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event: EventTouch) {
        //存储自身的位置，让目标位置在自身位置的基础上相加移动距离（达到随手指滑动而非瞬移）（瞬移用setPosition()）
        const p = this.node.position;
        let targetPosition = new Vec3(p.x + event.getDelta().x, p.y + event.getDelta().y, p.z);
        //边界限制
        this.BorderResriction(targetPosition);
        //设置Player位置
        this.node.setPosition(targetPosition);
    }

    update(deltaTime: number) {
        switch (this.shootType) {
            case ShootType.OneShoot:
                this.OneShoot(deltaTime);
                break;
            case ShootType.TwoShoot:
                this.TwoShoot(deltaTime);
                break;
        }
    }

    ////单发子弹类型
    private OneShoot(deltaTime: number) {
        this.shootTimer += deltaTime;
        if (this.shootTimer > this.shootRate) {
            this.shootTimer = 0;
            //创建子弹
            const bullet = instantiate(this.bulletPrefab1);
            this.bulletParent.addChild(bullet);
            //设置子弹位置
            //无论父物体怎么变换，子弹都出现在bulletPosition1的位置
            bullet.setWorldPosition(this.bulletPosition1.worldPosition);
        }
    }
    ////双发子弹类型
    private TwoShoot(deltaTime: number) {
        //双发奖励时间
        this.twoShootTimer +=deltaTime;
        if(this.twoShootTimer > this.twoShootTime){
            this.transitionToOneShoot();
        }

        this.shootTimer += deltaTime;
        if (this.shootTimer > this.shootRate) {
            this.shootTimer = 0;
            //创建子弹
            const bullet2 = instantiate(this.bulletPrefab2);
            const bullet3 = instantiate(this.bulletPrefab2);
            this.bulletParent.addChild(bullet2);
            this.bulletParent.addChild(bullet3);
            //设置子弹位置
            //无论父物体怎么变换，子弹都出现在bulletPosition2的位置
            bullet2.setWorldPosition(this.bulletPosition2.worldPosition);
            bullet3.setWorldPosition(this.bulletPosition3.worldPosition);
        }
    }

    /////边界限制
    private BorderResriction(targetPosition: Vec3) {
        if (targetPosition.x < -220) {
            targetPosition.x = -220;
        }
        if (targetPosition.x > 220) {
            targetPosition.x = 220;
        }
        if (targetPosition.y < -400) {
            targetPosition.y = -400;
        }
        if (targetPosition.y > 400) {
            targetPosition.y = 400;
        }
    }
}


