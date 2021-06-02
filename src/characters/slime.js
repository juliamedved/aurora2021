import Vector2 from 'phaser/src/math/Vector2'

const eps = 20;

const delay = 500;


export default class Slime extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, name, frame, hp) {
        super(scene, x, y, name, frame,hp);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.state = "";
        this.hp = hp;
        this.steerings = [];
    }

    update() {
        let velocity = new Vector2(0, 0);

        this.steerings.forEach(steering => {
            velocity = velocity.add(steering.calculateImpulse())
        });
        let newVelocity = velocity
            .normalize()
            .multiply(new Vector2(this.speed, this.speed));
        this.body.setVelocity(newVelocity.x, newVelocity.y);


        switch (this.state) {
            case 'rotate':
                break

            case 'middle range':
                break

            case 'rocket':
                break

            case 'short range':
                break

            case 'get close':
                break

            default:
                break

        }
        this.updateAnimation();
    }

    updateAnimation() {
        const animsController = this.anims;
        try {
            if (this.hp >= 0) {
                animsController.play(this.animations[0], true);
            } else {
                animsController.play(this.animations[2], true);
            }
        } catch (e) {

        }
    }

    hasArrived() {
        return this.pointOfInterest === undefined || this.pointOfInterest.distance(this.body.position) < eps;
    }

    selectNextLocation() {
        const nextTile = this.path.shift();
        if (nextTile) {
            this.nextLocation = new Vector2(nextTile.x * 32, nextTile.y * 32);
        } else {
            this.nextLocation = this.body.position;
        }
    }

    damage() {
        if (this.hp > 0) {
            this.hp = this.hp - 41
        } else {
            this.nextLocation = null
            this.body.destroy()
        }
    }

    selectTarget(target) {
        this.target = target;
        this.steerings.forEach(steering => steering.setTarget(target));
    }

    setObstacles(obstacles) {
        this.steerings.forEach(steering => {

            steering.setObstacles(obstacles);
        });
    }

    setSteering(steering) {
        this.steerings = [steering];
    }

    setSteerings(steerings) {
        this.steerings = steerings;
    }

    updateSlime(x, y){
        this.x = x+20
        this.y = y
        this.scale = 0.5
    }
}