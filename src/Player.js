export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player'); 
        scene.add.existing(this);
        this.setDisplaySize(150, 150); //tamaño
        
        //atributos de movimiento (andrea)
        this.speed = 200; //velocidad
        this.isMoving = true;
        this.isInteracting = false; //para ver si está interactuando
        this.setScale(0.012);

         // Activamos la física para este sprite
         this.scene.physics.world.enable(this);

         // Decimos que el player colisiona con los límites del mundo
         this.body.setCollideWorldBounds();
 
         // Desactivamos la gravedad para el player
         this.body.setAllowGravity(false);
 
         // Seteamos las teclas para mover al personaje
        this.wKey = this.scene.input.keyboard.addKey('W'); //arriba
        this.aKey = this.scene.input.keyboard.addKey('A'); //izquierda
        this.sKey = this.scene.input.keyboard.addKey('S'); //abajo
        this.dKey = this.scene.input.keyboard.addKey('D'); //derecha
        this.eKey = this.scene.input.keyboard.addKey('E'); //entrar

        //atributos combate (victor)
        this.health = 100; //vida player
        this.mana = 50; //mana
        this.maxMana=400;
        this.maxHealth = 100;
        //cualidades
        this.humidad = 0;
        this.trabajoDuro = 0;
        this.agnosticismo = 0;
        this.afecto = 0;
        this.ansiedad=0;
        this.maxAnsiedad=100;
      
    }
//Metodos inventario (Nerea)

HealPlayer(amount)
{
    if(this.health+amount < this.maxHealth){
    this.health+=amount;
    }
    else {
        this.health = this.maxHealth;
    }

}

MaxLife(amount)
{
this.maxHealth+=amount;
}

LessAnxiety(amount)
{
    if(this.ansiedad-amount < 0){
        this.ansiedad=0;
        }
        else {
            this.ansiedad-= this.ansiedad;
        }

}

IncreaseAnxiety(amount)
{
    if(this.ansiedad+amount < this.maxAnsiedad){
        this.ansiedad+=amount;
        }
        else {
            this.ansiedad = this.maxAnsiedad;
        }

}

HealQuality(amount)
{
    if(this.mana+amount < this.maxMana){
        this.mana+=amount;
        }
        else {
            this.mana = this.maxMana;
        }


}

//métodos de combate (victor)
    // Método de ataque
    attackEnemy(enemy, totalDamage) {

        enemy.takeDamage(totalDamage);
        //debug
        console.log("ataque normal: " + totalDamage);
    }

    // Método de magia
    useMagic(enemy) {
        if (this.mana >= 20) {
            var damage = 50;
            enemy.takeDamage(damage);
            this.mana -= 20;
            //debug
            console.log("ataque especial: " + damage + ", mana restante: " + this.mana)
        }
    }

    //metodo recibir daño
    takeDamage(damage) {
        this.health -= damage;
    }



//métodos movimiento (andrea)
    preUpdate(t, dt)
    {
        super.preUpdate(t, dt);

        if(this.isMoving == true)
        {
             // Mientras pulsemos la tecla 'A' movemos el personaje en la X
            if(this.aKey.isDown){
                //this.setFlip(true, false);
                
                //this.x -= this.speed*dt / 1000;
                this.body.setVelocityX(-this.speed);
            }

            // Mientras pulsemos la tecla 'D' movemos el personaje en la X
            if(this.dKey.isDown){
                //this.setFlip(false, false);

                //this.x += this.speed*dt / 1000;
                this.body.setVelocityX(this.speed);
            }

            // Movimiento hacia arriba con tecla 'W'
            if (this.wKey.isDown) {
                this.body.setVelocityY(-this.speed);
            }

            // Movimiento hacia abajo con tecla 'S'
            if (this.sKey.isDown) {
                this.body.setVelocityY(this.speed);
            }

            // Si dejamos de pulsar 'A' o 'D' volvemos al estado de animación'idle'
            // Phaser.Input.Keyboard.JustUp y Phaser.Input.Keyboard.JustDown nos aseguran detectar la tecla una sola vez (evitamos repeticiones)
            if(Phaser.Input.Keyboard.JustUp(this.aKey) || Phaser.Input.Keyboard.JustUp(this.dKey)){
                this.body.setVelocityX(0);
            }


            // Detener el movimiento vertical cuando soltamos 'W' o 'S'
            if (Phaser.Input.Keyboard.JustUp(this.wKey) || Phaser.Input.Keyboard.JustUp(this.sKey)) {
                this.body.setVelocityY(0);
            }

            if (this.eKey.isDown) {
                this.isInteracting = true;
            }

            if(Phaser.Input.Keyboard.JustUp(this.eKey))
            {
                this.isInteracting = false;
            }

        }
        
       
    }

    isInteractingPressed()
    {
        return this.isInteracting;
    }

    changeMove(bool)
    {
        this.isMoving = bool;
    }

}
