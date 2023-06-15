const btnStart = document.querySelector('.start');

const figureRules = [
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
]

const selectedFigur = {
    player: 'ogień',
    computer: ''
}


const gameStatus = {
    win: 0,
    losses: 0,
    draw: 0,

}

function randomChoice(){
    const indexFigur = Math.floor(Math.random() * figureRules.length);
    return figureRules[indexFigur].name;
}

function checkingWiners(player , computer){
   if (player === computer) {
        gameStatus.draw++;
   }
   
   console.log('gracz: ' +  player);
   console.log('komputer: ' + computer);
   let dependenceArr;
   figureRules.forEach(figure =>  figure.name == player ? dependenceArr = figure.win:null);
   console.log(dependenceArr);
   const checkArr = dependenceArr.indexOf(computer);
   if(checkArr != -1){
    gameStatus.win++;
   }else{
    gameStatus.losses++;
   }
}
const startGame = ()=>{

    if(!selectedFigur.player) return window.alert('Nie wybrano figury');

    const computerChoice = randomChoice();

    checkingWiners(selectedFigur.player, computerChoice)

    console.log(`Wygrana ${gameStatus.win} przegrane ${gameStatus.losses} remisy ${gameStatus.draw}`);

}

btnStart.addEventListener('click',startGame);