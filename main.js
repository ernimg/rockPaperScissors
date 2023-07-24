function getIndex(len){
    return Math.floor(Math.random() * len)
};

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
};

const app = Vue.createApp({
    data() {
        return {
            figureRules : [
                {
                    name : 'kamień',
                    win : ['ogień','nożyce','wąż','człowiek','drzewo','wilk','szpony'],
                },
                {
                    name: 'ogień',
                    win: ['nożyce','wąż','człowiek','drzewo','wilk','szpony','papier'],
                },
                {
                    name: 'nożyce',
                    win: ['wąż','człowiek','drzewo','wilk','szpony','papier','powietrze'],
                },
                {
                    name: 'wąż',
                    win: ['człowiek','drzewo','wilk','szpony','papier','powietrze','woda'],
                },
                {
                    name: 'człowiek',
                    win: ['drzewo','wilk','szpony','papier','powietrze','woda','smoki'],
                },
                {
                    name: 'drzewo',
                    win: ['wilk','szpony','papier','powietrze','woda','smoki','diabeł'],
                },
                {
                    name: 'wilk',
                    win: ['szpony','papier','powietrze','woda','smoki','diabeł','błyskawica'],
                },
                {
                    name: 'szpony',
                    win: ['papier','powietrze','woda','smoki','diabeł','błyskawica','pistolet'],
                },
                {
                    name: 'papier',
                    win: ['powietrze','woda','smoki','diabeł','błyskawica','pistolet','kamień'],
                },
                {
                    name: 'powietrze',
                    win: ['woda','smoki','diabeł','błyskawica','pistolet','kamień','ogień'],
                },
                {
                    name: 'woda',
                    win: ['smoki','diabeł','błyskawica','pistolet','kamień','ogień','nożyce'],
                },
                {
                    name: 'smoki',
                    win: ['diabeł','błyskawica','pistolet','kamień','ogień','nożyce','wąż'],
                },
                {
                    name: 'diabeł',
                    win: ['błyskawica','pistolet','kamień','ogień','nożyce','wąż','człowiek'],
                },
                {
                    name: 'błyskawica',
                    win: ['pistolet','kamień','ogień','nożyce','wąż','człowiek','drzewo'],
                },
                {
                    name: 'pistolet',
                    win: ['kamień','ogień','nożyce','wąż','człowiek','drzewo','wilk'],
                }
            ], 
            userSelected: '',
            computerSelected: '',
            gameCounter: 0,
            computerLive: 100,
            playerLive: 100,
            active: true,
            gameWinner:'',
            gameLog: [],
 
        }
    },
    watch:{
        win(value){
            switch (value) {
                case 'wygrana':
                    const dmgPlayer = getRandomValue(7,18);
                    this.computerLive -= dmgPlayer;
                    this.addLogGame(this.gameCounter,'wygrana',this.playerLive,this.computerLive);
                    break;
                case 'przegrana':
                    const dmgComputer = getRandomValue(6,15);
                    this.playerLive -= dmgComputer;
                    this.addLogGame(this.gameCounter,'przegrana',this.playerLive,this.computerLive);
                    break;
                case 'remis':
                    this.addLogGame(this.gameCounter,'remis',this.playerLive,this.computerLive);
                    break;
                default:
                    break;
            }
        },
        computerLive(value){
            if(value <= 0){
                this.gameWinner = 'Gracz';
            }
        },
        playerLive(value){
            if(value <= 0){
                this.gameWinner = 'Komputer';
            }
        },
    },
    computed:{
        win(){
            if(this.userSelected === '' && this.computerSelected ==='' || this.userSelected !=="" && this.computerSelected==='')return '';
            if (this.userSelected === this.computerSelected) return 'remis';
            let withWhoWin;
            this.figureRules.forEach( figure => figure.name === this.userSelected ? withWhoWin = figure.win : 'nie sutalono z kim wygrywa');
            if (withWhoWin.includes(this.computerSelected)){
                return 'wygrana';
            }else{
                return 'przegrana';
            }
            
        },
        setPlayerHealthWidth(){
            return {width: this.playerLive + '%'};
        },
        setComputerHealthWidth(){
            return {width: this.computerLive + '%'};
        },
        toggleMesageButton(){
            if(this.win === 'remis') return 'natrafiłeś na godnego przeciwnika graj dalej!'
            return this.win === 'wygrana' ? 'Jej idzie Ci świetnie graj dale!': ' Nie przejmuj się może następnym razem!';
        },
    },
    methods: {
        handleUserSelect(figureName){
            this.userSelected = figureName;
        },
        computerDraw(){
            const index = getIndex(this.figureRules.length);
            this.computerSelected = this.figureRules[index].name;
        },
        starGame(){
            if(this.userSelected ==='')return alert('Gracz nie wybrał jeszcze figury!!');
            this.computerDraw();
            this.gameCounter++;
            this.activeBtn = !this.activeBtn 
            setTimeout(()=>{
                this.active = !this.active;
            },2000);
            
        },
        activeBoard(){
            this.active = !this.active;
            this.activeBtn = !this.activeBtn;
            this.computerSelected = '';
            this.userSelected = '';
        },
        addLogGame(round,what,val1,val2,who){
            this.gameLog.unshift({
                action:round,
                actionType:what,
                actionValuePlayer:val1,
                actionComputerValue:val2,
            });
        },
        reset(){
            this.gameLog = [];
            this.computerLive = 100;
            this.playerLive = 100;
            this.active = true;
            this.gameCounter = 0;
        }
    },

});

