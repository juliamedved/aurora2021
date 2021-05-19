import Vector2 from "phaser/src/math/Vector2"

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, name, frame, sight = 100) {
        super(scene, x, y, name, frame);
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.sight = sight;
    }

    update() {
        const body = this.body;
        this.body.setVelocity(0);
        const speed = this.maxSpeed;
        const cursors = this.cursors;

        if (cursors.left.isDown) {
            body.velocity.x -= speed;
        } else if (cursors.right.isDown) {
            body.velocity.x += speed;
        }

        for (const slime of this.scene.slimes.children.entries) {
            if (new Vector2(slime.x - this.x, slime.y - this.y).length() <= this.sight)
                this.scene.messageBus.emit({
                    'text': 'I see slime!',
                    'topics': 'sight',
                    'delay': 0,
                    'author': 'Player'
                });
        }

        // Vertical movement
        if (cursors.up.isDown) {
            body.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            body.setVelocityY(speed);
        }
        // Normalize and scale the velocity so that player can't move faster along a diagonal
        body.velocity.normalize().scale(speed);
        this.updateAnimation();
    };
    updateAnimation() {
        const animations = this.animationSets.get('Walk');
        const animsController = this.anims;
        const x = this.body.velocity.x;
        const y = this.body.velocity.y;
        if (x!==0 || y !== 0 && this.footstepsMusic.isPaused)
        {
            this.footstepsMusic.resume();
        }
        if (x < 0) {
            animsController.play(animations[0], true);
        } else if (x > 0) {
            animsController.play(animations[1], true);
        } else if (y < 0) {
            animsController.play(animations[2], true);
        } else if (y > 0) {
            animsController.play(animations[3], true);
        } else {
            this.footstepsMusic.pause();
            const currentAnimation = animsController.currentAnim;
            if (currentAnimation) {
                const frame = currentAnimation.getLastFrame();
                this.setTexture(frame.textureKey, frame.textureFrame);
            }
        }
    }
}
