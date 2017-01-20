'use strict';
define('TetriX', ['Phaser'], function (Phaser) {

    if (Phaser) {
        console.log("Phaser has been loaded");
    } else {
        console.log("Unable to startup");
        return
    }

    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    let blocks = [];

    var menuState = {
        canvasGameText: [],
        input: function () {

        },
        create: function () {
            var style = {font: "128px Arial", fill: "#ff0044", align: "center"};
            this.canvasGameText[0] = game.add.text(game.world.centerX, game.world.centerY / 2, 'TetriX', style);
            this.canvasGameText[0].anchor.set(0.5);
            style = {font: "48px Arial", fill: "#4400ff", align: "center"};
            this.canvasGameText[1] = game.add.text(game.world.centerX, game.world.centerY, 'Powered by Phaser.io', style);
            this.canvasGameText[1].anchor.set(0.5);
            this.canvasGameText[1].tlabel = 'Powered by Phaser.io';
            this.canvasGameText[1].lifespan = 3000;
            style = {font: "48px Arial", fill: "#8800ff", align: "center"};
            this.canvasGameText[2] = game.add.text(0, game.world.height, 'made by Crypt', style);
            this.canvasGameText[2].anchor.set(-0.1, 1.1);
            this.canvasGameText[2].tlabel = 'made by Crypt';
            this.canvasGameText[2].lifespan = 3000;

            upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
            downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        //    game.time.events.add(Phaser.Timer.SECOND * 3, this.cleanBanner, this);
        },
        cleanBanner: function () {
        /*    var style = {font: "48px Arial", fill: "#8800ff", align: "center"};
            this.canvasGameText[3] = game.add.text(0, game.world.height, 'made by Crypt', style);
            this.canvasGameText[3].anchor.set(-0.1, 1.1);
        */
            var cleanText = this.canvasGameText[1].cleanText(this.canvasGameText[1].tlabel);
            cleanText = game.add.text(game.world.centerX, game.world.centerY, this.canvasGameText[1].tlabel, style);
        },
        update: function () {

        }
    };

    var TetriX = {
        block_ids: ['I', 'J', 'L', 'O', 'S', 'T', 'Z'],
        blocks: [],
        current: null,
        preload: function () {
            console.log("preload");
            let i = 0;
            //game.physics.startSystem(Phaser.Physics.P2JS);
            game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.load.baseURL = 'assets/image';
            for (i = 0; i < this.block_ids.length; i++) {
                game.load.image('tetrisblock' + i, '/Tetris_' + this.block_ids[i] + '.png');
            }
            game.input.keyboard.enabled = true;
            /*
             this.gameState = menuState;
             this.gameState.game = (game);
             */
        },
        create: function () {
            var i = 0;
            console.log("create");


            //var blockMaterial = game.physics.p2.createMaterial('blockMaterial');
            //game.physics.p2.gravity.y = 300;
            /*
             for (i = 0; i < this.block_ids.length; i++) {
             blocks[i] = game.add.sprite((100 * i), 200, 'tetrisblock' + i);
             game.physics.enable(blocks[i], Phaser.Physics.ARCADE);
             blocks[i].body.velocity.setTo(20,20);
             blocks[i].body.gravity.set(0,180);
             //blocks[i].body.setMaterial(blockMaterial);
             }
             */
            if (this.gameState) {
                this.gameState.create();
            }
            game.input.keyboard.createCursorKeys();
        },
        gameState: menuState,
        update: function () {

            if (game.input.lastKey) {
                console.log(game.input.lastKey);
            }
            if (this.gameState) {
                this.gameState.update();
            }
        },
        render: function () {
            /*var i = 0;
             for (i = 0; i < this.block_ids.length; i++) {

             }*/
            if (this.current !== null && this.current !== undefined) {
                game.debug.spriteInfo(this.current, 32, 32);
            }
            if (this.gameState) {
                this.gameState.input()
            }
        },
        changeGameStateTo: function (newState) {
            console.log('State ' + this.gameState + ' => ' + newState);
            this.gameState = newState;
            this.gameState.create();
        }
    };
    /*
     var preload = function( ) {
     console.log("Preload");
     };
     var create = function() {
     console.log("Create");
     };
     var update = function() {
     console.log("Update");
     };
     //var handler = {preload : preload, create: create, update : update};
     */
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', TetriX);
    return {
        TetriX: TetriX,
        game: game,
        version: "0.0.1",
    };

});
