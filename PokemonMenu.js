class Pokemon {
    constructor(name, type1, type2){
        this.name = name; 
        this.type1 = type1;
        this.type2 = type2;
    }
}

class Team {
    constructor(name){
        this.name = name;
        this.pokemons = [];
    }

    addPokemon(pokemon){
        if (pokemon instanceof Pokemon && this.pokemons.length < 6){
            this.pokemons.push(pokemon);
        }else if (pokemon instanceof Pokemon && this.pokemons.length >= 6){
            alert(`Sorry your team is already full.`);
        }else{
            throw new Error(`You can only add and intance of a Pokemon. Argument is not a Pokemon: ${pokemon}`);
        }
    }

    details(){
        return `${this.name} has ${this.pokemons.length}/6 Pokemon on the team.`;
    }
}

class Menu {
    constructor(){
        this.teams = [];
        this.selectedTeam = null;
    }

    start(){

        let selection = this.showMainMenuOptions();

        while(selection != 0){

            switch (selection){
                case '1': 
                    this.createTeam();
                    break;
                case '2': 
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4': 
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
            0) exit
            1) create new team
            2) view team
            3) delete team
            4) display all teams
        `);
    }

    showTeamMenuOptions(teamInfo){
        return prompt(`
        0) back
        1) create Pokemon
        2) delete Pokemon
        ----------------------
        ${teamInfo}
        `);
    }

    displayTeams() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++){
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    createTeam(){
        let name = prompt(`Enter name for new team:`);
        this.teams.push(new Team(name));
    }

    deleteTeam(){
        let index = prompt(`Enter the index of the team you wish to delete`);
        if(index > -1 && index < this.teams.length) {
            this.teams.splice(index, 1);
        }
        
    }

    viewTeam(){
        let index = prompt(`Enter the index of the team that you wish to view:`);
        if(index > -1 && index < this.teams.length){
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';
            
            for(let i = 0; i < this.selectedTeam.pokemons.length; i++){
                description += i + ') ' + this.selectedTeam.pokemons[i].name
                 + ' - ' + this.selectedTeam.pokemons[i].type1 + '/' + this.selectedTeam.pokemons[i].type2 + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch(selection){
                case '1':
                    this.createPokemon();
                    break;
                case '2':
                    this.deletePokemon();
            }
        }
    }

    createPokemon(){
        let name = prompt(`Enter name for new Pokemon:`);
        let type1 = prompt(`Enter Primary Type for Pokemon:`);
        let type2 = prompt(`Enter Secondary Type for Pokemon:`);
        let pokemon = new Pokemon(name, type1, type2);
        this.selectedTeam.addPokemon(pokemon);
    }

    deletePokemon(){
        let index = prompt(`Enter the index of the Pokemon you wish to delete:`);
        if (index > -1 && index < this.selectedTeam.pokemons.length){
            this.selectedTeam.pokemons.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();