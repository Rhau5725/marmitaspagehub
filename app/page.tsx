"use client";

import { useEffect, useState } from "react";

const audience = [
  ["TRB", "QUEM TRABALHA O DIA TODO", "Para quem chega em casa cansado e não quer precisar cozinhar todos os dias."],
  ["EST", "QUEM ESTUDA E TEM POUCO TEMPO", "Para quem vive na correria e precisa de refeições práticas para facilitar a rotina."],
  ["FIT", "QUEM QUER COMEÇAR A COMER MELHOR", "Para quem deseja organizar a alimentação, mas não sabe quais receitas preparar."],
  ["INI", "QUEM NÃO TEM EXPERIÊNCIA NA COZINHA", "Para quem procura receitas fáceis, organizadas e simples de preparar."],
];

const features = [
  ["+200", "+200 Receitas de Marmitas Fit", "Receitas práticas, organizadas e congeláveis para deixar a alimentação da semana pronta."],
  ["7d", "Planejamento semanal", "Saiba exatamente o que preparar e como distribuir suas refeições."],
  ["✓", "Lista de compras", "Compre os ingredientes certos, sem perder tempo ou gastar à toa."],
  ["♡", "Quiz do Paladar Fit", "Receba sugestões alinhadas aos sabores e texturas que você gosta."],
  ["÷", "Calculadora Marmita na Medida", "Calcule marmitas, porções, ingredientes e sua lista de compras."],
  ["↔", "Mapa de Substituições", "Encontre alternativas econômicas e quantidades equivalentes."],
  ["R$", "Custo por Marmita", "Compare o custo de cada refeição com o valor do delivery."],
  ["VIP", "Montador de Cardápios", "Crie combinações alinhadas ao seu objetivo, paladar e rotina."],
  ["30", "Cardápio VIP de 30 Dias", "Um mês inteiro já organizado para você não precisar pensar."],
  ["☀", "Planner de Preparo Dominical", "A ordem certa para preparar várias marmitas em menos tempo."],
];

const faqs = [
  ["Como vou receber o produto?", "Você receberá acesso ao material digital logo após a confirmação da compra."],
  ["As receitas são congeláveis?", "Sim. As receitas foram pensadas para facilitar o preparo e a organização de marmitas congeláveis."],
  ["Serve para quem não sabe cozinhar muito bem?", "Sim. A proposta é facilitar sua rotina com receitas práticas e organizadas."],
  ["O Plano Completo vale mais a pena?", "Sim. Ele inclui todas as ferramentas extras, bônus, calculadoras, cardápio VIP e planner de preparo."],
  ["Posso usar as receitas durante a semana inteira?", "Sim. O produto foi criado justamente para ajudar na organização semanal das marmitas."],
  ["Tem lista de compras?", "Sim. O material inclui lista de compras para facilitar o preparo."],
];

const checkout = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (event.currentTarget.getAttribute("href") === "#") event.preventDefault();
};

const receiveSlides = [
  { src: "/receber-1.png", alt: "Galeria com receitas de marmitas fit, filtros e informações nutricionais" },
  { src: "/receber-2.png", alt: "Planejamento automático da semana e geração de lista de compras" },
  { src: "/receber-3.png", alt: "Ferramentas bônus para facilitar a escolha e o planejamento das marmitas" },
  { src: "/receber-4.png", alt: "Montador VIP de cardápios personalizados" },
];

