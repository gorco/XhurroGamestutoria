export default class VictoryScene extends Phaser.Scene {
    constructor(){
        super({key: "victory"})
    }


    create(data){

        this.add.text(
            this.sys.game.canvas.width / 2.5,
            this.sys.game.canvas.height / 2,
            'VICTORIA', { 
            fontSize: '50px', 
            color: '#FFFFFF',       //Blanco
            fontFamily: 'Georgia',  
        });

        //BACK BUTTON (VOLVER A ZONA SCENE)
        const backScene = this.add.image(
            this.sys.game.canvas.width / 12,
            this.sys.game.canvas.height / 1.2, 
            'flecha')
        .setScale(-0.3, 0.3)
        .setInteractive()
        .on('pointerdown', () => this.scene.start('zonaScene', { modo: data.modo}));

    }

}