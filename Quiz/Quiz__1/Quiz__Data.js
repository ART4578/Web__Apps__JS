//questions data
const questions = [
    {
        question: "Ո՞ր շարքի բոլոր բառերի բաց թողած տեղում է գրվում միևնույն տառը կամ տառակապակցությունը:",
        answers: [
            { text: "1)ճրա-ալույց, նետաձի-, բեր-առատ (գ կամ ք)", correct: false },
            { text: "2)գու-կան, դ-խո, երա-տակավ (ժ կամ շ)", correct: false },
            { text: "3)խավ-ր, դաստ-րակ, միմ-յն (յա կամ իա)", correct: true }
        ]
    },
    {
        question: "Ո՞ր բառում ույ երկհնչյուն կա:", 
        answers: [
            { text: "1)ծաղկահ-ս", correct: false },
            { text: "2)առ-ծասիրտ", correct: false },
            { text: "3)կենտրոնախ-ս", correct: true }
        ]
    },
    {
        question: "Ո՞ր բառում ը ձայնավորի հնչյունափոխություն կա:",
        answers: [
            { text: "1)լուսնկա", correct: false },
            { text: "2)դստրիկ", correct: true },
            { text: "3)գրչատուփ", correct: false }
        ]
    },
    {
        question: "Տրված բառերից ո՞րն է կազմված միայն երկու արմատից:",
        answers: [
            { text: "1)հեռագրալար", correct: false },
            { text: "2)փորձանոթ", correct: true },
            { text: "3)արտադրանք", correct: false }
        ]
    },
    {
        question: "Ո՞ր բառը հետևյալ բառերից ոչ մեկի հոմանիշը չէ՝ բաղձանք, բազմաթույր, անպաճույճ:",
        answers: [
            { text: "1)երփներանգ", correct: false },
            { text: "2)անշուք", correct: false },
            { text: "3)իղձ", correct: false },
            { text: "4)ձանձրույթ", correct: true }
        ]
    },
    {
        question: "Ո՞ր տարբերակի բառազույգերն են հականիշներ:",
        answers: [
            { text: "1)հակիրճ - ամբողջական", correct: false },
            { text: "2)զառամյալ - դեռատի", correct: true },
            { text: "3)բեկբեկուն - աղեղնաձև", correct: false }
        ]
    },
    {
        question: "Ո՞ր բառակապակցությունը դարձվածային իմաստ չունի:",
        answers: [
            { text: "1)թիկունքից հարվածել", correct: false },
            { text: "2)համեստ ձևանալ", correct: true },
            { text: "3)արյունը երակներում սառչել", correct: false }
        ]
    },
    {
        question: "Ո՞ր շարքի բոլոր բառերն են ածականներ:",
        answers: [
            { text: "1)խոշոր, արգավանդ, ամայի", correct: true },
            { text: "2)ծիրանագույն, ատաղձ, կաղ", correct: false },
            { text: "3)գանգուր, ամոթ, որոշակի", correct: false }
        ]
    },
    {
        question: "Ո՞ր շարքի բոլոր բառերն են բարդածանցավոր:",
        answers: [
            { text: "1)մրգառատ, մարզպետարան, հավերժաբուխ", correct: false },
            { text: "2)անգործություն, ձերբակալում, կառավարիչ", correct: false },
            { text: "3)առաջնակարգ, բերքատու, ընդդիմախոս", correct: true }
        ]
    },
    {
        question: "Ո՞ր շարքում բառի կազմության սխալ ձև չկա:",
        answers: [
            { text: "1)ավերել, հօգուտ, ազգամեջյան", correct: false },
            { text: "2)պարզեցնել, ծաղկեվաճառ, դռնբաց", correct: false },
            { text: "3)լուսատտիկ, խոնավացնել, սիզախոտ", correct: true }
        ]
    }
];