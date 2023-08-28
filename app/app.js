//0c0b19
//25f700


const checkbox = document.getElementById("button33");
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
}else {       
document.getElementById('title-port').innerHTML = "Portfolio";
document.getElementById('hi-p').innerHTML = "Hello, my name is Gabriel dagostim";
document.getElementById('hi-p-2').innerHTML = "Front-end programmer";
document.getElementById('about-me-title').innerHTML = "About me";
document.getElementById('about-me-text').innerHTML = "Front-end developer with experience in JavaScript, Material UI and API consumption. Passionate about web development. I also have experience in projects managed using Agile Methodologies. Studying software engineering with a specialization in Front-End at the Assis Gurgacz Foundation.";
document.getElementById('myhab').innerHTML = "My Skills";
document.getElementById('MyProjects').innerHTML = "My projects";
document.getElementById('contact-me').innerHTML = "Contact";
}}