export default function Home() {
  const [upsell, setUpsell] = useState(false);
  const [receiveSlide, setReceiveSlide] = useState(0);
  const [receivePaused, setReceivePaused] = useState(false);
  useEffect(() => {
    document.body.style.overflow = upsell ? "hidden" : "";
    const close = (e: KeyboardEvent) => e.key === "Escape" && setUpsell(false);
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [upsell]);

  useEffect(() => {
    if (receivePaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setReceiveSlide((current) => (current + 1) % receiveSlides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [receivePaused]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(
      "main > section:not(.hero), main > footer, .audienceCard, .bonusCard, .priceCard, .faqList details"
    ));

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("reveal-visible"));
      return;
    }

    elements.forEach((element, index) => {
      element.classList.add("reveal-ready");
      element.style.setProperty("--reveal-delay", `${(index % 4) * 65}ms`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const continueWithBasic = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setUpsell(false);
    window.setTimeout(() => {
      window.location.assign("https://go.perfectpay.com.br/PPU38CQE2AJ");
    }, 450);
  };

  return (
    <main>
      <header className="miniBar"><span>✓ Acesso imediato</span><span>✓ Compra segura</span><span>✓ Material digital</span></header>
      <section className="hero">
        <div className="heroCopy">
          <div className="eyebrow">Sua semana leve, prática e organizada</div>
          <h1><em>+200</em> Receitas de Marmitas&nbsp;Fit <span>Congeláveis Prontas</span></h1>
          <p>Receitas práticas, congeláveis e organizadas para facilitar sua semana com mais saúde, economia e variedade.</p>
          <img className="heroProductCover" src="/capa-marmitas-250.png" alt="+250 receitas de marmitas fit congeláveis prontas com planejamento e lista de compras"/>
          <a className="button primary" href="#precos">Quero organizar minhas marmitas agora <span>→</span></a>
          <div className="microproof"><span>🥕 Receitas práticas</span><span>❄️ Feitas para congelar</span><span>📱 Acesse onde quiser</span></div>
        </div>
        <div className="heroVisual">
          <img src="/hero-marmitas.png" alt="Marmitas fit variadas organizadas para a semana" />
          <div className="floatTag"><b>+ praticidade</b><span>menos tempo na cozinha</span></div>
          <div className="floatNote"><b>Semana planejada</b><span>Compras • preparo • porções</span></div>
        </div>
      </section>

      <section className="organizedVisual">
        <div className="sectionHead">
          <span className="kicker">Organização na prática</span>
          <h2>Visual, organizado e pronto para a semana</h2>
          <p>Veja como fica mais simples preparar, armazenar e acompanhar suas refeições quando tudo está planejado em um só lugar.</p>
        </div>
        <div className="organizedImageWrap">
          <img src="/marmitas-organizadas-geladeira.png" alt="Geladeira organizada com marmitas fit e planejamento semanal"/>
        </div>
        <div className="organizedTags"><span>Fácil de organizar</span><span>Pronto para congelar</span><span>Prático para a semana</span></div>
      </section>

      <section className="receiveSection" aria-labelledby="receive-title">
        <div className="sectionHead">
          <span className="kicker">Tudo em um só lugar</span>
          <h2 id="receive-title">O que você vai receber</h2>
          <p>Veja por dentro as receitas, o planejamento e as ferramentas que vão deixar sua semana mais prática.</p>
        </div>
        <div
          className="receiveCarousel"
          onMouseEnter={() => setReceivePaused(true)}
          onMouseLeave={() => setReceivePaused(false)}
          onFocus={() => setReceivePaused(true)}
          onBlur={() => setReceivePaused(false)}
        >
          <div className="receiveViewport">
            <div className="receiveTrack" style={{ transform: `translateX(-${receiveSlide * 100}%)` }}>
              {receiveSlides.map((slide, index) => (
                <figure className="receiveSlide" key={`${slide.src}-${index}`} aria-hidden={index !== receiveSlide}>
                  <img src={slide.src} alt={slide.alt} loading={index === 0 ? "eager" : "lazy"} />
                </figure>
              ))}
            </div>
          </div>
          <button className="receiveArrow receivePrev" type="button" aria-label="Ver imagem anterior" onClick={() => setReceiveSlide((current) => (current - 1 + receiveSlides.length) % receiveSlides.length)}>‹</button>
          <button className="receiveArrow receiveNext" type="button" aria-label="Ver próxima imagem" onClick={() => setReceiveSlide((current) => (current + 1) % receiveSlides.length)}>›</button>
          <div className="receiveDots" aria-label="Escolher imagem do carrossel">
            {receiveSlides.map((_, index) => (
              <button key={index} type="button" aria-label={`Ver imagem ${index + 1}`} aria-current={index === receiveSlide ? "true" : undefined} onClick={() => setReceiveSlide(index)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section soft" id="para-quem">
        <div className="sectionHead"><span className="kicker">Feito para a rotina real</span><h2>Para quem é este material?</h2><p>Este material foi criado para pessoas que querem facilitar a alimentação e ter mais organização mesmo com uma rotina corrida.</p></div>
        <div className="audienceGrid">{audience.map(([icon,title,text]) => <article className="audienceCard" key={title}><i>{icon}</i><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>

      <section className="section bonuses">
        <div className="sectionHead"><span className="kicker">Bônus do Plano Completo</span><h2>Além das +200 receitas, você também recebe</h2><p>Os bônus abaixo entram no Plano Completo e hoje saem por R$0.</p></div>
        <div className="bonusGrid">{[
          ["1","Quiz do Paladar Fit","Descubra suas preferências e receba sugestões de marmitas mais adequadas ao seu paladar.","/bonus-1-quiz-paladar.png","R$ 27,00"],
          ["2","Calculadora Marmita na Medida","Calcule a quantidade ideal de marmitas, porções e ingredientes para sua rotina.","/bonus-2-calculadora.png","R$ 17,00"],
          ["3","Mapa Inteligente de Substituições","Troque ingredientes mantendo sabor, valor nutricional e praticidade nas receitas.","/bonus-3-substituicoes.png","R$ 23,00"],
          ["4","Guia Completo de Congelamento e Reaquecimento","Aprenda a congelar, armazenar e reaquecer as marmitas com segurança e sabor.","/bonus-4-congelamento.png","R$ 20,00"],
        ].map(([n,title,text,image,price])=><article className="bonusCard" key={n}><img className="bonusImage" src={image} alt={title}/><span className="bonusNumber">BÔNUS {n}</span><h3>{title}</h3><p>{text}</p><div className="bonusPrice"><s>{price}</s><b>GRÁTIS</b></div></article>)}</div>
      </section>

      <section className="section pricing" id="precos">
        <div className="sectionHead"><span className="kicker">Oferta exclusiva hoje</span><h2>Oferta especial</h2><p>Comece pelo essencial ou leve o pacote completo para organizar tudo com mais facilidade.</p></div>
        <div className="pricingGrid">
          <article className="priceCard basic"><span className="plan">PAGAMENTO ÚNICO</span><h3>Plano Básico</h3><p>Para começar com as receitas essenciais.</p><div className="price"><small>R$</small><strong>10</strong><small>,00</small></div><ul><li>✓ <span>+200 receitas de marmitas fit congeláveis</span></li>{["Lista de compras","Planejamento semanal","Montador VIP de Cardápios Personalizados","Cardápio VIP de 30 Dias Pronto","Planner de Preparo Dominical"].map(x=><li className="excluded" key={x}>× <span>{x}</span></li>)}</ul><button className="button secondary" onClick={()=>setUpsell(true)}>Quero o Plano Básico</button></article>
          <article className="priceCard complete">
            <div className="ribbon">MAIS VENDIDO</div>
            <span className="plan">PAGAMENTO ÚNICO</span>
            <h3>Plano Completo</h3>
            <p>Para ter receitas, ferramentas e bônus em um só lugar.</p>
            <img className="completeProductImage" src="/plano-completo-vip.png" alt="Plano completo VIP com receitas, planejamento e bônus"/>
            <div className="oldPrice">De R$ 97,00 por apenas:</div>
            <div className="price"><small>R$</small><strong>27</strong><small>,00</small></div>
            <ul>{["+200 receitas de marmitas fit congeláveis","Planejamento semanal","Lista de compras","Montador VIP de Cardápios Personalizados","Cardápio VIP de 30 Dias Pronto","Planner de Preparo Dominical"].map(x=><li key={x}>✓ <span>{x}</span></li>)}</ul>
            <img className="completeTrustImage" src="/selos-compra-segura.png" alt="Compra segura, satisfação garantida, dados protegidos e entrega por e-mail"/>
            <a className="button primary full" href="https://go.perfectpay.com.br/PPU38CQE2E6">Quero o Plano Completo</a>
          </article>
        </div>
      </section>

      <section className="section guarantee"><img className="guaranteeImage" src="/selo-garantia-7-dias.png?v=2" alt="Garantia de 7 dias: satisfação ou seu dinheiro de volta" /><div><h2>Garantia simples de 7 dias</h2><p>Você pode acessar o material e verificar se ele faz sentido para sua rotina. Se perceber que o produto não é para você, poderá solicitar suporte dentro do prazo de garantia informado na compra.</p><div className="guaranteeTags"><span>🔒 Compra segura</span><span>✓ Garantia de satisfação</span><span>⚡ Acesso imediato</span></div></div></section>

      <section className="section faq"><div className="sectionHead"><span className="kicker">Tire suas dúvidas</span><h2>Perguntas frequentes</h2></div><div className="faqList">{faqs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

      <section className="finalCta"><h2>Comece hoje a organizar suas marmitas fit da semana</h2><p>Pare de perder tempo pensando no que cozinhar todos os dias. Tenha receitas, planejamento, lista de compras e ferramentas inteligentes para deixar sua rotina mais prática.</p><a className="button primary" href="#precos">Quero minhas receitas agora <span>→</span></a></section>
      <footer><b>Marmitas Fit</b><p>Material digital para uma rotina mais prática e organizada.</p><small>© 2026 • Todos os direitos reservados</small></footer>

      {upsell && <div className="modalBackdrop" role="presentation" onMouseDown={(e)=>e.target===e.currentTarget&&setUpsell(false)}>
        <section className="modal upsellModal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modalClose" aria-label="Fechar oferta" onClick={()=>setUpsell(false)}>×</button>
          <h2 id="modal-title">Libere o Plano Completo<br/>por apenas R$ 17,90</h2>
          <p className="upsellIntro">Por mais <strong>R$ 7,90</strong>, você recebe tudo o que está na oferta completa de R$ 27,00.</p>
          <img className="upsellImage" src="/produto-vip-popup-clean.png" alt="Conteúdo VIP de marmitas fit"/>
          <ul className="upsellBenefits">
            {["+200 receitas de marmitas fit congeláveis","Planejamento semanal","Lista de compras","Montador VIP de Cardápios Personalizados","Cardápio VIP de 30 Dias Pronto","Planner de Preparo Dominical"].map(item=><li key={item}>{item}</li>)}
          </ul>
          <strong className="upsellPrice">R$ 17,90</strong>
          <p className="upsellNote">Upgrade único antes de finalizar seu acesso.</p>
          <a className="button primary full" href="https://go.perfectpay.com.br/PPU38CQE502">SIM! QUERO LIBERAR TUDO POR R$ 17,90 →</a>
          <a className="decline" href="https://go.perfectpay.com.br/PPU38CQE2AJ" onClick={continueWithBasic}>Não, obrigado. Quero apenas o Plano Básico por R$ 10,00</a>
        </section>
      </div>}
    </main>
  );
}
