import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

let str : string = "Hello, World!";
console.log(str);

@ccclass('NewComponent')
export class NewComponent extends Component {
 greet(name: string): string {
    return "Hello, " + name + "!";
}
    start() {
        console.log(this.greet("小米"));
    }

    update(deltaTime: number) {

    }
}


