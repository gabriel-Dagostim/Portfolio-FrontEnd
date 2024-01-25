const checkbox = document.getElementById("button33");
const buttonCurr = document.getElementById('bt-curr');
const section01 = document.getElementById("m-sec-01");
const section02 = document.getElementById("m-sec-02");
const section03 = document.getElementById("m-sec-03");
const section34 = document.getElementById("sec-3-4");
const section04 = document.getElementById("m-sec-04");
const section05 = document.getElementById("m-sec-05");

const lightThemeCheck = document.getElementById("lightTheme");


// Projetos
const project01 = document.getElementById("sec-project-01");
const project02 = document.getElementById("sec-project-02");
const project03 = document.getElementById("sec-project-03");
const project04 = document.getElementById("sec-project-04");
const project05 = document.getElementById("sec-project-05");
const project06 = document.getElementById("sec-project-06");
const project07 = document.getElementById("sec-project-07");
const project08 = document.getElementById("sec-project-08");
const project09 = document.getElementById("sec-project-09");
const project10 = document.getElementById("sec-project-10");
const project11 = document.getElementById("sec-project-11");
const project12 = document.getElementById("sec-project-12");
const project13 = document.getElementById("sec-project-13");
const project14 = document.getElementById("sec-project-14");
const project15 = document.getElementById("sec-project-15");





//CHANGE LANG

