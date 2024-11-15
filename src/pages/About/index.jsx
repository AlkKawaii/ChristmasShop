import styles from './About.module.css';

export default function About() {
  return (
    <section className={styles.container}>
      <article>
        <h2>Sobre Nós</h2>
        <p>
          Bem-vindo à Christmas Shop, a sua loja temática especializada em
          tornar o Natal ainda mais mágico! 🎅✨
        </p>
        <p>
          Aqui, acreditamos que o espírito natalino vai muito além de uma data
          no calendário — é um sentimento que aquece o coração e traz momentos
          inesquecíveis. Nossa missão é transformar cada detalhe da sua
          decoração de Natal em um verdadeiro espetáculo, desde a árvore cheia
          de enfeites deslumbrantes até os presentes que farão os olhos
          brilharem de alegria.
        </p>
        <p>
          Somos apaixonados por tudo que envolve essa época especial: luzes
          cintilantes, guirlandas encantadoras, ornamentos únicos e aquele toque
          extra de magia que só o Natal pode proporcionar. Nossa loja oferece
          uma seleção cuidadosa de produtos, incluindo itens artesanais
          exclusivos, para que você possa criar o Natal dos seus sonhos.
        </p>
        <p>
          Queremos fazer parte da sua tradição natalina e ajudar a tornar cada
          celebração ainda mais especial, seja em casa, na empresa ou em
          qualquer lugar onde o espírito natalino queira brilhar. 🎁🎄
        </p>
        <p>
          Christmas Shop — Espalhando a magia do Natal, um sorriso de cada vez.
        </p>
      </article>
      <article>
        <h2>Informações de Contato</h2>
        <span>
          📍 Endereço: Rua das Estrelas, 123 - Vila Noel, São Paulo, SP,
          01000-000
        </span>
        <span>📞 Telefone: (11) 9876-5432</span>
        <span>📧 E-mail: contato@christmasshop.com.br</span>
        <span>
          🌐 Site:&nbsp;
          <a href='https://christmasshop.vercel.app' rel='noreferrer noopener'>
            christmasshop.vercel.app
          </a>
        </span>
        <span>
          🕒 Horário de Funcionamento: Segunda a Sábado, das 9h às 19h
        </span>
        <span>
          Siga-nos nas redes sociais para ficar por dentro de todas as
          novidades:
        </span>
        <span>📸 Instagram: @christmasshop</span>
        <span>👍 Facebook: Christmas Shop</span>
      </article>
    </section>
  );
}
