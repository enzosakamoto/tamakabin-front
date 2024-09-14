# Tamakabin

**Tamakabin** é o projeto do 2° semestre da disciplina **Microcontroladores e Sistemas Embarcados** (EEN251) do **Instituto Mauá de Tecnologia** (IMT), ministrada pelos professores [Sergio Ribeiro Augusto](https://www.linkedin.com/in/sergio-ribeiro-augusto-258a9ba0/?originalSubdomain=br) e [Rodrigo França](https://www.linkedin.com/in/rodrigo-fran%C3%A7a-847872b1/).<BR>
Este repositório é responsável pela parte de Front-End, servidor HTTP e integração com banco de dados da aplicação. O IoT está [neste repositório](https://github.com/PedroMatumoto/tamakabin).

<p align="center">
  <img width="910" alt="planta" src="https://github.com/user-attachments/assets/808cb715-9244-4dbf-bf49-f9812f788d3e">
</p>

## Sumário

- [Requisitos](#requisitos)
- [Escopo](#escopo)
  - [Diagrama de blocos](#diagrama-de-blocos)
  - [Tecnologias e conceitos](#tecnologias-e-conceitos)
  - [Materiais](#materiais)
  - [Modelagem de software](#modelagem-de-software)
  - [Banco de dados](#banco-de-dados)
    - [Exemplo de objeto JSON armazenado no banco de dados](#exemplo-de-objeto-json-armazenado-no-banco-de-dados)
- [Funcionamento](#funcionamento)
  - [Funcionamento da Aplicação](#funcionamento-da-aplicação)
  - [Interface gráfica](#interface-gráfica)
- [Testes](#testes)
  - [Dia 19/08/2024](#dia-19082024)
  - [Dia 29/08/2024](#dia-29082024)
  - [Dia 04/09/2024 - Apresentação final](#dia-04092024---apresentação-final)
- [Foto da equipe](#foto-da-equipe)
- [Autores](#autores)

# Requisitos

| ID  | Requisito                                                                   | Tipo      |
| --- | --------------------------------------------------------------------------- | --------- |
| 1   | Utilizar sensores digitais                                                  | Técnico   |
| 2   | Verificar a umidade da planta                                               | Funcional |
| 3   | Verificar a luminosidade incidida na planta                                 | Funcional |
| 4   | Verificar a temperatura                                                     | Técnico   |
| 5   | Utilizar padrões de comunicação HTTP ou MQTT                                | Técnico   |
| 6   | Comunicar-se com outro dispositivo                                          | Técnico   |

# Escopo

O projeto consiste em uma Raspberry Pi conectada à um vaso de planta que envia requisições com as informações que coleta dos sensores conectados aos pinos de GPIO.

## Diagrama de blocos

![diagrama_tamakabin](https://github.com/user-attachments/assets/c0558892-c244-40fe-8ab9-6786167160d4)

## Tecnologias e conceitos

- MongoDB Atlas (banco de dados)
- Next.js (interface gráfica e servidor HTTP)
- API REST (requisições HTTP)
- Raspberry Pi (hardware)
- Comunicação HTTP
- Sensores (umidade, temperatura, luminosidade)

## Materiais

O sistema é montado com os seguintes componentes:

- 1 microcomputador **Raspberry Pi 3 Model B+**
- 1 sensor de **umidade e temperatura** DHT22
- 1 Módulo **Sensor de Luminosidade** Luz LDR
- 1 Bomba d'água
- 1 MOSFETs IRLZ44N
- 1 Display OLED I2C 128x64

## Modelagem de software

Para a criação da interface gráfica e do servidor HTTP, foi utilizado Next.js, um framework que permite o desenvolvimento de aplicações full-stack com rotas do lado do servidor. A aplicação recebe as informações dos sensores da planta via requisição HTTP POST e as armazena em um banco de dados MongoDB Atlas. Os parâmetros recebidos incluem:

- Umidade (percentual)
- Temperatura (graus Celsius)
- Luminosidade (0 ou 1)

O fluxo de dados ocorre da seguinte forma:

1. **Coleta de Dados:**
   - Os sensores conectados à Raspberry Pi coletam dados de umidade, temperatura e luminosidade.
2. **Envio de Dados:**
   - A Raspberry Pi envia esses dados para o servidor Next.js através de uma requisição POST.
3. **Processamento no Servidor:**
   - O servidor Next.js recebe os dados, armazena-os no MongoDB Atlas e exibe os resultados na interface gráfica.
4. **Armazenamento no Banco de Dados:**
   - O MongoDB Atlas é utilizado para persistir os dados de cada requisição, possibilitando futuras análises ou automações.
5. **Exibição na Interface:**
   - Os dados recebidos são apresentados de forma organizada na interface gráfica, permitindo ao usuário monitorar as condições da planta.

O sistema pode ser expandido para adicionar automações, como controle de irrigação ou ajuste de iluminação baseado nos parâmetros coletados.


## Banco de dados

O banco de dados utilizado foi o MongoDB Atlas, um banco de dados NoSQL baseado em documentos. O banco de dados é acessado através de uma conexão com o servidor Next.js, que realiza operações de leitura e escrita dos dados coletados dos sensores.

1.	Validar e processar os dados: Certifica-se de que os dados recebidos seguem o formato esperado (por exemplo, que a umidade está entre 0 e 100, e a temperatura está em um intervalo válido).
2.	Armazenar os dados: Insere os dados em uma coleção no banco MongoDB, que pode ser consultada futuramente para monitoramento e análises.
3.	Recuperação de dados: O servidor pode consultar o banco de dados MongoDB para exibir informações anteriores, como histórico de umidade e temperatura ao longo do tempo, possibilitando gráficos e análises de tendências.

### Exemplo de objeto JSON armazenado no banco de dados

```json
{
  "umidity": 60, // Umidade em percentual
  "temperature": 25, // Temperatura em graus Celsius
  "brightness": 1, // Luminosidade (0 ou 1)
  "timestamp": 1726341352440 // Timestamp da leitura
}
```

# Funcionamento

## Funcionamento da Aplicação

1. **Coleta de Dados pelos Sensores**
   - **DHT22**: Mede temperatura e umidade.
   - **LDR**: Mede a intensidade da luz.

2. **Processamento dos Dados na Raspberry Pi**
   - A Raspberry Pi lê os dados dos sensores e os processa (e.g., conversão de unidades).

3. **Envio de Dados via HTTP**
   - A Raspberry Pi envia os dados em formato JSON para uma API via requisição HTTP (`POST`).

4. **Tratamento e Uso dos Dados pela API**
   - A API armazena, processa ou aciona alertas com base nos dados recebidos.
   - Mostra informações no display com base nos parâmetros de umidade, temperatura, luz e hora do dia.

5. **Possíveis Extensões**
   - Automação de ações (e.g., ligar ventilador, acender luzes) baseada nos dados dos sensores.

## Interface gráfica

A interface gráfica é acessada através de um navegador web e exibe as informações coletadas pelos sensores da planta. A interface é construída com Next.js e utiliza uma API REST para obter os dados do banco de dados MongoDB Atlas. O link para a interface é [este](https://tamakabin.vercel.app/).

![Parte 1 da interface](/public/image.png)

![Parte 2 da interface](/public/image-1.png)

# Testes

## Dia 19/08/2024

- **Teste de funcionamento do sensor DHT22**

<p align="center">
  <img height="600" alt="testedht" src="https://github.com/user-attachments/assets/7335f450-3d8d-40ff-b1c1-6864b62ef15f">
</p>

## Dia 29/08/2024

- **Teste de funcionamento do Display e bomba**

https://github.com/user-attachments/assets/4b965cbf-abdd-4a26-8b6d-a66f4481a4f5

## Dia 04/09/2024 - Apresentação final
[Link do vídeo](https://youtu.be/6dndOLTqGWo)

# Foto da equipe

<p align="center">
  <img width="800" alt="kirby" src="https://github.com/user-attachments/assets/b4e1d8fe-257f-430c-bb13-04429a5ec331">
</p>

# Autores

- [Antonio Ferrite 21.00663-6](https://github.com/tom-ferrite) 
- [Enzo Sakamoto 21.00210-0](https://github.com/enzosakamoto) 
- [Flavio Murata 21.01192-3](https://github.com/flaviomurata)
- [Maria Fernanda Pinho 21.00256-8](https://github.com/mafepinho)
- [Pedro Matumoto 21.00784-5](https://github.com/pedromatumoto)