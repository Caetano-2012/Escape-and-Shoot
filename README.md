<h1 align="center"> ⚔️ Escape and Shoot - Jogo em Javascript ⚔️ </h1>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black" alt="Javascript Badge">
  <img src="https://img.shields.io/badge/Status-Ativo-success?style=for-the-badge" alt="Status Badge">
  <img src="https://img.shields.io/badge/Phaser.js-3.60-blue?style=for-the-badge" alt="Phaser.js Badge">
</p>

<p align="center">
  <i>Um jogo divertido via Phaser.js</i><br>
  <b>Autor:</b> Caetano Bordin
</p>

## 🧩 Sobre o Projeto  👩‍💻

Este é um jogo simples desenvolvido em Phaser 3, onde o jogador controla um guerreiro que deve derrotar um bruxo esqueleto.
O jogador pode se mover verticalmente e atirar espadas, enquanto o inimigo se movimenta automaticamente e dispara bolas de fogo em direção ao jogador.

O objetivo é zerar as vidas do inimigo antes que suas próprias vidas acabem.
O jogo foi criado como um projeto de aprendizado, explorando mecânicas básicas de física, movimentação, colisões e gerenciamento de entidades no Phaser.
## 🧰 Tecnologias Utilizadas

| Categoria | Detalhes |
|------------|-----------|
| 💻 **Linguagem** | JS e HTML |
| 📚 **Bibliotecas** | Phaser 3.60.0 |
| ⚙️ **Outros** | Sprites PNG |




## ⚙️ Funcionalidades 

**👤 Player**

- Movimentação vertical (setas ↑ e ↓)

- Atira espadas com espaço

- Possui 3 vidas

- Fica invulnerável por 2s após ser atingido

- Não pode sair da tela

**💀 Inimigo (Skull Witch)**

- Se move automaticamente para cima e para baixo

- Tem 5 vidas

- Fica invulnerável por 0.2s após levar dano

- Dispara fireballs a cada 2 segundos mirando no jogador

**⚔ Projéteis**

- Espada (player)

  -Se move para a esquerda

  -Some ao bater no inimigo

  -Concede +100 pontos para o player

- Fireball (inimigo)

  -Mira no player

  -Remove 1 vida do player

  -Remove 50 pontos

**🏆 Sistema de Pontuação**

- +100 pontos por acerto no inimigo

- -50 pontos por ser atingido

- Pontuação exibida em tempo real

**🧪 Estados do jogo**

- Vitória: quando as vidas do inimigo chegam a 0

- Derrota: quando o jogador morre

  Após o fim do jogo:

  -Física pausada

  -Movimentação congelada

  -Input desativado

## 📚 Aprendizados

Durante o desenvolvimento deste projeto, foram aplicados vários conceitos essenciais para jogos no Phaser:

**🔸 Gerenciamento de Sprites e Grupos**

   - Uso de physics.add.group() para espadas e fireballs

   - Reutilização de objetos (pooling)

**🔸 Detecção de colisões e overlap**

   - this.physics.add.overlap()

   - Identificação de quem acertou quem

   - Prevenção de hits duplicados

**🔸 Timers e eventos**

   - Fireballs automáticas usando this.time.addEvent()

   - Invulnerabilidade temporária com delayedCall

**🔸 Controle de estados do jogo**

   - Flags como gameOver e playerInvulnerable

   - Pausas de física

   - Encerramento seguro do jogo (endGame())

**🔸 Movimentação**

   - Player com controle manual

   - Inimigo com movimento automático e rebote

Esse projeto mostra uma ótima base para jogos de tiro lateral, arena shooter e boss fights simples.
## 🕹️ Como Jogar

 **1**- Abra o index.html em qualquer navegador moderno (Chrome, Edge, Firefox).

&ensp; &ensp;Não precisa de servidor; é só abrir o arquivo.

 **2**- Movimente o player:

   - ↑ mover para cima

   - ↓ mover para baixo

 **3**- Atire espadas com ESPAÇO:

- As espadas vão para a esquerda

- Acerte o inimigo para tirar suas vidas

 **4**- Desvie das fireballs:

- Cada fireball causa 1 de dano

- Você tem 3 vidas

 **5**- Ganhe o jogo:
-  Zere as 5 vidas do inimigo.

 **6**- Perde o jogo:
- Suas vidas chegam a 0.


## Licença

- Permissão de Uso: O código pode ser usado somente para fins educacionais.

- Modificação e Distribuição: Qualquer pessoa pode modificar o código e redistribuí-lo, seja na forma original ou modificada, desde que citando autores.

- Inclusão da Licença: Ao redistribuir o software, a licença original e o aviso de direitos autorais devem ser incluídos no código fonte ou na documentação, garantindo que futuros usuários conheçam seus direitos.

- Isenção de Garantia: O software é fornecido "como está", sem garantias de qualquer tipo, explícitas ou implícitas. Os autores não são responsáveis por quaisquer danos decorrentes do uso do software.


## Autor

- [@Caetano-2012](https://www.github.com/Caetano-2012)


