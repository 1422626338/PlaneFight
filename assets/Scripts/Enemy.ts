import { _decorator, Animation, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Sprite } from 'cc';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    @property//敌人移动速度
    enemySpeed: number = 100;
    @property(Collider2D)  //手动关联子节点的碰撞体
    enemyCollider: Collider2D = null;

    @property//敌人血量
    enemyHp: number = 1;

    //敌人动画
    @property(Animation)
    anim: Animation = null;
    @property
    animHit: string = "";
    @property
    animDown: string = "";

    //标记是否死亡
    private isDead: boolean = false;

    protected start(): void {
        // 注册单个碰撞体的回调函数     //最后一个this非常重要，最后一个 this 用来指定回调函数 onBeginContact 内部的 this 指向，
        // 确保回调里能正确访问当前组件的属性 / 方法。
        if (this.enemyCollider) {
            this.enemyCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        
            //监听动画结束时间,动画结束时执行自定义onAnimationEnd方法
            //必须区分动画类型
            this.anim.on(Animation.EventType.FINISHED, this.onAnimationEnd, this)
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        //通过获取组件来判断对方，只有是子弹且敌人没有死亡才进入逻辑
        if (!otherCollider.getComponent(Bullet) || this.isDead) return;

        // 禁用子弹
        otherCollider.enabled = false;
        otherCollider.getComponent(Sprite).enabled = false;

        //碰到子弹，血量-1
        this.enemyHp -= 1;
        //判断播放什么动画
        if (this.enemyHp > 0) {
            this.anim.play(this.animHit);
        }
        else {
            this.isDead = true; //标记死亡
            this.anim.play(this.animDown);

            //把自身的碰撞体禁用，防止重复触发伤害。
            selfCollider.enabled = false;
        }
    }

    update(deltaTime: number) {
        //敌人移动
        this.node.setPosition(this.node.position.x, this.node.position.y - this.enemySpeed * deltaTime, this.node.position.z);
        //如果敌人超过了边界，销毁
        if (this.node.position.y < -440) {
            if (this.node.isValid)   //先判断有这个节点，避免节点已经被销毁时重复调用。
                this.node.destroy();
        }
    }

    //销毁时移除监听，避免内存泄漏
    protected onDestroy(): void {
        if (this.enemyCollider) {
            this.enemyCollider.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    // 动画结束回调，敌人死亡事件
    onAnimationEnd(type: Animation.EventType, animName: string) {   //onAnimationEnd(animName: string),即当名为animName动画播放完后执行逻辑
        if (animName === this.animDown && this.isDead) {
            //让花括号里的代码，延迟一小段时间后只执行一次。 () => { ... }箭头函数（也叫匿名函数），花括号里就是你要延迟执行的代码
            this.scheduleOnce(() => {
                if (this.node.isValid)
                    this.node.destroy();
            }, 0)
        }

    }

}


