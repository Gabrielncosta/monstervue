new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        
        attackgif: false,
        turns: [],
    },


    
    methods: {


        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function () {
            let damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;
            
            this.turns.unshift({
                isPlayer: true,
                text:`Player hits Monster for ${damage} `
            });

            if(this.checkWin()) {
                return;
            }
            
            
            this.monsterAttack()
            

            this.checkWin();
            
        },

        specialAttack() {
            var damage = this.calculateDamage(1, 16);
            this.monsterHealth -= damage

            this.turns.unshift({
                isPlayer: true,
                text:`Player hits Monster HARD for ${damage} `
            });

            if(this.checkWin()) {
                return;
            }

            this.monsterAttack();
        },

        Heal() {
            if(this.playerHealth <=90){
                this.playerHealth += 10;
                this.monsterAttack();
            }
            else {
                this.playerHealth = 100;
                this.monsterAttack();
            }

            this.turns.unshift({
                isPlayer: true,
                text:`Player heals for 10 `
            });

        },

        giveUp() {
            this.gameIsRunning = false;
            this.turns = [];
        },

        calculateDamage(min, max) {
            return damage = Math.max(Math.floor(Math.random() * max) + 1, min);  
        },

        checkWin() {
            if (this.monsterHealth <= 0) {
                if(confirm('You won!, new game?')) {
                    this.startGame();

                    return true;
                } else {
                    this.gameIsRunning = false;
                }
                return false;
            }

            else if (this.playerHealth <= 0) {
                if(confirm('You lost!, new game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },

        monsterAttack() {
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;

            this.turns.unshift({
                isPlayer: false,
                text:`Player hits Monster for ${damage} `
            });
        }
    }
})