function clickAct() {
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

        document.getElementById('p-desc-project-01').innerHTML = "Desenvolveu-se uma loja online exclusiva para uma rede de servidores de Minecraft, caracterizando-se por ser um projeto inteiramente original. A codificação é 100% autêntica, sem utilizar bases de códigos de outras lojas online existentes. Essa abordagem assegura uma experiência única e personalizada para os usuários, oferecendo funcionalidades e itens específicos para o jogo Minecraft, com uma interface amigável e segura.";
        document.getElementById('p-desc-project-02').innerHTML = "WIP";
        document.getElementById('p-desc-project-03').innerHTML = "WIP";
        document.getElementById('p-desc-project-04').innerHTML = "O projeto LinkTree foi criado com o objetivo educacional de explorar e aplicar a programação do formato de horas. Um destaque deste projeto é a inclusão de um relógio digital, situado no canto inferior esquerdo da tela, que exibe a hora atual de forma clara e precisa. Essa funcionalidade não só adiciona um elemento prático ao projeto, mas também serve como uma aplicação real do aprendizado de manipulação de tempo em código. Importante ressaltar que o projeto é open source, o que significa que o código-fonte está disponível para todos. Isso permite que qualquer pessoa interessada possa criar seu próprio LinkTree personalizado. A natureza open source do projeto incentiva a colaboração e a inovação, permitindo que os usuários não só utilizem o projeto como base para seus próprios sites, mas também contribuam com melhorias e novas funcionalidades.";
        document.getElementById('p-desc-project-05').innerHTML = "Este projeto representou minha primeira experiência no uso de APIs, desenvolvido com a ideia de criar um quiz interativo inspirado no famoso segmento Qual é este Pokémon? dos programas infantis. O projeto engloba todas as gerações de Pokémon, oferecendo uma vasta gama de opções e desafios para os jogadores. Cada pergunta do quiz é gerada através do consumo de uma API, que busca informações e imagens de diferentes Pokémon, tornando o jogo dinâmico e educativo. Além de ser uma ferramenta divertida para fãs de Pokémon, este projeto serve como um ótimo exemplo prático do uso de APIs em desenvolvimento web. O código é open source, permitindo que outros desenvolvedores contribuam com suas próprias ideias e melhorias. Isso não só enriquece o projeto, mas também cria uma comunidade de colaboração onde programadores podem aprender uns com os outros e aprimorar suas habilidades em consumo de APIs.";
        document.getElementById('p-desc-project-06').innerHTML = "Este projeto foi cuidadosamente desenvolvido utilizando a API pública da OpenWeatherMap. Ele oferece uma funcionalidade essencial e bastante prática: a capacidade de verificar se está chovendo na cidade selecionada pelo usuário. Além disso, o projeto não se limita apenas à precipitação, também fornece informações detalhadas sobre outras condições meteorológicas importantes, como a velocidade do vento, a umidade e a temperatura atual. Isso proporciona uma visão abrangente do clima local, sendo uma ferramenta útil para planejamento diário, viagens ou atividades ao ar livre. A interface do projeto é intuitiva, permitindo que os usuários facilmente escolham a cidade desejada e obtenham rapidamente as informações meteorológicas atualizadas. A utilização da API da OpenWeatherMap garante que os dados sejam precisos e atualizados, tornando este projeto uma solução confiável para consulta de condições climáticas.";
        document.getElementById('p-desc-project-07').innerHTML = "O projeto da Serv foi concebido como uma empresa fictícia no ramo da gastronomia, atuando como um grupo de especialistas culinários altamente qualificados. Esses profissionais são contratados por empresas do setor alimentício que buscam apoio para expandir seus negócios e alcançar seu potencial máximo. O objetivo da Serv é oferecer consultoria especializada, ajudando essas empresas a aprimorar seus menus, técnicas de preparo, gestão de cozinha, e estratégias de marketing. O diferencial da Serv é a personalização de seus serviços, adaptando-se às necessidades específicas de cada cliente, seja um pequeno restaurante local buscando inovação no menu ou uma grande cadeia de alimentação necessitando de renovação em suas operações. A equipe da Serv é composta por chefs renomados, especialistas em nutrição, sommeliers, e profissionais de marketing gastronômico, garantindo uma abordagem holística e eficaz para o crescimento de negócios no setor gastronômico.";
        document.getElementById('p-desc-project-08').innerHTML = "Este projeto foi especialmente desenvolvido para aplicar na prática conhecimentos adquiridos em React, uma das bibliotecas JavaScript mais populares e eficientes para a criação de interfaces de usuário. Com esse objetivo, criou-se um quiz interativo focado no universo de Harry Potter, uma temática que atrai tanto fãs da série quanto entusiastas de trivia. O quiz desafia os usuários com perguntas variadas sobre a série de livros e filmes, abrangendo desde detalhes da trama até curiosidades sobre os personagens e o mundo mágico criado por J.K. Rowling. Através deste projeto, foi possível explorar diversas funcionalidades do React, como o gerenciamento de estados, o uso de componentes e a interatividade dinâmica na interface do usuário. Além disso, o design do quiz foi pensado para ser envolvente e imersivo, capturando a essência mágica de Harry Potter e proporcionando uma experiência de jogo divertida e educativa.";
        document.getElementById('p-desc-project-09').innerHTML = "WIP";
        document.getElementById('p-desc-project-10').innerHTML = "WIP";
        document.getElementById('p-desc-project-11').innerHTML = "WIP";
        document.getElementById('p-desc-project-12').innerHTML = "WIP";
        document.getElementById('p-desc-project-13').innerHTML = "WIP";


        document.getElementById("bt-bttn-access1").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access2").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access3").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access4").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access5").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access6").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access7").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access8").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access9").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access10").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access11").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access12").innerHTML = "Acessar projeto";
        document.getElementById("bt-bttn-access13").innerHTML = "Acessar projeto";

        document.getElementById("bt-bttn-repo-access1").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access2").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access3").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access4").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access5").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access6").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access7").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access8").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access9").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access10").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access11").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access12").innerHTML = "Acessar repositório";
        document.getElementById("bt-bttn-repo-access13").innerHTML = "Acessar repositório";

        document.getElementById("desc-tt-project1").innerHTML = "Descrição";
        document.getElementById("desc-tt-project2").innerHTML = "Descrição";
        document.getElementById("desc-tt-project3").innerHTML = "Descrição";
        document.getElementById("desc-tt-project4").innerHTML = "Descrição";
        document.getElementById("desc-tt-project5").innerHTML = "Descrição";
        document.getElementById("desc-tt-project6").innerHTML = "Descrição";
        document.getElementById("desc-tt-project7").innerHTML = "Descrição";
        document.getElementById("desc-tt-project8").innerHTML = "Descrição";
        document.getElementById("desc-tt-project9").innerHTML = "Descrição";
        document.getElementById("desc-tt-project10").innerHTML = "Descrição";
        document.getElementById("desc-tt-project11").innerHTML = "Descrição";
        document.getElementById("desc-tt-project12").innerHTML = "Descrição";
        document.getElementById("desc-tt-project13").innerHTML = "Descrição";

        document.getElementById("used-lang-pesc-desc1").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc2").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc3").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc4").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc5").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc6").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc7").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc8").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc9").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc10").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc11").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc12").innerHTML = "Linguagens usadas";
        document.getElementById("used-lang-pesc-desc13").innerHTML = "Linguagens usadas";
    }

    else {
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

        document.getElementById('p-desc-project-01').innerHTML = "An exclusive online store has been developed for a Minecraft server network, marked by its entirely original concept. The coding is 100% authentic, avoiding the use of existing online store codes. This approach ensures a unique and personalized user experience, providing specific functionalities and items for the Minecraft game, with a user-friendly and secure interface.";
        document.getElementById('p-desc-project-02').innerHTML = "WIP";
        document.getElementById('p-desc-project-03').innerHTML = "WIP";
        document.getElementById('p-desc-project-04').innerHTML = "The LinkTree project was developed with the educational aim of exploring and implementing time formatting in coding. A notable feature of this project is the inclusion of a digital clock, located in the lower-left corner of the screen, which displays the current time clearly and accurately. This feature not only adds a practical element to the project but also serves as a real-world application of time manipulation learning in code. It's important to note that the project is open source, meaning the source code is available to everyone. This allows any interested individual to create their own customized LinkTree. The open-source nature of the project encourages collaboration and innovation, enabling users not only to use the project as a basis for their own websites but also to contribute improvements and new features.";
        document.getElementById('p-desc-project-05').innerHTML = "This project marked my first foray into API consumption, developed with the intention of creating an interactive quiz inspired by the famous Whos that Pokémon? segment from children shows. The project encompasses all generations of Pokémon, offering a wide range of options and challenges for players. Each quiz question is generated through the use of an API, which retrieves information and images of various Pokémon, making the game dynamic and educational. Besides being a fun tool for Pokémon fans, this project serves as an excellent practical example of API usage in web development. The code is open source, allowing other developers to contribute their ideas and improvements. This not only enriches the project but also creates a community of collaboration where programmers can learn from each other and enhance their skills in API consumption.";
        document.getElementById('p-desc-project-06').innerHTML = "This project was meticulously developed using the public API from OpenWeatherMap. It offers a key and highly practical feature: the ability to check if it's raining in the user-selected city. Moreover, the project doesn't stop at precipitation; it also provides detailed information about other significant weather conditions, such as wind speed, humidity, and the current temperature. This offers a comprehensive view of the local weather, serving as a useful tool for daily planning, travel, or outdoor activities. The project's interface is user-friendly, allowing users to easily select their desired city and quickly obtain updated weather information. The use of the OpenWeatherMap API ensures that the data is accurate and up-to-date, making this project a reliable solution for weather condition queries.";
        document.getElementById('p-desc-project-07').innerHTML = "The Serv project was envisioned as a fictional company in the culinary field, functioning as a group of highly skilled gastronomic experts. These professionals are hired by food industry enterprises seeking support to expand their businesses and reach their full potential. The aim of Serv is to provide specialized consultancy, assisting these companies in enhancing their menus, cooking techniques, kitchen management, and marketing strategies. Serv's uniqueness lies in the customization of its services, adapting to the specific needs of each client, whether it's a small local restaurant looking for menu innovation or a large food chain in need of operational rejuvenation. The Serv team comprises renowned chefs, nutrition experts, sommeliers, and culinary marketing professionals, ensuring a holistic and effective approach to business growth in the gastronomic sector.";
        document.getElementById('p-desc-project-08').innerHTML = "This project was specifically developed to apply practical knowledge of React, one of the most popular and efficient JavaScript libraries for creating user interfaces. With this aim, an interactive quiz was created focusing on the Harry Potter universe, a theme that appeals to both fans of the series and trivia enthusiasts. The quiz challenges users with a variety of questions about the book and movie series, covering everything from plot details to curiosities about the characters and the magical world created by J.K. Rowling. Through this project, it was possible to explore various features of React, such as state management, component usage, and dynamic user interface interactivity. Moreover, the quiz's design was conceived to be engaging and immersive, capturing the magical essence of Harry Potter and providing a fun and educational gaming experience.";
        document.getElementById('p-desc-project-09').innerHTML = "WIP";
        document.getElementById('p-desc-project-10').innerHTML = "WIP";
        document.getElementById('p-desc-project-11').innerHTML = "WIP";
        document.getElementById('p-desc-project-12').innerHTML = "WIP";
        document.getElementById('p-desc-project-13').innerHTML = "WIP";


        document.getElementById("bt-bttn-access1").innerHTML = "Access project";
        document.getElementById("bt-bttn-access2").innerHTML = "Access project";
        document.getElementById("bt-bttn-access3").innerHTML = "Access project";
        document.getElementById("bt-bttn-access4").innerHTML = "Access project";
        document.getElementById("bt-bttn-access5").innerHTML = "Access project";
        document.getElementById("bt-bttn-access6").innerHTML = "Access project";
        document.getElementById("bt-bttn-access7").innerHTML = "Access project";
        document.getElementById("bt-bttn-access8").innerHTML = "Access project";
        document.getElementById("bt-bttn-access9").innerHTML = "Access project";
        document.getElementById("bt-bttn-access10").innerHTML = "Access project";
        document.getElementById("bt-bttn-access11").innerHTML = "Access project";
        document.getElementById("bt-bttn-access12").innerHTML = "Access project";
        document.getElementById("bt-bttn-access13").innerHTML = "Access project";

        document.getElementById("bt-bttn-repo-access1").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access2").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access3").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access4").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access5").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access6").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access7").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access8").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access9").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access10").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access11").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access12").innerHTML = "Access repository";
        document.getElementById("bt-bttn-repo-access13").innerHTML = "Access repository";

        document.getElementById("desc-tt-project1").innerHTML = "Description";
        document.getElementById("desc-tt-project2").innerHTML = "Description";
        document.getElementById("desc-tt-project3").innerHTML = "Description";
        document.getElementById("desc-tt-project4").innerHTML = "Description";
        document.getElementById("desc-tt-project5").innerHTML = "Description";
        document.getElementById("desc-tt-project6").innerHTML = "Description";
        document.getElementById("desc-tt-project7").innerHTML = "Description";
        document.getElementById("desc-tt-project8").innerHTML = "Description";
        document.getElementById("desc-tt-project9").innerHTML = "Description";
        document.getElementById("desc-tt-project10").innerHTML = "Description";
        document.getElementById("desc-tt-project11").innerHTML = "Description";
        document.getElementById("desc-tt-project12").innerHTML = "Description";
        document.getElementById("desc-tt-project13").innerHTML = "Description";

        document.getElementById("used-lang-pesc-desc1").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc2").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc3").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc4").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc5").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc6").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc7").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc8").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc9").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc10").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc11").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc12").innerHTML = "Language used";
        document.getElementById("used-lang-pesc-desc13").innerHTML = "Language used";
    }
};








