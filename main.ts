controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        . . . . . . 7 7 . . . . . . . . 
        `, ship, 0, -200)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy(effects.spray, 500)
    otherSprite.destroy(effects.clouds, 100)
    info.changeScoreBy(randint(1, 5))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    pause(200)
})
let projectile: Sprite = null
let ship: Sprite = null
game.splash("PRESS \"A\" TO ADVANCE")
game.splash("TRY TO DODGE AND DESTROY OBSTACLES")
game.splash("THE MORE YOU DESTROY THE MORE POINTS YOU WILL HAVE")
game.splash("PRESS \"B\" TO SHOOT")
let ASTROID = [
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . 1 1 . . . 1 1 . . . . . 
    . . . . . 1 1 . 1 1 . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . f 5 f 5 f 5 . . . . . . 
    . . . 5 f 5 f 5 f 5 f . . . . . 
    . . . 5 f 5 f 5 f 5 f . . . . . 
    . . . . f 5 f 5 f 5 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . f f f f . . . . . . . . 
    . . f f 4 7 4 4 f . . . . . . . 
    . f 4 4 4 4 4 7 4 f . . . . . . 
    . f 4 7 4 4 4 4 4 4 f . . . . . 
    f 7 7 7 4 7 4 4 4 4 f . . . . . 
    f 7 4 7 7 4 7 4 4 4 f . . . . . 
    f 7 7 7 7 7 7 4 7 f . . . . . . 
    f 4 7 7 7 7 f f f . . . . . . . 
    f 7 7 7 4 7 . . . . . . . . . . 
    f f f f f f . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . f f f f f . . . . . . 
    . . . . f 8 8 8 8 8 f f f . . . 
    . . . f 8 8 5 8 8 8 8 8 5 f . . 
    . . . f 8 8 8 8 8 8 8 8 8 f . . 
    . . . f 8 8 5 8 5 8 8 8 f . . . 
    . . . f 5 8 8 8 8 8 f f . . . . 
    . . . f 8 8 5 8 8 5 f f . . . . 
    . . . f 5 8 8 8 8 5 5 8 f f . . 
    . . . . f 8 8 5 5 5 5 5 5 5 f . 
    . . . f f 5 5 5 5 8 5 5 5 5 f . 
    . . f 5 5 8 5 5 5 5 5 5 5 f . . 
    . . f 5 5 5 5 5 8 5 5 5 f . . . 
    . . . f 5 5 8 5 5 f f f . . . . 
    . . . . f f f f f . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . f f f f f . . . . . . . . . 
    . f 6 6 6 6 6 f f f f f f f f . 
    . f 6 a a f 6 6 6 6 6 6 6 6 6 f 
    . f 6 a f f f 7 b b b b 6 6 f . 
    . f 6 f f f 7 7 a a a b 6 f . . 
    . f 6 f 7 7 7 a a a b b 6 f . . 
    . f 6 7 7 b b a a a b 6 f . . . 
    . . f 6 7 7 b b b b b 6 f . . . 
    . . f 6 6 7 7 7 7 7 7 6 f . . . 
    . . . f f 6 6 6 6 6 6 6 f . . . 
    . . . . . f f f f f f f . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 4 2 2 2 2 2 . . 
    . . . . . 3 3 4 4 4 2 2 . . . . 
    . . . . c 3 3 4 4 4 4 . . . . . 
    . . . . c c 3 3 4 4 4 . . . . . 
    . . . . c c c 3 3 3 3 . . . . . 
    . . . f f c c c c 3 3 . . . . . 
    . . . f f f c c c c c . . . . . 
    . . . f f f f f c c c . . . . . 
    . . . f f f f f f f c . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `
]
ship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 2 . . . . . . . . 
    . . . . . . 2 1 2 . . . . . . . 
    . . . . . . 1 f 1 . . . . . . . 
    . . . . . . 1 f 1 . . . . . . . 
    . . . . . 2 f 1 f 2 . . . . . . 
    . . . . . 1 f 1 f 1 . . . . . . 
    . . . . . 1 f 1 f 1 . . . . . . 
    . . . . . f 1 2 1 f . . . . . . 
    . . . . . f 1 2 1 f . . . . . . 
    . . . . . . f 2 f . . . . . . . 
    . . . . . . . f . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 60
controller.moveSprite(ship, 100, 100)
info.setLife(5)
game.onUpdateInterval(200, function () {
    projectile = sprites.createProjectileFromSide(ASTROID[randint(0, ASTROID.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Player)
    projectile.x = randint(0, 160)
})
