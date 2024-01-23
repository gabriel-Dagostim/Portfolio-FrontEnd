const checkbox = document.getElementById("button33");
var buttonCurr = document.getElementById('bt-curr');
//CHANGE LANG
    function clickAct(){
        var isChecked = checkbox.checked;
        if (isChecked) {    
            buttonCurr.setAttribute('href', './archives/curriculo/Gabriel-Dagostim.pdf');
            buttonCurr.setAttribute('download', 'Curriculo-Gabriel-Dagostim');            
            document.getElementById('title-port').innerHTML = "Portfólio";
            document.getElementById('hi-p').innerHTML = "Olá, me chamo Gabriel dagostim";
            document.getElementById('hi-p-2').innerHTML = "Programador front-end";
            document.getElementById('text-curr').innerHTML = "CURRÍCULO-PT";
            document.getElementById('about-me-title').innerHTML = "Sobre mim";
            document.getElementById('about-me-text').innerHTML = "Desenvolvedor Front-end com experiência em JavaScript, Material UI e consumo de APIs. Apaixonado pelo desenvolvimento web. Também possuo experiência em projetos gerenciados por Metodologias Ágeis. Cursando engenharia de software com foco em especialização em Front-End na Fundação Assis Gurgacz";
            document.getElementById('myhab').innerHTML = "Minhas Habilidades";
            document.getElementById('MyProjects').innerHTML = "Meus projetos";
            document.getElementById('MyBProjects').innerHTML = "Melhores projetos";
            document.getElementById('contact-me').innerHTML = "Contato";
        } else {       
            buttonCurr.setAttribute('href', './archives/curriculo/Gabriel-Dagostim-en.pdf');
            buttonCurr.setAttribute('download', 'CurriculoEN-Gabriel-Dagostim');
            document.getElementById('title-port').innerHTML = "Portfolio";
            document.getElementById('hi-p').innerHTML = "Hello, my name is Gabriel dagostim";
            document.getElementById('hi-p-2').innerHTML = "Front-end programmer";
            document.getElementById('text-curr').innerHTML = "CURRICULUM-EN";
            document.getElementById('about-me-title').innerHTML = "About me";
            document.getElementById('about-me-text').innerHTML = "Front-end developer with experience in JavaScript, Material UI and API consumption. Passionate about web development. I also have experience in projects managed using Agile Methodologies. Studying software engineering with a specialization in Front-End at the Assis Gurgacz Foundation.";
            document.getElementById('myhab').innerHTML = "My Skills";
            document.getElementById('MyProjects').innerHTML = "My projects";
            document.getElementById('MyBProjects').innerHTML = "Best projects";
            document.getElementById('contact-me').innerHTML = "Contact";
    }
};

const lightThemeCheck = document.getElementById("lightTheme");
//CHANGE THEME
    function lightCh(){
        var LightisChecked = lightThemeCheck.checked;
        if ( LightisChecked =! LightisChecked) {            
            document.body.style.backgroundImage = ' linear-gradient(rgba(253, 253, 253, 0.8), rgba(253, 253, 253, 0.8)), url(../img/background/wall-light.png)'
            document.body.style.backgroundColor = '#fdfdfd'

            document.documentElement.style.setProperty('--color-padrao', 'var(--color-dark)');
            document.documentElement.style.setProperty('--color-wt2', 'black');
            document.documentElement.style.setProperty('--color-padrao-02', '#fdfdff');    
            document.documentElement.style.setProperty('--color-dark-2', '25f700');
            document.documentElement.style.setProperty('--color-dark-3', '#fdfdfd');








                
















      
        } else {
            document.body.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(../img/background/wall.png)';
            document.body.style.backgroundColor = '#0c0b19'

            document.documentElement.style.setProperty('--color-padrao', '#25f700');
            document.documentElement.style.setProperty('--color-wt3', '#25f700');
            document.documentElement.style.setProperty('--color-wt2', '#fdfdff');
            document.documentElement.style.setProperty('--color-padrao-02', '#25f702');
            document.documentElement.style.setProperty('--color-dark-3', '#0c0b19');





            
    }
};

function contact(){
    window.scrollTo(0, document.body.scrollHeight);
}