//CHANGE THEME
function lightCh() {
    var LightisChecked = lightThemeCheck.checked;
    if (LightisChecked = !LightisChecked) {
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
function contact() {
    window.scrollTo(0, document.body.scrollHeight);
}





function HideSections() {
    section01.style.display = "none";
    section02.style.display = "none";
    section03.style.display = "none";
    section34.style.display = "none";
    section04.style.display = "none";
    section05.style.display = "none";
}

function ShowSections() {
    section01.style.display = "block";
    section02.style.display = "block";
    section03.style.display = "block";
    section34.style.display = "block";
    section04.style.display = "block";
    section05.style.display = "block";
}






function toggleVisibility01() {
    if (project01.style.display === "none") {
        HideSections()
        project01.style.display = "flex";
    } else {
        project01.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility02() {
    if (project02.style.display === "none") {
        HideSections()
        project02.style.display = "flex";
    } else {
        project02.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility03() {
    if (project03.style.display === "none") {
        HideSections()
        project03.style.display = "flex";
    } else {
        project03.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility04() {
    if (project04.style.display === "none") {
        HideSections()
        project04.style.display = "flex";
    } else {
        project04.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility05() {
    if (project05.style.display === "none") {
        HideSections()
        project05.style.display = "flex";
    } else {
        project05.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility06() {
    if (project06.style.display === "none") {
        HideSections()
        project06.style.display = "flex";
    } else {
        project06.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility07() {
    if (project07.style.display === "none") {
        HideSections()
        project07.style.display = "flex";
    } else {
        project07.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility08() {
    if (project08.style.display === "none") {
        HideSections()
        project08.style.display = "flex";
    } else {
        project08.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility09() {
    if (project09.style.display === "none") {
        HideSections()
        project09.style.display = "flex";
    } else {
        project09.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility10() {
    if (project10.style.display === "none") {
        HideSections()
        project10.style.display = "flex";
    } else {
        project10.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility11() {
    if (project11.style.display === "none") {
        HideSections()
        project11.style.display = "flex";
    } else {
        project11.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility12() {
    if (project12.style.display === "none") {
        HideSections()
        project12.style.display = "flex";
    } else {
        project12.style.display = "none";
        ShowSections()
    }
}

function toggleVisibility13() {
    if (project13.style.display === "none") {
        HideSections()
        project13.style.display = "flex";
    } else {
        project13.style.display = "none";
        ShowSections()
    }
}














