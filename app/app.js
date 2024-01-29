const checkbox = document.getElementById("button33");
const buttonCurr = document.getElementById('bt-curr');
const lightThemeCheck = document.getElementById("lightTheme");

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

        for (let i = 1; i <= 13; i++) {
            document.getElementById("bt-bttn-access" + i).innerHTML = "Acessar projeto";
        }
        for (let i = 1; i <= 13; i++) {
            document.getElementById("bt-bttn-repo-access" + i).innerHTML = "Acessar repositório";
        }
        for (let i = 1; i <= 13; i++) {
            document.getElementById("desc-tt-project" + i).innerHTML = "Descrição";
        }      
        for (let i = 1; i <= 13; i++) {
            document.getElementById("used-lang-pesc-desc" + i).innerHTML = "Linguagens usadas";
        }
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

        for (let i = 1; i <= 13; i++) {
            document.getElementById("bt-bttn-access" + i).innerHTML = "Access project";
        }
        for (let i = 1; i <= 13; i++) {
            document.getElementById("bt-bttn-repo-access" + i).innerHTML = "Access repository";
        }
        for (let i = 1; i <= 13; i++) {
            document.getElementById("desc-tt-project" + i).innerHTML = "Description";
        }
        for (let i = 1; i <= 13; i++) {
            document.getElementById("used-lang-pesc-desc" + i).innerHTML = "Language used";
        }        
    }
};


//CHANGE THEME


function lightCh() {
    var LightisChecked = lightThemeCheck.checked;
    document.body.style.backgroundImage = LightisChecked ? 
        'linear-gradient(rgba(253, 253, 253, 0.8), rgba(253, 253, 253, 0.8)), url(../img/background/wall-light.png)' : 
        'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(../img/background/wall.png)';
    document.body.style.backgroundColor = LightisChecked ? '#fdfdfd' : '#0c0b19';

    document.documentElement.style.setProperty('--color-padrao', LightisChecked ? 'var(--color-dark)' : '#25f700');
    document.documentElement.style.setProperty('--color-wt2', LightisChecked ? 'black' : '#fdfdff');
    document.documentElement.style.setProperty('--color-padrao-02', LightisChecked ? '#fdfdff' : '#25f702');
    document.documentElement.style.setProperty('--color-dark-2', LightisChecked ? '25f700' : '');
    document.documentElement.style.setProperty('--color-dark-3', LightisChecked ? '#fdfdfd' : '#0c0b19');
    document.documentElement.style.setProperty('--color-wt3', LightisChecked ? '' : '#25f700');
}



function contact() {
    window.scrollTo(0, document.body.scrollHeight);
}


function HideSections() {
    const sections = [
        document.getElementById("m-sec-01"),
        document.getElementById("m-sec-02"),
        document.getElementById("m-sec-03"),
        document.getElementById("sec-3-4"),
        document.getElementById("m-sec-04"),
        document.getElementById("m-sec-05")
    ];
    sections.forEach(section => {
        if (section) {
            section.style.display = "none";
        } else {
            console.error('Uma das seções não foi encontrada');
        }
    });
}

function ShowSections() {
    const sections = [
        document.getElementById("m-sec-01"),
        document.getElementById("m-sec-02"),
        document.getElementById("m-sec-03"),
        document.getElementById("sec-3-4"),
        document.getElementById("m-sec-04"),
        document.getElementById("m-sec-05")
    ];
    sections.forEach(section => {
        if (section) {
            section.style.display = "block";
        } else {
            console.error('Uma das seções não foi encontrada');
        }
    });
}


function toggleVisibilityMaster(numberSelect) {
    let secString0 = 'sec-project-' + numberSelect;
    let secString = document.getElementById(secString0); 
    
    if (secString.style.display === "none") {
        HideSections()
        secString.style.display = "flex";
    } else {
        secString.style.display = "none";
        ShowSections()
    }
}