app.mount('#game')



// const btnStart = document.querySelector('.start');
// const figuresLis = [...document.querySelectorAll('span')];

// const figureRules = [
//     {
//         name : 'kamień',
//         win : ['ogień','nożyce','wąż','człowiek','drzewo','wilk','szpony'],
//     },
//     {
//         name: 'ogień',
//         win: ['nożyce','wąż','człowiek','drzewo','wilk','szpony','papier'],
//     },
//     {
//         name: 'nożyce',
//         win: ['wąż','człowiek','drzewo','wilk','szpony','papier','powietrze'],
//     },
//     {
//         name: 'wąż',
//         win: ['człowiek','drzewo','wilk','szpony','papier','powietrze','woda'],
//     },
//     {
//         name: 'człowiek',
//         win: ['drzewo','wilk','szpony','papier','powietrze','woda','smoki'],
//     },
//     {
//         name: 'drzewo',
//         win: ['wilk','szpony','papier','powietrze','woda','smoki','diabeł'],
//     },
//     {
//         name: 'wilk',
//         win: ['szpony','papier','powietrze','woda','smoki','diabeł','błyskawica'],
//     },
//     {
//         name: 'szpony',
//         win: ['papier','powietrze','woda','smoki','diabeł','błyskawica','pistolet'],
//     },
//     {
//         name: 'papier',
//         win: ['powietrze','woda','smoki','diabeł','błyskawica','pistolet','kamień'],
//     },
//     {
//         name: 'powietrze',
//         win: ['woda','smoki','diabeł','błyskawica','pistolet','kamień','ogień'],
//     },
//     {
//         name: 'woda',
//         win: ['smoki','diabeł','błyskawica','pistolet','kamień','ogień','nożyce'],
//     },
//     {
//         name: 'smoki',
//         win: ['diabeł','błyskawica','pistolet','kamień','ogień','nożyce','wąż'],
//     },
//     {
//         name: 'diabeł',
//         win: ['błyskawica','pistolet','kamień','ogień','nożyce','wąż','człowiek'],
//     },
//     {
//         name: 'błyskawica',
//         win: ['pistolet','kamień','ogień','nożyce','wąż','człowiek','drzewo'],
//     },
//     {
//         name: 'pistolet',
//         win: ['kamień','ogień','nożyce','wąż','człowiek','drzewo','wilk'],
//     }
// ];

// const selectedFigur = {
//     player: '',
//     computer: '',
// };


// const gameStatus = {
//     win: 0,
//     losses: 0,
//     draw: 0,
// };

// function randomChoice(){
//     const indexFigur = Math.floor(Math.random() * figureRules.length);
//     figuresLis.forEach(figure => {
//         figure.dataset.option === figureRules[indexFigur].name ? figure.style.boxShadow = 'rgba(255, 0,0, 0.5) 0 1px 13px': null;
//     });
//     selectedFigur.computer = figureRules[indexFigur].name;
//     document.querySelector('.computerChoice').textContent= selectedFigur.computer;
//     return figureRules[indexFigur].name;
// };

// function checkingWiners(player , computer){
//    if (player === computer) {
//         gameStatus.draw++;
//         return 'Remis :|';
//     }   
//    console.log('gracz: ' +  player);
//    console.log('komputer: ' + computer);
//    let dependenceArr;
//    figureRules.forEach(figure =>  figure.name == player ? dependenceArr = figure.win:null);
//    console.log(dependenceArr);
//    const checkArr = dependenceArr.includes(computer);
//    if(checkArr){
//     gameStatus.win++;
//     return 'Wygrana :)';
//    }else{
//     gameStatus.losses++;
//     return 'Przegrana :<';
//    }
// };
// const updateBoar = (gameResult)=>{
//     document.querySelector('.win').textContent = gameStatus.win;
//     document.querySelector('.losses').textContent = gameStatus.losses;
//     document.querySelector('.draw').textContent = gameStatus.draw;
//     document.querySelector('.computerChoice').textContent = selectedFigur.computer;
//     switch (gameResult) {
//         case 'Remis :|':
//             document.querySelector('.battleResult').textContent = gameResult;
//             break;
//         case 'Wygrana :)':
//             document.querySelector('.battleResult').textContent = gameResult;
//             break;
//         case 'Przegrana :<':
//             document.querySelector('.battleResult').textContent = gameResult;
//             break;
//         default:
//             break;
//     }
    
// }

// const startGame = ()=>{
//     if(!selectedFigur.player) return window.alert('Nie wybrano figury');
//     const computerChoice = randomChoice();
//     const result = checkingWiners(selectedFigur.player, computerChoice);
//     updateBoar(result);
//     console.log(`Wygrana ${gameStatus.win} przegrane ${gameStatus.losses} remisy ${gameStatus.draw}`);
// };

// function selectPlayer(){
//     if(selectedFigur.computer){
//         document.querySelector('.battleResult').textContent ='';
//         selectedFigur.computer ='';
//         document.querySelector('.computerChoice').textContent = selectedFigur.computer;
//     }
//     const player = this.dataset.option;
//     figuresLis.forEach(figure => figure.style.boxShadow ='');
//     selectedFigur.player = player;
//     document.querySelector('.playerChoice').textContent= selectedFigur.player;
//     this.style.boxShadow = 'rgba(0, 0, 255, 0.5) 0 1px 13px';
// };

// btnStart.addEventListener('click',startGame);
// figuresLis.forEach(item => item.addEventListener('click',selectPlayer))