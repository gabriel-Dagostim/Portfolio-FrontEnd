const checkbox = document.getElementById("button33");
//CHANGE LANG
    function clickAct(){
        var isChecked = checkbox.checked;
        if (isChecked) {       
            document.getElementById('title-port').innerHTML = "Portfólio";
            document.getElementById('hi-p').innerHTML = "Olá, me chamo Gabriel dagostim";
            document.getElementById('hi-p-2').innerHTML = "Programador front-end";
            document.getElementById('about-me-title').innerHTML = "Sobre mim";
            document.getElementById('about-me-text').innerHTML = "Desenvolvedor Front-end com experiência em JavaScript, Material UI e consumo de APIs. Apaixonado pelo desenvolvimento web. Também possuo experiência em projetos gerenciados por Metodologias Ágeis. Cursando engenharia de software com foco em especialização em Front-End na Fundação Assis Gurgacz";
            document.getElementById('myhab').innerHTML = "Minhas Habilidades";
            document.getElementById('MyProjects').innerHTML = "Meus projetos";
            document.getElementById('contact-me').innerHTML = "Contato";
        } else {       
            document.getElementById('title-port').innerHTML = "Portfolio";
            document.getElementById('hi-p').innerHTML = "Hello, my name is Gabriel dagostim";
            document.getElementById('hi-p-2').innerHTML = "Front-end programmer";
            document.getElementById('about-me-title').innerHTML = "About me";
            document.getElementById('about-me-text').innerHTML = "Front-end developer with experience in JavaScript, Material UI and API consumption. Passionate about web development. I also have experience in projects managed using Agile Methodologies. Studying software engineering with a specialization in Front-End at the Assis Gurgacz Foundation.";
            document.getElementById('myhab').innerHTML = "My Skills";
            document.getElementById('MyProjects').innerHTML = "My projects";
            document.getElementById('contact-me').innerHTML = "Contact";
    }
};

const lightThemeCheck = document.getElementById("lightTheme");
//CHANGE THEME
    function lightCh(){
        var LightisChecked = lightThemeCheck.checked;
        if ( LightisChecked =! LightisChecked) {
            
            document.body.style.backgroundColor = '#fdfdfd';
            document.getElementById("theme").style.backgroundColor = '#fdfdfd';
            document.getElementById("knobs").style.backgroundColor = '#fdfdfd';
            document.getElementById('title-port').style.color = "#000";
            document.getElementById('hi-p').style.color = "#000";
            document.getElementById('about-me-title').style.color = "#000";
            document.getElementById('about-me-text').style.color = "#000";
            document.getElementById('myhab').style.color = "#000";
            document.getElementById('MyProjects').style.color = "#000";
            document.getElementById('contact-me').style.color = "#000";
            document.getElementById('whatsapp-title-id').style.color = "#000";
            document.getElementById('github-title-id').style.color = "#000";
            document.getElementById('instagram-title-id').style.color = "#000";
            document.getElementById('linkedIn-title-id').style.color = "#000";
        } else {
            document.body.style.backgroundColor = '#0c0b19';
            document.getElementById("theme").style.backgroundColor = '#0c0b19';
            document.getElementById("knobs").style.backgroundColor = '#0c0b19';
            document.getElementById('title-port').style.color = "#25f700";
            document.getElementById('hi-p').style.color = "#25f700";
            document.getElementById('about-me-title').style.color = "#25f700";
            document.getElementById('about-me-text').style.color = "#fdfdfd";
            document.getElementById('myhab').style.color = "#25f700";
            document.getElementById('MyProjects').style.color = "#25f700";
            document.getElementById('contact-me').style.color = "#25f700";
            document.getElementById('whatsapp-title-id').style.color = "#25f700";
            document.getElementById('github-title-id').style.color = "#25f700";
            document.getElementById('instagram-title-id').style.color = "#25f700";
            document.getElementById('linkedIn-title-id').style.color = "#25f700";
    }
};

function contact(){
    window.scrollTo(0, document.body.scrollHeight);
}