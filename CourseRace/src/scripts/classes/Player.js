const DIRECTION = {
    NONE: 0,
    FORWARD: 1,
    BACKWARD: -1
}
const TURN = {
    NONE: 0,
    RIGHT: 1,
    LEFT: -1
}

const SPEED = 3
const ACCELERATION = 0.02
const SLIDE_ANGLE = 2

export default class Player {
    constructor(scene, map, config) {
        this.scene = scene
        this.map = map
        const position = this.map.getPlayerPosition(config.position)

        this.car = this.scene.matter.add.sprite(position.x, position.y, 'objects', config.sprite)
        this.car.setFixedRotation(true)
        this._velocity = 0
        this.currCheckpoint = 0
    }

    get direction() {
        let direction = DIRECTION.NONE
        if (this.scene.cursors.up.isDown) {
            direction = DIRECTION.FORWARD
        } else if (this.scene.cursors.down.isDown) {
            direction = DIRECTION.BACKWARD
        }
        return direction
    }
    getMaxSpeed() {
        return this.map.getTileFriction(this.car) * SPEED
    }
    get velocity() {
        const speed = Math.abs(this._velocity)
        const max = this.getMaxSpeed()

        if (this.direction && speed < max) {
            this._velocity += ACCELERATION * Math.sign(this.direction)
        }
        else if ((this.direction && speed > max) || (!this.direction && speed > 0)) {
            this._velocity -= ACCELERATION * Math.sign(this._velocity)
        }
        // console.log(this._velocity)
        return this._velocity
    }
    get turn() {
        let turn = TURN.NONE
        if (this.scene.cursors.left.isDown) {
            turn = TURN.LEFT
        } else if (this.scene.cursors.right.isDown) {
            turn = TURN.RIGHT
        }
        return turn
    }
    get angle() {
        return this.car.angle + this.turn * SPEED / 2
    }
    getVelocityFromAngle() {
        const vec2 = new Phaser.Math.Vector2()
        return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity)
    }

    checkCheckpoints() {
        const checkpoint = this.map.checkpoints.find(item => item.contains(this.car.x, this.car.y))
        const checkpointIndex = checkpoint? Number(checkpoint.index) : null
        if (checkpoint) {
            if (this.currCheckpoint === this.map.checkpoints.length && checkpointIndex === 1) {
                this.currCheckpoint = 1
                this.car.emit('laps')
            } else if (this.currCheckpoint + 1 === checkpointIndex) {
                this.currCheckpoint++
                // console.log('прибавка чекпоинта ' + checkpointIndex)
            }
        }
    }
    move() {
        const velocity = this.getVelocityFromAngle()
        this.car.setVelocity(velocity.x, velocity.y)
        this.car.setAngle(this.angle)
        this.checkCheckpoints()
    }
    slide(){
        this.car.angle += SLIDE_ANGLE
    }
}